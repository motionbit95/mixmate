// 찜 기능을 위한 로컬 스토리지 기반 서비스

const LIKE_STORAGE_KEY = 'choppi_liked_users';

// 찜한 사용자 목록 가져오기
export const getLikedUsers = () => {
  try {
    const likedUsers = localStorage.getItem(LIKE_STORAGE_KEY);
    return likedUsers ? JSON.parse(likedUsers) : [];
  } catch (error) {
    console.error('찜 목록 로드 오류:', error);
    return [];
  }
};

// 사용자 찜하기/취소하기
export const toggleLike = (user) => {
  try {
    const likedUsers = getLikedUsers();
    const userIndex = likedUsers.findIndex(likedUser => likedUser.doc_id === user.doc_id);

    if (userIndex === -1) {
      // 찜 추가
      const newLikedUser = {
        ...user,
        liked_at: new Date().toISOString()
      };
      likedUsers.push(newLikedUser);
    } else {
      // 찜 제거
      likedUsers.splice(userIndex, 1);
    }

    localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(likedUsers));
    return userIndex === -1; // 새로 찜했으면 true, 취소했으면 false
  } catch (error) {
    console.error('찜 토글 오류:', error);
    return false;
  }
};

// 특정 사용자가 찜되어 있는지 확인
export const isUserLiked = (userId) => {
  try {
    const likedUsers = getLikedUsers();
    return likedUsers.some(user => user.doc_id === userId);
  } catch (error) {
    console.error('찜 상태 확인 오류:', error);
    return false;
  }
};

// 찜한 사용자 수 가져오기
export const getLikedUsersCount = () => {
  return getLikedUsers().length;
};

// 찜 목록 초기화
export const clearAllLikes = () => {
  try {
    localStorage.removeItem(LIKE_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('찜 목록 초기화 오류:', error);
    return false;
  }
};