import { Timestamp } from "firebase/firestore";
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
  if (name?.length < 2 || !name) return "";

  // 문자열 길이가 3 이상인 경우
  if (name.length >= 3) {
    // 맨 앞과 맨 뒤를 제외한 나머지 부분을 '*'로 대체
    const maskedPart = name[0] + "*".repeat(name.length - 2) + name.slice(-1);
    return maskedPart;
  }
  // 문자열 길이가 2인 경우
  else if (name.length === 2) {
    // 맨 뒷글자를 '*'로 대체
    return name.slice(0, -1) + "*";
  }
}

/** 실명 가리기 함수
 * @function getDisplayAge
 * @memberof API
 * @param {string} birthdate 생년월일
 * @returns {string} 생년월일을 나이로 변환한 후 5살 범위로 반환
 */
export function getDisplayAge(birthdate) {
  if (!birthdate) return "";
  // 입력된 8자리 문자열을 연, 월, 일로 분리
  const year = birthdate.slice(0, 4);
  const month = birthdate.slice(4, 6);
  const day = birthdate.slice(6, 8);

  // 날짜 객체 생성
  const birthdateObj = new Date(year, month - 1, day); // 월은 0부터 시작하므로 -1 해줍니다.
  var currentDate = new Date();
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

export function getDisplayAge2(birthdate) {
  if (!birthdate) return "";
  // 입력된 8자리 문자열을 연, 월, 일로 분리
  const year = birthdate.slice(0, 4);
  const month = birthdate.slice(4, 6);
  const day = birthdate.slice(6, 8);

  // 날짜 객체 생성
  const birthdateObj = new Date(year, month - 1, day); // 월은 0부터 시작하므로 -1 해줍니다.
  var currentDate = new Date();
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
  return `${age}세`;
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

/** 숫자를 통화 단위로 반환
 * @function formatCurrency
 * @memberof API
 * @param {number} deg 숫자
 * @param {number} currencyCode 통화 단위
 * @returns {string} 통화 단위 별 구분자가 찍힌 포맷으로 출력
 */
export function formatCurrency(number, currencyCode = "KRW") {
  const formattedNumber = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: currencyCode,
  }).format(number);

  return formattedNumber;
}

/** Firestore Timestamp를 JavaScript Date 객체로 변환하는 함수
 * @function convertFirestoreTimestampToDate
 * @memberof API
 * @param {Timestamp} timestamp timestamp
 * @returns {Date} 날짜로 변환
 */
export function convertFirestoreTimestampToDate(timestamp) {
  if (!timestamp) return new Date();
  const milliseconds =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
  return new Date(milliseconds);
}

/** 현재 시간을 가져오는 함수
 * @function getCurrentTime
 * @memberof API
 * @returns {Date} 현재 시간 반환
 */
export function getCurrentTime() {
  return new Date();
}

/** Firestore Timestamp를 현재 시간과 비교하는 함수
 * @function compareTimestampWithCurrentTime
 * @memberof API
 * @param {Timestamp} firestoreTimestamp 타임스탬프
 * @returns {string} 현재 시간과 비교하여 시간차를 출력
 */
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

/** 생년월일 8자리를 입력받아 성인 여부를 판단하는 함수를 작성. 일반적으로 만 19세 이상의 사람을 성인으로 간주합니다.
 * @function isAdult
 * @memberof API
 * @param {string} birthdate 생년월일
 * @returns {boolean} 만 19세 이상의 사람을 성인으로 간주합니다.
 */
export function isAdult(birthdate) {
  // birthdate는 "YYYYMMDD" 형식의 문자열이라고 가정
  const year = parseInt(birthdate.substr(0, 4), 10);

  // 현재 날짜 구하기
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // 만 나이 계산 (한국 나이)
  const age = currentYear - year;

  // console.log(age);

  // 만 19세 이상이면 성인으로 판단
  return age >= 19;
}

/** 정규식을 사용하여 특수문자 제외한 문자열 반환
 * @function removeSpecialCharacters
 * @memberof API
 * @param {string} inputString 특수문자 포함된 문자열
 * @returns {string} 특수문자 제외한 문자열 반환
 */
export function removeSpecialCharacters(inputString) {
  return inputString.replace(/[^\w\s]/gi, "");
}
