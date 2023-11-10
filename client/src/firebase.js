// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2e374.firebaseapp.com",
  projectId: "mern-estate-2e374",
  storageBucket: "mern-estate-2e374.appspot.com",
  messagingSenderId: "970030470894",
  appId: "1:970030470894:web:3720110d43c6b8398fc5ff"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);