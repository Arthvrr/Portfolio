import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Assure-toi que ta clé API Gemini est bien configurée
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

print("Modèles disponibles pour la génération de contenu :")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"- {model.name}")