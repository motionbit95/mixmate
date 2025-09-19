// Import mock auth instead of Firebase
import {
  signUpPassword,
  signInPassword,
  signInGoogle,
  logout,
  importDefaultUser
} from "./MockAuth";

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
export { signUpPassword };

/** 이메일 주소와 비밀번호로 사용자 로그인
 * @function signInPassword
 * @memberof Auth
 * @param {string} email 유저 이메일
 * @param {string} password 유저 패스워드
 * @returns {string} 유저 uid
 */
export { signInPassword };

/** 구글 로그인
 * @function signInGoogle
 * @memberof Auth
 * @returns {boolean} 로그인 성공 여부
 */
export { signInGoogle };

/** 로그아웃
 * @function logout
 * @memberof Auth
 */
export { logout };

export { importDefaultUser };
