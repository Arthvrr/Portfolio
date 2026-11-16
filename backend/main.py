import os
import json
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore
from google import genai # NOUVEL IMPORT
from dotenv import load_dotenv

# Charger les variables d'environnement locales (fichier .env)
load_dotenv()

app = FastAPI()

# 1. Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://127.0.0.1:5501", "https://stockspickeur.eu"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

# 2. Initialisation Firebase Admin
try:
    firebase_creds_dict = json.loads(os.environ.get("FIREBASE_SERVICE_ACCOUNT_JSON"))
    cred = credentials.Certificate(firebase_creds_dict)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    print(f"Erreur init Firebase: {e}")

# 3. Initialisation Gemini (NOUVELLE MÉTHODE)
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

# Modèle de données attendu depuis le site web
class MailRequest(BaseModel):
    subject: str
    htmlContent: str

@app.get("/")
async def root():
    return {"status": "API StocksPickeur en ligne 🟢"}

@app.post("/generate-newsletter")
async def generate_newsletter():
    try:
        prompt = """
        Tu es Arthur, créateur de StocksPickeur. Rédige une introduction de newsletter (format HTML) 
        résumant de manière dynamique et professionnelle les 5 événements macroéconomiques et boursiers 
        majeurs de la semaine passée. Utilise des balises <h2>, <p>, <ul>, <li> et <strong>. 
        Ton ton est expert, passionné et orienté 'Quality Investing'. Ne mets pas de balises ```html au début.
        Sois verbeux et pro !! Écris moi 2-3 paragraphes par sujets.
        """
        
        # Nouvel appel avec le modèle gemini-2.5-flash
        response = client.models.generate_content(
            model='gemini-pro-latest',
            contents=prompt
        )
        return {"ai_draft": response.text}
    
    except Exception as e:
        print(f"Erreur IA: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/send-newsletter")
async def send_newsletter(request: MailRequest):
    try:
        # A. Récupérer les emails abonnés dans Firestore
        users_ref = db.collection("users")
        query = users_ref.where("newsletter", "==", True).stream()
        
        email_list = []
        for doc in query:
            user_data = doc.to_dict()
            if "email" in user_data:
                email_list.append({"email": user_data["email"]})

        if not email_list:
            return {"error": "Aucun abonné trouvé.", "sent_count": 0}

        # B. Envoi via l'API Brevo
        url = "[https://api.brevo.com/v3/smtp/email](https://api.brevo.com/v3/smtp/email)"
        headers = {
            "accept": "application/json",
            "api-key": os.environ.get("BREVO_API_KEY"),
            "content-type": "application/json"
        }
        
        # Payload Brevo
        payload = {
            "sender": {"name": "Arthur - StocksPickeur", "email": "newsletter@stockspickeur.eu"},
            "to": [{"email": "newsletter@stockspickeur.eu"}], 
            "bcc": email_list,
            "subject": request.subject,
            "htmlContent": request.htmlContent
        }

        response = requests.post(url, json=payload, headers=headers)
        
        if response.status_code in [201, 202]:
            return {"message": "Newsletter envoyée avec succès", "sent_count": len(email_list)}
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))