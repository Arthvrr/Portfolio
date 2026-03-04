console.log("🛡️ Auth-Guard : Système de sécurité LIVE");

// --- GESTION DE L'AFFICHAGE ---
const style = document.createElement('style');
style.innerHTML = `body.auth-loading { visibility: hidden; opacity: 0; } body.auth-loaded { visibility: visible; opacity: 1; transition: opacity 0.5s ease-in; }`;
document.head.appendChild(style);
document.body.classList.add('auth-loading');

import { auth, db, doc, getDoc, collection, query, where, getDocs, onAuthStateChanged } from './firebase-config.js';

onAuthStateChanged(auth, async (user) => {
    const loginBtn = document.getElementById('header-auth-btn');
    const currentPath = window.location.pathname;
    
    // 1. Définition des accès
    const isProtectedPage = currentPath.includes('formation');
    const isPublicPage = [
        'index.html', 
        'login.html', 
        'calculator.html', 
        'pricing.html', 
        'moatpicks.html',
        '/'
    ].some(page => currentPath.endsWith(page));

    if (user) {
        // Mise à jour visuelle des boutons (PC et Mobile)
        if (loginBtn) updateButtonToLoggedState(loginBtn, user);

        try {
            console.group(`🔍 Vérification Formation : ${user.email}`);

            // A. Vérification du Paiement Unique (Le dossier 'payments' créé par Stripe)
            const paymentsRef = collection(db, "users", user.uid, "payments");
            const qPayment = query(paymentsRef, where("status", "==", "succeeded"));
            const paymentSnapshot = await getDocs(qPayment);
            const hasPaid = !paymentSnapshot.empty;
            console.log("💰 Paiement Stripe détecté :", hasPaid ? "✅ OUI" : "❌ NON");

            // B. Vérification Manuelle (Le champ 'premium: true' dans Firestore)
            let hasManualAccess = false;
            if (!hasPaid) {
                const userDocRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userDocRef);
                hasManualAccess = userSnap.exists() && userSnap.data().premium === true;
                console.log("🔑 Accès manuel autorisé :", hasManualAccess ? "✅ OUI" : "❌ NON");
            }

            const canAccess = hasPaid || hasManualAccess;
            console.log(canAccess ? "🟢 ACCÈS VALIDÉ" : "🔴 ACCÈS REFUSÉ");
            console.groupEnd();

            // Redirection si l'utilisateur connecté n'a pas payé et tente d'entrer
            if (isProtectedPage && !canAccess) {
                redirectToPricing();
                return;
            }
            revealPage();

        } catch (error) {
            console.error("Erreur sécurité:", error);
            if (isProtectedPage) redirectToLogin(); else revealPage();
        }
    } else {
        // Logique pour les utilisateurs NON CONNECTÉS
        if (isProtectedPage || currentPath.endsWith('account.html')) {
            redirectToLogin();
        } else {
            // Sur les pages publiques (index, pricing, etc.), on montre le bouton Login
            if (loginBtn) loginBtn.classList.remove('invisible');
            revealPage();
        }
    }
});

// --- FONCTIONS UTILITAIRES ---
function revealPage() { 
    document.body.classList.remove('auth-loading'); 
    document.body.classList.add('auth-loaded'); 
}

function redirectToPricing() { 
    const isInSubFolder = window.location.pathname.includes('/formation/');
    window.location.replace(isInSubFolder ? "../pricing.html" : "pricing.html"); 
}

function redirectToLogin() { 
    const isInSubFolder = window.location.pathname.includes('/formation/');
    window.location.replace(isInSubFolder ? "../login.html" : "login.html"); 
}

function updateButtonToLoggedState(btn, user) {
    const pseudo = user.displayName ? user.displayName : user.email.split('@')[0];
    const isInSubFolder = window.location.pathname.includes('/formation/');
    const accountLink = isInSubFolder ? "../account.html" : "account.html";

    // 1. Mise à jour du texte de bienvenue (si présent sur la page)
    const welcomeText = document.getElementById('welcome-username');
    if (welcomeText) {
        welcomeText.innerText = pseudo;
    }
    
    // 2. Mise à jour du bouton PC
    btn.innerHTML = `<div class="flex items-center gap-2 group">
        <div class="bg-emerald-700/50 p-1.5 rounded-full group-hover:bg-emerald-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <span class="font-bold text-sm text-white">${pseudo}</span>
    </div>`;
    
    btn.href = accountLink;
    btn.classList.remove('bg-slate-900', 'bg-slate-800', 'invisible');
    btn.classList.add('px-4', 'py-2', 'bg-slate-900', 'rounded-full', 'hover:bg-slate-800', 'transition-all', 'border', 'border-slate-700'); 
    
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    // 3. NOUVEAU : Mise à jour du bouton Mobile (Menu Hamburger)
    const mobileNavUsername = document.getElementById('mobile-nav-username');
    const mobileAuthBtn = document.getElementById('mobile-auth-btn');
    
    if (mobileNavUsername) {
        // Remplace "Connexion Espace Membre" par le nom de l'utilisateur
        mobileNavUsername.textContent = pseudo; 
    }
    if (mobileAuthBtn) {
        // Redirige vers account.html au lieu de login.html
        mobileAuthBtn.href = accountLink; 
    }
}

const nomChapitre = window.location.pathname.split('/').pop();
// On accepte les formats : "1.4.html", "1.test.html", et "1.cheatsheet.html"
if (/^\d+\.(\d+|test|cheatsheet)\.html$/.test(nomChapitre)) {
    localStorage.setItem('SP_lastChapter', nomChapitre);
}