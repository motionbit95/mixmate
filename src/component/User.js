import {
  Avatar,
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { getDisplayName } from "../js/API";
import { CustomButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import {
  black,
  gray_300,
  gray_500,
  theme_bright_color,
  theme_primary_color,
} from "../App";
import { useEffect, useRef, useState } from "react";
import { get_default_avartar } from "../js/UserAPI";
import { upload_image } from "../js/Storage";
import { db_update, get_doc_data } from "../js/Database";
import { BsStarFill } from "react-icons/bs";

export const User = ({ data, ...props }) => {
  const navigate = useNavigate();
  const profileRef = useRef();
  const [value, setValue] = useState(data);
  const [loading, setLoading] = useState(false);

  const [profile_image, setProfileImage] = useState(data?.user_profile);
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    if (!data) {
      const user = await get_doc_data("user", props.uid);
      setValue(user);
    }
  }

  // 이미지 업로드 함수
  const upload_profile = async (e) => {
    setLoading(true);
    // firestore에 이미지 업로드
    let url = await upload_image(e);
    setProfileImage(url);

    // 이미지 저장
    await db_update("user", value.doc_id, { user_profile: url });

    setLoading(false);

    // window.location.reload();
  };

  return (
    <Flex
      py={"1vh"}
      borderRadius={"2vh"}
      // _hover={{ bgColor: `${getSatuation(theme_primary_color)}.100` }}
      w="100%"
      // border={"1px solid #f1f1f1"}
      //   maxW={"400px"}
    >
      {" "}
      {loading ? (
        <Box bgColor={black} opacity={0.2}>
          <Center w="100vw" h="100vh" position={"fixed"} left={0}>
            <CircularProgress
              zIndex={9999}
              isIndeterminate
              color="blue.300"
              trackColor={gray_300}
            />
          </Center>
        </Box>
      ) : null}
      {value && (
        <HStack spacing={"2vw"} w={"100%"}>
          <Skeleton isLoaded={value}>
            <VStack alignItems={"center"} justifyContent={"center"}>
              <Avatar
                onClick={onOpen}
                src={
                  profile_image
                    ? profile_image
                    : get_default_avartar(value.user_gender, value.user_profile)
                }
              />
              {window.location.pathname.includes("/mypage") && (
                <Button size={"xs"} onClick={() => profileRef.current.click()}>
                  프로필수정
                </Button>
              )}
              <Input
                display={"none"}
                ref={profileRef}
                type="file"
                onChange={(e) => {
                  upload_profile(e);
                }}
              />
            </VStack>
          </Skeleton>
          <Stack w="100%">
            <HStack w="100%">
              <Text fontSize={"lg"} fontWeight={"bold"}>
                {getDisplayName(value.user_name)}
              </Text>
              <Stack
                direction="row"
                justify="center"
                align="center"
                spacing={"2px"}
              >
                <Icon color={"yellow.500"} as={BsStarFill} />
                <Text
                  fontWeight="medium"
                  fontSize="14px"
                  color={black}
                  textAlign="center"
                >
                  {isNaN(value.review_score / value.review_count)
                    ? "0.0"
                    : (value.review_score / value.review_count).toFixed(1)}
                </Text>
                <Text color={"#8c8c8c"} fontSize={"12px"}>
                  ({value.review_count ? value.review_count : 0})
                </Text>
              </Stack>
            </HStack>
            <Text fontSize={"12px"} whiteSpace={"pre-wrap"}>
              {value.user_type === "개인"
                ? `성별 : ${value.user_gender},\t\t매칭 금액 : ${value.user_price}만원\n식사 가능 동네 : ${value.user_place}\n좋아하는 음식 : ${value.user_food}`
                : `성별 : ${value.user_gender},\t\t매칭 금액 : ${value.user_price}만원\n코칭 가능 동네 : ${value.user_place}\n멘토 분야 : ${value.user_category}`}
              {/* {value.user_type === "개인"
                ? ""
                : `, 멘토 전문 분야 : ${value.user_category}`} */}
            </Text>
          </Stack>
          <VStack>
            {window.location.pathname === "/" && (
              <Text color={theme_primary_color}>
                {isNaN(parseFloat(value.distance).toFixed(1))
                  ? ""
                  : parseFloat(value.distance).toFixed(1) + "km"}
              </Text>
            )}
            {window.location.pathname === "/" && (
              <CustomButton
                code={theme_bright_color}
                w="80px"
                text={value.user_type === "개인" ? "매칭신청" : "코칭신청"}
                onClick={() => {
                  if (!window.location.pathname.includes("matching")) {
                    navigate("/matching", {
                      state: { data: value },
                    });
                  }
                }}
              />
            )}
          </VStack>
        </HStack>
      )}
      <Modal isCentered onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image src={profile_image} />
        </ModalContent>
      </Modal>
    </Flex>
  );
};
