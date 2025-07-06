// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNnsrWc7YvCXhHR9VlijGDay5JROSHYjg",
  authDomain: "blog-website-82c1e.firebaseapp.com",
  projectId: "blog-website-82c1e",
  storageBucket: "blog-website-82c1e.firebasestorage.app",
  messagingSenderId: "563187444956",
  appId: "1:563187444956:web:242d615d62bff0fb145819",
  measurementId: "G-L64Z84YY9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider, signInWithPopup };