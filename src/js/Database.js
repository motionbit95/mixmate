import { addDoc, collection } from "firebase/firestore";
import { db } from "../db/firebase_config";

/** firebase에 문서를 생성하여 data field를 저장한다.
 * @function db_add
 * @param {string} col collection 이름
 * @param {object} data 추가할 데이터
 * @returns {string} 추가된 document의 id
 */
export const db_add = async (col, data) => {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, col), data);
  console.log("Document written with ID: ", docRef.id);

  return docRef.id;
};
