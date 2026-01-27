from bs4 import BeautifulSoup
import os
import sys

def extract_article_text(html_path, output_path="content.txt"):
    if not os.path.isfile(html_path):
        raise FileNotFoundError(f"Fichier introuvable : {html_path}")

    with open(html_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    article = soup.find("article")
    if not article:
        raise ValueError("Aucune balise <article> trouvée dans le fichier HTML.")

    # Remplacer les images par [NOM_IMAGE.ext]
    for img in article.find_all("img"):
        src = img.get("src", "")
        filename = os.path.basename(src) if src else "IMAGE_INCONNUE"
        img.replace_with(f"\n[{filename}]\n")

    # Récupération du texte nettoyé
    text = article.get_text(separator="\n")

    # Nettoyage léger : lignes vides multiples
    lines = [line.strip() for line in text.splitlines()]
    cleaned_text = "\n".join(line for line in lines if line)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(cleaned_text)

    print(f"✅ Contenu extrait avec succès dans : {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage : python extract_article.py chemin/vers/fichier.html")
        sys.exit(1)

    html_file = sys.argv[1]
    extract_article_text(html_file)