import { Stack, Container, Center, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInGoogle, logout } from "../js/Auth";
import { auth } from "../db/firebase_config";
import { white } from "../App";

// Hooks
import { useAuthState } from "../js/Hooks";

import HorizonLine from "../component/HorizontalLine";
import { Logo } from "../component/Logo";
import { FullButton, TextButton } from "../component/Buttons";
import EmailLoginForm from "../component/EmailLoginForm";
import { db_update, get_doc_list } from "../js/Database";
import KakaoLogin from "react-kakao-login";

export const Login = () => {
  const navigate = useNavigate();
  const { user, initializing } = useAuthState(auth);

  const responseKaKao = (response) => {
    console.log(response);

    alert("준비중입니다.");
    // 카카오톡 로그인 성공 시 처리 로직을 여기에 추가합니다.
  };

  const responseGoogle = async () => {
    // 구글 로그인 성공 시 처리 로직을 여기에 추가합니다.
    if (await signInGoogle()) {
      console.log("구글 로그인 성공 : ", auth.currentUser.uid);

      // user_id 와 user.uid가 일치하는 문서 검색(가입이 된 유저인지)

      let userlist = await get_doc_list(
        "user",
        "user_id",
        auth.currentUser.uid
      );

      console.log(userlist);
      if (userlist[0]) {
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
    <Container p={0} h={"100vh"} bgColor={white}>
      <Center w="100%">
        <Stack
          justify="flex-start"
          align="center"
          spacing="0px"
          overflow="hidden"
          width="100%"
          height="100%"
          // maxWidth="360px"
          background={white}
          // p={"4vw"}
          px={"4vw"}
        >
          <Stack
            paddingX="10px"
            direction="row"
            justify="flex-start"
            align="flex-start"
            spacing="0px"
            overflow="hidden"
            alignSelf="stretch"
          ></Stack>
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
              mt="5vh"
              w="100%"
              justify="center"
              align="center"
              spacing="4vh"
            >
              <Logo w={"16vh"} spacing={"4vh"} />

              <Stack w="100%" spacing={"4vh"}>
                <Stack w="100%">
                  <KakaoLogin
                    token="f0b9cea901481ede3c202e108f61ef3e" // 카카오 개발자 사이트에서 발급받은 API 키를 입력하세요.
                    onSuccess={responseKaKao}
                    onFail={(error) => console.log(error)}
                    onLogout={() => console.log("로그아웃")}
                    style={{
                      padding: "10px",
                      backgroundColor: "#FEE500",
                      color: "#000000",
                      fontSize: "16px",
                    }}
                  ></KakaoLogin>
                  <FullButton
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
                </Stack>

                <HorizonLine text={"회원정보로 로그인하기"} />

                <EmailLoginForm />
              </Stack>

              <HStack w="100%" justifyContent={"space-between"}>
                <TextButton
                  text={"회원가입"}
                  onClick={async () => {
                    await logout();
                    navigate("/signup");
                  }}
                />
                <TextButton
                  text={"아이디 / 비밀번호 찾기"}
                  onClick={() => alert("준비중입니다.")}
                />
              </HStack>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </Container>
  );
};
