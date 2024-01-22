import React from "react";
import { Container } from "@chakra-ui/react";
import { TopHeader } from "../component/TopHeader";
import { Stack, Avatar, Text } from "@chakra-ui/react";
import { Navbar } from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";

export const ChatList = () => {
  const navigate = useNavigate();
  return (
    <Container px={"0px"} py={"50px"} h={"100vh"}>
      <TopHeader title={"채팅"} />

      <Stack
        paddingX="10px"
        justify="flex-start"
        align="flex-start"
        spacing="0px"
        overflow="hidden"
        flex="1"
        alignSelf="stretch"
      >
        <Stack
          padding="10px"
          justify="flex-start"
          align="flex-start"
          spacing="0px"
          overflow="hidden"
          alignSelf="stretch"
          background="#FFFFFF"
        >
          <Stack
            onClick={() => navigate("test", { state: { chat_id: "test" } })}
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="20px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar name="TA" src=" " size="lg" />
            <Stack
              justify="flex-start"
              align="flex-start"
              spacing="10px"
              overflow="hidden"
              flex="1"
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="center"
                spacing="0px"
                overflow="hidden"
                height="19px"
                alignSelf="stretch"
              >
                <Stack
                  direction="row"
                  justify="space-between"
                  align="center"
                  spacing="5px"
                  flex="1"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="16px"
                    color="#000000"
                    textAlign="center"
                  >
                    송*혁
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontSize="14px"
                    color="#8C8C8C"
                    textAlign="center"
                  >
                    1분 전
                  </Text>
                </Stack>
              </Stack>
              <Text
                fontWeight="regular"
                fontSize="14px"
                color="#000000"
                textAlign="center"
              >
                안녕하세요:)
              </Text>
            </Stack>
          </Stack>
          <HorizonLine />
          <Stack
            onClick={() => navigate("/chat", { state: { chat_id: "test" } })}
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="20px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar name="TA" src=" " size="lg" />
            <Stack
              justify="flex-start"
              align="flex-start"
              spacing="10px"
              overflow="hidden"
              flex="1"
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="center"
                spacing="0px"
                overflow="hidden"
                height="19px"
                alignSelf="stretch"
              >
                <Stack
                  direction="row"
                  justify="space-between"
                  align="center"
                  spacing="5px"
                  flex="1"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="16px"
                    color="#000000"
                    textAlign="center"
                  >
                    송*혁
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontSize="14px"
                    color="#8C8C8C"
                    textAlign="center"
                  >
                    1분 전
                  </Text>
                </Stack>
              </Stack>
              <Text
                fontWeight="regular"
                fontSize="14px"
                color="#000000"
                textAlign="center"
              >
                안녕하세요:)
              </Text>
            </Stack>
          </Stack>
          <HorizonLine />
          <Stack
            onClick={() => navigate("/chat", { state: { chat_id: "test" } })}
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="20px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar name="TA" src=" " size="lg" />
            <Stack
              justify="flex-start"
              align="flex-start"
              spacing="10px"
              overflow="hidden"
              flex="1"
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="center"
                spacing="0px"
                overflow="hidden"
                height="19px"
                alignSelf="stretch"
              >
                <Stack
                  direction="row"
                  justify="space-between"
                  align="center"
                  spacing="5px"
                  flex="1"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="16px"
                    color="#000000"
                    textAlign="center"
                  >
                    송*혁
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontSize="14px"
                    color="#8C8C8C"
                    textAlign="center"
                  >
                    1분 전
                  </Text>
                </Stack>
              </Stack>
              <Text
                fontWeight="regular"
                fontSize="14px"
                color="#000000"
                textAlign="center"
              >
                안녕하세요:)
              </Text>
            </Stack>
          </Stack>
          <HorizonLine />
          <Stack
            onClick={() => navigate("/chat", { state: { chat_id: "test" } })}
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="20px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar name="TA" src=" " size="lg" />
            <Stack
              justify="flex-start"
              align="flex-start"
              spacing="10px"
              overflow="hidden"
              flex="1"
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="center"
                spacing="0px"
                overflow="hidden"
                height="19px"
                alignSelf="stretch"
              >
                <Stack
                  direction="row"
                  justify="space-between"
                  align="center"
                  spacing="5px"
                  flex="1"
                >
                  <Text
                    fontWeight="bold"
                    fontSize="16px"
                    color="#000000"
                    textAlign="center"
                  >
                    송*혁
                  </Text>
                  <Text
                    fontWeight="regular"
                    fontSize="14px"
                    color="#8C8C8C"
                    textAlign="center"
                  >
                    1분 전
                  </Text>
                </Stack>
              </Stack>
              <Text
                fontWeight="regular"
                fontSize="14px"
                color="#000000"
                textAlign="center"
              >
                안녕하세요:)
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Navbar />
    </Container>
  );
};
