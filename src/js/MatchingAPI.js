import {
  db_add,
  db_delete,
  db_update,
  get_doc_data,
  get_doc_list,
} from "./Database";
import { auth } from "../db/firebase_config";

/**
 * @namespace Matching
 */

/** 신규 매칭을 생성합니다.(매칭 결제 완료 시 호출)
 * @function matching_add
 * @memberof Matching
 * @param {object} data 추가할 데이터
 * @returns {string} doc id
 * @description doc 생성 확인 완료
 */
export const matching_add = async (data) => {
  // matching collection에 data를 추가합니다
  let doc_id = await db_add("matching", data);

  // matching id를 필드에 업데이트합니다.
  await db_update("matching", doc_id, { matching_id: doc_id });

  return doc_id;
};

/** 기존 매칭의 data 정보를 수정합니다.
 * @function matching_set
 * @memberof Matching
 * @param {string} doc_id 문서 번호
 * @param {object} data 추가할 데이터
 * @description doc 수정 확인 완료
 */
export const matching_set = async (doc_id, data) => {
  await db_update("matching", doc_id, data);
};

/** 특정 문서의 매칭 정보를 조회합니다.
 * @function matching_get_item
 * @memberof Matching
 * @param {string} doc_id 문서 번호
 * @returns {object} 문서의 데이터
 */
export const matching_get_item = async (doc_id) => {
  return await get_doc_data("matching", doc_id);
};

/** 본인의 모든 매칭을 조회합니다.
 * @function matching_get_list
 * @memberof Matching
 * @param {int} type 본인이 매칭 신청자인지, 수신자인지 구분
 * @returns {array} 조회 된 메칭 리스트 반환
 * @description list 조회 동작 확인 완료
 */
export const matching_get_list = async (type) => {
  // 현재 로그인 된 사용자의 정보를 가지고 온다(현재 로그인 된 싱태의 경우)
  let user_uid = auth?.currentUser?.uid;
  if (!user_uid) return []; // 로그인 된 사용자가 없을 경우 값을 리턴하지 않는다.

  let matching_list = []; // 매칭 리스트
  if (type === 0) {
    // 본인이 매칭 신청자라면 -> 매칭 보낸 사람의 uid로 매칭 검색
    matching_list = await get_doc_list("matching", "sender", user_uid);
  } else {
    // 본인이 매칭 수신자라면 -> 매칭 받은 사람의 uid로 매칭 검색
    matching_list = await get_doc_list("matching", "receiver", user_uid);
  }

  return matching_list;
};

/** 매칭을 삭제합니다. (Danger)
 * @function matching_get_item
 * @memberof Matching
 * @param {string} doc_id 문서 번호
 */
export const matching_del = async (doc_id) => {
  await db_delete("matching", doc_id);
};
