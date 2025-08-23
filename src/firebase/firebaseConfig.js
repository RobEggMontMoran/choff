// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgrxmz6ZeRBXD_LqevU3Kw9vjakOMyCz4",
  authDomain: "choff-coffee-app.firebaseapp.com",
  projectId: "choff-coffee-app",
  storageBucket: "choff-coffee-app.firebasestorage.app",
  messagingSenderId: "707154911589",
  appId: "1:707154911589:web:ab30baecd3e6abfe16418c",
  measurementId: "G-74Z7NN438G",
};

// --- START DIAGNOSTIC LOGGING ---
console.log("--- Firebase Config Debug ---");
console.log("Initializing Firebase with hardcoded config.");
console.log("API Key being used:", firebaseConfig.apiKey);
console.log("---------------------------");
// --- END DIAGNOSTIC LOGGING ---

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
