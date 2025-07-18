// // Original imports before getFirebaseAuth file was created
// // import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   initializeAuth,
//   getReactNativePersistence,
//   getAuth,
// } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import firebaseApp from "./firebaseConfig";

// // Method 3
// // Only initialize once, even on Fast Refresh
// let auth;
// if (firebaseApp._auth) {
//   auth = getAuth(firebaseApp);
// } else {
//   auth = initializeAuth(firebaseApp, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// }

// // Method 2
// const auth = initializeAuth(firebaseApp, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// // Method 1
// // comment
// let auth;

// try {
//   auth = getAuth(firebaseApp); //
// } catch {
//   auth = initializeAuth(firebaseApp, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// }

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import auth from "./getFirebaseAuth";

// Sign up new user with email + password
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Log in existing user
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Log out current user
export const logoutUser = () => {
  return signOut(auth);
};

// Listen to auth state changes (eg. for auto-login)
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };
