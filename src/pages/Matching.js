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
import { get_doc_all } from "../js/MockDatabase";

export const Matching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data; // 지금 보고있는 유저
  const [reviewList, setReviewList] = useState();

  useEffect(() => {
    getReviewList();
  }, []);

  const getReviewList = async () => {
    try {
      // Mock review data for demo
      const mockReviews = [
        {
          review_sender: "user1@example.com",
          review_receiver: data?.doc_id,
          review_rating: 5,
          review_score: 4.8,
          review_content: "정말 좋은 시간이었습니다!",
          review_date: "2024-01-15"
        },
        {
          review_sender: "user2@example.com",
          review_receiver: data?.doc_id,
          review_rating: 4,
          review_score: 4.2,
          review_content: "대화가 즐거웠어요.",
          review_date: "2024-01-10"
        },
        {
          review_sender: "user3@example.com",
          review_receiver: data?.doc_id,
          review_rating: 5,
          review_score: 4.9,
          review_content: "매우 유익한 시간이었습니다.",
          review_date: "2024-01-08"
        }
      ];
      setReviewList(mockReviews);
    } catch (error) {
      console.error("리뷰 로드 오류:", error);
      setReviewList([]);
    }
  };

  // If no data is provided, redirect to home or show default user
  const displayData = data || {
    user_name: "데모 사용자",
    user_email: "demo@example.com",
    user_profile: "https://picsum.photos/200/200?random=10",
    user_info: "매칭 페이지 데모입니다. 홈에서 사용자를 선택해주세요.",
    user_type: "개인",
    user_place: ["서울특별시"],
    user_food: ["한식", "양식"],
    doc_id: "demo_user"
  };

  return (
    <Container py="50px" minH={"100vh"}>
      {/* Always show content, but use demo data if no user data */}
      {(
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
            <User data={displayData} />
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
                      {displayData.user_info}
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
                        디너메이트 매칭 시스템 😄
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
'매칭 신청자'가 지불한 매칭 금액은
'매칭 수락자'에게 부수입으로 정산됩니다!

◆매칭 신청자
매칭 신청 및 결제 - 채팅으로 식사 또는 커피 약속 잡기 - 접선
-결제된 매칭권 사용기한은 2주
-상대방이 매칭 거절 또는 채팅 미응답 시 전액 환불

◆매칭 수락자
수락 또는 거절 - 수락 시 채팅으로 식사 또는 커피 약속 잡기 - 접선 - 본인이 설정한 매칭권 부수입 정산 받기(매칭수수료 30% 제외)
-부수입 입금은 매칭 후 2영업일 내에 기재해주신 수락자 계좌로 정산됩니다!
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
                              price: displayData.user_price,
                              receiver: displayData,
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
                              price: displayData.user_price,
                              receiver: displayData,
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
                              {value.review_score ? value.review_score.toFixed(1) : "4.0"}
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
                              price: displayData.user_price,
                              receiver: displayData,
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
                              price: displayData.user_price,
                              receiver: displayData,
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
