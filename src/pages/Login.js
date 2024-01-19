import {
  Stack,
  Text,
  Input,
  Checkbox,
  Button,
  Container,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth_login_password, auth_set_local } from "../js/Auth";
import { auth } from "../db/firebase_config";
import { black, gray_600, white } from "../App";

// Firebase deps
// v9에서 v8 호환 API
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Hooks
import { useAuthState } from "../js/chatHooks";

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
    <Container>
      <Stack
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
          direction="row"
          justify="center"
          align="center"
          spacing="10px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <Stack justify="center" align="center" spacing="40px">
            <Text
              fontWeight="black"
              fontSize="50px"
              color={black}
              textAlign="center"
            >
              식사회
            </Text>
            <Stack
              justify="center"
              align="flex-start"
              spacing="10px"
              width="313px"
              maxWidth="100%"
            >
              <Input
                value={account.id}
                type="text"
                placeholder="아이디"
                height="40px"
                alignSelf="stretch"
                onChange={(e) =>
                  setAccount({ id: e.target.value, password: account.password })
                }
              />
              <Input
                value={account.password}
                type="password"
                placeholder="패스워드"
                height="40px"
                alignSelf="stretch"
                onChange={(e) =>
                  setAccount({ id: account.id, password: e.target.value })
                }
              />
              <Checkbox defaultChecked variant="blue">
                자동로그인
              </Checkbox>
            </Stack>
            <Stack>
              <Button
                colorScheme="blue"
                width="313px"
                height="40px"
                maxWidth="100%"
                onClick={() => login()}
              >
                로그인하기
              </Button>
              <Button
                variant={"outline"}
                colorScheme="gray"
                width="313px"
                height="40px"
                maxWidth="100%"
                onClick={signInWithGoogle}
              >
                구글 로그인하기
              </Button>
            </Stack>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              spacing="10px"
              overflow="hidden"
              alignSelf="stretch"
            >
              <Text
                fontWeight="regular"
                fontSize="14px"
                color={gray_600}
                onClick={() => navigate("/signup")}
              >
                회원가입
              </Text>
              <Text fontWeight="regular" fontSize="14px" color={gray_600}>
                비밀번호찾기
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
