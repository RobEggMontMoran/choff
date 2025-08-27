import { getFirestore } from "firebase/firestore";
import firebaseApp from "./firebaseConfig";

/**
 * This module initialises and exports the Firestore database instance
 * By centralising the initialisation here, we ensure that a single instance
 * of the database is shared across all service modules in the application
 */
const db = getFirestore(firebaseApp);

export default db;
