import {
  Stack,
  Icon,
  Text,
  Tabs,
  Tab,
  TabPanels,
  Button,
  Box,
  Container,
  TabList,
  TabPanel,
  HStack,
} from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import HorizonLine from "../component/HorizontalLine";
import { useLocation, useNavigate } from "react-router-dom";
import {
  black,
  gray_300,
  gray_600,
  gray_700,
  gray_800,
  gray_900,
  theme_bright_color,
  theme_primary_color,
  white,
} from "../App";
import { TopHeader } from "../component/TopHeader";
import { User } from "../component/User";
import { getSatuation } from "../js/API";
import { Navbar } from "../component/Navbar";
import { CustomButton } from "../component/Buttons";
import { useEffect, useState } from "react";
import { get_doc_list } from "../js/Database";

export const Matching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data; // 지금 보고있는 유저
  const [reviewList, setReviewList] = useState();

  useEffect(() => {
    getReviewList();
  }, []);

  const getReviewList = async () => {
    let reviewList = await get_doc_list(
      "review",
      "review_receiver",
      data?.doc_id
    );

    // console.log(reviewList);
    setReviewList(reviewList);
  };

  return (
    <Container py="50px" minH={"100vh"}>
      {data && (
        <Stack
          justify="flex-start"
          align="center"
          spacing="0px"
          overflow="hidden"
          // width="393px"
          maxWidth="100%"
          background={white}
        >
          <TopHeader title={"밥친구 프로필"} />
          <Stack
            // padding="10px"
            justify="center"
            align="flex-start"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <User data={data} />
            <Tabs w="100%" colorScheme={getSatuation(theme_primary_color)}>
              <TabList>
                <Tab height="54px" flex="1">
                  밥친구 소개
                </Tab>
                <Tab height="52px" flex="1">
                  후기({reviewList?.length})
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0}>
                  <Stack
                    // padding="10px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="15px"
                    overflow="hidden"
                    alignSelf="stretch"
                  >
                    <Text
                      fontWeight="semibold"
                      fontSize="18px"
                      color={gray_900}
                    >
                      프로필 소개말
                    </Text>
                    <Text
                      lineHeight="1.71"
                      fontWeight="medium"
                      fontSize="14px"
                      color={gray_800}
                      alignSelf="stretch"
                    >
                      {data.user_info}
                    </Text>
                    <Stack
                      padding="10px"
                      borderRadius="10px"
                      justify="flex-start"
                      align="flex-start"
                      spacing="15px"
                      alignSelf="stretch"
                      background={gray_300}
                    >
                      <Text fontWeight="semibold" fontSize="lg" color={black}>
                        매칭 시스템 😄
                      </Text>
                      <Text
                        lineHeight="1.5"
                        fontWeight="medium"
                        fontSize="sm"
                        color={gray_700}
                        alignSelf="stretch"
                        whiteSpace={"pre-wrap"}
                      >
                        {`
●매칭 신청자
매칭신청 - 결제 - 채팅으로 식사 약속 잡기 - 접선
※결제된 식사권 사용기한은 2주
※상대방이 매칭 거절 또는 채팅 미응답 시 전액 환불

●매칭 수락자
수락 또는 거절 - 수락 시 채팅으로 식사 약속 잡기 - 접선 - 매칭 대금 정산
※수락자가 설정한 식사권의 금액의 30%의 매칭 수수료 제외 후 정산
※정산은 접선 완료 후 2영업일 내에 기재해주신 수락자 계좌로 정산
`}
                      </Text>
                    </Stack>
                    <HStack w="100%">
                      <CustomButton
                        code={theme_bright_color}
                        height="40px"
                        alignSelf="stretch"
                        onClick={() => {
                          localStorage.setItem("matching_type", "식사");
                          navigate("/payment", {
                            state: {
                              price: data.user_price,
                              receiver: data,
                            },
                          });
                        }}
                        text={"🍛 식사 매칭 신청"}
                      />
                      <CustomButton
                        code={theme_bright_color}
                        height="40px"
                        alignSelf="stretch"
                        onClick={() => {
                          localStorage.setItem("matching_type", "커피");
                          navigate("/payment", {
                            state: {
                              price: data.user_price,
                              receiver: data,
                            },
                          });
                        }}
                        text={"☕️ 커피 매칭 신청"}
                      />
                    </HStack>
                  </Stack>
                </TabPanel>
                <TabPanel px={0}>
                  <Stack
                    // padding="10px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="5px"
                    overflow="hidden"
                    alignSelf="stretch"
                  >
                    {reviewList?.map((value, index) => (
                      <>
                        <Stack
                          padding="10px"
                          justify="flex-start"
                          align="flex-start"
                          spacing="10px"
                          overflow="hidden"
                          alignSelf="stretch"
                        >
                          <Stack
                            direction="row"
                            justify="center"
                            align="center"
                            spacing="10px"
                          >
                            <Icon color={"yellow.500"} as={BsStarFill} />
                            <Text
                              fontWeight="medium"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              {value.review_score.toFixed(1)}
                            </Text>
                          </Stack>
                          <Text
                            lineHeight="1.43"
                            fontWeight="medium"
                            fontSize="14px"
                            color={gray_700}
                            alignSelf="stretch"
                          >
                            {value.review_comment}
                          </Text>
                        </Stack>
                        <HorizonLine />
                      </>
                    ))}
                    <HStack w="100%">
                      <CustomButton
                        code={theme_bright_color}
                        height="40px"
                        alignSelf="stretch"
                        onClick={() => {
                          localStorage.setItem("matching_type", "식사");
                          navigate("/payment", {
                            state: {
                              price: data.user_price,
                              receiver: data,
                            },
                          });
                        }}
                        text={"🍛 식사 매칭 신청"}
                      />
                      <CustomButton
                        code={theme_bright_color}
                        height="40px"
                        alignSelf="stretch"
                        onClick={() => {
                          localStorage.setItem("matching_type", "커피");
                          navigate("/payment", {
                            state: {
                              price: data.user_price,
                              receiver: data,
                            },
                          });
                        }}
                        text={"☕️ 커피 매칭 신청"}
                      />
                    </HStack>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Stack>
      )}
      <Navbar />
    </Container>
  );
};
