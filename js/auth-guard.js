// js/auth-guard.js
console.log("📢 Le script auth-guard.js a bien démarré !");

// --- CORRECTIF ANTI-RETOUR (BFCACHE) ---
// Ce code force le rechargement de la page si l'utilisateur utilise le bouton "Précédent"
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        console.log("🔄 Retour arrière détecté : Rechargement forcé...");
        window.location.reload();
    }
});

import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Cas 1 : Connecté
        console.log("✅ Connecté :", user.email);
        updateUI(user);
    } else {
        // Cas 2 : Non connecté
        // --- CONFIGURATION DES PAGES PUBLIQUES ---
        const path = window.location.pathname;
        
        // Liste blanche
        const publicPages = [
            'index.html', 
            'login.html', 
            'calculator.html', 
            'portfolio.html',
            '/' 
        ];

        // Vérification souple (si l'URL termine par une page publique)
        const isPublicPage = publicPages.some(page => path.endsWith(page));

        if (!isPublicPage) {
            console.log("🚫 Page privée -> Expulsion immédiate");
            
            // Définition de la cible (login)
            let targetLogin = "login.html";
            if (path.includes('/formation/')) {
                 targetLogin = "../login.html";
            }

            // --- CORRECTIF MAJEUR ICI ---
            // On utilise 'replace' au lieu de 'href'.
            // Cela supprime la page protégée de l'historique de navigation.
            // L'utilisateur ne pourra pas faire "Précédent" pour revenir ici.
            window.location.replace(targetLogin);
        }
    }
});

// Gestion de l'affichage du Header (Identique)
function updateUI(user) {
    const loginBtn = document.getElementById('header-auth-btn');
    
    if (loginBtn) {
        const pseudo = user.email.split('@')[0];

        loginBtn.innerHTML = `
            <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="font-bold">${pseudo}</span>
            </div>
        `;
        
        loginBtn.href = "#";
        loginBtn.classList.remove('bg-slate-900'); 
        loginBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700', 'transition-colors'); 
        
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(confirm(`Se déconnecter du compte ${user.email} ?`)) {
                signOut(auth).then(() => {
                    // On redirige vers l'accueil après déconnexion pour éviter de rester sur une page privée
                    window.location.replace("index.html"); 
                });
            }
        });
    }
}