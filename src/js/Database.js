import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
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

/** 컬렉션에서 여러 문서 가져오기
 * @function get_doc_info
 * @param {string} col collection 이름
 * @param {string} property 검색 속성
 * @param {string} value 검색 값
 * @return {object} property 값이 value 와 일치하는 데이터 반환
 */
export const get_doc_info = async (col, property, value) => {
  console.log(col, property, value);
  const q = query(collection(db, col), where(property, "==", value));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) return querySnapshot.docs[0].data();
  else return null;
};
