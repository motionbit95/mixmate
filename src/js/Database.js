// Import mock database instead of Firebase
import {
  db_add,
  db_set,
  db_update,
  db_delete,
  get_doc_all,
  get_doc_all2,
  get_doc_data,
  get_doc_list,
  get_doc_list_2,
  arrange_distance,
  arrange_random,
  findUser,
  get_user,
  mockAuth as auth
} from "./MockDatabase";

/**
 * @namespace DB
 */

/** firebase에 문서를 생성하여 data field를 저장합니다.
 * @function db_add
 * @memberof DB
 * @param {string} col collection 이름
 * @param {object} data 추가할 데이터
 * @returns {string} 추가된 document의 id
 */
export { db_add };

/** firebase에 문서 이름을 지정하여 data field를 저장합니다.
 * @function db_set
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} doc_id doc_id
 * @param {object} data 추가할 데이터
 */
export { db_set };

/** collection에 이미 생성된 문서에 data field를 추가합니다.
 * @function db_update
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} doc_id 추가할 문서의 id
 * @param {object} data 추가할 데이터
 */
export { db_update };

/** collection 내 특정 문서 삭제
 * @function db_delete
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} doc_id 문서 id
 */

export { db_delete };

/** 컬렉션에서 여러 문서 가져오기(특정 속성으로 검색해서 리스트를 가지고 올 때 사용)
 * @function get_doc_all
 * @memberof DB
 * @param {string} col collection 이름
 * @return {object} property 값이 value 와 일치하는 데이터 반환
 */
export { get_doc_all };

export { get_doc_all2 };

/** 문서 id로 데이터 가지고 오기
 * @function get_doc_data
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} doc_id 문서 id
 * @return {object} 단일 문서의 내용
 */
export { get_doc_data };

/** 조건에 일치하는 모든 문서를 가지고 오기
 * @function get_doc_list
 * @memberof DB
 * @param {string} col collection 이름
 * @param {string} property 검색 속성
 * @param {string} value 검색 값
 * @return {object} property 값이 value 와 일치하는 데이터 반환
 */
export { get_doc_list };

export { get_doc_list_2 };

/** 거리순 정렬
 * @function arrange_distance
 * @memberof DB
 * @param {object} user_location 유저 위치
 * @param {string} user_type 유저 타입
 * @return {Array} 거리순 정렬을 한 목록 반환
 */
export { arrange_distance };

/** 랜덤 정렬
 * @function arrange_random
 * @memberof DB
 * @param {string} user_location 유저 위치
 * @param {string} user_dong 유저의 행정동
 * @param {string} user_type 유저 타입
 * @return {Array} 거리순 정렬을 한 목록 반환
 */
export { arrange_random };

// 데이터 검색
export { findUser };

export { get_user };
