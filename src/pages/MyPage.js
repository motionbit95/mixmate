import {
  Stack,
  Icon,
  Text,
  Avatar,
  Button,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { MdChevronLeft, MdChatBubbleOutline } from "react-icons/md";
import { BsStarFill, BsList, BsPerson } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Navbar } from "../component/Navbar";
import { useEffect, useState } from "react";
import { auth } from "../db/firebase_config";
import { get_doc_info } from "../js/Database";
import { TopHeader } from "../component/TopHeader";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    // 고객의 계정을 가지고 옵니다.
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        // User is signed in.

        // 유저의 이메일 속성으로 유저 테이블의 정보에 접근합니다.
        let user_info = await get_doc_info("user", "user_email", user.email);
        set_data(user_info);
      } else {
        // No user is signed in.
        // 로그인 페이지로 이동
        navigate("/");
      }
    });
  });

  function set_data(user_info) {
    console.log(user_info);
    if (!user) setUser(user_info);
  }

  return (
    <Stack
      justify="flex-start"
      align="center"
      spacing="0px"
      overflow="hidden"
      width="393px"
      height="852px"
      maxWidth="100%"
      background="#FFFFFF"
    >
      <TopHeader title={"마이페이지"} />
      <Stack
        pt={"50px"}
        paddingX="20px"
        justify="flex-start"
        align="flex-start"
        spacing="16px"
        overflow="hidden"
        flex="1"
        alignSelf="stretch"
      >
        <Stack
          paddingY="10px"
          direction="row"
          justify="flex-start"
          align="center"
          spacing="10px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Skeleton isLoaded={user}>
            <Avatar name="" src=" " size="lg" />
          </Skeleton>
          <Stack
            justify="flex-start"
            align="flex-start"
            spacing="10px"
            overflow="hidden"
            height="78px"
            flex="1"
          >
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              spacing="5px"
              overflow="hidden"
              height="19px"
              alignSelf="stretch"
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="center"
                spacing="5px"
              >
                <Text
                  fontFamily="Inter"
                  fontWeight="bold"
                  fontSize="16px"
                  color="#000000"
                  textAlign="center"
                >
                  송*혁
                </Text>
                <Icon as={BsStarFill} />
                <Text
                  fontFamily="Inter"
                  fontWeight="medium"
                  fontSize="16px"
                  color="#000000"
                  textAlign="center"
                >
                  5.0
                </Text>
                <Text
                  fontFamily="Inter"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#8C8C8C"
                  textAlign="center"
                >
                  (169)
                </Text>
              </Stack>
              <Box />
            </Stack>
            <Text
              fontFamily="Inter"
              lineHeight="1.42"
              fontWeight="medium"
              fontSize="12px"
              color="#000000"
              alignSelf="stretch"
            >
              나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 : 서울 성북구,
              역삼동 좋아하는 취미: 테니스, 골프
            </Text>
          </Stack>
          <Button size="sm">수정하기</Button>
        </Stack>
        <span className="unsupported" />
        <Stack
          direction="row"
          justify="space-between"
          align="center"
          spacing="10px"
          alignSelf="stretch"
        >
          <Text
            fontFamily="Inter"
            fontWeight="semibold"
            fontSize="18px"
            color="#111111"
          >
            프로필 소개말
          </Text>
          <Button size="sm">수정하기</Button>
        </Stack>
        <Text
          fontFamily="Inter"
          lineHeight="1.5"
          fontWeight="medium"
          fontSize="16px"
          color="#4E4E4E"
          alignSelf="stretch"
        >
          안녕하세요! 저는 성북구 역삼동에 거주하는 30~35세의 남성입니다.
          테니스와 골프를 즐기며, 스포츠를 통해 삶의 균형을 찾고 있습니다.
          사람들과의 소통을 즐기며 새로운 친구들을 만나고 싶어하는 성격이에요.
          함께 즐길 취미나 이야기가 있다면 언제든지 말씀해주세요! 즐거운 인연이
          되길 기대하고 있습니다. 😊
        </Text>
        <span className="unsupported" />
        <Text
          fontFamily="Inter"
          fontWeight="semibold"
          fontSize="18px"
          color="#000000"
          textAlign="center"
        >
          이용약관
        </Text>
        <span className="unsupported" />
        <Text
          fontFamily="Inter"
          fontWeight="semibold"
          fontSize="18px"
          color="#000000"
          textAlign="center"
        >
          공지사항
        </Text>
        <span className="unsupported" />
        <Text
          fontFamily="Inter"
          fontWeight="semibold"
          fontSize="18px"
          color="#000000"
          textAlign="center"
        >
          문의하기
        </Text>
        <span className="unsupported" />
        <Text
          fontFamily="Inter"
          fontWeight="semibold"
          fontSize="18px"
          color="#000000"
          textAlign="center"
        >
          로그아웃
        </Text>
        <span className="unsupported" />
      </Stack>
    </Stack>
  );
};
