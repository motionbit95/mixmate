import { serverTimestamp } from "firebase/firestore";
import { white } from "../App";

/**
 * @namespace API
 */

/** 입력 값이 null 일 때 대체값으로 출력하는 함수
 * @function checkNull
 * @memberof API
 * @param {object} a 입력값
 * @param {object} b 입력값이 null이면 출력할 default 값
 * @returns {object} null이 아닌 값 출력
 */
export function checkNull(a, b) {
  return a ? a : b;
}

/** colorScheme 변환
 * @function getSatuation
 * @memberof API
 * @param {string} code "[색상].[명도]" 포맷으로 작성된 코드
 * @returns {string} 색상값만 반환
 */
export function getSatuation(code) {
  if (!code.includes(".")) return white;
  return checkNull(code.split(".")[0], "white");
}
/** colorScheme 변환
 * @function getBrightness
 * @memberof API
 * @param {string} code "[색상].[명도]" 포맷으로 작성된 코드
 * @returns {string} 명도값만 반환
 */
export function getBrightness(code) {
  if (!code.includes(".")) return white;
  return checkNull(parseInt(code.split(".")[1]), 50);
}

/** object에 item 추가 / 변경
 * @function setData
 * @memberof API
 * @param {object} _state 기존 오브젝트
 * @param {string} _key 키
 * @param {string} _value 값
 * @returns {object} key 의 값을 value로 변경 또는 추가한 오브젝트 반환
 */
export function setData(_state, _key, _value) {
  return { ..._state, [_key]: _value };
}

/** 실명 가리기 함수
 * @function getDisplayName
 * @memberof API
 * @param {string} name 기존 실명
 * @returns {string} 실명 맨 끝의 값을 *로 처리(3글자 초과는 2개 지움)
 */
export function getDisplayName(name) {
  if (name === "" || !name) return "";

  if (name.length > 3) return name.slice(0, -2) + "*";
  else return name.slice(0, -1) + "*";
}

/** 실명 가리기 함수
 * @function getDisplayAge
 * @memberof API
 * @param {string} birthdate 생년월일
 * @returns {string} 생년월일을 나이로 변환한 후 5살 범위로 반환
 */
export function getDisplayAge(birthdate) {
  var currentDate = new Date();
  var birthdateObj = new Date(birthdate);
  var age = currentDate.getFullYear() - birthdateObj.getFullYear();

  if (
    currentDate.getMonth() < birthdateObj.getMonth() ||
    (currentDate.getMonth() === birthdateObj.getMonth() &&
      currentDate.getDate() < birthdateObj.getDate())
  ) {
    age--;
  }

  var lowerRange = Math.floor(age / 5) * 5;
  var upperRange = lowerRange + 4;
  return `${lowerRange}~${upperRange}세`;
}

/** 실명 가리기 함수
 * @function deg2rad
 * @memberof API
 * @param {number} deg 생년월일
 * @returns {number} deg를 rad로 변환
 */
export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function formatCurrency(number, currencyCode = "KRW") {
  const formattedNumber = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: currencyCode,
  }).format(number);

  return formattedNumber;
}

// Firestore에서 가져온 timestamp
const firestoreTimestamp = {
  seconds: 1706123143,
  nanoseconds: 515000000,
};

// Firestore Timestamp를 JavaScript Date 객체로 변환하는 함수
export function convertFirestoreTimestampToDate(timestamp) {
  if (!timestamp) return new Date();
  const milliseconds =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
  return new Date(milliseconds);
}

// 현재 시간을 가져오는 함수
export function getCurrentTime() {
  return new Date();
}

// Firestore Timestamp를 현재 시간과 비교하는 함수
export function compareTimestampWithCurrentTime(firestoreTimestamp) {
  const firestoreDate = convertFirestoreTimestampToDate(firestoreTimestamp);
  const currentDate = getCurrentTime();

  // 두 날짜의 차이 계산 (밀리초 단위)
  const timeDifference = currentDate - firestoreDate;

  // 차이를 표시하는 문자열 생성
  if (timeDifference < 60 * 1000) {
    return `${Math.round(timeDifference / 1000)}초 전`;
  } else if (timeDifference < 60 * 60 * 1000) {
    return `${Math.round(timeDifference / (60 * 1000))}분 전`;
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    return `${Math.round(timeDifference / (60 * 60 * 1000))}시간 전`;
  } else {
    // 다양한 형식으로 날짜 표시 가능
    const options = { year: "numeric", month: "long", day: "numeric" };
    return firestoreDate.toLocaleDateString("ko-Kr", options);
  }
}
