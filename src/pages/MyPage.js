import {
  Stack,
  Icon,
  Text,
  Avatar,
  Button,
  Box,
  Skeleton,
  SkeletonText,
  IconButton,
  Textarea,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  ModalContent,
  ModalBody,
  Container,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { auth } from "../db/firebase_config";
import { db_update, get_doc_list } from "../js/Database";
import { TopHeader } from "../component/TopHeader";
import { useNavigate } from "react-router-dom";
import { display_age_range } from "../js/UserAPI";
import { SettingsIcon } from "@chakra-ui/icons";
import HorizonLine from "../component/HorizontalLine";
import { terms } from "../assets/terms";
import { black, gray_600, gray_800, gray_900, white } from "../App";
import { logout } from "../js/Auth";
import { User } from "../component/User";
import { Navbar } from "../component/Navbar";

export const MyPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const [info_text, setInfoText] = useState();
  const [info_edit_mode, setInfoEditMode] = useState(false);
  useEffect(() => {
    if (!user) {
      // 고객의 계정을 가지고 옵니다.
      auth.onAuthStateChanged(async function (user) {
        if (user) {
          let user_info = await get_doc_list("user", "user_id", user.uid);
          setUser(user_info[0]);
        } else {
          navigate("/login");
        }
      });
    }
  });

  return (
    <Container py={"60px"} px={0} minH={"100vh"}>
      <Stack
        px={0}
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        maxWidth="100%"
        background={white}
      >
        <TopHeader title={"마이페이지"} />
        <Stack
          px={"10px"}
          justify="flex-start"
          align="flex-start"
          spacing="16px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <Flex w={"100%"} h="80px">
            {user ? (
              <HStack w={"100%"} h="100%">
                <User data={user} />
                <IconButton
                  icon={<SettingsIcon />}
                  onClick={() => navigate("/modify", { state: { user: user } })}
                />
              </HStack>
            ) : (
              <Skeleton w={"100%"} h={"100%"}></Skeleton>
            )}
          </Flex>
          <HorizonLine />
          <Stack
            direction="row"
            justify="space-between"
            align="center"
            spacing="10px"
            alignSelf="stretch"
          >
            <Text fontWeight="semibold" fontSize="18px" color={gray_900}>
              프로필 소개말
            </Text>
            <Button
              size="sm"
              onClick={() => {
                if (info_edit_mode) {
                  // 문서 업데이트
                  console.log(user.doc_id, info_text);
                  db_update("user", user.doc_id, {
                    user_info: info_text,
                  });
                }
                setInfoEditMode(!info_edit_mode);
              }}
            >
              수정하기
            </Button>
          </Stack>
          {info_edit_mode ? (
            <Textarea
              defaultValue={user?.user_info}
              placeholder="소개글을 작성해주세요."
              onChange={(e) => setInfoText(e.target.value)}
            />
          ) : (
            <SkeletonText isLoaded={user}>
              <Text
                lineHeight="1.5"
                fontWeight="medium"
                fontSize="16px"
                color={user?.user_info ? gray_800 : gray_600}
                alignSelf="stretch"
              >
                {info_text
                  ? info_text
                  : user?.user_info
                  ? user?.user_info
                  : "소개글을 작성해주세요."}
              </Text>
            </SkeletonText>
          )}
          <HorizonLine />
          <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
            textAlign="center"
            onClick={() => onOpen()}
          >
            이용약관
          </Text>
          <HorizonLine />
          <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
            textAlign="center"
            onClick={() => navigate("/notice")}
          >
            공지사항
          </Text>
          <HorizonLine />
          <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
            textAlign="center"
          >
            문의하기
          </Text>
          <HorizonLine />
          <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
            textAlign="center"
            onClick={logout}
          >
            로그아웃
          </Text>

          <Navbar />

          <Modal isCentered onClose={onClose} size={"md"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent pt={"50px"}>
              <ModalHeader>이용약관</ModalHeader>
              <ModalCloseButton mt={"50px"} />
              <ModalBody>
                <Text fontSize={"small"} whiteSpace={"pre-wrap"}>
                  {terms}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}></Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Stack>
    </Container>
  );
};
