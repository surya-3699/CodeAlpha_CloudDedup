import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZAxiWf9A5G90kO1hl_r0NTW-5_UnBRC8",
  authDomain: "clouddedup-e4e48.firebaseapp.com",
  projectId: "clouddedup-e4e48",
  storageBucket: "clouddedup-e4e48.firebasestorage.app",
  messagingSenderId: "430996515297",
  appId: "1:430996515297:web:3b517ba22eda22bfb5caa0",
  measurementId: "G-W7H94NQQZ1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);