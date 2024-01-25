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

export const Matching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data; // 지금 보고있는 유저

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
                  후기(53)
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
                        식사 매칭 시스템 🍜
                      </Text>
                      <Text
                        lineHeight="1.5"
                        fontWeight="medium"
                        fontSize="sm"
                        color={gray_700}
                        alignSelf="stretch"
                      >
                        ● 식사 매칭 신청하기 <br />
                        식사하고 싶은 상대방에게 식사 매칭 신청 → 결제(금액은
                        상대방에 따라 상이함) → 상대방과 채팅으로 식사약속 체결
                        → 즐거운 식사 <br />
                        ※ 결제된 식사권 사용기한은 2주. <br />※ 상대방이 거절
                        또는 미응답 시 결제된 금액은 전액 환불. <br />
                        <br />● 식사 매칭 수락/거절하기 신청받은 식사 매칭을
                        수락 또는 거절 → 수락 시 상대방과 채팅으로 식사약속 체결
                        → 식사 → 식사 매칭 대금 정산 <br />※ 정산은 식사 완료 후
                        2영업일 이내. <br />※ 식사 매칭 대금은 본인이 설정한
                        식사권 금액에서 매칭 수수료를 제외한 금액이 정산됨.
                      </Text>
                    </Stack>
                    <HStack w="100%">
                      <CustomButton
                        code={theme_bright_color}
                        height="40px"
                        alignSelf="stretch"
                        onClick={() =>
                          navigate("/payment", {
                            state: {
                              price: data.user_price,
                              receiver: data,
                            },
                          })
                        }
                        text={"🍛 식사 매칭 신청"}
                      />
                      <CustomButton
                        code={theme_bright_color}
                        height="40px"
                        alignSelf="stretch"
                        onClick={() =>
                          navigate("/payment", {
                            state: {
                              price: data.user_price,
                              receiver: data,
                            },
                          })
                        }
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
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                      >
                        <Icon as={BsStarFill} />
                        <Text
                          fontWeight="medium"
                          fontSize="16px"
                          color={black}
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                      <Text
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color={gray_700}
                        alignSelf="stretch"
                      >
                        친구 매칭 서비스 덕분에 우연히 만난 친구가 있어서 너무
                        행복해요. 서로의 취향과 성향이 꽤 일치해서 처음 만났을
                        때부터 편안한 느낌이었어요. 이제는 함께 많은 추억을
                        쌓아가고 있습니다.
                      </Text>
                    </Stack>
                    <HorizonLine />
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
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                      >
                        <Icon as={BsStarFill} />
                        <Text
                          fontWeight="medium"
                          fontSize="16px"
                          color={black}
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                      <Text
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color={gray_700}
                        alignSelf="stretch"
                      >
                        서비스를 통해 만난 친구는 정말로 나를 이해해주는
                        사람이에요. 채팅을 통해 서로에게 열린 마음을 보여주고,
                        이해하며 존중하는 관계를 쌓아가고 있어서 더욱
                        뜻깊습니다.
                      </Text>
                    </Stack>
                    <HorizonLine />
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
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                      >
                        <Icon as={BsStarFill} />
                        <Text
                          fontWeight="medium"
                          fontSize="16px"
                          color={black}
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                      <Text
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color={gray_700}
                        alignSelf="stretch"
                      >
                        이 서비스 덕분에 소소한 일상을 함께 즐길 수 있는 친구를
                        만났어요. 함께 커피 마시러 가거나 산책하는 것도 즐겁고,
                        서로의 관심사에 대해 이야기 나누면서 더 친해지고
                        있습니다.
                      </Text>
                    </Stack>
                    <HorizonLine />
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
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                      >
                        <Icon as={BsStarFill} />
                        <Text
                          fontWeight="medium"
                          fontSize="16px"
                          color={black}
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                      <Text
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color={gray_700}
                        alignSelf="stretch"
                      >
                        처음 만났을 때부터 서로에게 열린 마음을 가지고 있어,
                        신뢰와 이해가 깊어지고 있습니다. 이 서비스는 정말로
                        특별한 우정을 찾을 수 있는 좋은 기회를 제공해준 것 같아
                        감사합니다.
                      </Text>
                    </Stack>
                    <CustomButton
                      code={theme_bright_color}
                      height="40px"
                      alignSelf="stretch"
                      onClick={() =>
                        navigate("/payment", {
                          state: {
                            price: data.user_price,
                            receiver: data,
                          },
                        })
                      }
                      text={"매칭 신청하기"}
                    />
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
