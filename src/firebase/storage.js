import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "./auth";
import firebaseApp from "./firebaseConfig";

const storage = getStorage(firebaseApp);

/**
 * Uploads an image to a user-specific folder in Firebase Storage and returns its public URL
 * @param {string} uri - The local URI of the image file from the device
 * @returns {Promise<string>} A promise that resolves with the public download URL of the uploaded image
 */
export const uploadImageAndGetDownloadURL = async (uri) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("No user is currently logged in.");
  }

  // Converts the local file URI to a blob that Firebase can upload
  const response = await fetch(uri);
  const blob = await response.blob();

  // Creates a unique file path for the image to prevent overwrites
  const filePath = `${user.uid}/${Date.now()}.jpg`;
  const storageRef = ref(storage, filePath);

  try {
    // Uploads the blob to the specified path
    await uploadBytes(storageRef, blob);

    // Gets the public URL of the file we just uploaded
    const downloadURL = await getDownloadURL(storageRef);

    console.log("Image uploaded! URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};
