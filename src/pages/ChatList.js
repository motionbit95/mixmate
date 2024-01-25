import React, { useEffect, useState } from "react";
import { Button, Container } from "@chakra-ui/react";
import { TopHeader } from "../component/TopHeader";
import { Stack, Avatar, Text } from "@chakra-ui/react";
import { Navbar } from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";
import { auth } from "../db/firebase_config";
import { matching_get_list } from "../js/MatchingAPI";
import { get_doc_data, get_doc_list } from "../js/Database";
import {
  Unix_timestamp,
  compareTimestampWithCurrentTime,
  getDisplayName,
} from "../js/API";

export const ChatList = () => {
  const navigate = useNavigate();
  const [machingList, setMatchingList] = useState();
  const [chatList, setChatList] = useState();
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = async () => {
    auth.onAuthStateChanged(async function (user) {
      let userList = await get_doc_list("user", "user_id", user.uid);
      setUserInfo(userList[0]);

      let sender = await matching_get_list(0);
      let receiver = await matching_get_list(1);
      let total = [...sender, ...receiver];
      setMatchingList(total);
      let chatList = [];
      total.forEach(async (element) => {
        console.log("element", element);
        let chat = await get_doc_data(
          `messages-${element.matching_payment}`,
          "chat_info"
        );
        console.log(chat);
        chatList.push({ ...chat, isSender: user.uid === chat.sender.user_id });
        setChatList(chatList);
        console.log(chatList);
      });
    });
  };
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
          {machingList?.length === chatList?.length &&
            machingList?.map((value, index) => (
              <Stack w={"100%"}>
                <Stack
                  onClick={() => {
                    navigate(`/chat/messages-${value.matching_payment}`, {
                      state: {
                        chat_id: value.matching_payment,
                        data: value,
                      },
                    });
                  }}
                  paddingY="10px"
                  direction="row"
                  justify="flex-start"
                  align="center"
                  spacing="20px"
                  overflow="hidden"
                  alignSelf="stretch"
                >
                  <Avatar
                    bg={
                      value.isSender
                        ? value.matching_reciever.user_gender === "남"
                          ? "teal.500"
                          : "red.500"
                        : value.matching_sender.user_gender === "남"
                        ? "teal.500"
                        : "red.500"
                    }
                    src={
                      value.isSender
                        ? value.matching_reciever.user_profile
                        : value.matching_sender.user_profile
                    }
                    size="lg"
                  />
                  <Stack
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    overflow="hidden"
                    flex="1"
                    minH={"40px"}
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
                          {getDisplayName(
                            value.isSender
                              ? value.matching_reciever.user_name
                              : value.matching_sender.user_name
                          )}
                        </Text>
                        <Text
                          fontWeight="regular"
                          fontSize="14px"
                          color="#8C8C8C"
                          textAlign="center"
                        >
                          {compareTimestampWithCurrentTime(
                            chatList[index]?.timestamp
                          )}
                        </Text>
                      </Stack>
                    </Stack>
                    <Text
                      fontWeight="regular"
                      fontSize="14px"
                      color="#000000"
                      textAlign="center"
                    >
                      {chatList[index]?.lastmessage}
                    </Text>
                  </Stack>
                </Stack>
                <HorizonLine />
              </Stack>
            ))}
        </Stack>
      </Stack>

      <Navbar />
    </Container>
  );
};
