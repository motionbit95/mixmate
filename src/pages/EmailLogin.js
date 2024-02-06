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
      <Stack mt={"10vh"}>
        <Flex alignItems={"center"} justifyContent={"flex-end"}>
          {/* <Text fontSize={"xx-large"} fontWeight={"bold"}>
            이메일 로그인
          </Text> */}
          <CloseIcon onClick={() => navigate(-1)} />
        </Flex>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          direction={"row"}
          py={"4vh"}
        >
          {/* <SymbolLogo w={"10vh"} /> */}
          <Text
            fontSize={"x-large"}
            color={"gray.500"}
            fontFamily={"omyu_pretty"}
          >
            밥친구가 필요한 순간,
          </Text>
          <Text
            fontSize={"xx-large"}
            color={"gray.800"}
            fontFamily={"omyu_pretty"}
            fontWeight={"bold"}
          >
            디너메이트
          </Text>
        </Stack>
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
