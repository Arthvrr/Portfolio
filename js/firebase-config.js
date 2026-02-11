// js/firebase-config.js

// 1. Imports officiels (APP)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

// 2. Imports pour l'AUTHENTIFICATION (Login, Inscription, etc.)
// J'ai retiré addDoc et onSnapshot d'ici car ils n'ont rien à faire dans l'auth
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    updatePassword
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// 3. Imports pour la BASE DE DONNÉES (Firestore)
// C'est ICI qu'on ajoute addDoc et onSnapshot pour le paiement
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    query, 
    where, 
    getDocs,
    addDoc,       // <--- INDISPENSABLE pour créer la session de paiement
    onSnapshot    // <--- INDISPENSABLE pour écouter la réponse de Stripe
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 4. Ta configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzBR4vZcQQy8TV6uAfBeTIpvuFB-cj9qY",
  authDomain: "stockspickeur-formation.firebaseapp.com",
  projectId: "stockspickeur-formation",
  storageBucket: "stockspickeur-formation.firebasestorage.app",
  messagingSenderId: "1077726219730",
  appId: "1:1077726219730:web:4ab8adb0d00b4d9e4fcc0b",
  measurementId: "G-4GCEB7CTGM"
};

// 5. Initialisation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 6. Exports
// On exporte TOUT pour que tes autres fichiers (auth-guard.js, checkout.js, etc.) puissent les utiliser
export { 
    // Les instances
    auth, 
    db, 
    
    // Outils Firestore
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    query, 
    where, 
    getDocs, 
    addDoc,       // <--- Exporté pour checkout.js
    onSnapshot,   // <--- Exporté pour checkout.js
    
    // Outils Auth
    onAuthStateChanged, 
    signOut, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    updatePassword 
};