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

export const Login = () => {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    id: "",
    password: "",
  });

  function login() {
    console.log(account.id, account.password);
    if (account.id === "admin" || account.password === "test0000") {
      navigate("/home");
    } else {
      alert("로그인실패! 계정을 확인하세요");
      setAccount({ id: "", password: "" });
    }
  }
  return (
    <Container>
      <Stack
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
              fontFamily="Pretendard"
              fontWeight="black"
              fontSize="50px"
              color="#000000"
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
            <Button
              colorScheme="blue"
              width="313px"
              height="40px"
              maxWidth="100%"
              onClick={() => login()}
            >
              로그인하기
            </Button>
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              spacing="10px"
              overflow="hidden"
              alignSelf="stretch"
            >
              <Text
                fontFamily="SF Pro"
                fontWeight="regular"
                fontSize="14px"
                color="#8C8C8C"
                onClick={() => navigate("/signup")}
              >
                회원가입
              </Text>
              <Text
                fontFamily="SF Pro"
                fontWeight="regular"
                fontSize="14px"
                color="#8C8C8C"
              >
                비밀번호찾기
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
