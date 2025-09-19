import { defaultUser } from "../db/dummy";

/**
 * @namespace MockDB
 * Mock Database for Choppi - replaces Firebase calls with local data
 */

// Mock data storage
let mockData = {
  user: defaultUser.map((user, index) => ({ ...user, doc_id: `user_${index}` })),
  payment: [
    {
      doc_id: "payment_1",
      amount: 25000,
      user_name: "박수정",
      product_name: "프리미엄 식사권",
      payment_date: new Date(),
      status: "completed"
    },
    {
      doc_id: "payment_2",
      amount: 15000,
      user_name: "이민지",
      product_name: "일반 식사권",
      payment_date: new Date(),
      status: "completed"
    }
  ],
  matching: [
    {
      doc_id: "matching_1",
      sender: "user_1",
      receiver: "user_2",
      status: "pending",
      message: "함께 식사하실래요?",
      timestamp: new Date()
    }
  ],
  messages: {}
};

// Mock current user
export const mockAuth = {
  currentUser: {
    uid: "user_0",
    displayName: "테스트 유저",
    email: "test@choppi.kr"
  }
};

/** Mock version of db_add - adds document with generated id
 * @function db_add
 * @memberof MockDB
 * @param {string} col collection name
 * @param {object} data data to add
 * @returns {string} generated document id
 */
