// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS3cwkrHPCg6lnfYmalncu_BpFnSyJalU",
  authDomain: "chat-app-4d5d6.firebaseapp.com",
  projectId: "chat-app-4d5d6",
  storageBucket: "chat-app-4d5d6.appspot.com",
  messagingSenderId: "70653429270",
  appId: "1:70653429270:web:dc3e2db694ffa6c61f9737",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
