import { Stack, Avatar, Input, Button, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Stack
        paddingY="10px"
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
          padding="10px"
          direction="row"
          justify="center"
          align="center"
          spacing="10px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <Stack justify="flex-start" align="center" spacing="50px">
            <Avatar name="" src=" " size="2xl" />
            <Stack
              justify="flex-start"
              align="flex-start"
              spacing="10px"
              w={"100%"}
            >
              <Input placeholder="실명" height="40px" alignSelf="stretch" />
              <Input placeholder="아이디" height="40px" alignSelf="stretch" />
              <Input placeholder="패스워드" height="40px" alignSelf="stretch" />
              <Input
                placeholder="패스워드 확인"
                height="40px"
                alignSelf="stretch"
              />
            </Stack>
            <Button
              colorScheme="blue"
              width="313px"
              height="40px"
              maxWidth="100%"
              onClick={() => navigate("/info")}
            >
              본인인증하기
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
