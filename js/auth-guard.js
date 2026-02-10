// js/auth-guard.js
console.log("🛡️ Auth-Guard : Vérification des droits en cours...");

// --- 1. ANTI-FLASH SYSTEM ---
// On cache le corps de la page immédiatement pour éviter que les non-payeurs voient le contenu furtivement
const style = document.createElement('style');
style.innerHTML = `
    body.auth-loading { visibility: hidden; opacity: 0; }
    body.auth-loaded { visibility: visible; opacity: 1; transition: opacity 0.5s ease-in; }
`;
document.head.appendChild(style);
document.body.classList.add('auth-loading');


// --- 2. IMPORTS ---
import { auth, db, doc, getDoc, onAuthStateChanged } from './firebase-config.js';

// --- 3. LOGIQUE DE PROTECTION ---
onAuthStateChanged(auth, async (user) => {
    const loginBtn = document.getElementById('header-auth-btn');
    const currentPath = window.location.pathname;

    // Est-ce une page protégée ? (Toutes les pages contenant "formation")
    // Note : formation.html ET formation/module1.html sont concernés
    const isProtectedPage = currentPath.includes('formation');
    
    // Est-ce une page publique (Accueil, Login, Pricing...) ?
    // account.html est "semi-privé" (accessible connecté mais pas forcément payant)
    const isPublicPage = ['index.html', 'login.html', 'calculator.html', 'pricing.html', '/', 'moatpicks.html'].some(page => currentPath.endsWith(page));


    if (user) {
        // --- UTILISATEUR CONNECTÉ ---
        console.log("✅ Connecté :", user.email);

        // A. Mise à jour du bouton Header (Cosmétique)
        if (loginBtn) updateButtonToLoggedState(loginBtn, user);

        // B. Vérification du statut PREMIUM dans la Database
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);
            
            // On regarde si la case "premium" est cochée dans la base de données
            const isPremium = userSnap.exists() && userSnap.data().premium === true;
            console.log("💳 Statut Premium :", isPremium);

            if (isProtectedPage && !isPremium) {
                // IL EST CONNECTÉ MAIS N'A PAS PAYÉ ET VEUT VOIR LA FORMATION
                console.warn("⛔️ Accès refusé : Contenu payant.");
                redirectToPricing();
                return; // On arrête tout ici
            }

            // Si on arrive là, c'est qu'il a le droit (soit page publique, soit il est premium)
            revealPage();

        } catch (error) {
            console.error("Erreur lecture DB:", error);
            // En cas d'erreur technique, par sécurité sur une page protégée, on redirige
            if (isProtectedPage) redirectToLogin();
            else revealPage();
        }

    } else {
        // --- UTILISATEUR NON CONNECTÉ ---
        console.log("❌ Non connecté");

        if (isProtectedPage || currentPath.endsWith('account.html')) {
            // IL VEUT VOIR LA FORMATION OU SON COMPTE SANS ÊTRE CONNECTÉ
            console.warn("⛔️ Accès refusé : Veuillez vous connecter.");
            redirectToLogin();
        } else {
            // C'est une page publique (Accueil, Pricing...), on laisse passer
            if (loginBtn) loginBtn.classList.remove('invisible');
            revealPage();
        }
    }
});


// --- 4. FONCTIONS UTILITAIRES ---

// Affiche la page une fois la vérification terminée
function revealPage() {
    document.body.classList.remove('auth-loading');
    document.body.classList.add('auth-loaded');
}

// Redirige vers la page de vente
function redirectToPricing() {
    const isInSubFolder = window.location.pathname.includes('/formation/');
    window.location.replace(isInSubFolder ? "../pricing.html" : "pricing.html");
}

// Redirige vers la connexion
function redirectToLogin() {
    const isInSubFolder = window.location.pathname.includes('/formation/');
    window.location.replace(isInSubFolder ? "../login.html" : "login.html");
}

// Met à jour le bouton du menu
function updateButtonToLoggedState(btn, user) {
    const pseudo = user.displayName ? user.displayName : user.email.split('@')[0];
    const isInSubFolder = window.location.pathname.includes('/formation/');
    const accountLink = isInSubFolder ? "../account.html" : "account.html";

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
    btn.classList.remove('bg-slate-900', 'bg-slate-800', 'invisible');
    btn.classList.add('px-4', 'py-2', 'bg-slate-900', 'rounded-full', 'hover:bg-slate-800', 'transition-all', 'border', 'border-slate-700'); 
    
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
}