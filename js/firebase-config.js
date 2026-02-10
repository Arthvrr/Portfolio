// js/firebase-config.js

// 1. Imports officiels
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
// J'ai ajouté updateProfile et updatePassword dans la liste des imports
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

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

// 4. Exports (avec les nouvelles fonctions)
export { auth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, updatePassword };