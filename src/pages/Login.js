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
import { auth_login_password, auth_set_local } from "../js/Auth";
import { auth } from "../db/firebase_config";
import {
  bg,
  black,
  gray_50,
  gray_600,
  theme_primary_color,
  white,
} from "../App";

// Firebase deps
// v9에서 v8 호환 API
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Hooks
import { useAuthState } from "../js/chatHooks";

import HorizonLine from "../component/HorizontalLine";
import { Logo } from "../component/Logo";
import { FullButton, TextButton } from "../component/Buttons";
import EmailLoginForm from "../component/EmailLoginForm";

firebase.initializeApp({
  apiKey: "AIzaSyBwCYJaEn1Ey5rU8Le5Adu_JvdJodQAOe8",
  authDomain: "dinnermate-8d37b.firebaseapp.com",
  projectId: "dinnermate-8d37b",
  storageBucket: "dinnermate-8d37b.appspot.com",
  messagingSenderId: "698586027961",
  appId: "1:698586027961:web:bfacf1423d3c895397c868",
  measurementId: "G-YJSWYJ83RK",
});

export const Login = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    id: "",
    password: "",
  });

  async function login() {
    let login_uid = await auth_login_password(account.id, account.password);
    // console.log(login_uid);
    if (login_uid) {
      // console.log("로그인 성공! : ", auth.currentUser);
      // auth_set_local();
      navigate("/");
    } else {
      alert("로그인실패! 계정을 확인하세요");
      setAccount({ id: "", password: "" });
    }
  }

  const { user, initializing } = useAuthState(firebase.auth());

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process

    try {
      await firebase.auth().signInWithPopup(provider);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
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
          maxWidth="360px"
          background={white}
          p={"4vw"}
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
              <Logo w={"16vh"} h={"16vh"} spacing={"4vh"} />

              <Stack w="100%" spacing={"4vh"}>
                <Stack w="100%">
                  <FullButton
                    onClick={() => alert("준비중입니다.")}
                    text={"카카오로 로그인하기"}
                    code={"yellow.200"}
                  />
                  <FullButton
                    onClick={signInWithGoogle}
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
                  onClick={() => navigate("/signup")}
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
