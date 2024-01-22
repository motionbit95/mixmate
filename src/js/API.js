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
  if (name === "") return "";

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
