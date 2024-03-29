import {
  Stack,
  Icon,
  Text,
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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { auth } from "../db/firebase_config";
import {
  db_delete,
  db_update,
  get_doc_data,
  get_doc_list,
} from "../js/Database";
import { TopHeader } from "../component/TopHeader";
import { useNavigate } from "react-router-dom";
import { SettingsIcon } from "@chakra-ui/icons";
import HorizonLine from "../component/HorizontalLine";
import { terms } from "../assets/terms";
import { black, gray_600, gray_800, gray_900, white } from "../App";
import { importDefaultUser, logout } from "../js/Auth";
import { User } from "../component/User";
import { Navbar } from "../component/Navbar";
import { CustomButton } from "../component/Buttons";
import { deleteUser } from "firebase/auth";

export const MyPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const [info_text, setInfoText] = useState("");
  const [info_edit_mode, setInfoEditMode] = useState(false);
  const toast = useToast();
  useEffect(() => {
    auth.onAuthStateChanged(async (currentUser) => {
      const userInfo = await get_doc_data("user", currentUser?.uid);
      setUser(userInfo);

      if (!userInfo.user_phone && window.location.pathname.includes("mypage")) {
        window.confirm(
          "본인 인증이 안된 회원입니다. 회원 가입 화면으로 이동합니다."
        );
        {
          localStorage.setItem("ret_page", "/information");
          navigate("/signup");
          return;
        }
      }

      // if (!userInfo.user_food) {
      //   window.confirm(
      //     "회원 정보가 입력이 안된 회원입니다. 회원정보 입력 화면으로 이동합니다."
      //   );
      //   {
      //     navigate("/modify", { state: { user: user } });
      //     return;
      //   }
      // }
    });
  }, []);

  const onDeleteUser = async () => {
    if (window.confirm("정말 회원 탈퇴를 하시겠습니까?")) {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          await db_delete("user", currentUser?.uid);
          deleteUser(currentUser)
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              // An error ocurred
              // ...
            });
        }
      });
    }
  };

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
          <Flex w={"100%"}>
            {user ? (
              <Stack w={"100%"}>
                <HStack w={"100%"} h="100%">
                  <User data={user} />
                  <IconButton
                    icon={<SettingsIcon />}
                    onClick={() =>
                      navigate("/modify", { state: { user: user } })
                    }
                  />
                </HStack>
                {/* <HorizonLine />
                <Stack>
                  <Stack
                    direction="row"
                    justify="space-between"
                    align="center"
                    spacing="10px"
                    alignSelf="stretch"
                  >
                    <Text
                      fontWeight="semibold"
                      fontSize="18px"
                      color={gray_900}
                    >
                      프로필 소개말
                    </Text>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (info_edit_mode) {
                          if (!info_text && info_text?.length < 20) {
                            alert("소개글은 20자 이상 작성해주세요.");
                            return;
                          }
                          // 문서 업데이트
                          db_update("user", auth.currentUser.uid, {
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
                      minLength={20}
                      placeholder={
                        user?.user_type === "개인"
                          ? "내 주변 밥 친구들에게 노출되는 문구이며 자신만의 소개로 어필해주세요!"
                          : "본인의 커리어, 이력, 코칭 분야 등을 소개해주세요!"
                      }
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
                </Stack> */}
              </Stack>
            ) : (
              <Button onClick={() => navigate("/login")}>로그인하기</Button>
            )}
          </Flex>
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
            // onClick={() => navigate("/notice")}
          >
            공지사항
          </Text>
          <HorizonLine />
          <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
            textAlign="center"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            로그아웃
          </Text>
          <HorizonLine />
          <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
            textAlign="center"
            onClick={onDeleteUser}
          >
            탈퇴하기
          </Text>
          <HorizonLine />
          <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
            textAlign="center"
            onClick={() =>
              window.location.replace("http://pf.kakao.com/_pRxoBG")
            }
          >
            문의 및 신고하기
          </Text>
          <HorizonLine />
          {/* <Button onClick={importDefaultUser}>디폴트데이터삽입</Button> */}
          {/* <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
            textAlign="center"
            onClick={() =>
              toast({
                // title: "Account created.",
                description: addToDesktop(),
                status: "info",
                duration: 9000,
                isClosable: true,
              })
            }
          >
            웹사이트 바탕화면에 추가
          </Text>
          <HorizonLine /> */}

          <Navbar />

          <Modal isCentered onClose={onClose} size={"md"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader mt="50px">이용약관</ModalHeader>
              <ModalCloseButton mt="50px" />
              <ModalBody>
                <Text fontSize={"small"} whiteSpace={"pre-wrap"}>
                  {terms}
                </Text>
              </ModalBody>
              <ModalFooter>
                <CustomButton onClick={onClose} text={"확인했습니다."} />
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      </Stack>
    </Container>
  );
};
