import { Button, Center, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin(props) {
  const navigate = useNavigate();
  const account = {
    id: "admin",
    password: "1q2w3e4r!",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      account.id === e.target[0].value &&
      account.password === e.target[1].value
    ) {
      // 로컬 저장
      localStorage.setItem(
        "muggle-admin",
        JSON.stringify({
          id: "admin",
          password: "1q2w3e4r!",
        })
      );
      navigate("/dashboard");
    }
  };
  return (
    <Center minH={"100vh"}>
      <form onSubmit={handleLogin}>
        <VStack w={"100%"} spacing={4}>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            MUGGLE 관리자
          </Text>
          <Input isRequired placeholder="아이디를 입력하세요." />
          <Input
            isRequired
            type="password"
            placeholder="패스워드를 입력하세요."
          />
          <Button w={"100%"} type="submit">
            로그인
          </Button>
        </VStack>
      </form>
    </Center>
  );
}

export default AdminLogin;
