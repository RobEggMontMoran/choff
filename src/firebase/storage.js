import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "./auth";
import firebaseApp from "./firebaseConfig";

// Initialise Firebase Storage and get a reference to the service
const storage = getStorage(firebaseApp);

/**
 * Uploads an image to Firebase Storage and returns its public URL
 * @param {string} uri - The local URI of the image file from the device
 * @returns {Promise<string>} A promise that resolves with the public download URL of the uploaded image
 */
export const uploadImageAndGetDownloadURL = async (uri) => {
  const user = auth.currentUser;
  // Guard clause to ensure a user is authenticated
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  // Convert the local file URI to a binary blob that Firebase can process
  const response = await fetch(uri);
  const blob = await response.blob();

  // Create a unique file path using the user's ID and a timestamp to prevent overwrites
  // This also ensures each user's files are stored in their own folder
  const filePath = `${user.uid}/${Date.now()}.jpg`;
  const storageRef = ref(storage, filePath);

  try {
    // Upload the blob to the specified path in Firebase Storage
    await uploadBytes(storageRef, blob);

    // Retrieve the public, permanent URL for the file just uploaded
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    // Re-throw the error so it can be caught and displayed by the calling screen
    throw error;
  }
};
