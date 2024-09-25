// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "real-estate---mern-7c59e.firebaseapp.com",
    projectId: "real-estate---mern-7c59e",
    storageBucket: "real-estate---mern-7c59e.appspot.com",
    messagingSenderId: "516880128157",
    appId: "1:516880128157:web:85d6ef27d049e88bb09c74"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);