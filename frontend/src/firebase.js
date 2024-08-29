// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-ni3oFm3_xaZXylmhTWVp9KqWegl8abY",
  authDomain: "aj-eats.firebaseapp.com",
  projectId: "aj-eats",
  storageBucket: "aj-eats.appspot.com",
  messagingSenderId: "1040090794160",
  appId: "1:1040090794160:web:5a1d541069b48f7b191375",
  measurementId: "G-VGTT2CEF97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Initialize Firebase Auth
