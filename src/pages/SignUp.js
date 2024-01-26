import {
  Stack,
  Avatar,
  Input,
  Button,
  Container,
  VStack,
  Box,
  CircularProgress,
  Center,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { upload_image } from "../js/Storage";
import { useRef, useState } from "react";
import { db_add, db_update, get_doc_list } from "../js/Database";
import {
  check_password_valid,
  compare_password,
  step1_confirm_blank,
} from "../js/UserAPI";
import { signUpPassword } from "../js/Auth";
import { gray_300, theme_bright_color, white } from "../App";
import { useAuthState } from "../js/Hooks";
import { auth } from "../db/firebase_config";
import { CustomButton, FullButton } from "../component/Buttons";
import { TopHeader } from "../component/TopHeader";
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
  const profileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState({
    state: true,
    message: "",
  });

  const { user } = useAuthState(auth);
  const [formData, setFormData] = useState({
    user_profile: user?.photoURL,
    user_email: user?.email,
    user_name: user?.displayName,
    user_password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  // 프로필 업로드 버튼 클릭 시 ref 클릭 이벤트 발생
  const onClickProfileButton = () => {
    profileRef.current.click();
  };

  // 이미지 업로드 함수
  const upload_profile = async (e) => {
    // 이미지 로딩 중에는 프로그레스바를 띄운다
    setLoading(true);

    // firestore에 이미지 업로드
    let url = await upload_image(e);

    if (url && url !== "") {
      setValid({
        state: true,
        message: "",
      });
    } else {
      setValid({
        state: false,
        message: "이미지를 다시 선택해주세요.",
      });
    }

    // console.log(url);
    setFormData({ ...formData, user_profile: url });

    // 이미지 로딩 완료 시 프로그레스바를 지운다
    setLoading(false);
  };

  // 본인인증 버튼 눌렀을 때 수행
  const onClickApprove = async () => {
    //# 여기에 휴대폰 인증(API) 추가

    if (!isValid.state) return;
    setLoading(true);

    let ret = "";
    if (!user) {
      // 파이어베이스 Authentication에 계정 추가
      ret = await signUpPassword(formData.user_email, formData.user_password);
    }

    setValid({
      state: ret === "",
      message: ret,
    });

    if (ret !== "") return;

    console.log(auth.currentUser);

    if (auth.currentUser) {
      let userList = await get_doc_list(
        "user",
        "user_id",
        auth.currentUser?.uid
      );
      let uid = "";
      let docId = "";
      if (userList.length === 0) {
        // 입력 정보로 파이어베이스에 저장
        docId = await db_add("user", formData);
        // console.log("doc", docId);

        //# 로그인 처리
        //uid = await signInPassword(formData.user_email, formData.user_password);
        // 사용자의 uid 정보를 user_id로 저장
        // console.log("uid", uid);
        await db_update("user", docId, { user_id: auth.currentUser?.uid });
      } else {
        // console.log(await get_doc_list("user", "user_id", user.uid));
        docId = userList[0].doc_id;
        console.log("doc!", docId);
        await db_update("user", docId, {
          user_password: formData.user_password,
        });
      }

      setLoading(false);

      // 페이지 이동
      navigate("/info", { state: { user_id: docId } });
    }
  };

  const req_up_hash = async () => {
    try {
      // Axios를 사용하여 서버에 POST 요청 보내기
      const response = await axios.post("http://localhost:3001/api/postData", {
        user_id: "test1234",
      });

      // 서버로부터 받은 응답 로그
      console.log("서버 응답:", response.data);
    } catch (error) {
      // 오류 처리
      console.error("서버 요청 오류:", error.message);
    }
  };

  return (
    <Container>
      <TopHeader title={"회원가입"} />
      {loading ? (
        <Box>
          <Center w="100vw" h="100vh" position={"fixed"} left={0}>
            <CircularProgress
              zIndex={9999}
              isIndeterminate
              color="blue.300"
              trackColor={gray_300}
            />
          </Center>
        </Box>
      ) : null}
      <Stack
        paddingY="10px"
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        height="100vh"
        maxWidth="100%"
        background={white}
      >
        <Stack
          paddingX="10px"
          direction="row"
          justify="flex-start"
          align="flex-start"
          spacing="0px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Stack size="lg" width="40px" height="40px" />
        </Stack>
        <Stack
          padding="10px"
          direction="row"
          justify="center"
          // align="center"
          mt={"4vh"}
          spacing="10px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <Stack justify="flex-start" align="center" spacing="50px" w="100%">
            <VStack>
              <Avatar
                // name={formData.user_name}
                src={formData.user_profile}
                size="2xl"
              />
              <CustomButton
                text="프로필 업로드"
                onClick={onClickProfileButton}
              />
              <Input
                display={"none"}
                ref={profileRef}
                type="file"
                onChange={(e) => {
                  upload_profile(e);
                }}
              />
            </VStack>
            <Stack
              justify="flex-start"
              align="flex-start"
              spacing="10px"
              w={"100%"}
            >
              <Input
                type="text"
                placeholder="실명"
                height="40px"
                alignSelf="stretch"
                value={formData.user_name}
                onChange={(e) =>
                  setFormData({ ...formData, user_name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="이메일"
                height="40px"
                alignSelf="stretch"
                value={formData.user_email}
                onChange={(e) => {
                  setFormData({ ...formData, user_email: e.target.value });
                }}
              />
              <Input
                type="password"
                placeholder="패스워드"
                height="40px"
                alignSelf="stretch"
                onChange={(e) => {
                  let ret = check_password_valid(e.target.value);

                  if (ret === "") {
                    setFormData({ ...formData, user_password: e.target.value });
                  }

                  setValid({
                    state: ret === "",
                    message: ret,
                  });
                }}
              />
              <Input
                type="password"
                placeholder="패스워드 확인"
                height="40px"
                alignSelf="stretch"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (
                    compare_password(formData.user_password, e.target.value)
                  ) {
                    setValid({
                      state: true,
                      message: "",
                    });
                  } else {
                    setValid({
                      state: false,
                      message: "비밀번호가 일치하지 않습니다.",
                    });
                  }
                }}
              />
              {isValid.message === "" ? null : (
                <Alert fontSize={"small"} status="error">
                  <AlertIcon />
                  <AlertDescription>{isValid.message}</AlertDescription>
                </Alert>
              )}
            </Stack>
            <FullButton
              code={theme_bright_color}
              text={"본인인증하고 가입 완료하기"}
              width="313px"
              height="40px"
              maxWidth="100%"
              onClick={() => {
                // 테스트 코드
                req_up_hash();

                let ret = step1_confirm_blank(
                  formData.user_profile,
                  formData.user_name,
                  formData.user_email,
                  formData.user_password,
                  confirmPassword
                );

                setValid({ isValid: ret === "", message: ret });

                if (ret === "") {
                  onClickApprove();
                }
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
