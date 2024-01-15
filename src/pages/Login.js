import {
  Stack,
  Text,
  Input,
  Checkbox,
  Button,
  Container,
  CloseButton,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Container minW={"360px"}>
      <Center h={"100vh"} flexDirection={"column"}>
        <Flex w="100%">
          <CloseButton mt={4} />
        </Flex>
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
              fontSize="40px"
              color="#000000"
              textAlign="center"
            >
              MIX
              <br />
              MATE
            </Text>
            <Stack
              justify="center"
              align="flex-start"
              spacing="10px"
              width="313px"
              maxWidth="100%"
            >
              <Input placeholder="이메일" height="40px" alignSelf="stretch" />
              <Input placeholder="패스워드" height="40px" alignSelf="stretch" />
              <Checkbox defaultChecked variant="blue">
                자동로그인
              </Checkbox>
            </Stack>
            <Button
              colorScheme="blue"
              width="313px"
              height="40px"
              maxWidth="100%"
              onClick={() => navigate("home")}
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
                onClick={() => navigate("signup")}
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
      </Center>
    </Container>
  );
};
