// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvAIqxbWz6v3YCOrU4al0YNHXHrf0Vavc",
  authDomain: "linkdash-001.firebaseapp.com",
  projectId: "linkdash-001",
  storageBucket: "linkdash-001.appspot.com",
  messagingSenderId: "783096258531",
  appId: "1:783096258531:web:a9da51371f98902e394ad6",
  measurementId: "G-CVF0216L28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);