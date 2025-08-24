import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
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

// Password reset
export const sendPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export { auth };
