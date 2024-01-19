import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { gray_200, gray_300, gray_50, white } from "../App";

export const HorizontalScrollBox = ({ title }) => {
  // code(javascript)
  // model : 변수
  // setModel("값") : 함수 <- 변수에 값을 집어넣는
  // useState("디폴트값") <- 초기화
  const [model, setModel] = useState({
    user_name: "박수정",
    age: 28,
    price: 5,
    profile: require("../assets/iOS 16 Wallpaper.png"),
  });
  const [model_list, setModelList] = useState([
    model,
    model,
    model,
    model,
    model,
  ]);

  return (
    //component
    <Box py={"4vw"} w="100%" bgColor={gray_300}>
      <Stack>
        <Text mx={"4vw"} fontSize={"larger"} fontWeight={"bold"}>
          {title}
        </Text>

        <Box
          p={"4vw"}
          className="scroll_view"
          overflowX={"scroll"}
          whiteSpace={"nowrap"}
        >
          <Box display={"inline-flex"} gap={"2vw"} overflow={"visible"}>
            {/* 배열.map(() => ())*/}
            {model_list.map((value, index) => (
              <Box
                boxShadow={`1px 1px 10px rgba(170, 170, 170, 0.5)`}
                borderRadius={"16px"}
                w={"30vw"}
                p={"2vw"}
                bgColor={white}
              >
                <Stack>
                  <Avatar src={value.profile} />
                  <Text>{value.user_name}</Text>
                  <Text>{value.age}</Text>
                  <Text>{value.price}</Text>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
