import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC-OtSvSLnJ22GSxq2eA_qODWPGYcXNt2U",
  authDomain: "recipe-88b03.firebaseapp.com",
  projectId: "recipe-88b03",
  storageBucket: "recipe-88b03.firebasestorage.app",
  messagingSenderId: "506877206098",
  appId: "1:506877206098:web:60248ed6511e3a8800c98b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);