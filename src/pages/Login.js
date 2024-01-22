import {
  Stack,
  Text,
  Input,
  Checkbox,
  Button,
  Container,
  Image,
  Flex,
  Box,
  Center,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInGoogle, _sign_out } from "../js/Auth";
import { auth } from "../db/firebase_config";
import {
  bg,
  black,
  gray_50,
  gray_600,
  theme_primary_color,
  white,
} from "../App";

// Hooks
import { useAuthState } from "../js/Hooks";

import HorizonLine from "../component/HorizontalLine";
import { Logo } from "../component/Logo";
import { FullButton, TextButton } from "../component/Buttons";
import EmailLoginForm from "../component/EmailLoginForm";
import { signOut } from "firebase/auth";
import { db_add, db_update, get_doc_list } from "../js/Database";
import { formatDate } from "date-fns";
import KakaoLogin from "react-kakao-login";

export const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuthState(auth);

  const [account, setAccount] = useState({
    id: "",
    password: "",
  });

  const responseKaKao = (response) => {
    console.log(response);
    // 카카오톡 로그인 성공 시 처리 로직을 여기에 추가합니다.
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
                  {/* <FullButton
                    onClick={() => alert("준비중입니다.")}
                    text={"카카오로 로그인하기"}
                    code={"yellow.200"}
                  /> */}
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
                      await _sign_out();

                      await signInGoogle();

                      let userList = await get_doc_list(
                        "user",
                        "user_id",
                        user.uid
                      );

                      if (userList.length > 0) {
                        let docId = "";
                        docId = userList[0].doc_id;
                        console.log("doc!", docId);
                        await db_update("user", docId, {
                          user_id: user.uid,
                        });

                        console.log(userList[0], user.uid);
                      }

                      if (!userList[0].user_password) {
                        navigate("/signup");
                      } else if (!userList[0].user_price) {
                        navigate("/info");
                      } else {
                        navigate("/");
                      }
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
                    await _sign_out();
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
