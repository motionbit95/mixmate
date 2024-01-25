import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { gray_200, gray_300, gray_50, white } from "../App";
import { getDisplayAge, getDisplayName } from "../js/API";
import HorizonLine from "./HorizontalLine";
import { useNavigate } from "react-router-dom";

export const HorizontalScrollBox = ({ title, model_list }) => {
  // code(javascript)
  // model : 변수
  // setModel("값") : 함수 <- 변수에 값을 집어넣는
  // useState("디폴트값") <- 초기화
  const navigate = useNavigate();

  return (
    //component
    <Box w="100%">
      <HorizonLine />
      <Box py={"4vw"} w="100%" bgColor={gray_300}>
        {model_list && (
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
                {model_list.map(
                  (value, index) =>
                    index < 10 && (
                      <Box
                        boxShadow={`1px 1px 10px rgba(170, 170, 170, 0.5)`}
                        borderRadius={"16px"}
                        // w={"40%"}
                        p={"2vw"}
                        bgColor={white}
                      >
                        <Stack
                          p={"2vw"}
                          onClick={() => {
                            navigate("/matching", {
                              state: { data: value },
                            });
                          }}
                        >
                          <Avatar src={value.user_profile} />
                          <Text fontSize={"large"} fontWeight={"bold"}>
                            {getDisplayName(value.user_name)}
                          </Text>
                          <Text>나이 : {getDisplayAge(value.user_birth)}</Text>
                          <Text>매칭금액 :{value.user_price}만원</Text>
                        </Stack>
                      </Box>
                    )
                )}
              </Box>
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
};
