import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Use environment variables from .env file
const firebaseConfig = {
  apiKey: "AIzaSyD15L8BDFYZWKPgIYm-4E-ASurmp8Z0KdE",
  authDomain: "mealdb-e6d74.firebaseapp.com",
  projectId: "mealdb-e6d74",
  storageBucket: "mealdb-e6d74.firebasestorage.app",
  messagingSenderId: "135847057259",
  appId: "1:135847057259:web:2dcab018681a45fffd1e2e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);