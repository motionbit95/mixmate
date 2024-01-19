import {
  Container,
  Stack,
  Box,
  Text,
  Input,
  Icon,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { TopHeader } from "../component/TopHeader";
import { useLocation } from "react-router-dom";
import { FiSend } from "react-icons/fi";

export const Chat = () => {
  const location = useLocation();
  const chat_id = location.state.chat_id;
  return (
    <Container py="50px" minH={"100vh"}>
      <TopHeader title={chat_id} />

      <Stack
        paddingX="20px"
        justify="flex-start"
        align="center"
        spacing="10px"
        overflow="hidden"
        flex="1"
        alignSelf="stretch"
      >
        <Box
          borderRadius="10px"
          height="100px"
          alignSelf="stretch"
          background="#F1F1F1"
        />
        <Stack
          direction="row"
          justify="flex-end"
          align="flex-end"
          spacing="5px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Text
            fontFamily="SF Pro"
            lineHeight="2"
            fontWeight="regular"
            fontSize="10px"
            color="#8C8C8C"
          >
            오후 5:32 읽음
          </Text>
          <Stack
            paddingX="20px"
            paddingY="10px"
            borderLeftRadius="20px"
            borderBottomRadius="20px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="10px"
            overflow="hidden"
            background="#3182CE"
          >
            <Text
              fontFamily="SF Pro"
              fontWeight="regular"
              fontSize="16px"
              color="#FFFFFF"
              flex="1"
            >
              안녕하세요. 문의드립니다.
            </Text>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justify="flex-start"
          align="flex-end"
          spacing="5px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Stack
            paddingX="20px"
            paddingY="10px"
            borderRightRadius="20px"
            borderBottomRadius="20px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="10px"
            overflow="hidden"
            background="#D9D9D9"
          >
            <Text
              fontFamily="SF Pro"
              fontWeight="regular"
              fontSize="16px"
              color="#000000"
              flex="1"
            >
              안녕하세요. 어떤 일로 문의주셨을까요?
            </Text>
          </Stack>
          <Text
            fontFamily="SF Pro"
            lineHeight="2"
            fontWeight="regular"
            fontSize="10px"
            color="#8C8C8C"
          >
            오후 5:32 읽음
          </Text>
        </Stack>
      </Stack>
      <Stack
        position={"absolute"}
        bottom={"50px"}
        left={0}
        paddingX="20px"
        paddingY="10px"
        direction="row"
        w={"100%"}
        justify="flex-start"
        align="center"
        spacing="10px"
        overflow="hidden"
        alignSelf="stretch"
        background="#FFFFFF"
      >
        <Input placeholder="메시지를 입력하세요." height="40px" flex="1" />
        <Icon as={FiSend} />
      </Stack>
    </Container>
  );
};
