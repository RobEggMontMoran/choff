import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "./firestore";
import { auth } from "./auth";

/**
 * Adds a new brew document to Firestore for the current user
 * @param {object} brewData - The brew data object from the form
 * @returns {Promise<void>} A promise that resolves when the document is created
 */
export const addBrew = async (brewData) => {
  const user = auth.currentUser;
  // Guard clause to ensure a user is authenticated
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  try {
    // Construct the new document with user data, a user ID for security, and a server timestamp
    await addDoc(collection(db, "brews"), {
      ...brewData,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving brew to Firestore: ", error);
    // Re-throw the error so it can be caught and displayed by the calling screen
    throw error;
  }
};

/**
 * Fetches all brew documents from Firestore for the current user
 * @returns {Promise<Array>} A Promise that resolves with an array of brew objects
 */
export const getBrews = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  const brews = [];
  // Create a query to get only the documents from the 'brews' collection that match the current user's ID
  try {
    const q = query(collection(db, "brews"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // Combines the document data with its unique Firestore ID
      brews.push({ id: doc.id, ...doc.data() });
    });
    return brews;
  } catch (error) {
    console.error("Error fetching brews from Firestore: ", error);
    throw error;
  }
};

/**
 * Updates an existing brew document in Firestore
 * @param {string} brewId - The ID of the brew document to update
 * @param {object} brewData - The updated brew data from the form
 * @returns {Promise<void>} A Promise that resolves when the update is complete
 */
export const updateBrew = async (brewId, brewData) => {
  try {
    const brewRef = doc(db, "brews", brewId);
    await updateDoc(brewRef, brewData);
  } catch (error) {
    console.error("Error updating brew: ", error);
    throw error;
  }
};

/**
 * Deletes a brew document from Firestore
 * @param {string} brewId - The ID of the brew document to delete
 * @returns {Promise<void>} A Promise that resolves when the document is deleted
 */
export const deleteBrew = async (brewId) => {
  try {
    await deleteDoc(doc(db, "brews", brewId));
  } catch (error) {
    console.error("Error deleting brew: ", error);
    throw error;
  }
};
