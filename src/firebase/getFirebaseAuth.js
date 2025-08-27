import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseApp from "./firebaseConfig";

/**
 * This module safely initialises the Firebase Auth service
 * It solves a common hot-reloading issue in development where the app would crash
 * with an 'auth/already-initialised' error by checking if an auth instance
 * already exists before creating a new one
 * It also configures authentication to persist using AsyncStorage
 */

let auth;

// Checks if the auth service has already been initialised on the firebaseApp instance
if (firebaseApp._auth) {
  // If it has, retrieve the existing instance
  auth = getAuth(firebaseApp);
} else {
  // Otherwise, initialise it for the first time with persistence
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export default auth;
