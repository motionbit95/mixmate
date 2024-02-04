import {
  Stack,
  Container,
  Center,
  HStack,
  Box,
  Flex,
  Icon,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signInGoogle, logout, signUpPassword } from "../js/Auth";
import { auth } from "../db/firebase_config";
import { theme_bright_color, white } from "../App";

// Hooks
import { useAuthState } from "../js/Hooks";

import HorizonLine from "../component/HorizontalLine";
import SymbolLogo, { Logo } from "../component/Logo";
import { CustomButton, FullButton, TextButton } from "../component/Buttons";
import EmailLoginForm from "../component/EmailLoginForm";
import { get_doc_data, get_doc_list } from "../js/Database";
import KakaoLogin from "react-kakao-login";
import { terms } from "../assets/terms";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const { user, initializing } = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const responseKaKao = (response) => {
    alert("준비중입니다.");
    // 카카오톡 로그인 성공 시 처리 로직을 여기에 추가합니다.
  };

  const responseGoogle = async () => {
    // 구글 로그인 성공 시 처리 로직을 여기에 추가합니다.
    if (await signInGoogle()) {
      // user_id 와 user.uid가 일치하는 문서 검색(가입이 된 유저인지)

      let currentUser = await get_doc_data("user", auth.currentUser?.uid);

      if (currentUser) {
        // 가입된 유저가 있다면
        // 홈으로 이동
        navigate("/");
      } else {
        // 가입된 유저가 없다면
        // 회원가입 화면으로 이동
        navigate("/signup");
      }
    }
  };

  const responseEmail = () => {
    // 이메일 로그인 성공 시 처리 로직을 여기에 추가합니다.
  };

  return (
    <Container p={0} minH={"100vh"} bgColor={white}>
      <Center w="100%">
        <Stack
          justify="flex-start"
          align="center"
          spacing="0px"
          overflow="hidden"
          width="100%"
          height="100%"
          // maxWidth="360px"
          // p={"4vw"}
          px={"2vh"}
        >
          <Stack
            direction="row"
            justify="center"
            align="center"
            spacing="10px"
            overflow="hidden"
            flex="1"
            alignSelf="stretch"
          >
            <Stack
              w="100%"
              justify="center"
              align="center"
              spacing="4vh"
              p={"2vh"}
              minH={"100vh"}
              justifyContent={"space-between"}
            >
              <Stack
                w={"100%"}
                spacing={"6vh"}
                alignItems={"center"}
                py={"4vh"}
                display={"flex"}
                flex={1}
                justifyContent={"center"}
              >
                {/** 로고 **/}
                <Stack alignItems={"center"} direction={"row"} py={"4vh"}>
                  {/* <SymbolLogo w={"10vh"} /> */}
                  <Text
                    fontSize={"large"}
                    color={"gray.500"}
                    fontFamily={"GapyeongHanseokbong-Light"}
                  >
                    밥친구가 필요한 순간,
                  </Text>
                  <Text
                    fontSize={"x-large"}
                    color={"gray.800"}
                    fontFamily={"GapyeongHanseokbong-Bold"}
                  >
                    식사회
                  </Text>
                </Stack>

                {/* 버튼 */}
                <Stack w="100%" spacing={"1.5vh"}>
                  <Flex w={"100%"} align={"center"}>
                    <Image
                      position={"absolute"}
                      mx={"4vw"}
                      w="auto"
                      h="24px"
                      src={require("../assets/kakao_icon.png")}
                    />
                    <KakaoLogin
                      token="f0b9cea901481ede3c202e108f61ef3e" // 카카오 개발자 사이트에서 발급받은 API 키를 입력하세요.
                      onSuccess={responseKaKao}
                      onFail={(error) => console.log(error)}
                      onLogout={() => console.log("로그아웃")}
                      style={{
                        height: "50px",
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#FEE500",
                        color: "#000000",
                        fontSize: "16px",
                        borderRadius: "50px",
                        fontWeight: 500,
                      }}
                    ></KakaoLogin>
                  </Flex>
                  <Flex w={"100%"} align={"center"}>
                    <Image
                      position={"absolute"}
                      mx={"4vw"}
                      w="auto"
                      h="24px"
                      src={require("../assets/google_icon.png")}
                    />
                    <FullButton
                      height={"50px"}
                      onClick={async () => {
                        // 로그인 한 유저가 있을 경우 로그아웃을 합니다.
                        if (user) {
                          await logout();
                        }

                        await responseGoogle();
                      }}
                      text="구글로 로그인하기"
                      code={"white.100"}
                    />
                  </Flex>
                  <FullButton
                    text={"회원정보로 로그인하기"}
                    height={"50px"}
                    onClick={() => navigate("/email_login")}
                  />
                </Stack>
              </Stack>

              {/* footer */}
              <Stack
                w={"100%"}
                alignItems={"center"}
                mb={"4vh"}
                spacing={"2vh"}
              >
                <HStack>
                  <TextButton
                    style={{ textDecoration: "underline" }}
                    text="이용약관"
                    onClick={onOpen}
                  />
                  {/* <Text fontSize={"small"} color={"gray.500"}>
                  및
                </Text>
                <TextButton
                  style={{ textDecoration: "underline" }}
                  text="개인정보 취급방침"
                  onClick={() => alert("준비중입니다.")}
                /> */}
                </HStack>
                <Text fontSize={"sm"}>우린 더 나은 식사문화를 창조합니다.</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Center>

      <Modal isCentered onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>이용약관</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"small"} whiteSpace={"pre-wrap"}>
              {terms}
            </Text>
          </ModalBody>
          <ModalFooter>
            <CustomButton onClick={onClose} text={"확인했습니다."} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
