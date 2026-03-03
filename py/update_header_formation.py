import os
import re

# 1. Le script remonte d'un cran (..) et rentre dans le dossier 'formation'
DOSSIER_CIBLE = '../formation'

# 2. Le template avec TOUS les liens adaptés pour un sous-dossier (ajout des ../)
NOUVEAU_HEADER = """<header class="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            
            <a href="../index.html" class="flex items-center gap-3 group">
                <img src="../media/Logo/Logo-White.png" alt="Logo StocksPickeur" class="h-10 w-auto filter invert group-hover:opacity-80 transition"> 
                <span class="font-heading font-bold text-xl text-slate-900 tracking-tight">StocksPickeur</span>
            </a>

            <div class="hidden xl:flex items-center gap-8">
                <nav class="flex gap-6">
                    <a href="../calculator.html" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Calculateur</a>
                    <a href="../portfolio.html" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Portefeuille</a>
                    <a href="../moatpicks.html" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Analyses</a>
                    <a href="../resources.html" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Ressources</a>
                    <a href="../articles.html" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Articles</a>
                    <a href="../formation.html" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Formation</a>
                    <a href="../about.html" class="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">À Propos</a>
                </nav>

                <div class="h-6 w-px bg-slate-200"></div>

                <a href="../account.html" id="header-auth-btn" class="bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 flex items-center gap-2 transform hover:-translate-y-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Connexion
                </a>
            </div>

            <div class="xl:hidden flex items-center">
                <button id="mobile-menu-btn" class="text-slate-500 hover:text-slate-900 focus:outline-none p-2">
                    <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div id="mobile-menu" class="hidden xl:hidden bg-white border-b border-slate-200 shadow-xl absolute w-full">
        <nav class="flex flex-col px-4 pt-2 pb-6 space-y-3">
            <a href="../calculator.html" class="text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition">Calculateur</a>
            <a href="../portfolio.html" class="text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition">Portefeuille</a>
            <a href="../moatpicks.html" class="text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition">Analyses</a>
            <a href="../resources.html" class="text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition">Ressources</a>
            <a href="../articles.html" class="text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition">Articles</a>
            <a href="../formation.html" class="text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition">Formation</a>
            <a href="../about.html" class="text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 p-2 rounded-lg transition">À Propos</a>
            
            <div class="border-t border-slate-100 pt-3 mt-2">
                <a href="../account.html" id="mobile-auth-btn" class="flex justify-center w-full bg-slate-900 text-white font-bold px-5 py-3 rounded-xl hover:bg-slate-800 transition">
                    <span id="mobile-nav-username">Connexion Espace Membre</span>
                </a>
            </div>
        </nav>
    </div>
</header>"""

def update_headers_formation():
    fichiers_modifies = 0

    # On vérifie si le dossier existe bien pour éviter les erreurs
    if not os.path.exists(DOSSIER_CIBLE):
        print(f"❌ Le dossier {DOSSIER_CIBLE} est introuvable depuis le dossier actuel.")
        return

    # On parcourt tous les fichiers du sous-dossier formation/
    for nom_fichier in os.listdir(DOSSIER_CIBLE):
        # On ne traite que les fichiers HTML (ex: 1.4.html)
        if nom_fichier.endswith('.html'):
            chemin_fichier = os.path.join(DOSSIER_CIBLE, nom_fichier)

            with open(chemin_fichier, 'r', encoding='utf-8') as f:
                contenu = f.read()

            # La Regex magique qui trouve et isole le bloc <header> actuel
            pattern = re.compile(r'<header.*?</header>', re.DOTALL)

            if pattern.search(contenu):
                nouveau_contenu = pattern.sub(NOUVEAU_HEADER, contenu)

                with open(chemin_fichier, 'w', encoding='utf-8') as f:
                    f.write(nouveau_contenu)

                print(f"✅ Header mis à jour dans : formation/{nom_fichier}")
                fichiers_modifies += 1

    print(f"\n🚀 Terminé ! {fichiers_modifies} chapitres ont été mis à jour avec le menu mobile.")

if __name__ == '__main__':
    update_headers_formation()