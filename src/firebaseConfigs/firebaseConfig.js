// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg9saVh1_K0VY4gvihsRM26Qb9v1ce75Y",
  authDomain: "ecommerce-test-4eeda.firebaseapp.com",
  projectId: "ecommerce-test-4eeda",
  storageBucket: "ecommerce-test-4eeda.appspot.com",
  messagingSenderId: "881173726761",
  appId: "1:881173726761:web:817fc669073a0f82a8be38",
  measurementId: "G-ENDC3E3JTC"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


