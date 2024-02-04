import { CloseIcon } from "@chakra-ui/icons";
import { Container, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TextButton } from "../component/Buttons";
import EmailLoginForm from "../component/EmailLoginForm";

const EmailLogin = () => {
  const navigate = useNavigate();
  return (
    <Container
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      p={"4vh"}
    >
      <Stack mt={"4vh"}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize={"xx-large"} fontWeight={"bold"}>
            이메일 로그인
          </Text>
          <CloseIcon onClick={() => navigate(-1)} />
        </Flex>
        <EmailLoginForm />
        <HStack mt={"4vh"} w="100%" justifyContent={"space-between"}>
          <TextButton
            text={"회원가입"}
            onClick={async () => {
              navigate("/signup");
            }}
          />
          <TextButton
            text={"아이디 / 비밀번호 찾기"}
            onClick={() => navigate("/find")}
          />
        </HStack>
        <Stack></Stack>
      </Stack>
    </Container>
  );
};

export default EmailLogin;
