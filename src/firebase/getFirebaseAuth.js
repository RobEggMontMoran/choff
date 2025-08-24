import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseApp from "./firebaseConfig";

let auth;

if (firebaseApp._auth) {
  auth = getAuth(firebaseApp);
} else {
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export default auth;
