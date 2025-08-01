import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "./firestore";
import { auth } from "./auth";

/**
 * Adds a new BREW document to Firestore for the current user.
 * @param {object} brewData - The brew data object from the form.
 * @returns {Promise<void>} A promise that resolves when the document is created.
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
