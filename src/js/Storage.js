import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../db/firebase_config";

/** firestore profile 폴더 내에 이미지를 업로드랍니다.
 * @function upload_image
 * @memberof DB
 * @param {React.ChangeEvent<HTMLInputElement>} e input 이벤트
 * @returns {string} 이미지 호스팅 완료 된 링크
 */
export const upload_image = async (e) => {
  const uploaded_file = await uploadBytes(
    ref(
      storage,
      `profile/${e.target.files[0].name}`
      //업로드 할 파일의 이름을 각 파일 이름으로 저장!
    ),
    e.target.files[0]
  );

  // url을 가지고 옵니다
  const file_url = await getDownloadURL(uploaded_file.ref);
  return file_url;
};
