/** 패스워드 정책에 부합하는지 확인합니다.
 * @function check_password_valid
 * @param {string} user_password 유저 패스워드
 * @returns {string} 에러 메세지
 */
export function check_password_valid(user_password) {
  var pw = user_password;
  var num = pw.search(/[0-9]/g);
  var eng = pw.search(/[a-z]/gi);
  var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (pw.length < 8 || pw.length > 20) {
    return "8자리 ~ 20자리 이내로 입력해주세요.";
  } else if (pw.search(/\s/) != -1) {
    return "비밀번호는 공백 없이 입력해주세요.";
  } else if (num < 0 || eng < 0 || spe < 0) {
    return "영문,숫자, 특수문자를 혼합하여 입력해주세요.";
  } else {
    return "";
  }
}

/** 입력한 패스워드와 일치하는지 확인합니다.
 * @function compare_password
 * @param {string} user_password 유저 패스워드
 * @param {string} confirm_password 패스워드 확인
 * @returns {boolean} 비밀번호 일치여부
 */
export function compare_password(user_password, confirm_password) {
  if (user_password === confirm_password) return true;
  else return false;
}

/** 회원가입 step1에서 모든 필드에 데이터가 존재하는지 확인합니다.
 * @function step1_confirm_blank
 * @param {string} user_profile 유저 프로필 이미지
 * @param {string} user_name 유저 실명
 * @param {string} user_email 유저의 아이디
 * @param {string} user_password 유저 패스워드
 * @param {string} confirm_password 패스워드 확인
 * @returns {string} 에러 메세지
 */
export function step1_confirm_blank(
  user_profile,
  user_name,
  user_email,
  user_password,
  confirm_password
) {
  if (user_profile === "") return "프로필 사진을 등록해주세요.";
  if (user_name === "") return "이름을 입력해주세요.";
  if (user_email === "") return "아이디를 입력해주세요.";
  if (user_password === "") return "패스워드를 입력해주세요.";
  if (confirm_password === "") return "패스워드를 확인해주세요.";

  // 모든 필드가 작성되었을 경우
  return "";
}
