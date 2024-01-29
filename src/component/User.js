import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { getDisplayName } from "../js/API";
import { CustomButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { theme_bright_color, theme_primary_color } from "../App";
import { useEffect, useRef, useState } from "react";
import { get_avg_user_score, get_default_avartar } from "../js/UserAPI";
import { upload_image } from "../js/Storage";
import { db_update } from "../js/Database";

export const User = ({ data }) => {
  const navigate = useNavigate();
  const profileRef = useRef();
  useEffect(() => {
    get_avg_score();
  }, []);

  const [profile_image, setProfileImage] = useState(data.user_profile);

  const get_avg_score = async () => {
    let score = await get_avg_user_score(data.user_id);
  };

  // 이미지 업로드 함수
  const upload_profile = async (e) => {
    // firestore에 이미지 업로드
    let url = await upload_image(e);

    setProfileImage(url);

    // 이미지 저장
    db_update("user", data.doc_id, { user_profile: url });
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
      {data && (
        <HStack spacing={"2vw"} w={"100%"}>
          <Skeleton isLoaded={data}>
            <VStack alignItems={"center"} justifyContent={"center"}>
              <Avatar
                src={
                  profile_image
                    ? profile_image
                    : get_default_avartar(data.user_gender, data.user_profile)
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
            <HStack justifyContent={"space-between"} w="100%">
              <Text fontSize={"lg"} fontWeight={"bold"}>
                {getDisplayName(data.user_name)}
              </Text>
            </HStack>
            <Text fontSize={"12px"} whiteSpace={"pre-wrap"}>
              {data.user_type === "개인"
                ? `성별 : ${data.user_gender}, 매칭 금액 : ${data.user_price}만원,\n식사 가능 동네 : ${data.user_place},\n좋아하는 음식 : ${data.user_food}`
                : `성별 : ${data.user_gender}, 매칭 금액 : ${data.user_price}만원,\n코칭 가능 동네 : ${data.user_place},\n멘토 분야 : ${data.user_category}`}
              {/* {data.user_type === "개인"
                ? ""
                : `, 멘토 전문 분야 : ${data.user_category}`} */}
            </Text>
          </Stack>
          <VStack>
            {window.location.pathname === "/" && (
              <Text color={theme_primary_color}>
                {isNaN(parseFloat(data.distance).toFixed(1))
                  ? ""
                  : parseFloat(data.distance).toFixed(1) + "km"}
              </Text>
            )}
            {window.location.pathname === "/" && (
              <CustomButton
                code={theme_bright_color}
                w="80px"
                text={data.user_type === "개인" ? "매칭신청" : "코칭신청"}
                onClick={() => {
                  if (!window.location.pathname.includes("matching")) {
                    navigate("/matching", {
                      state: { data: data },
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
