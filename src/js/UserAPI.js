import { auth } from "../db/firebase_config";
import { deg2rad } from "./API";
import { db_update } from "./Database";

/** 선택된 페이지 번호를 반환합니다.
 * @function get_page_num
 * @returns {number} 페이지 번호
 */
export function get_page_num() {
  if (window.location.pathname.includes("home")) return 0;
  if (window.location.pathname.includes("details")) return 1;
  if (window.location.pathname.includes("mypage")) return 3;
}

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

/** 회원가입 step1에서 모든 필드에 데이터가 존재하는지 확인합니다.
 * @function step2_confirm_blank
 * @param {string} user_price 부수입으로 받고 싶은 식사권 금액
 * @param {array} user_place 식사가능 동네
 * @param {array} user_food 좋아하는 음식
 * @param {object} user_bank 정산 계좌 정보
 * @param {string} user_gender 패스워드 확인
 * @returns {string} 에러 메세지
 */
export function step2_confirm_blank(
  user_price,
  user_place,
  user_food,
  user_bank,
  user_gender,
  user_birth
) {
  // console.log(
  //   user_price,
  //   user_place.length,
  //   user_food.length,
  //   user_bank.bank_name,
  //   user_gender
  // );
  if (user_price === "") return "식사권 금액을 설정해주세요.";
  if (user_place.length === 0) return "식사 가능 동네를 1개 이상 선택해주세요.";
  if (user_food.length === 0) return "좋아하는 음식을 1개 이상 선택해주세요.";
  if (user_bank.bank_name === "" || user_bank.accout_number === "")
    return "계좌 정보를 입력해주세요.";
  if (user_gender === "") return "성별을 선택해주세요.";
  if (user_birth === "") return "생년월일을 선택해주세요.";

  // 모든 필드가 작성되었을 경우
  return "";
}

/** 기존 지역 배열에 tag 항목이 있는지 검색하고 없으면 추가합니다.
 * @function add_place_tag
 * @param {array} array 기존 배열
 * @param {string} city 추가할 태그의 시
 * @param {string} district 추가할 태그의 군,구
 * @param {string} town 추가할 태그의 읍,면,동
 * @returns {array} 태그 항목이 추가 된 배열 반환
 */
export function add_place_tag(array, city, district) {
  let tag_list = array;
  let str_place = city + "," + district;
  // 배열에 항목이 존재하지 않으면 추가
  if (!tag_list.includes(str_place)) {
    tag_list.push(str_place);
  }

  // console.log(tag_list);
  return tag_list;
}

/** 기존 음식 배열에 tag 항목이 있는지 검색하고 없으면 추가합니다.
 * @function add_food_tag
 * @param {array} array 기존 배열
 * @param {string} food 추가할 태그(음식)
 * @returns {array} 태그 항목이 추가 된 배열 반환
 */
export function add_food_tag(array, food) {
  let tag_list = array;
  // 배열에 항목이 존재하지 않으면 추가
  if (!tag_list.includes(food)) {
    tag_list.push(food);
  }

  // console.log(tag_list);
  return tag_list;
}

/** 기존 배열에서 tag 항목을 삭제합니다.
 * @function del_tag
 * @param {array} array 기존 배열
 * @param {string} tag 삭제할 태그("시,군/구,읍/면/동" 의 문자열로 구성)
 * @returns {array} 태그 항목이 삭제 된 배열 반환
 */
export function del_tag(array, tag) {
  // console.log(array, tag);
  // 배열에서 특정 항목을 제외한 새로운 배열을 생성
  const tag_list = array.filter((item) => item !== tag);
  return tag_list;
}

/** 다음은 나이를 5살 단위의 범위로 표시
 * @function display_age_range
 * @param {int} age 실제 나이
 * @returns {string} 나이에 대해 5살 단위의 범위를 계산하고 해당 범위를 리턴합니다.
 */
export function display_age_range(age) {
  // 나이를 5로 나누어 몫을 구하고 다시 5를 곱해 5의 배수로 만듭니다.
  var ageRangeStart = Math.floor(age / 5) * 5;
  var ageRangeEnd = ageRangeStart + 4;

  return ageRangeStart + " ~ " + ageRangeEnd + "세";
}

/** 위치 좌표를 가져오는 함수
 * @function get_update_location
 * @param {object} user_info 유저 정보
 * @param {string} doc_id 문서 id
 */
export function get_update_location(user_info, doc_id) {
  // 위치 정보를 지원하는지 확인
  if (navigator.geolocation) {
    // 위치 정보 요청 옵션 설정 (maximumAge: 캐시된 위치 정보의 유효 기간, 여기서는 5분)
    var options = {
      maximumAge: 7 * 24 * 60 * 60 * 1000, // 일주일 밀리초로 변환
    };

    // 위치 정보를 요청
    navigator.geolocation.getCurrentPosition(
      // 성공 시 호출되는 콜백 함수
      async function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        await db_update("user", doc_id, {
          user_location: { latitude: latitude, longitude: longitude },
        });
      },
      // 실패 시 호출되는 콜백 함수
      function (error) {
        console.error(
          "위치 정보를 가져오는 데 실패했습니다. 오류 코드: " +
            error.code +
            ", 메시지: " +
            error.message
        );
      },
      options // 위치 정보 요청 옵션 전달
    );
  } else {
    console.error("현재 브라우저에서 위치 정보를 지원하지 않습니다.");
  }
}

// 두 좌표 간의 거리 계산 함수
export function calculateDistance(coord1, coord2) {
  const R = 6371; // 지구 반경 (단위: km)
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
