import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import auth from "./getFirebaseAuth";

/**
 * Registers a new user with their email and password
 * @param {string} email - The user's email address
 * @param {string} password - The user's chosen password
 * @returns {Promise} A Promise that resolves with the user credential on success
 */
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Signs in an existing user with their email and password
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise} A Promise that resolves with the user credential on success
 */
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Signs out the currently authenticated user
 * @returns {Promise} A Promise that resolves when the sign-out is complete
 */
export const logoutUser = () => {
  return signOut(auth);
};

/**
 * Sets up a real-time listener for authentication state changes
 * This is used to automatically update the UI when a user signs in or out
 * @param {function} callback - The function to call when the auth state changes
 * @returns {function} An unsubscribe function to clean up the listener
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Sends a password reset email to the provided address
 * @param {string} email - The email address to send the reset link to
 * @returns {Promise} A Promise that resolves when the email is sent
 */
export const sendPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export { auth };
