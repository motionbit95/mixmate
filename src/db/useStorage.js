import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../db/firebase_config";

export const uploadImage = async (e) => {
  console.log(e.target.files[0]);
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
