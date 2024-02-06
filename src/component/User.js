import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getDisplayName } from "../js/API";
import { CustomButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { black, theme_bright_color, theme_primary_color } from "../App";
import { useEffect, useRef, useState } from "react";
import { get_default_avartar } from "../js/UserAPI";
import { upload_image } from "../js/Storage";
import { db_update, get_doc_data } from "../js/Database";
import { BsStarFill } from "react-icons/bs";

export const User = ({ data, ...props }) => {
  const navigate = useNavigate();
  const profileRef = useRef();
  const [value, setValue] = useState(data);

  const [profile_image, setProfileImage] = useState(data?.user_profile);
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
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // FileReader 객체 생성
      const reader = new FileReader();

      // 파일을 읽었을 때의 이벤트 핸들러 등록
      reader.onload = (e) => {
        // 읽은 데이터를 파일 상태로 설정하여 미리보기 업데이트
        setProfileImage(e.target.result);
      };
    }

    // firestore에 이미지 업로드
    let url = await upload_image(e);

    // 이미지 저장
    await db_update("user", value.doc_id, { user_profile: url });
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
      {value && (
        <HStack spacing={"2vw"} w={"100%"}>
          <Skeleton isLoaded={value}>
            <VStack alignItems={"center"} justifyContent={"center"}>
              <Avatar
                src={
                  profile_image
                    ? "profile_image"
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
    </Flex>
  );
};
