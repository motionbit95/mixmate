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
import {
  auth_login_password,
  auth_set_local,
  signInWithGoogle,
  sign_out,
} from "../js/Auth";
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
import { useAuthState } from "../js/chatHooks";

import HorizonLine from "../component/HorizontalLine";
import { Logo } from "../component/Logo";
import { FullButton, TextButton } from "../component/Buttons";
import EmailLoginForm from "../component/EmailLoginForm";
import { signOut } from "firebase/auth";

export const Login = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    id: "",
    password: "",
  });

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
                  <FullButton
                    onClick={() => alert("준비중입니다.")}
                    text={"카카오로 로그인하기"}
                    code={"yellow.200"}
                  />
                  <FullButton
                    onClick={async () => {
                      await signInWithGoogle();
                      //회원가입 1step으로 이동
                      navigate("/signup");
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
                    await sign_out();
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
