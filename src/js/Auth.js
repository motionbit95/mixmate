import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../db/firebase_config";

// Firebase deps
// v9에서 v8 호환 API
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// firebase 초기화
firebase.initializeApp({
  apiKey: "AIzaSyA6_ETeOdnsf9rI_OGZ9vyg2TYQ1jxRBA8",
  authDomain: "dinnermate-database.firebaseapp.com",
  databaseURL:
    "https://dinnermate-database-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dinnermate-database",
  storageBucket: "dinnermate-database.appspot.com",
  messagingSenderId: "266027037200",
  appId: "1:266027037200:web:8c09ec93d5e28965ddd095",
  measurementId: "G-SST92XMXJH",
});

/**
 * @namespace Auth
 */

/** 비밀번호 기반 계정 만들기
 * @function signUpPassword
 * @memberof Auth
 * @param {string} email 유저 이메일
 * @param {string} password 유저 패스워드
 * @returns {string} 에러 메세지
 */
export async function signUpPassword(email, password) {
  let err_msg = "";
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // 동일한 이메일로는 가입할 수 없습니다.
      if (errorMessage.includes("already-in-use"))
        err_msg = "이미 존재하는 이메일입니다.";
      // ..
    });

  return err_msg;
}

/** 이메일 주소와 비밀번호로 사용자 로그인
 * @function signInPassword
 * @memberof Auth
 * @param {string} email 유저 이메일
 * @param {string} password 유저 패스워드
 * @returns {string} 유저 uid
 */
export const signInPassword = async (email, password) => {
  let uid = "";
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      uid = user.uid;
      // ...
    })
    .catch(async (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // 에러메세지 출력
      console.log(errorMessage);
    });

  return uid;
};

/** 구글 로그인
 * @function signInGoogle
 * @memberof Auth
 * @returns {boolean} 로그인 성공 여부
 */
export const signInGoogle = async () => {
  // Retrieve Google provider object
  const provider = new firebase.auth.GoogleAuthProvider();
  // Set language to the default browser preference
  firebase.auth().useDeviceLanguage();
  // Start sign in process

  try {
    await firebase.auth().signInWithPopup(provider);
    return true;
  } catch (error) {
    if (error.code == "auth/popup-blocked") {
      alert("팝업 차단을 해제해주세요!");
    }
    return false;
  }
};

/** 로그아웃
 * @function logout
 * @memberof Auth
 */
export const logout = async () => {
  try {
    await firebase.auth().signOut();
    console.log("로그아웃");
  } catch (error) {
    console.log(error.message);
  }
};
