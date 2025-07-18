import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseApp from "./firebaseConfig";

// // Prevent reinitialisation during fast refresh
// let auth;

// try {
//   auth = getAuth(firebaseApp);
// } catch {
//   auth = initializeAuth(firebaseApp, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// }

// export default auth;

// Prevent reinitialisation during fast refresh
let auth;

if (firebaseApp._auth) {
  auth = getAuth(firebaseApp);
} else {
  auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export default auth;
