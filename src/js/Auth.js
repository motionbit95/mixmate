import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../db/firebase_config";

// Firebase deps
// v9에서 v8 호환 API
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigation } from "react-router-dom";
import { defaultUser } from "../db/dummy";
import { db_add, db_set } from "./Database";
import { doc, setDoc } from "firebase/firestore";

// firebase 초기화
firebase.initializeApp({
  apiKey: "AIzaSyBwCYJaEn1Ey5rU8Le5Adu_JvdJodQAOe8",
  authDomain: "dinnermate-8d37b.firebaseapp.com",
  projectId: "dinnermate-8d37b",
  storageBucket: "dinnermate-8d37b.appspot.com",
  messagingSenderId: "698586027961",
  appId: "1:698586027961:web:bfacf1423d3c895397c868",
  measurementId: "G-YJSWYJ83RK",
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
  let uid = "";
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      uid = user.uid;
      // ...
    })
    .catch(async (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);

      if (errorCode == "auth/invalid-email") {
        err_msg = "이메일 형식 틀림";
      }
      // if (errorCode == "auth/user-not-found") {
      //   err_msg("없는 아이디");
      // }
      if (errorCode == "auth/wrong-password") {
        err_msg = "비밀번호를 다시 확인해주세요";
      }
      if (errorCode == "auth/too-many-requests") {
        err_msg = "잠시 후 다시 시도해 주세요";
      }
      if (errorCode == "auth/too-many-requests") {
        err_msg = "잠시 후 다시 시도해 주세요";
      }
      if (errorCode == "auth/already-in-use") {
        err_msg = "이미 존재하는 아이디입니다.";
      }
    });

  return { err_msg, uid };
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
      uid = user?.uid;
      // ...
    })
    .catch(async (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
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
  } catch (error) {
    console.log(error.message);
  }
};

export const importDefaultUser = () => {
  defaultUser.map(async (value, index) => {
    // 계정생성
    let result = await signUpPassword(value.user_email, value.user_password);
    if (result.err_msg === "") {
      // 계정 생성에 성공했을 경우
      console.log("계정 생성 성공!");
    } else {
      // 이미 계정이 있을 경우
      console.log("이미 있는 계정! ");
    }
  });
};
