import {
  Avatar,
  Box,
  Flex,
  HStack,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  checkNull,
  getDisplayAge,
  getDisplayName,
  getSatuation,
} from "../js/API";
import { CustomButton } from "./Buttons";
import { useNavigate } from "react-router-dom";
import { theme_bright_color, theme_primary_color } from "../App";

export const User = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Flex
      p={"1vh"}
      borderRadius={"2vh"}
      // _hover={{ bgColor: `${getSatuation(theme_primary_color)}.100` }}
      w="100%"
      // border={"1px solid #f1f1f1"}
      //   maxW={"400px"}
    >
      {data && (
        <HStack spacing={"2vw"} w={"100%"}>
          <Skeleton isLoaded={data}>
            <Avatar
              bg={data.user_gender === "남" ? "teal.500" : "red.500"}
              alignSelf={"flex-start"}
              src={data.user_profile}
              mr={"2vw"}
            />
          </Skeleton>
          <Stack w="100%">
            <HStack justifyContent={"space-between"} w="100%">
              <Text fontSize={"lg"} fontWeight={"bold"}>
                {getDisplayName(data.user_name)}
              </Text>
            </HStack>
            <Text fontSize={"12px"}>
              {`나이 : ${getDisplayAge(data.user_birth)}, 매칭 금액 : 
            ${data.user_price}만원, 식사 가능 지역 : ${data.user_place}`}
              {data.user_type === "개인"
                ? ""
                : `, 멘토 전문 분야 : ${data.user_category}`}
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
                w="100px"
                text={data.user_type === "개인" ? "식사매칭" : "멘토매칭"}
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
