import { auth } from "../db/firebase_config";
import { deg2rad, isAdult } from "./API";
import { db_update, get_doc_list } from "./Database";

/**
 * @namespace User
 */

/** 선택된 페이지 번호를 반환합니다.
 * @function get_page_num
 * @memberof User
 * @returns {number} 페이지 번호
 */
export function get_page_num() {
  if (window.location.pathname.includes("home")) return 0;
  if (window.location.pathname.includes("details")) return 1;
  if (window.location.pathname.includes("mypage")) return 3;
}

/** 패스워드 정책에 부합하는지 확인합니다.
 * @function check_password_valid
 * @memberof User
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
 * @memberof User
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
 * @memberof User
 * @param {string} user_profile 유저 프로필 이미지
 * @param {string} user_name 유저 실명
 * @param {string} user_email 유저의 아이디
 * @param {string} user_password 유저 패스워드
 * @param {string} confirm_password 패스워드 확인
 * @returns {string} 에러 메세지
 */
export function step1_confirm_blank(
  user_profile,
  user_email,
  user_password,
  confirm_password
) {
  if (user_profile === "") return "프로필 사진을 등록해주세요.";
  if (user_email === "") return "아이디를 입력해주세요.";
  if (user_password === "") return "패스워드를 입력해주세요.";
  if (confirm_password === "") return "패스워드를 확인해주세요.";

  // 모든 필드가 작성되었을 경우
  return "";
}

/** 회원가입 step1에서 모든 필드에 데이터가 존재하는지 확인합니다.
 * @function step2_confirm_blank
 * @memberof User
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
  user_profile,
  user_info
) {
  if (parseInt(user_price) < 2)
    return "식사권 금액은 2만원 이상으로 설정해주세요.";
  if (user_price === "") return "식사권 금액을 설정해주세요.";
  if (user_place.length === 0) return "식사 가능 동네를 1개 이상 선택해주세요.";
  if (user_food.length === 0) return "좋아하는 음식을 1개 이상 선택해주세요.";
  if (user_profile === "") return "프로필 사진을 설정해주세요.";
  if (user_info.length < 20) return "프로필 소개말은 20자 이상 작성해주세요.";
  // if (user_bank.bank_name === "" || user_bank.accout_number === "")
  // return "계좌 정보를 입력해주세요.";
  // if (user_gender === "") return "성별을 선택해주세요.";
  // if (user_birth === "") return "생년월일을 선택해주세요.";

  // 모든 필드가 작성되었을 경우
  return "";
}

/** 기존 지역 배열에 tag 항목이 있는지 검색하고 없으면 추가합니다.
 * @function add_place_tag
 * @memberof User
 * @param {array} array 기존 배열
 * @param {string} city 추가할 태그의 시
 * @param {string} district 추가할 태그의 군,구
 * @param {string} town 추가할 태그의 읍,면,동
 * @returns {array} 태그 항목이 추가 된 배열 반환
 */
export function add_place_tag(array, city, district) {
  if (array.length > 0) {
    alert("식사가능 동네는 1개 까지 선택할 수 있습니다.");
    return array;
  }
  let tag_list = array;
  let str_place = city + " " + district;
  // 배열에 항목이 존재하지 않으면 추가
  if (!tag_list.includes(str_place)) {
    tag_list.push(str_place);
  }

  return tag_list;
}

/** 기존 음식 배열에 tag 항목이 있는지 검색하고 없으면 추가합니다.
 * @function add_food_tag
 * @memberof User
 * @param {array} array 기존 배열
 * @param {string} food 추가할 태그(음식)
 * @returns {array} 태그 항목이 추가 된 배열 반환
 */
export function add_food_tag(array, food) {
  if (array.length > 0) {
    alert("좋아하는 음식은 1개 까지 선택할 수 있습니다.");
    return array;
  }
  let tag_list = array;
  // 배열에 항목이 존재하지 않으면 추가
  if (!tag_list.includes(food)) {
    tag_list.push(food);
  }

  return tag_list;
}

/** 기존 배열에서 tag 항목을 삭제합니다.
 * @function del_tag
 * @memberof User
 * @param {array} array 기존 배열
 * @param {string} tag 삭제할 태그("시,군/구,읍/면/동" 의 문자열로 구성)
 * @returns {array} 태그 항목이 삭제 된 배열 반환
 */
export function del_tag(array, tag) {
  // 배열에서 특정 항목을 제외한 새로운 배열을 생성
  const tag_list = array.filter((item) => item !== tag);
  return tag_list;
}

/** 다음은 나이를 5살 단위의 범위로 표시
 * @function display_age_range
 * @memberof User
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
 * @memberof User
 * @param {string} doc_id 문서 id
 */

export async function get_update_location(doc_id) {
  const pos = {
    latitude: null,
    longitude: null,
  };

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
        pos.latitude = position.coords.latitude;
        pos.longitude = position.coords.longitude;

        console.log("pos", pos);

        await db_update("user", doc_id, { user_location: pos });
      },
      // 실패 시 호출되는 콜백 함수
      async function (error) {
        console.log(
          error.message
          // await navigator.permissions.query({ name: "geolocation" })
        );
      }
      // options // 위치 정보 요청 옵션 전달
    );
  } else {
    alert("현재 브라우저에서 위치 정보를 지원하지 않습니다.");
  }
}

/** 두 좌표간 거리 계산 함수
 * @function calculateDistance
 * @memberof User
 * @param {object} coord1 좌표 1
 * @param {object} coord2 좌표 2
 * @returns {number} 두 좌표 사이의 거리를 km 단위로 반환
 */
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

export const get_default_avartar = (gender, profile) => {
  if (profile) {
    return profile;
  }

  if (gender === "남")
    return "https://firebasestorage.googleapis.com/v0/b/dinnermate-database.appspot.com/o/assets%2FMale.png?alt=media&token=b82a2957-545d-4b68-901f-7cbaadb0a42c";
  else
    return "https://firebasestorage.googleapis.com/v0/b/dinnermate-database.appspot.com/o/assets%2FFemale.png?alt=media&token=58e5f88b-0954-432b-bd69-6f774b5b3a61";
};
