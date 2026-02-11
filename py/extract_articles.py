from bs4 import BeautifulSoup
import os

# Configuration des dossiers
INPUT_DIR = "formation"
OUTPUT_DIR = "plain-text"

def process_file(html_path, output_path):
    """
    Lit un fichier HTML, extrait le contenu de <article> et l'écrit dans un fichier texte.
    """
    try:
        with open(html_path, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f, "html.parser")

        article = soup.find("article")
        
        # Si pas de balise article, on ignore le fichier ou on log l'erreur
        if not article:
            print(f"⚠️  Ignoré (pas de <article>) : {os.path.basename(html_path)}")
            return

        # Remplacer les images par [NOM_IMAGE.ext]
        for img in article.find_all("img"):
            src = img.get("src", "")
            filename = os.path.basename(src) if src else "IMAGE_INCONNUE"
            img.replace_with(f"\n[{filename}]\n")

        # Récupération du texte avec séparateur de ligne
        text = article.get_text(separator="\n")

        # Nettoyage : suppression des espaces inutiles et des lignes vides multiples
        lines = [line.strip() for line in text.splitlines()]
        cleaned_text = "\n".join(line for line in lines if line)

        # Écriture du fichier texte
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(cleaned_text)

        print(f"✅ Converti : {os.path.basename(html_path)} -> {os.path.basename(output_path)}")

    except Exception as e:
        print(f"❌ Erreur sur {os.path.basename(html_path)} : {e}")

def batch_convert():
    # 1. Vérifier si le dossier source existe
    if not os.path.exists(INPUT_DIR):
        print(f"❌ Le dossier '{INPUT_DIR}' n'existe pas. Veuillez le créer et y mettre vos fichiers HTML.")
        return

    # 2. Créer le dossier de sortie s'il n'existe pas
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        print(f"📁 Dossier créé : {OUTPUT_DIR}")

    # 3. Lister tous les fichiers HTML du dossier source
    files = [f for f in os.listdir(INPUT_DIR) if f.endswith(".html")]

    if not files:
        print(f"⚠️  Aucun fichier .html trouvé dans '{INPUT_DIR}'.")
        return

    print(f"🚀 Démarrage du traitement de {len(files)} fichiers...\n")

    # 4. Boucle sur chaque fichier
    for filename in files:
        html_path = os.path.join(INPUT_DIR, filename)
        
        # Création du nom de fichier de sortie (ex: 1.1.html -> 1.1.txt)
        txt_filename = os.path.splitext(filename)[0] + ".txt"
        output_path = os.path.join(OUTPUT_DIR, txt_filename)

        process_file(html_path, output_path)

    print("\n✨ Traitement terminé !")

if __name__ == "__main__":
    batch_convert()