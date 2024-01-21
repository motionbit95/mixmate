import {
  Avatar,
  Box,
  Flex,
  HStack,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { get_display_age, get_display_name, get_satuation } from "../js/Basic";
import { CustomButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { theme_primary_color } from "../App";

export const User = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Flex
      p={"1vh 2vh"}
      borderRadius={"2vh"}
      // _hover={{ bgColor: `${get_satuation(theme_primary_color)}.100` }}
      w="100%"
      // border={"1px solid #f1f1f1"}
      //   maxW={"400px"}
      onClick={() => {
        if (!window.location.pathname.includes("matching")) {
          navigate("/matching", {
            state: { data: data },
          });
        }
      }}
    >
      <HStack spacing={"2vw"} w={"100%"}>
        <Skeleton isLoaded={data}>
          <Avatar alignSelf={"flex-start"} src={data.user_profile} />
        </Skeleton>
        <Stack w="100%">
          <HStack justifyContent={"space-between"} w="100%">
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {get_display_name(data.user_name)}
            </Text>
            {!window.location.pathname.includes("mypage") && (
              <Text color={theme_primary_color}>
                {parseFloat(data.distance).toFixed(1)}km
              </Text>
            )}
          </HStack>
          <Text fontSize={"12px"}>
            {`나이 : ${get_display_age(data.user_birth)}, 매칭 금액 : 
            ${data.user_price}만원, 식사 가능 지역 : ${data.user_place},
            ${data.user_type === "개인" ? " 관심분야 : " : " 사업분야 : "}
            ${data.user_category}`}
          </Text>
        </Stack>
        {/* {!window.location.pathname.includes("matching") && (
          <CustomButton
            w="100px"
            text={"식사매칭"}
            onClick={() =>
              navigate("/matching", {
                state: { data: data },
              })
            }
          />
        )} */}
      </HStack>
    </Flex>
  );
};
