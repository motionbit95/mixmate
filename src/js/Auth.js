import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../db/firebase_config";
import { db_update } from "./Database";

// Firebase deps
// v9에서 v8 호환 API
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBwCYJaEn1Ey5rU8Le5Adu_JvdJodQAOe8",
  authDomain: "dinnermate-8d37b.firebaseapp.com",
  projectId: "dinnermate-8d37b",
  storageBucket: "dinnermate-8d37b.appspot.com",
  messagingSenderId: "698586027961",
  appId: "1:698586027961:web:bfacf1423d3c895397c868",
  measurementId: "G-YJSWYJ83RK",
});

/** 비밀번호 기반 계정 만들기
 * @function auth_signup_password
 * @param {string} email 유저 이메일
 * @param {string} password 유저 패스워드
 * @returns {string} 에러 메세지
 */
export const auth_signup_password = async (email, password) => {
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

      if (errorMessage.includes("already-in-use"))
        err_msg = "이미 존재하는 이메일입니다.";
      // ..
    });

  return err_msg;
};

/** 이메일 주소와 비밀번호로 사용자 로그인
 * @function auth_login_password
 * @param {string} email 유저 이메일
 * @param {string} password 유저 패스워드
 * @returns {string} 유저 uid
 */
export const auth_login_password = async (email, password) => {
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

export const signInWithGoogle = async () => {
  // Retrieve Google provider object
  const provider = new firebase.auth.GoogleAuthProvider();
  // Set language to the default browser preference
  firebase.auth().useDeviceLanguage();
  // Start sign in process

  try {
    await firebase.auth().signInWithPopup(provider);
  } catch (error) {
    console.log(error.message);
  }
};

/** 인증 상태 지속성 수정
 * @function auth_set_local
 */

export const auth_set_local = () => {
  setPersistence(auth, browserLocalPersistence);
};

/** 인증 상태 지속성 수정
 * @function auth_set_session
 */

export const auth_set_session = () => {
  setPersistence(auth, browserSessionPersistence);
};

export const sign_out = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.log(error.message);
  }
};
