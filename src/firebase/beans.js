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
 * Adds a new bean document to Firestore for the current user
 * @param {object} beanData - The bean data object from the form
 * @returns {Promise<void>} A promise that resolves when the document is created
 */

export const addBean = async (beanData) => {
  const user = auth.currentUser;
  // Guard clause to ensure a user is authenticated
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  try {
    // Construct the new document with user data, a user ID for security, and a server timestamp
    await addDoc(collection(db, "beans"), {
      ...beanData,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
    console.log("Bean successfully saved to Firestore!");
  } catch (error) {
    console.error("Error saving bean to Firestore: ", error);
    // Re-throw the error so it can be caught and displayed by the calling screen
    throw error;
  }
};

/**
 * Fetches all bean documents from Firestore for the current user
 * @returns {Promise<Array>} A promise that resolves with an array of bean objects
 */
export const getBeans = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  const beans = [];
  try {
    // Create a query to get only the documents from the 'beans' collection that match the current user's ID
    const q = query(collection(db, "beans"), where("userId", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // Combines the document data with its unique Firestore ID
      beans.push({ id: doc.id, ...doc.data() });
    });

    console.log("Beans successfully fetched!");
    return beans;
  } catch (error) {
    console.error("Error fetching beans from Firestore: ", error);
    throw error;
  }
};

/**
 * Updates an existing bean document in Firestore
 * @param {string} beanId - The ID of the bean document to update
 * @param {object} beanData - The updated bean data from the form
 * @returns {Promise<void>} A Promise that resolves when the update is complete
 */
export const updateBean = async (beanId, beanData) => {
  try {
    const beanRef = doc(db, "beans", beanId);
    await updateDoc(beanRef, beanData);
    console.log("Bean successfully updated!");
  } catch (error) {
    console.error("Error updating bean: ", error);
    throw error;
  }
};

/**
 * Deletes a bean document from Firestore
 * @param {string} beanId - The ID of the bean document to delete
 * @returns {Promise<void>} A Promise that resolves when the document is deleted
 */
export const deleteBean = async (beanId) => {
  try {
    await deleteDoc(doc(db, "beans", beanId));
    console.log("Bean successfully deleted!");
  } catch (error) {
    console.error("Error deleting bean: ", error);
    throw error;
  }
};
