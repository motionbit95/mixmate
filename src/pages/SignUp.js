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
import { db_add, db_update, get_doc_data, get_doc_list } from "../js/Database";
import {
  check_password_valid,
  compare_password,
  step1_confirm_blank,
} from "../js/UserAPI";
import { signUpPassword, signInPassword } from "../js/Auth";
import { gray_300, theme_primary_color, white } from "../App";
import { useAuthState } from "../js/Hooks";
import { auth } from "../db/firebase_config";
import { getSatuation } from "../js/API";

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
    if (!isValid.state) return;
    setLoading(true);

    let ret = "";
    if (!user) {
      // 파이어베이스 Authentication에 계정 추가
      ret = await signUpPassword(formData.user_email, formData.user_password);
    }

    console.log(ret);

    setValid({
      state: ret === "",
      message: ret,
    });

    if (ret !== "") return;

    if (user.uid) {
      let userList = await get_doc_list("user", "user_id", user.uid);
      let uid = "";
      let docId = "";
      if (userList.length === 0) {
        // 입력 정보로 파이어베이스에 저장
        docId = await db_add("user", formData);
        // console.log("doc", docId);

        //# 로그인 처리
        uid = await signInPassword(formData.user_email, formData.user_password);

        // 사용자의 uid 정보를 user_id로 저장
        // console.log("uid", uid);
        await db_update("user", docId, { user_id: uid });
      } else {
        // console.log(await get_doc_list("user", "user_id", user.uid));
        docId = userList[0].doc_id;
        console.log("doc!", docId);
        await db_update("user", docId, {
          user_password: formData.user_password,
        });
      }

      setLoading(false);

      //# 여기에 휴대폰 인증(API) 추가

      // 페이지 이동
      navigate("/info", { state: { user_id: docId } });
    }
  };

  return (
    <Container>
      {loading ? (
        <Box>
          <Box
            position={"fixed"}
            left={0}
            zIndex={9999}
            bgColor={"black"}
            opacity={0.2}
            w="100vw"
            h="100vh"
          />
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
          <Stack justify="flex-start" align="center" spacing="50px">
            <VStack>
              <Avatar
                name={formData.user_name}
                src={formData.user_profile}
                size="2xl"
              />
              <Button onClick={onClickProfileButton}>프로필 업로드</Button>
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
            <Button
              colorScheme={getSatuation(theme_primary_color)}
              width="313px"
              height="40px"
              maxWidth="100%"
              onClick={() => {
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
            >
              가입 완료하기
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