export const db_add = async (col, data) => {
  const id = `${col}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newDoc = {
    ...data,
    doc_id: id,
    timestamp: new Date()
  };

  if (!mockData[col]) {
    mockData[col] = [];
  }
  mockData[col].push(newDoc);

  console.log(`[MockDB] Added to ${col}:`, newDoc);
  return id;
};

/** Mock version of db_set - sets document with specific id
 * @function db_set
 * @memberof MockDB
 * @param {string} col collection name
 * @param {string} doc_id document id
 * @param {object} data data to set
 */
export const db_set = async (col, doc_id, data) => {
  const newDoc = {
    ...data,
    doc_id: doc_id,
    timestamp: new Date()
  };

  if (!mockData[col]) {
    mockData[col] = [];
  }

  const existingIndex = mockData[col].findIndex(item => item.doc_id === doc_id);
  if (existingIndex >= 0) {
    mockData[col][existingIndex] = newDoc;
  } else {
    mockData[col].push(newDoc);
  }

  console.log(`[MockDB] Set in ${col}:`, newDoc);
};

/** Mock version of db_update - updates existing document
 * @function db_update
 * @memberof MockDB
 * @param {string} col collection name
 * @param {string} doc_id document id
 * @param {object} data data to update
 */
export const db_update = async (col, doc_id, data) => {
  if (!mockData[col]) {
    mockData[col] = [];
  }

  const existingIndex = mockData[col].findIndex(item => item.doc_id === doc_id);
  if (existingIndex >= 0) {
    mockData[col][existingIndex] = {
      ...mockData[col][existingIndex],
      ...data
    };
    console.log(`[MockDB] Updated in ${col}:`, mockData[col][existingIndex]);
  } else {
    console.warn(`[MockDB] Document ${doc_id} not found in ${col}`);
  }
};

/** Mock version of db_delete - deletes document
 * @function db_delete
 * @memberof MockDB
 * @param {string} col collection name
 * @param {string} doc_id document id
 */
export const db_delete = async (col, doc_id) => {
  if (!mockData[col]) {
    return;
  }

  const existingIndex = mockData[col].findIndex(item => item.doc_id === doc_id);
  if (existingIndex >= 0) {
    mockData[col].splice(existingIndex, 1);
    console.log(`[MockDB] Deleted from ${col}: ${doc_id}`);
  }
};

/** Mock version of get_doc_all - gets all documents from collection
 * @function get_doc_all
 * @memberof MockDB
 * @param {string} col collection name
 * @return {Array} all documents in collection
 */
export const get_doc_all = async (col) => {
  const result = mockData[col] || [];
  console.log(`[MockDB] Get all from ${col}:`, result.length, 'documents');
  return result;
};

/** Mock version of get_doc_all2 - gets all documents with ordering
 * @function get_doc_all2
 * @memberof MockDB
 * @param {string} col collection name
 * @param {string} order field to order by
 * @param {string} sort sort direction (asc/desc)
 * @return {Array} sorted documents
 */
export const get_doc_all2 = async (col, order, sort) => {
  const result = mockData[col] || [];
  const sortedResult = [...result].sort((a, b) => {
    if (sort === 'desc') {
      return b[order] > a[order] ? 1 : -1;
    }
    return a[order] > b[order] ? 1 : -1;
  });

  console.log(`[MockDB] Get all from ${col} ordered by ${order} ${sort}:`, sortedResult.length, 'documents');
  return sortedResult;
};

/** Mock version of get_doc_data - gets single document by id
 * @function get_doc_data
 * @memberof MockDB
 * @param {string} col collection name
 * @param {string} doc_id document id
 * @return {object} document data
 */
export const get_doc_data = async (col, doc_id) => {
  const collection = mockData[col] || [];
  const result = collection.find(item => item.doc_id === doc_id);
  console.log(`[MockDB] Get document ${doc_id} from ${col}:`, result);
  return result;
};

/** Mock version of get_doc_list - gets documents by property value
 * @function get_doc_list
 * @memberof MockDB
 * @param {string} col collection name
 * @param {string} property property to search
 * @param {string} value value to match
 * @return {Array} matching documents
 */
export const get_doc_list = async (col, property, value) => {
  const collection = mockData[col] || [];
  const result = collection.filter(item => {
    return item[property] === value;
  });

  console.log(`[MockDB] Get documents from ${col} where ${property} = ${value}:`, result.length, 'documents');
  return result;
};

/** Mock version of get_doc_list_2 - gets documents by property value (no phone check)
 * @function get_doc_list_2
 * @memberof MockDB
 * @param {string} col collection name
 * @param {string} property property to search
 * @param {string} value value to match
 * @return {Array} matching documents
 */
export const get_doc_list_2 = async (col, property, value) => {
  const collection = mockData[col] || [];
  const result = collection.filter(item => item[property] === value);

  console.log(`[MockDB] Get documents from ${col} where ${property} = ${value}:`, result.length, 'documents');
  return result;
};

/** Mock version of arrange_distance - gets users sorted by distance
 * @function arrange_distance
 * @memberof MockDB
 * @param {object} user_location user location
 * @param {string} user_type user type filter
 * @return {Array} users sorted by distance
 */
export async function arrange_distance(user_location, user_type) {
  const users = mockData.user || [];
  const currentUserId = mockAuth.currentUser?.uid;

  const filteredUsers = users.filter(user => {
    if (user.doc_id === currentUserId) return false;
    if (user_type !== "all" && user.user_type !== user_type) return false;
    return true;
  });

  // Mock distance calculation - just random distances for demo
  const usersWithDistance = filteredUsers.map(user => ({
    ...user,
    distance: Math.random() * 10 + 0.1 // Random distance between 0.1 and 10.1 km
  }));

  usersWithDistance.sort((a, b) => a.distance - b.distance);

  console.log(`[MockDB] Arrange by distance for type ${user_type}:`, usersWithDistance.length, 'users');
  return usersWithDistance;
}

/** Mock version of arrange_random - gets users in random order
 * @function arrange_random
 * @memberof MockDB
 * @param {object} user_location user location
 * @param {string} user_dong user district
 * @param {string} user_type user type filter
 * @return {Array} randomly ordered users
 */
export async function arrange_random(user_location, user_dong, user_type) {
  const users = mockData.user || [];
  const currentUserId = mockAuth.currentUser?.uid;

  const filteredUsers = users.filter(user => {
    if (user.doc_id === currentUserId) return false;
    if (user.user_type !== user_type) return false;
    return true;
  });

  // Fisher-Yates shuffle
  const shuffledUsers = [...filteredUsers];
  for (let i = shuffledUsers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
  }

  // Add mock distance
  const usersWithDistance = shuffledUsers.map(user => ({
    ...user,
    distance: Math.random() * 10 + 0.1
  }));

  console.log(`[MockDB] Arrange random for type ${user_type}:`, usersWithDistance.length, 'users');
  return usersWithDistance;
}

/** Mock version of findUser - finds user by name and phone
 * @function findUser
 * @memberof MockDB
 * @param {string} user_name user name
 * @param {string} user_phone phone number
 * @return {object} found user or null
 */
export const findUser = async (user_name, user_phone) => {
  const users = mockData.user || [];
  const result = users.find(user =>
    user.user_name === user_name && user.user_phone === user_phone
  );

  console.log(`[MockDB] Find user ${user_name} / ${user_phone}:`, result);
  return result || null;
};

/** Mock version of get_user - gets user by uid
 * @function get_user
 * @memberof MockDB
 * @param {string} uid user uid
 * @return {object} user data
 */
export const get_user = async (uid) => {
  const users = mockData.user || [];
  const result = users.find(user => user.uid === uid || user.doc_id === uid);

  console.log(`[MockDB] Get user by uid ${uid}:`, result);
  return result || null;
};

// Export mockData for debugging
export const getMockData = () => mockData;
export const setMockData = (newData) => { mockData = newData; };