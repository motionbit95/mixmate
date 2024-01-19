import { serverTimestamp } from "firebase/firestore";
import {
  db_add,
  db_update,
  get_doc_data,
  get_doc_info,
  get_doc_list,
} from "./Database";
import { auth } from "../db/firebase_config";

// matching data example
export const demo_matching = {
  matching_sender: {}, // 매칭 신청자
  matching_receiver: {}, // 매칭 수락자
  matching_state: 0, // 매칭 상태
  matching_payment: {}, // 매칭 결제 정보
  timestamp: serverTimestamp(), // 현재 시각
};

/** 신규 매칭을 생성합니다.
 * @function matching_add
 * @param {object} data 추가할 데이터
 */
export const matching_add = async (data) => {
  // matching collection에 data를 추가합니다
  let doc_id = await db_add("matching", data);
  console.log("매칭 doc이 생성되었습니다. : ", doc_id);

  // matching id를 필드에 업데이트합니다.
  await db_update("matching", doc_id, { matching_id: doc_id });
};

/** 기존 매칭의 data 정보를 수정합니다.
 * @function matching_set
 * @param {string} doc_id 문서 번호
 * @param {object} data 추가할 데이터
 */
export const matching_set = async (doc_id, data) => {
  await db_update("matching", doc_id, data);
};

/** 특정 문서의 매칭 정보를 조회합니다.
 * @function matching_get_item
 * @param {string} doc_id 문서 번호
 * @returns {object} 문서의 데이터
 */
export const matching_get_item = async (doc_id) => {
  return await get_doc_data("matching", doc_id);
};

/** 본인의 모든 매칭을 조회합니다.
 * @function matching_get_list
 * @param {int} type 본인이 매칭 신청자인지, 수신자인지 구분
 */
export const matching_get_list = async (type) => {
  console.log(auth?.currentUser?.uid); // 현재 로그인 된 사용자의 정보를 가지고 온다(현재 로그인 된 싱태의 경우)
  let user_uid = auth?.currentUser?.uid;
  if (!user_uid) return []; // 로그인 된 사용자가 없을 경우 값을 리턴하지 않는다.
  if (type === 0) {
    // 본인이 매칭 신청자라면
  } else {
    // 본인이 매칭 수신자라면
  }
  await get_doc_list("matching");
};

/** 매칭을 삭제합니다. (Danger)
 * @function matching_get_item
 */
export const matching_del = () => {};

/** 매칭을 거절합니다. (Danger)
 * @function matching_get_item
 */
export const matching_refund = () => {};
