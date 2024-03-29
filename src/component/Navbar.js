import { Box, Container, Stack, Text } from "@chakra-ui/layout";
import HorizonLine from "./HorizontalLine";
import { Icon } from "@chakra-ui/icon";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BsList, BsPerson, BsPersonFill } from "react-icons/bs";
import { MdChatBubble, MdChatBubbleOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { useState } from "react";
import { get_page_num } from "../js/UserAPI";
import { theme_primary_color } from "../App";

export const Navbar = () => {
  const navigate = useNavigate();
  const page = get_page_num();
  return (
    <Box w="100%" className="nav">
      <Stack>
        <Container p={0} border={"1px solid #d9d9d9"} bgColor={"white"}>
          <Stack
            paddingY="10px"
            direction="row"
            justify="space-between"
            align="flex-start"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Stack
              justify="center"
              align="center"
              spacing="0px"
              overflow="hidden"
              flex="1"
              onClick={() => {
                navigate("/");
              }}
            >
              <Icon
                as={page === 0 ? AiFillHome : AiOutlineHome}
                color={page === 0 ? theme_primary_color : "black"}
              />
              <Text
                fontWeight="medium"
                fontSize="12px"
                color={page === 0 ? theme_primary_color : "black"}
                textAlign="center"
              >
                홈
              </Text>
            </Stack>
            <Stack
              justify="center"
              align="center"
              spacing="0px"
              overflow="hidden"
              flex="1"
              onClick={() => {
                navigate("/details");
              }}
            >
              <Icon
                as={BsList}
                color={page === 1 ? theme_primary_color : "black"}
              />
              <Text
                fontWeight="medium"
                fontSize="12px"
                color={page === 1 ? theme_primary_color : "black"}
                textAlign="center"
              >
                신청내역
              </Text>
            </Stack>
            <Stack
              justify="center"
              align="center"
              spacing="0px"
              overflow="hidden"
              flex="1"
              onClick={() => {
                navigate("/chat");
              }}
            >
              <Icon
                as={page === 2 ? MdChatBubble : MdChatBubbleOutline}
                color={page === 2 ? theme_primary_color : "black"}
              />
              <Text
                fontWeight="medium"
                fontSize="12px"
                color={page === 2 ? theme_primary_color : "black"}
                textAlign="center"
              >
                채팅
              </Text>
            </Stack>
            <Stack
              justify="center"
              align="center"
              spacing="0px"
              overflow="hidden"
              flex="1"
              onClick={() => {
                navigate("/mypage");
              }}
            >
              <Icon
                as={page === 3 ? BsPersonFill : BsPerson}
                color={page === 3 ? theme_primary_color : "black"}
              />
              <Text
                fontWeight="medium"
                fontSize="12px"
                color={page === 3 ? theme_primary_color : "black"}
                textAlign="center"
              >
                마이페이지
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Box>
  );
};
