// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALt3EqQXacrrGaz2CFVrZy5NDI23bCFU0",
  authDomain: "fir-twitter-c423c.firebaseapp.com",
  projectId: "fir-twitter-c423c",
  storageBucket: "fir-twitter-c423c.appspot.com",
  messagingSenderId: "567603053588",
  appId: "1:567603053588:web:82b37d8342fc2e88c09301"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirme kurulumu
export const auth = getAuth(app);

// google sağlayıcı kurulumu

export const googleProvider = new GoogleAuthProvider();

// github sağlayıcı kurulumu
export const githubProvider = new GithubAuthProvider();

// Veritabanı kurulumu
export const db =getFirestore(app);

// Medya depolama alanı kurulumu
export const storage = getStorage(app);