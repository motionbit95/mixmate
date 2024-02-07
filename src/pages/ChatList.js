import React, { useEffect, useState } from "react";
import { Button, Center, Container, HStack, VStack } from "@chakra-ui/react";
import { TopHeader } from "../component/TopHeader";
import { Stack, Avatar, Text } from "@chakra-ui/react";
import { Navbar } from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";
import { auth } from "../db/firebase_config";
import { matching_get_list } from "../js/MatchingAPI";
import { get_doc_data, get_doc_list } from "../js/Database";
import { compareTimestampWithCurrentTime, getDisplayName } from "../js/API";
import { gray_600 } from "../App";
import { get_default_avartar } from "../js/UserAPI";

export const ChatList = () => {
  const navigate = useNavigate(); // 채팅방 이동 시 사용

  //# chat 데이터와 matching 데이터 간 데이터 공유 필요
  //# 현재는 두 데이터가 분리되어 있으므로 채팅리스트와 매칭 리스트를 두개 다 불러온다.
  const [machingList, setMatchingList] = useState();
  const [chatList, setChatList] = useState();

  // 처음 로딩 시 chatList / matchingList 를 저장한다.
  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = async () => {
    auth.onAuthStateChanged(async function (user) {
      // 본인이 sender인 매칭리스트와 본인이 receiver인 매칭리스트를 가지고 와서 배열에 담는다
      let sender = await matching_get_list(0);
      let receiver = await matching_get_list(1);
      let total = [...sender, ...receiver]; // total matching 배열
      // 상태 변수에 저장
      setMatchingList(total);
      // chat list를 담는다.
      let chatList = []; // 초기화
      total.forEach(async (element) => {
        // 결제 id(orderId)에 따른 채팅방 정보를 가지고 온다. (sender, receiver 정보, 마지막 메세지, 시간 등등)
        let chat = await get_doc_data(
          `message-${element.matching_payment}`,
          "chat_info"
        );
        // chatList에 채팅 데이터를 담는다. 현재 본인이 sender인지, 아닌지 flag도 함께 저장한다.

        let sender = await get_doc_data("user", element.sender);
        let receiver = await get_doc_data("user", element.receiver);
        chatList.push({
          ...chat,
          matching_payment: element.matching_payment,
          matching_sender: sender,
          matching_receiver: receiver,
          isSender: user?.uid === sender?.doc_id,
        });

        // 상태 변수에 저장
        setChatList(chatList);
      });
    });
    //   if (user) {
    //     // 본인이 sender인 매칭리스트와 본인이 receiver인 매칭리스트를 가지고 와서 배열에 담는다
    //     let sender = await matching_get_list(0);
    //     let receiver = await matching_get_list(1);
    //     let total = [...sender, ...receiver]; // total matching 배열
    //     // 상태 변수에 저장
    //     setMatchingList(total);
    //     // chat list를 담는다.
    //     let chatList = []; // 초기화
    //     total.forEach(async (element) => {
    //       // 결제 id(orderId)에 따른 채팅방 정보를 가지고온다. (sender, receiver 정보, 마지막 메세지, 시간 등등)
    //       let chat = await get_doc_data(
    //         `messages-${element.matching_payment}`,
    //         "chat_info"
    //       );
    //       // chatList에 채팅 데이터를 담는다. 현재 본인이 sender인지, 아닌지 flag도 함께 저장한다.
    //       chatList.push({
    //         ...chat,
    //         isSender: user?.uid === chat?.sender?.user_id,
    //       });
    //       // 상태 변수에 저장
    //       setChatList(chatList);
    //     });
    //   }
    // });
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
          {/* 채팅 리스트 & 매칭 리스트가 있을 때 */}
          {chatList &&
            chatList.map((value, index) => (
              <Stack w={"100%"} key={index}>
                <Stack
                  onClick={() => {
                    navigate(`/chat/message-${value.matching_payment}`, {
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
                    src={
                      value.isSender
                        ? get_default_avartar(
                            value.matching_receiver.user_gender,
                            value.matching_receiver.user_profile
                          )
                        : get_default_avartar(
                            value.matching_sender.user_gender,
                            value.matching_sender.user_profile
                          )
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
                              ? value.matching_receiver.user_name
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
                    <HStack w={"100%"} justify="space-between">
                      <Text
                        fontWeight="regular"
                        fontSize="14px"
                        color="#000000"
                        textAlign="center"
                      >
                        {chatList[index]?.lastmessage}
                      </Text>
                      {((value.isSender &&
                        chatList[index]?.sender_isRead !== 0) ||
                        (!value.isSender &&
                          chatList[index]?.receiver_isRead !== 0)) && (
                        <Center
                          bgColor={"red"}
                          w={"24px"}
                          h={"24px"}
                          borderRadius={"full"}
                        >
                          <Text color={"white"}>
                            {value.isSender
                              ? chatList[index]?.sender_isRead
                              : chatList[index]?.receiver_isRead}
                          </Text>
                        </Center>
                      )}
                    </HStack>
                  </Stack>
                </Stack>
                <HorizonLine />
              </Stack>
            ))}
          {!chatList && (
            <Center w={"100%"} minH={"80vh"}>
              <Text
                textAlign={"center"}
                fontSize={"sm"}
                whiteSpace={"pre-wrap"}
                color={gray_600}
                lineHeight={"4vh"}
              >
                {"매칭 신청을 하시면\n상대방과 자동으로 채팅방이 생성됩니다."}
              </Text>
            </Center>
          )}
        </Stack>
      </Stack>

      <Navbar />
    </Container>
  );
};
