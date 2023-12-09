// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sociosphere-2c6f4.firebaseapp.com",
  projectId: "sociosphere-2c6f4",
  storageBucket: "sociosphere-2c6f4.appspot.com",
  messagingSenderId: "947578635328",
  appId: "1:947578635328:web:2745b439253422b4490ba5",
  measurementId: "G-9Z5F62BFSD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
