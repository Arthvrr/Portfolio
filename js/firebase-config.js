// js/firebase-config.js

// 1. Imports officiels
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// --- NOUVEAU : Imports pour la Base de Données (Firestore) ---
// C'est indispensable pour que auth-guard.js puisse vérifier le statut "premium"
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 2. Ta configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzBR4vZcQQy8TV6uAfBeTIpvuFB-cj9qY",
  authDomain: "stockspickeur-formation.firebaseapp.com",
  projectId: "stockspickeur-formation",
  storageBucket: "stockspickeur-formation.firebasestorage.app",
  messagingSenderId: "1077726219730",
  appId: "1:1077726219730:web:4ab8adb0d00b4d9e4fcc0b",
  measurementId: "G-4GCEB7CTGM"
};

// 3. Initialisation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // <--- On initialise la DB ici

// 4. Exports
// On exporte db, doc, getDoc et setDoc pour les utiliser ailleurs (login, auth-guard, etc.)
export { auth, db, doc, getDoc, setDoc, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword };