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
 * Adds a new BREW document to Firestore for the current user
 * @param {object} brewData - The brew data object from the form
 * @returns {Promise<void>} A promise that resolves when the document is created
 */
export const addBrew = async (brewData) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  try {
    // Add a new document to the 'brews' collection
    await addDoc(collection(db, "brews"), {
      ...brewData,
      userId: user.uid, // Tags the brew with the user's ID
      createdAt: serverTimestamp(), // Adds a timestamp
    });
    console.log("Brew successfully saved to Firestore!");
  } catch (error) {
    console.error("Error saving brew to Firestore: ", error);
    throw error;
  }
};

/**
 * Fetches all brew documents from Firestore for the current user
 * @returns {Promise<Array>} A promise that resolves with an array of brew objects
 */
export const getBrews = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  const brews = [];
  try {
    const q = query(collection(db, "brews"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      brews.push({ id: doc.id, ...doc.data() });
    });

    console.log("Brews successfully fetched!");
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
 * @returns {Promise<void>}
 */
export const updateBrew = async (brewId, brewData) => {
  try {
    const brewRef = doc(db, "brews", brewId);
    await updateDoc(brewRef, brewData);
    console.log("Brew successfully updated!");
  } catch (error) {
    console.error("Error updating brew: ", error);
    throw error;
  }
};

/**
 * Deletes a brew document from Firestore
 * @param {string} brewId - The ID of the brew document to delete
 * @returns {Promise<void>}
 */
export const deleteBrew = async (brewId) => {
  try {
    await deleteDoc(doc(db, "brews", brewId));
    console.log("Brew successfully deleted!");
  } catch (error) {
    console.error("Error deleting brew: ", error);
    throw error;
  }
};
