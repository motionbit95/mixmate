import {
  Stack,
  Avatar,
  Input,
  Text,
  Button,
  Box,
  Checkbox,
  Container,
  Center,
  Flex,
  CloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  return (
    <Container minW={"360px"} py={4}>
      <Flex w="100%">
        <CloseButton onClick={() => navigate(-1)} />
      </Flex>
      <Center h={"100%"} flexDirection={"column"}>
        <Stack
          justify="flex-start"
          align="center"
          spacing="41px"
          overflow="hidden"
          width="100%"
          // height="852px"
          maxWidth="100%"
          background="#FFFFFF"
        >
          <Stack justify="center" align="center" spacing="30px">
            <Avatar name="TA" src=" " size="2xl" />
            <Stack justify="flex-start" align="flex-start" spacing="10px">
              <Input placeholder="실명" height="40px" alignSelf="stretch" />
              <Input placeholder="아이디" height="40px" alignSelf="stretch" />
              <Input placeholder="패스워드" height="40px" alignSelf="stretch" />
              <Input
                placeholder="패스워드 확인"
                height="40px"
                alignSelf="stretch"
              />
              <Input
                placeholder="패스워드 확인"
                height="40px"
                alignSelf="stretch"
              />
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="77px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="SF Pro"
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="14px"
                  color="#000000"
                >
                  성별
                </Text>
                <Stack
                  size="md"
                  isDisabled={false}
                  defaultChecked
                  colorScheme="blue"
                  direction="row"
                  justify="flex-start"
                  align="center"
                >
                  남
                </Stack>
                <Stack
                  size="md"
                  isDisabled={false}
                  defaultChecked={false}
                  colorScheme="blue"
                  direction="row"
                  justify="flex-start"
                  align="center"
                >
                  여
                </Stack>
              </Stack>
              <Input
                placeholder="생년월일(YYYY.MM.DD)"
                height="40px"
                alignSelf="stretch"
              />
              <Input placeholder="이메일" height="40px" alignSelf="stretch" />
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Input placeholder="휴대폰번호" width="233px" height="40px" />
                <Button width="80px" height="40px">
                  인증하기
                </Button>
              </Stack>
              <Flex
                w={"100%"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Checkbox defaultChecked variant="blue" width="234.63px">
                  이용약관에 동의합니다.
                </Checkbox>
                <Text
                  fontFamily="SF Pro"
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="14px"
                  color="#8C8C8C"
                  width="66.02px"
                >
                  자세히보기
                </Text>
              </Flex>
            </Stack>
            <Button
              colorScheme="blue"
              width="313px"
              height="40px"
              maxWidth="100%"
              onClick={() => navigate(-1)}
            >
              회원가입하기
            </Button>
          </Stack>
        </Stack>
      </Center>
    </Container>
  );
};
