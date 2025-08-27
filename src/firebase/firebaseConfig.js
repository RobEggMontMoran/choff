import { initializeApp } from "firebase/app";

/**
 * This file contains the application's Firebase configuration object
 * and initialises the connection to the Firebase project
 * The configuration is hardcoded as per Firebase's official recommendation
 * for client-side applications, where security is managed by server-side
 * security rules rather than by obscuring the client API key
 */
const firebaseConfig = {
  apiKey: "AIzaSyAgrxmz6ZeRBXD_LqevU3Kw9vjakOMyCz4",
  authDomain: "choff-coffee-app.firebaseapp.com",
  projectId: "choff-coffee-app",
  storageBucket: "choff-coffee-app.firebasestorage.app",
  messagingSenderId: "707154911589",
  appId: "1:707154911589:web:ab30baecd3e6abfe16418c",
  measurementId: "G-74Z7NN438G",
};

// Initialise the Firebase app with the configuration object
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
