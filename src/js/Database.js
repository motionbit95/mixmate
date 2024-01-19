import {
  addDoc,
  collection,
  doc,
  getDoc,
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
  // console.log("doc add! ", docRef.id);

  return docRef.id;
};

/** collection에 이미 생성된 문서에 data field를 추가합니다.
 * @function db_update
 * @param {string} col collection 이름
 * @param {string} doc_id 추가할 문서의 id
 * @param {object} data 추가할 데이터
 */
export const db_update = async (col, doc_id, data) => {
  // Add a new document in collection
  await updateDoc(doc(db, col, doc_id), data);
};

/** 컬렉션에서 여러 문서 가져오기(특정 속성으로 검색해서 리스트를 가지고 올 때 사용)
 * @function get_doc_info
 * @param {string} col collection 이름
 * @param {string} property 검색 속성
 * @param {string} value 검색 값
 * @return {object} property 값이 value 와 일치하는 데이터 반환
 */
export const get_doc_info = async (col, property, value) => {
  const q = query(collection(db, col), where(property, "==", value));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0)
    return {
      ...querySnapshot.docs[0].data(),
      doc_id: querySnapshot.docs[0].id,
    };
  else return null;
};

/** 문서 id로 데이터 가지고 오기
 * @function get_doc_data
 * @param {string} collection collection 이름
 * @param {string} doc_id 문서 id
 * @return {object} 단일 문서의 내용
 */
export const get_doc_data = async (collection, doc_id) => {
  const docRef = doc(db, collection, doc_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  return docSnap.data();
};

/** 조건에 일치하는 모든 문서를 가지고 오기
 * @function get_doc_list
 * @param {string} collection collection 이름
 * @param {string} property 검색 속성
 * @param {string} value 검색 값
 * @return {object} property 값이 value 와 일치하는 데이터 반환
 */
export const get_doc_list = async (collection, property, value) => {
  const q = query(collection(db, collection), where(property, "==", value));
  const querySnapshot = await getDocs(q);

  return querySnapshot;
};
