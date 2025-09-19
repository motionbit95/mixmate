import { defaultUser } from "../db/dummy";
import { db_set, mockAuth } from "./MockDatabase";

/**
 * @namespace MockAuth
 * Mock Authentication for Choppi - replaces Firebase auth with local simulation
 */

// Mock users storage
let mockUsers = defaultUser.map((user, index) => ({
  ...user,
  uid: `user_${index}`,
  doc_id: `user_${index}`
}));

/** Mock 비밀번호 기반 계정 만들기
 * @function signUpPassword
 * @memberof MockAuth
 * @param {string} email 유저 이메일
 * @param {string} password 유저 패스워드
 * @returns {object} 에러 메세지와 uid
 */
export async function signUpPassword(email, password) {
  console.log(`[MockAuth] Sign up attempt: ${email}`);

  // Check if user already exists
  const existingUser = mockUsers.find(user => user.user_email === email);
  if (existingUser) {
    return {
      err_msg: "이미 존재하는 아이디입니다.",
      uid: ""
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      err_msg: "이메일 형식 틀림",
      uid: ""
    };
  }

  // Create new user
  const uid = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newUser = {
    user_email: email,
    user_password: password,
    uid: uid,
    doc_id: uid,
    user_name: "새 사용자",
    user_type: "개인",
    timestamp: new Date()
  };

  mockUsers.push(newUser);

  // Set current user
  mockAuth.currentUser = {
    uid: uid,
    email: email,
    displayName: newUser.user_name
  };

  console.log(`[MockAuth] User created successfully: ${uid}`);
  return { err_msg: "", uid: uid };
}

/** Mock 이메일 주소와 비밀번호로 사용자 로그인
 * @function signInPassword
 * @memberof MockAuth
 * @param {string} email 유저 이메일
 * @param {string} password 유저 패스워드
 * @returns {string} 유저 uid
 */
export const signInPassword = async (email, password) => {
  console.log(`[MockAuth] Sign in attempt: ${email}`);

  const user = mockUsers.find(u =>
    u.user_email === email && u.user_password === password
  );

  if (user) {
    // Set current user
    mockAuth.currentUser = {
      uid: user.uid,
      email: email,
      displayName: user.user_name
    };

    console.log(`[MockAuth] Sign in successful: ${user.uid}`);
    return user.uid;
  } else {
    console.log(`[MockAuth] Sign in failed: Invalid credentials`);
    return "";
  }
};

/** Mock 구글 로그인
 * @function signInGoogle
 * @memberof MockAuth
 * @returns {boolean} 로그인 성공 여부
 */
export const signInGoogle = async () => {
  console.log(`[MockAuth] Google sign in attempt`);

  // Mock successful Google login
  const mockGoogleUser = {
    uid: "google_user_" + Date.now(),
    email: "google.user@choppi.kr",
    displayName: "구글 사용자"
  };

  mockAuth.currentUser = mockGoogleUser;

  // Add to mock users if not exists
  const existingUser = mockUsers.find(u => u.user_email === mockGoogleUser.email);
  if (!existingUser) {
    mockUsers.push({
      ...mockGoogleUser,
      user_email: mockGoogleUser.email,
      user_name: mockGoogleUser.displayName,
      user_type: "개인",
      doc_id: mockGoogleUser.uid
    });
  }

  console.log(`[MockAuth] Google sign in successful`);
  return true;
};

/** Mock 로그아웃
 * @function logout
 * @memberof MockAuth
 */
export const logout = async () => {
  console.log(`[MockAuth] User logged out`);
  mockAuth.currentUser = null;
};

/** Mock 기본 사용자 가져오기
 * @function importDefaultUser
 * @memberof MockAuth
 */
export const importDefaultUser = () => {
  console.log(`[MockAuth] Default users already imported`);
  // Mock users are already loaded in mockUsers array
  return mockUsers;
};

// Export mock users for debugging
export const getMockUsers = () => mockUsers;
export const setMockUsers = (users) => { mockUsers = users; };

// Mock admin login function for admin panel
export const mockAdminLogin = (username, password) => {
  if (username === "admin" && password === "1q2w3e4r!") {
    localStorage.setItem("choppi-admin", JSON.stringify({
      id: "admin",
      password: "1q2w3e4r!"
    }));
    return true;
  }
  return false;
};

// Get current mock user
export const getCurrentUser = () => mockAuth.currentUser;

// Mock Firebase auth state observer
export const onAuthStateChanged = (callback) => {
  // Immediately call with current user
  callback(mockAuth.currentUser);

  // Return unsubscribe function
  return () => {
    console.log("[MockAuth] Unsubscribed from auth state changes");
  };
};