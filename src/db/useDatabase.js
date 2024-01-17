import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase_config";

export const addDatabase = async (col, data) => {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, col), data);
  console.log("Document written with ID: ", docRef.id);

  return docRef.id;
};
