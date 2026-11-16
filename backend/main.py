import os
import json
import requests
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, firestore
from google import genai
from google.genai import types # NOUVEL IMPORT POUR CONFIGURER LA LONGUEUR
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://127.0.0.1:5501", "https://stockspickeur.eu", "https://arthvrr.github.io"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

try:
    firebase_creds_dict = json.loads(os.environ.get("FIREBASE_SERVICE_ACCOUNT_JSON"))
    cred = credentials.Certificate(firebase_creds_dict)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    print(f"Erreur init Firebase: {e}")

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

class MailRequest(BaseModel):
    subject: str
    htmlContent: str

def create_newsletter_content():
    week_num = datetime.now().isocalendar()[1]
    subject = f"Market Five - Semaine {week_num}/53"
    
    # PROMPT RÉVISÉ : Pur journalisme, aucune mention de philosophie, ton chaleureux.
    prompt = """
    Rédige la newsletter financière de cette semaine intitulée "Market Five". Tu écris au nom d'Arthur.
    Ton style est humain, passionné, direct et 100% journalistique.
    
    RÈGLES STRICTES :
    1. Fais une introduction chaleureuse et engageante (environ 4-5 phrases) : "Salut à tous, c'est Arthur..." pour accueillir les lecteurs et donner la tendance générale de la semaine.
    2. Ensuite, détaille les 5 événements boursiers, macroéconomiques, ou d'entreprises mondiales LES PLUS IMPORTANTS des 7 derniers jours.
    3. Pour chaque événement, sois exhaustif (2 à 3 paragraphes). Donne des faits concrets, nomme les entreprises, donne des chiffres exacts, et explique l'impact sur les marchés.
    4. Utilise uniquement des balises HTML : <h2> pour les titres des 5 news, <p> pour le texte, <strong> pour les mots ou chiffres importants. Ne mets pas de balises markdown ```html.
    5. Termine par une très courte phrase de conclusion amicale (ex: "Passez un excellent dimanche, on se retrouve la semaine prochaine !").
    """
    
    # Appel de l'IA avec une limite de texte augmentée (max_output_tokens) pour ne pas couper la fin
    response = client.models.generate_content(
        model='gemini-2.5-flash', # Flash est plus constant pour ce type de tâche que pro-latest
        contents=prompt,
        config=types.GenerateContentConfig(
            max_output_tokens=6000,
            temperature=0.7
        )
    )
    
    # Footer corrigé (j'ai enlevé les balises markdown qui cassaient tes liens HTML)
    footer_html = """
    <br><br>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #111111;margin-top:30px;padding-top:25px;font-family:Helvetica,Arial,sans-serif;background-color:#ffffff;">
    <tr>
    <td align="center" style="padding:25px 15px 20px 15px;">
    <a href="https://stockspickeur.eu" ...>
    <img src="https://stockspickeur.eu/media/Logo/Logo-Black.png" ...>
    </a>
    <p style="margin:12px 0 22px 0;color:#000000;font-size:11px;font-weight:600;letter-spacing:1.5px;">StocksPickeur - Market Five</p>
    <p style="margin:0 0 10px 0;color:#000000;font-size:11px;line-height:1.7;">Vous recevez cet email car vous êtes inscrit(e) à la newsletter.</p>
    <p style="margin:0;color:#000000;font-size:10px;letter-spacing:0.3px;">© 2026 StocksPickeur&reg;. Tous droits réservés.</p>
    </td>
    </tr>
    </table>
    """
    
    html_final = response.text + footer_html
    return subject, html_final

def execute_brevo_send(subject: str, html_content: str):
    users_ref = db.collection("users")
    query = users_ref.where("newsletter", "==", True).stream()
    
    email_list = [{"email": doc.to_dict()["email"]} for doc in query if "email" in doc.to_dict()]

    if not email_list:
        return {"error": "Aucun abonné trouvé.", "sent_count": 0}

    url = "[https://api.brevo.com/v3/smtp/email](https://api.brevo.com/v3/smtp/email)"
    headers = {
        "accept": "application/json",
        "api-key": os.environ.get("BREVO_API_KEY"),
        "content-type": "application/json"
    }
    
    payload = {
        "sender": {"name": "Arthur - StocksPickeur", "email": "newsletter@stockspickeur.eu"},
        "to": [{"email": "newsletter@stockspickeur.eu"}], 
        "bcc": email_list,
        "subject": subject,
        "htmlContent": html_content
    }

    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code in [201, 202]:
        return {"message": "Newsletter envoyée avec succès", "sent_count": len(email_list)}
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

@app.get("/")
async def root():
    return {"status": "API StocksPickeur en ligne 🟢"}

@app.post("/generate-newsletter")
async def generate_newsletter_route():
    try:
        subject, content = create_newsletter_content()
        return {"subject": subject, "ai_draft": content}
    except Exception as e:
        print(f"Erreur IA: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/send-newsletter")
async def send_newsletter_route(request: MailRequest):
    return execute_brevo_send(request.subject, request.htmlContent)