// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwCYJaEn1Ey5rU8Le5Adu_JvdJodQAOe8",
  authDomain: "dinnermate-8d37b.firebaseapp.com",
  projectId: "dinnermate-8d37b",
  storageBucket: "dinnermate-8d37b.appspot.com",
  messagingSenderId: "698586027961",
  appId: "1:698586027961:web:bfacf1423d3c895397c868",
  measurementId: "G-YJSWYJ83RK",
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA6_ETeOdnsf9rI_OGZ9vyg2TYQ1jxRBA8",
//   authDomain: "dinnermate-database.firebaseapp.com",
//   databaseURL:
//     "https://dinnermate-database-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "dinnermate-database",
//   storageBucket: "dinnermate-database.appspot.com",
//   messagingSenderId: "266027037200",
//   appId: "1:266027037200:web:8c09ec93d5e28965ddd095",
//   measurementId: "G-SST92XMXJH",
// };

// Initialize Firebase
// 초기화 되어있는 경우 기존 app을 사용하도록 코드 수정
export const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);

// firebase의 firestore 인스턴스를 변수에 저장
export const storage = getStorage(firebaseApp);
// const analytics = getAnalytics(app);
