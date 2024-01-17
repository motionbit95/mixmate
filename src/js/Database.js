import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../db/firebase_config";

/** firebase에 문서를 생성하여 data field를 저장합니다.
 * @function db_add
 * @param {string} col collection 이름
 * @param {object} data 추가할 데이터
 * @returns {string} 추가된 document의 id
 */
export const db_add = async (col, data) => {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, col), {
    ...data,
    timestamp: serverTimestamp(),
  });
  console.log("doc add! ", docRef.id);

  return docRef.id;
};

/** collection에 이미 생성된 문서에 data field를 추가합니다.
 * @function db_update
 * @param {string} col collection 이름
 * @param {string} doc_id 추가할 문서의 id
 * @param {object} data 추가할 데이터
 */
export const db_update = async (col, doc_id, data) => {
  // Add a new document in collection "cities"
  await updateDoc(doc(db, col, doc_id), data);
};
