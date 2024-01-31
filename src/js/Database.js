import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../db/firebase_config";
import { calculateDistance } from "./UserAPI";
import { checkNull } from "./API";

/**
 * @namespace DB
 */

/** firebase에 문서를 생성하여 data field를 저장합니다.
 * @function db_add
 * @memberof DB
 * @param {string} col collection 이름
 * @param {object} data 추가할 데이터
 * @returns {string} 추가된 document의 id
 */
export const db_add = async (col, data) => {
  console.log(col, " 추가");
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, col), {
    ...data,
    timestamp: serverTimestamp(),
  });
  // console.log("doc add! ", docRef.id);

  return docRef.id;
};

/** firebase에 문서 이름을 지정하여 data field를 저장합니다.
 * @function db_set
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} doc_id doc_id
 * @param {object} data 추가할 데이터
 */
export const db_set = async (col, doc_id, data) => {
  console.log(col, " 추가");
  // 데이터 id 지정해서 추가
  await setDoc(doc(db, col, doc_id), data);
};

/** collection에 이미 생성된 문서에 data field를 추가합니다.
 * @function db_update
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} doc_id 추가할 문서의 id
 * @param {object} data 추가할 데이터
 */
export const db_update = async (col, doc_id, data) => {
  // Add a new document in collection
  await updateDoc(doc(db, col, doc_id), data);
};

/** collection 내 특정 문서 삭제
 * @function db_delete
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} doc_id 문서 id
 */

export const db_delete = async (col, doc_id) => {
  console.log(col, " 삭제");
  await deleteDoc(doc(db, col, doc_id));
};

/** 컬렉션에서 여러 문서 가져오기(특정 속성으로 검색해서 리스트를 가지고 올 때 사용)
 * @function get_doc_all
 * @memberof DB
 * @param {string} col collection 이름
 * @return {object} property 값이 value 와 일치하는 데이터 반환
 */
export const get_doc_all = async (col) => {
  console.log(col, " 모두 조회");
  const q = query(collection(db, col));
  const querySnapshot = await getDocs(q);

  const doc_list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    doc_list.push({ ...doc.data(), doc_id: doc.id });
  });
  return doc_list;
};

/** 문서 id로 데이터 가지고 오기
 * @function get_doc_data
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} doc_id 문서 id
 * @return {object} 단일 문서의 내용
 */
export const get_doc_data = async (col, doc_id) => {
  console.log(col, " 조회");
  const docRef = doc(db, col, doc_id);
  const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", { ...docSnap.data(), doc_id: doc.id });
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  return docSnap.data();
};

/** 조건에 일치하는 모든 문서를 가지고 오기
 * @function get_doc_list
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} property 검색 속성
 * @param {string} value 검색 값
 * @return {object} property 값이 value 와 일치하는 데이터 반환
 */
export const get_doc_list = async (col, property, value) => {
  console.log("[", col.toUpperCase(), "]", property, "조회");
  // console.log(col, property, value, "조회");
  const q = query(collection(db, col), where(property, "==", value));
  const querySnapshot = await getDocs(q);

  const doc_list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    doc_list.push({ ...doc.data(), doc_id: doc.id });
  });

  return doc_list;
};

/** 거리순 정렬
 * @function arrange_distance
 * @memberof DB
 * @param {object} user_location 유저 위치
 * @param {string} user_type 유저 타입
 * @return {Array} 거리순 정렬을 한 목록 반환
 */
export async function arrange_distance(user_location, user_type) {
  // 현재 위치 좌표 (예시)
  const currentLocation = user_location;

  const q = query(collection(db, "user"));

  console.log(auth.currentUser.uid);

  const _q = query(collection(db, "user"), where("user_type", "==", user_type));
  const querySnapshot = await getDocs(user_type === "all" ? q : _q);
  const places = [];
  // Firestore에서 데이터 가져오기 및 거리순 정렬
  querySnapshot.forEach((doc) => {
    if (auth.currentUser.uid !== doc.data().user_id) {
      const place = checkNull(doc.data().user_location, {
        latitude: 37.5664056,
        longitude: 126.9778222,
      });
      // 각 문서의 위치 정보와 현재 위치를 기반으로 거리 계산
      place.distance = calculateDistance(currentLocation, {
        latitude: place.latitude,
        longitude: place.longitude,
      });
      places.push({ ...doc.data(), ...place });
    }
  });

  // 거리순으로 정렬
  places.sort((a, b) => a.distance - b.distance);

  return places;
}

/** 랜덤 정렬
 * @function arrange_distance
 * @memberof DB
 * @param {string} user_location 유저 위치
 * @param {string} user_location 유저의 행정동
 * @param {string} user_type 유저 타입
 * @return {Array} 거리순 정렬을 한 목록 반환
 */
export async function arrange_random(user_location, user_dong, user_type) {
  // 현재 위치 좌표 (예시)
  const currentLocation = user_location;
  const dong = user_dong;

  const q = query(
    collection(db, "user"),
    // where("dong", "==", dong),
    where("user_type", "==", user_type)
  );
  const querySnapshot = await getDocs(q);
  const places = [];
  // Firestore에서 데이터 가져오기 및 거리순 정렬
  querySnapshot.forEach((doc) => {
    if (auth.currentUser.uid !== doc.data().user_id) {
      const place = doc.data().user_location;
      if (!place) return;
      // 각 문서의 위치 정보와 현재 위치를 기반으로 거리 계산
      place.distance = calculateDistance(currentLocation, {
        latitude: place.latitude,
        longitude: place.longitude,
      });
      places.push({ ...doc.data(), ...place });
    }
  });

  // Fisher-Yates 알고리즘 사용
  for (let i = places.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // 배열의 요소를 서로 교환
    [places[i], places[j]] = [places[j], places[i]];
  }

  return places;
}
