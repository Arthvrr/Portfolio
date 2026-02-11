import { auth, db, collection, addDoc, onSnapshot } from './firebase-config.js';

// --- CONFIGURATION LIVE (PRODUCTION) ---
// C'est ton ID de tarif RÉEL (celui qui rapporte de l'argent)
const PRICE_ID_LIVE = "price_1SzILBRyIqCVkpE6tm8pr5j4"; 

console.log("ℹ️ Mode de paiement : LIVE 💸 (Production)");

// --- FONCTION DE PAIEMENT ---
async function startCheckout() {
    const user = auth.currentUser;

    if (!user) {
        console.log("❌ Utilisateur non connecté. Redirection login.");
        window.location.href = "login.html"; 
        return;
    }

    const btn = document.getElementById('btn-buy-297');
    const originalText = btn.innerText;
    btn.innerText = "Chargement Stripe...";
    btn.disabled = true;

    console.log("🚀 Création de la session LIVE pour :", user.email);

    try {
        const collectionRef = collection(db, "users", user.uid, "checkout_sessions");
        
        // On crée la demande avec l'ID LIVE directement
        const docRef = await addDoc(collectionRef, {
            mode: "payment",
            price: PRICE_ID_LIVE, 
            allow_promotion_codes: true,
            success_url: window.location.origin + "/formation.html",
            cancel_url: window.location.origin + "/pricing.html"
        });

        onSnapshot(docRef, (snap) => {
            const data = snap.data();
            if (!data) return;

            if (data.error) {
                console.error("❌ Erreur Stripe :", data.error.message);
                alert(`Erreur : ${data.error.message}`);
                btn.innerText = originalText;
                btn.disabled = false;
            }
            
            if (data.url) {
                console.log("✅ Lien reçu ! Redirection vers :", data.url);
                window.location.assign(data.url);
            }
        });

    } catch (error) {
        console.error("Erreur init :", error);
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// Initialisation
const buyBtn = document.getElementById('btn-buy-297');
if (buyBtn) {
    buyBtn.addEventListener('click', startCheckout);
}