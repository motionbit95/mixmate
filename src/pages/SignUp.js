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
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../db/useStorage";
import { useRef, useState } from "react";
import { addDatabase } from "../db/useDatabase";

export const SignUp = () => {
  const navigate = useNavigate();
  const profileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState({
    state: true,
    message: "",
  });
  const [formData, setFormData] = useState({
    user_profile: "",
    user_email: "",
    user_name: "",
    user_password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  // 모든 데이터가 입력되었는지 확인
  function checkBlank() {
    if (formData.user_profile === "") {
      setValid({
        state: false,
        message: "프로필 사진을 등록해주세요.",
      });
      return false;
    }

    if (formData.user_name === "") {
      setValid({
        state: false,
        message: "이름을 입력해주세요",
      });
      return false;
    }

    if (formData.user_email === "") {
      setValid({
        state: false,
        message: "이메일(아이디)를 입력해주세요",
      });
      return false;
    }

    if (confirmPassword === "" || confirmPassword === formData.password) {
      setValid({
        state: false,
        message: "패스워드를 확인해주세요.",
      });
      return false;
    }

    return true;
  }

  // 비밀번호 확인
  function comparePassword(password) {
    if (password === formData.password) {
      setValid({
        state: true,
        message: "",
      });
      return true;
    } else {
      setValid({
        state: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
      return false;
    }
  }

  // 비밀번호 유효성 체크
  function checkPasswordValid(password) {
    var pw = password;
    var num = pw.search(/[0-9]/g);
    var eng = pw.search(/[a-z]/gi);
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      setValid({
        state: false,
        message: "8자리 ~ 20자리 이내로 입력해주세요.",
      });
      return false;
    } else if (pw.search(/\s/) != -1) {
      setValid({
        state: false,
        message: "비밀번호는 공백 없이 입력해주세요.",
      });
      return false;
    } else if (num < 0 || eng < 0 || spe < 0) {
      setValid({
        state: false,
        message: "영문,숫자, 특수문자를 혼합하여 입력해주세요.",
      });
      return false;
    } else {
      // 패스워드 정보 업데이트
      setFormData({ ...formData, user_password: pw });
      setValid({
        state: true,
        message: "",
      });
      // console.log("통과");
      return true;
    }
  }

  // 프로필 업로드 버튼 클릭 시 ref 클릭 이벤트 발생
  const onClickProfileButton = () => {
    profileRef.current.click();
  };

  // 이미지 업로드 함수
  const uploadProfile = async (e) => {
    // 이미지 로딩 중에는 프로그레스바를 띄운다
    setLoading(true);

    // firestore에 이미지 업로드
    let url = await uploadImage(e);

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
    // 입력 정보로 파이어베이스에 저장
    let docId = await addDatabase("user", formData);
    console.log(docId);

    //# 여기에 휴대폰 인증(API) 추가

    // 페이지 이동
    navigate("/info");
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
              trackColor="#f1f1f1"
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
        width="393px"
        height="852px"
        maxWidth="100%"
        background="#FFFFFF"
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
          align="center"
          spacing="10px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <Stack justify="flex-start" align="center" spacing="50px">
            <VStack>
              <Avatar src={formData.user_profile} size="2xl" />
              <Button onClick={onClickProfileButton}>프로필 업로드</Button>
              <Input
                display={"none"}
                ref={profileRef}
                type="file"
                onChange={(e) => {
                  uploadProfile(e);
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
                onChange={(e) =>
                  setFormData({ ...formData, user_name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="아이디"
                height="40px"
                alignSelf="stretch"
                onChange={(e) =>
                  setFormData({ ...formData, user_email: e.target.value })
                }
              />
              <Input
                type="password"
                placeholder="패스워드"
                height="40px"
                alignSelf="stretch"
                onChange={(e) => checkPasswordValid(e.target.value)}
              />
              <Input
                type="password"
                placeholder="패스워드 확인"
                height="40px"
                alignSelf="stretch"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  comparePassword(e.target.value);
                }}
              />
              {isValid.state ? null : (
                <Alert fontSize={"small"} status="error">
                  <AlertIcon />
                  <AlertDescription>{isValid.message}</AlertDescription>
                </Alert>
              )}
            </Stack>
            <Button
              colorScheme="blue"
              width="313px"
              height="40px"
              maxWidth="100%"
              onClick={() => {
                if (checkBlank()) {
                  onClickApprove();
                }
              }}
            >
              본인인증하기
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
