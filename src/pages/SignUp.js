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
  FormControl,
  FormLabel,
  HStack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { upload_image } from "../js/Storage";
import { useEffect, useRef, useState } from "react";
import { db_set } from "../js/Database";
import {
  check_password_valid,
  compare_password,
  step1_confirm_blank,
} from "../js/UserAPI";
import { signInPassword, signUpPassword } from "../js/Auth";
import {
  gray_100,
  gray_300,
  theme_bright_color,
  theme_primary_color,
  white,
} from "../App";
import { useAuthState } from "../js/Hooks";
import { auth } from "../db/firebase_config";
import { CustomButton, FullButton } from "../component/Buttons";
import { TopHeader } from "../component/TopHeader";
import axios from "axios";
import { format } from "date-fns";
import firebase from "firebase/compat/app";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { isAdult } from "../js/API";

export const PhoneCert = ({ ...props }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [verificationResult, setVerificationResult] = useState("");
  const [confirm, setConfirm] = useState(false);

  const sendOTP = async () => {
    const req_number = "+82" + phoneNumber.substring(1).replace("-", "");

    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        }
      );

      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(req_number, appVerifier);
      setConfirmationResult(confirmation);
      setVerificationResult("인증 코드가 전송되었습니다.");
    } catch (error) {
      console.error("인증 코드 전송 실패:", error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const result = await confirmationResult.confirm(verificationCode);
      console.log("휴대폰 번호 인증 성공", result.user);
      setVerificationResult("휴대폰 번호가 인증되었습니다.");
      setConfirm(true);
      props.onConfirm(phoneNumber);
    } catch (error) {
      console.error("휴대폰 번호 인증 실패:", error.message);
      setVerificationResult("휴대폰 번호 인증 실패");
      setConfirm(false);
    }
  };

  return (
    <Stack w={"100%"}>
      <FormControl>
        {/* <FormLabel>휴대폰 번호:</FormLabel> */}
        <HStack>
          <Input
            isDisabled={confirm}
            type="tel"
            id="phoneNumber"
            value={phoneNumber.replace("-", "")}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="휴대폰번호"
            maxLength={11}
            _disabled={{ bgColor: gray_100 }}
          />
          <Button
            w="50%"
            onClick={sendOTP}
            rightIcon={confirm ? <CheckCircleIcon color={"green.500"} /> : null}
          >
            {confirm ? "인증 완료" : "인증 코드 전송"}
          </Button>
        </HStack>
      </FormControl>
      {verificationResult === "인증 코드가 전송되었습니다." && (
        <FormControl>
          {/* <FormLabel>인증코드 :</FormLabel> */}
          <HStack>
            <Input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증코드 입력"
            />
            <Button w="50%" onClick={verifyOTP}>
              인증 코드 확인
            </Button>
          </HStack>
        </FormControl>
      )}
      <div id="recaptcha-container"></div>
      {/* <p>{verificationResult}</p> */}
    </Stack>
  );
};

export const SignUp = () => {
  useEffect(() => {
    localStorage.setItem("ret_page", "/information");
  }, []);
  const navigate = useNavigate();
  const profileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isValid, setValid] = useState({
    state: true,
    message: "",
  });

  const { user } = useAuthState(auth);
  const [formData, setFormData] = useState({
    user_profile: user?.photoURL
      ? user?.photoURL
      : "https://firebasestorage.googleapis.com/v0/b/dinnermate-database.appspot.com/o/assets%2FMale.png?alt=media&token=b82a2957-545d-4b68-901f-7cbaadb0a42c",
    user_email: user?.email,
    user_password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCert, setIsCert] = useState(false);

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

    setFormData({ ...formData, user_profile: url });

    // 이미지 로딩 완료 시 프로그레스바를 지운다
    setLoading(false);
  };

  const onApproveButton = async () => {
    window.location.replace(
      //"http://localhost:3001/sample/make_hash"
      "https://dinnermate-node-server-0d7d5dc74685.herokuapp.com/sample/make_hash"
    );
  };

  // 본인인증 버튼 눌렀을 때 수행
  const onClickApprove = async () => {
    //# 여기에 휴대폰 인증(API) 추가

    if (!isValid.state) return;
    setLoading(true);

    if (!user) {
      // 계정생성
      let result = await signUpPassword(
        formData.user_email,
        formData.user_password
      );
      if (result.err_msg === "") {
        // 계정 생성에 성공했을 경우
        console.log("계정 생성 성공!", result);
        await db_set("user", result.uid, formData);
        await signInPassword(formData.user_email, formData.user_password);

        setLoading(false);
        onApproveButton();
      } else {
        alert(result.err_msg);
        setLoading(false);
        return;
      }
    } else {
      await db_set("user", auth.currentUser.uid, formData);
      setLoading(false);
      // 인증 페이지로 이동
      onApproveButton();
    }
  };

  return (
    <>
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
          minH="100vh"
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
                <Avatar src={formData.user_profile} size="2xl" />
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
                      setFormData({
                        ...formData,
                        user_password: e.target.value,
                      });
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
                // code={theme_bright_color}
                color={"white"}
                bgColor={"red"}
                width="313px"
                height="40px"
                maxWidth="100%"
                onClick={() => {
                  // 테스트 코드
                  // onApproveButton();

                  let ret = step1_confirm_blank(
                    formData.user_profile,
                    formData.user_email,
                    formData.user_password,
                    confirmPassword
                    // formData.user_phone,
                    // formData.user_birth
                  );

                  setValid({ isValid: ret === "", message: ret });

                  if (ret === "") {
                    onClickApprove(); // 계정을 등록합니다.
                  }
                }}
              >
                본인인증하기
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
