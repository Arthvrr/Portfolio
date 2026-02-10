// js/auth-guard.js
console.log("📢 Le script auth-guard.js a bien démarré !");

// Protection Cache (Anti-retour)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});

import { auth, onAuthStateChanged, signOut } from './firebase-config.js';

onAuthStateChanged(auth, (user) => {
    // 1. On récupère le bouton
    const loginBtn = document.getElementById('header-auth-btn');

    if (user) {
        // --- CAS : CONNECTÉ ---
        console.log("✅ Connecté :", user.email);
        
        if (loginBtn) {
            // On met à jour le texte AVANT d'afficher
            updateButtonToLoggedState(loginBtn, user);
            // On affiche le bouton proprement
            loginBtn.classList.remove('invisible');
        }

    } else {
        // --- CAS : NON CONNECTÉ ---
        console.log("❌ Non connecté");
        
        // Logique de protection (Redirection)
        const path = window.location.pathname;
        const publicPages = ['index.html', 'login.html', 'calculator.html', 'portfolio.html', '/', 'account.html'];
        const isPublicPage = publicPages.some(page => path.endsWith(page));
        const isAccountPage = path.endsWith('account.html');

        if (!isPublicPage && !isAccountPage) {
             goToLogin(path);
        } else if (isAccountPage) {
             goToLogin(path);
        } else {
            // Si on est sur une page publique, on affiche le bouton "Connexion" d'origine
            if (loginBtn) {
                loginBtn.classList.remove('invisible');
            }
        }
    }
});

// Fonction pour mettre à jour le design du bouton
function updateButtonToLoggedState(btn, user) {
    const pseudo = user.displayName ? user.displayName : user.email.split('@')[0];
    
    // On détermine le lien vers account.html
    const currentPath = window.location.pathname;
    let accountLink = "account.html";
    if (currentPath.includes('/formation/')) {
        accountLink = "../account.html";
    }

    btn.innerHTML = `
        <div class="flex items-center gap-2 group">
            <div class="bg-emerald-700/50 p-1.5 rounded-full group-hover:bg-emerald-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <span class="font-bold text-sm text-white">${pseudo}</span>
        </div>
    `;
    
    btn.href = accountLink;
    btn.classList.remove('bg-slate-900', 'bg-slate-800', 'px-5', 'py-2.5');
    btn.classList.add('px-4', 'py-2', 'bg-slate-900', 'rounded-full', 'hover:bg-slate-800', 'transition-all', 'border', 'border-slate-700'); 
    
    // Nettoyage des clones pour éviter les bugs d'événements
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
}

function goToLogin(currentPath) {
    if (currentPath.includes('/formation/')) {
        window.location.replace("../login.html");
    } else {
        window.location.replace("login.html");
    }
}