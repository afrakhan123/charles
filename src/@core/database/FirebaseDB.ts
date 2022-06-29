import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGBjb65iD10ppAW5RVxvH-Zw-k3hWcYGQ",
  authDomain: "utak-restaurant-tracker.firebaseapp.com",
  projectId: "utak-restaurant-tracker",
  storageBucket: "utak-restaurant-tracker.appspot.com",
  messagingSenderId: "630784651381",
  appId: "1:630784651381:web:11afd9004d7e16f7d0083c",
  measurementId: "G-B7W9JHJC42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseDB = getDatabase(app);
export const db = getFirestore(app);