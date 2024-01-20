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
} from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { auth } from "../db/firebase_config";
import { db_update, get_doc_info } from "../js/Database";
import { TopHeader } from "../component/TopHeader";
import { useNavigate } from "react-router-dom";
import { display_age_range } from "../js/UserAPI";
import { SettingsIcon } from "@chakra-ui/icons";
import HorizonLine from "../component/HorizontalLine";
import { terms } from "../assets/terms";
import { black, gray_600, gray_800, gray_900, white } from "../App";
import { sign_out } from "../js/Auth";

export const MyPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const [info_text, setInfoText] = useState();
  const [info_edit_mode, setInfoEditMode] = useState(false);
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
        navigate("/login");
      }
    });
  });

  function set_data(user_info) {
    console.log(user_info);
    if (!user) setUser(user_info);
  }

  return (
    <Container px={0}>
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
          pt={"50px"}
          justify="flex-start"
          align="flex-start"
          spacing="16px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <Stack
            //   paddingY="10px"
            mt={"20px"}
            direction="row"
            justify="flex-start"
            align="flex-start"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Skeleton borderRadius={"100px"} isLoaded={user}>
              <Avatar src={user?.user_profile} size="lg" />
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
                <SkeletonText isLoaded={user}>
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="5px"
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="18px"
                      color={black}
                      textAlign="center"
                    >
                      {user?.user_name.slice(0, -1) + "*"}
                    </Text>
                    <Icon as={BsStarFill} />
                    <Text
                      fontWeight="medium"
                      fontSize="18px"
                      color={black}
                      textAlign="center"
                    >
                      5.0
                    </Text>
                    <Text
                      fontWeight="medium"
                      fontSize="16px"
                      color={gray_600}
                      textAlign="center"
                    >
                      (169)
                    </Text>
                  </Stack>
                </SkeletonText>
                <Box />
              </Stack>
              <SkeletonText isLoaded={user}>
                <Text
                  lineHeight="1.42"
                  fontWeight="medium"
                  fontSize="12px"
                  color={black}
                  alignSelf="stretch"
                >
                  {`나이 : ${display_age_range(33)}, 매칭 금액 : ${
                    user?.user_price
                  }만원, 매칭 가능 동네 : ${user?.user_place}`}
                </Text>
              </SkeletonText>
            </Stack>
            <IconButton
              variant={"unstyled"}
              icon={<SettingsIcon />}
              size="sm"
            />
          </Stack>
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
              onClick={async () => {
                setInfoEditMode(!info_edit_mode);
                if (info_edit_mode) {
                  // 문서 업데이트
                  console.log(user.user_id);
                  await db_update("user", user.user_id, {
                    user_info: info_text,
                  });
                }
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
            onClick={sign_out}
          >
            로그아웃
          </Text>
          <HorizonLine />

          <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>이용약관</ModalHeader>
              <ModalCloseButton />
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
