import { Avatar, Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { get_display_age, get_display_name } from "../js/Basic";
import { CustomButton } from "./Buttons";
import { useNavigate } from "react-router-dom";

export const User = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Flex
      p={"1vh 2vh"}
      borderRadius={"2vh"}
      _hover={{ bgColor: "gray.100" }}
      w="100%"
      //   maxW={"400px"}
      onClick={() => {
        if (!window.location.pathname.includes("matching")) {
          navigate("/matching", {
            state: { data: data },
          });
        }
      }}
    >
      <HStack spacing={"10px"} w={"100%"}>
        <Avatar alignSelf={"flex-start"} name={data.user_name} />
        <Stack>
          <HStack>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {get_display_name(data.user_name)}
            </Text>
          </HStack>
          <Text fontSize={"12px"}>
            나이 : {get_display_age(data.user_birth)}, 매칭 금액 :
            {data.user_price}만원, 식사 가능 지역 : {data.user_place},
            {data.user_type === "개인" ? " 관심분야 : " : " 사업분야 : "}
            {data.user_category}
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
