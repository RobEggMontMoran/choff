import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "./firestore";
import { auth } from "./auth";

/**
 * Adds a new bean document to Firestore for the current user.
 * @param {object} beanData - The bean data object from the form.
 * @returns {Promise<void>} A promise that resolves when the document is created.
 */

export const addBean = async (beanData) => {
  const user = auth.currentUser;
  if (!user) {
    // safeguard
    throw new Error("No user is currently logged in.");
  }

  try {
    // 'addDoc' - creates a new document with a unique ID
    await addDoc(collection(db, "beans"), {
      ...beanData, // The data from the BeanEntryScreen form
      userId: user.uid, // Tag the document with the user's ID
      createdAt: serverTimestamp(), // Add a timestamp
    });
    console.log("Bean successfully saved to Firestore!");
  } catch (error) {
    console.error("Error saving bean to Firestore: ", error);
    // Re-throw the error to screen as an alert
    throw error;
  }
};
