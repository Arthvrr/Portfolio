import os
import re

FORMATION_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'formation')

# Motif plus souple pour correspondre à diverses formulations de la balise vidéo existante
OLD_VIDEO_PATTERN = re.compile(
r'<video[^>]*>\s*<source[^>]*src=["\']?videos/([^"\'>]+)["\']?[^>]*>\s*[^<]*</video>',
re.IGNORECASE | re.MULTILINE | re.DOTALL
)

NEW_VIDEO_TEMPLATE = """<video id="course-video" controls controlsList="nodownload" oncontextmenu="return false;" class="w-full h-full object-cover" preload="metadata">
            <source id="video-source" data-video-name="{video_filename}" type="video/mp4">
            Votre navigateur ne supporte pas la lecture de vidéos.
        </video>"""

# Regex pour identifier les noms de fichiers de type "chiffre.chiffre.html"
# où le premier chiffre est au moins 1 et le second n'est pas 0
VALID_FILE_PATTERN = re.compile(r'^[1-9]\.[1-9][0-9]*\.html$')

def update_html_files():
    count = 0
    for filename in os.listdir(FORMATION_DIR):
        # Vérifie si le nom du fichier correspond au format désiré
        if VALID_FILE_PATTERN.match(filename):
            filepath = os.path.join(FORMATION_DIR, filename)
            
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            if OLD_VIDEO_PATTERN.search(content):
                def repl(match):
                    video_filename = match.group(1)
                    return NEW_VIDEO_TEMPLATE.format(video_filename=video_filename)
                
                new_content = OLD_VIDEO_PATTERN.sub(repl, content)
                
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                count += 1
                print(f"✅ Mis à jour : {filename}")
        
    print(f"Terminé ! {count} fichiers modifiés.")

if __name__ == "__main__":
    update_html_files()