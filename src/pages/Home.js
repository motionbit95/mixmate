import {
  Stack,
  Text,
  Icon,
  Circle,
  Box,
  Button,
  Avatar,
  Center,
  Container,
  Flex,
  calc,
  Tabs,
  TabList,
  Tab,
  HStack,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  BsBell,
  BsPeopleFill,
  BsStarFill,
  BsList,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";
import HorizonLine from "../component/HorizontalLine";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const test_data_b = [
    {
      name: "김아중",
      age: "35~40세",
      business: "IT 기업",
      price: "15만원",
      place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      name: "송강호",
      age: "35~40세",
      business: "쇼핑몰",
      price: "8만원",
      place: "하남 스타필드",
      food: "한식,중식",
      info: "의류 쇼핑몰 연 매출 20억 달성하고 디자이너 브랜드 런칭하여 운영중에 있어요. 의류 쇼핑몰로 매출 내고 있으신 분들만 식사권 신청 부탁드려요! 식사 가능 시간은 평일 저녁 7시~8시30분 가능합니다!",
    },
    {
      name: "전지현",
      age: "20~25세",
      business: "해외구매대행",
      price: "5만원",
      place: "인천 송도 센트럴파크",
      food: "초밥,한식",
      info: "해외구매대행 처음 시작하시는 분들에게 방향성 및 소싱 방법에 대한 노하우 전수해드립니다. 유통업이 처음이시더라도 조언 들으신 후 사업하시는 것이 시간을 줄이실 수 있으실거에요. 해외구매대행으로만 작년 기준 매출 3억 달성하였고 올해는 아기 용품 브랜드 런칭하였습니다. 브랜드 런칭에도 도움드릴 수 있으니 관심있으신분들은 식사권 신청바랍니다. 식사가능 시간은 평일 저녁 6시 이후 부터 가능합니다.",
    },
  ];
  const test_data_p = [
    {
      name: "공지철",
      age: "30~35세",
      business: "AI 인공지능",
      price: "2만원",
      place: "해운대 현대백화점",
      food: "한식,중식",
      info: "AI 인공지능 회사에서 CTO로 근무하고 있어요! AI 관심있으신분 평일 저녁에 해운대 현백에서 간단히 식사하면서 얘기 나눠요~",
    },
    {
      name: "이동욱",
      age: "30~35세",
      business: "심리학 독서",
      price: "2만원",
      place: "압구정동",
      food: "일식",
      info: "심리학 공부하고 있는데 심리학 관련 밥 친구 구합니다! 심리마케팅 및 인문학, 심리학 관심 있으신 분들 식사권 신청 부탁드려요 식사시간은 조율 가능해요!",
    },
  ];
  return (
    <Container py={"50px"} px={0}>
      <Stack
        justify="flex-start"
        align="flex-start"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        maxWidth="100%"
        background="#FFFFFF"
        minH={"90vh"}
      >
        <Stack className="header">
          <Container>
            <Stack
              padding="10px"
              direction="row"
              justify="space-between"
              align="flex-start"
              spacing="10px"
              overflow="hidden"
              alignSelf="stretch"
            >
              <Text
                fontFamily="Pretendard"
                fontWeight="black"
                fontSize="24px"
                color="#000000"
                textAlign="center"
              >
                식사회
              </Text>
              <Box
                // justify="space-between"
                // align="flex-start"
                // spacing="10px"
                height="26px"
              >
                <Icon
                  as={BsBell}
                  onClick={() => navigate("/notice")}
                  boxSize={"24px"}
                />
                <Circle
                  position={"absolute"}
                  top={"10px"}
                  ml={"14px"}
                  size="10px"
                  background="#FF0000"
                />
              </Box>
            </Stack>
          </Container>
        </Stack>
        <Stack
          padding="10px"
          justify="flex-start"
          align="flex-start"
          spacing="20px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Stack
            padding="20px"
            borderRadius="10px"
            justify="space-between"
            align="flex-end"
            spacing="76px"
            height="211px"
            alignSelf="stretch"
            bgImage={require("../assets/iOS 16 Wallpaper.png")}
          >
            <Text
              fontFamily="SF Pro"
              lineHeight="0.7"
              fontWeight="semibold"
              fontSize="30px"
              letterSpacing="-0.32px"
              color="#FFFFFF"
              textAlign="center"
            >
              Event
            </Text>
            <Center
              borderRadius="100px"
              width="74px"
              height="30px"
              background="rgba(0, 0, 0, 0.5)"
            >
              <Text
                fontFamily="SF Pro"
                lineHeight="1.31"
                fontWeight="semibold"
                fontSize="16px"
                letterSpacing="-0.32px"
                color="#FFFFFF"
                textAlign="center"
              >
                1 / 3
              </Text>
            </Center>
          </Stack>
          <Stack
            direction="row"
            justify="space-between"
            align="flex-start"
            spacing="10px"
            alignSelf="stretch"
          >
            <Stack
              w="100%"
              direction="row"
              justify="flex-start"
              align="center"
              spacing="10px"
            >
              <Tabs w="100%">
                <TabList>
                  <Tab w="100%">
                    <HStack>
                      <Icon as={BsPersonFill} />
                      <Text
                        fontFamily="SF Pro"
                        lineHeight="1.31"
                        fontWeight="semibold"
                        fontSize="16px"
                        letterSpacing="-0.32px"
                        // color="#000000"
                        textAlign="center"
                      >
                        사업 전문가
                      </Text>
                    </HStack>
                  </Tab>
                  <Tab w="100%">
                    <HStack>
                      <Icon as={BsPeopleFill} />
                      <Text
                        fontFamily="SF Pro"
                        lineHeight="1.31"
                        fontWeight="semibold"
                        fontSize="16px"
                        letterSpacing="-0.32px"
                        // color="#000000"
                        textAlign="center"
                      >
                        내 주변 밥친구
                      </Text>
                    </HStack>
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Stack
                      w="100%"
                      direction="row"
                      justify="flex-end"
                      align="flex-start"
                      spacing="10px"
                    >
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="blue"
                        height="24px"
                      >
                        가까운순
                      </Button>
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="blue"
                        height="24px"
                      >
                        랜덤찾기
                      </Button>
                    </Stack>
                    <Stack
                      justify="flex-start"
                      align="center"
                      spacing="0px"
                      alignSelf="stretch"
                    >
                      {test_data_b.map((value, index) => (
                        <Stack
                          paddingY="10px"
                          direction="row"
                          justify="flex-start"
                          align="center"
                          spacing="10px"
                          overflow="hidden"
                          alignSelf="stretch"
                        >
                          <Avatar name={value.name} src=" " size="lg" />
                          <Stack
                            justify="flex-start"
                            align="flex-start"
                            spacing="10px"
                            overflow="hidden"
                            height="78px"
                            flex="1"
                          >
                            <Stack
                              direction="row"
                              justify="space-between"
                              align="center"
                              spacing="5px"
                              overflow="hidden"
                              height="19px"
                              alignSelf="stretch"
                            >
                              <Stack
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="5px"
                              >
                                <Text
                                  fontFamily="Inter"
                                  fontWeight="bold"
                                  fontSize="16px"
                                  color="#000000"
                                  textAlign="center"
                                >
                                  {value.name.slice(0, -1) + "*"}
                                </Text>
                                <Icon as={BsStarFill} />
                                <Text
                                  fontFamily="Inter"
                                  fontWeight="medium"
                                  fontSize="16px"
                                  color="#000000"
                                  textAlign="center"
                                >
                                  5.0
                                </Text>
                                <Text
                                  fontFamily="Inter"
                                  fontWeight="medium"
                                  fontSize="14px"
                                  color="#8C8C8C"
                                  textAlign="center"
                                >
                                  (169)
                                </Text>
                              </Stack>
                              <Text
                                fontFamily="Inter"
                                fontWeight="medium"
                                fontSize="14px"
                                color="#3182CE"
                                textAlign="center"
                              >
                                140m
                              </Text>
                            </Stack>
                            <Text
                              fontFamily="Inter"
                              lineHeight="1.42"
                              fontWeight="medium"
                              fontSize="12px"
                              color="#000000"
                              alignSelf="stretch"
                            >
                              {`나이 : ${value.age}, 사업분야 : ${value.business}, 매칭 금액 : ${value.price}, 매칭 가능 동네 :
                          ${value.place}`}
                            </Text>
                          </Stack>
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate("/matching", {
                                state: { data: value },
                              })
                            }
                          >
                            신청하기
                          </Button>
                        </Stack>
                      ))}

                      <Button colorScheme="blue" height="40px">
                        더보기
                      </Button>
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <Stack
                      w="100%"
                      direction="row"
                      justify="flex-end"
                      align="flex-start"
                      spacing="10px"
                    >
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="blue"
                        height="24px"
                      >
                        가까운순
                      </Button>
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="blue"
                        height="24px"
                      >
                        랜덤찾기
                      </Button>
                    </Stack>
                    <Stack
                      justify="flex-start"
                      align="center"
                      spacing="0px"
                      alignSelf="stretch"
                    >
                      {test_data_p.map((value, index) => (
                        <Stack
                          paddingY="10px"
                          direction="row"
                          justify="flex-start"
                          align="center"
                          spacing="10px"
                          overflow="hidden"
                          alignSelf="stretch"
                        >
                          <Avatar name={value.name} src=" " size="lg" />
                          <Stack
                            justify="flex-start"
                            align="flex-start"
                            spacing="10px"
                            overflow="hidden"
                            height="78px"
                            flex="1"
                          >
                            <Stack
                              direction="row"
                              justify="space-between"
                              align="center"
                              spacing="5px"
                              overflow="hidden"
                              height="19px"
                              alignSelf="stretch"
                            >
                              <Stack
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing="5px"
                              >
                                <Text
                                  fontFamily="Inter"
                                  fontWeight="bold"
                                  fontSize="16px"
                                  color="#000000"
                                  textAlign="center"
                                >
                                  {value.name.slice(0, -1) + "*"}
                                </Text>
                                <Icon as={BsStarFill} />
                                <Text
                                  fontFamily="Inter"
                                  fontWeight="medium"
                                  fontSize="16px"
                                  color="#000000"
                                  textAlign="center"
                                >
                                  5.0
                                </Text>
                                <Text
                                  fontFamily="Inter"
                                  fontWeight="medium"
                                  fontSize="14px"
                                  color="#8C8C8C"
                                  textAlign="center"
                                >
                                  (169)
                                </Text>
                              </Stack>
                              <Text
                                fontFamily="Inter"
                                fontWeight="medium"
                                fontSize="14px"
                                color="#3182CE"
                                textAlign="center"
                              >
                                140m
                              </Text>
                            </Stack>
                            <Text
                              fontFamily="Inter"
                              lineHeight="1.42"
                              fontWeight="medium"
                              fontSize="12px"
                              color="#000000"
                              alignSelf="stretch"
                            >
                              {`나이 : ${value.age}, 사업분야 : ${value.business}, 매칭 금액 : ${value.price}, 매칭 가능 동네 :
                          ${value.place}`}
                            </Text>
                          </Stack>
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate("/matching", {
                                state: { data: value },
                              })
                            }
                          >
                            신청하기
                          </Button>
                        </Stack>
                      ))}

                      <Button colorScheme="blue" height="40px">
                        더보기
                      </Button>
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </Stack>
        </Stack>
        <Stack display={"flex"} flex={1}></Stack>
        <Stack
          padding="20px"
          justify="flex-start"
          align="flex-start"
          spacing="5px"
          alignSelf="stretch"
          background="#F1F1F1"
        >
          <Text
            fontFamily="Apple SD Gothic Neo"
            lineHeight="1.4"
            fontWeight="semibold"
            fontSize="15px"
            letterSpacing="-0.32px"
            color="#000000"
            textAlign="center"
          >
            (주) 세이프바운더리
          </Text>
          <Text
            fontFamily="Apple SD Gothic Neo"
            lineHeight="1.5"
            fontWeight="regular"
            fontSize="14px"
            letterSpacing="-0.32px"
            color="#000000"
          >
            대표자명 : 김지훈 | 사업자 등록번호 : 817 88 02796 주소 : 강남
            서초구 강남대로 51길10 강남효성해링턴 103 통신판매 신고번호 :
            2023-서울서초-1772 전화번호 : 02 3471 8197 | 이메일 :
            safeboundary@naver.com
          </Text>
        </Stack>

        <Box w="100%" className="nav">
          <Container>
            <HorizonLine />
            <Stack
              paddingY="10px"
              direction="row"
              justify="space-between"
              align="flex-start"
              spacing="10px"
              overflow="hidden"
              alignSelf="stretch"
            >
              <Stack
                justify="center"
                align="center"
                spacing="0px"
                overflow="hidden"
                flex="1"
              >
                <Icon as={AiFillHome} color={"#3182CE"} />
                <Text
                  fontFamily="Inter"
                  fontWeight="medium"
                  fontSize="12px"
                  color="#3182CE"
                  textAlign="center"
                >
                  홈
                </Text>
              </Stack>
              <Stack
                justify="center"
                align="center"
                spacing="0px"
                overflow="hidden"
                flex="1"
              >
                <Icon as={BsList} />
                <Text
                  fontFamily="Inter"
                  fontWeight="medium"
                  fontSize="12px"
                  color="#000000"
                  textAlign="center"
                >
                  신청내역
                </Text>
              </Stack>
              <Stack
                justify="center"
                align="center"
                spacing="0px"
                overflow="hidden"
                flex="1"
              >
                <Icon as={MdChatBubbleOutline} />
                <Text
                  fontFamily="Inter"
                  fontWeight="medium"
                  fontSize="12px"
                  color="#000000"
                  textAlign="center"
                >
                  채팅
                </Text>
              </Stack>
              <Stack
                justify="center"
                align="center"
                spacing="0px"
                overflow="hidden"
                flex="1"
              >
                <Icon as={BsPerson} />
                <Text
                  fontFamily="Inter"
                  fontWeight="medium"
                  fontSize="12px"
                  color="#000000"
                  textAlign="center"
                >
                  마이페이지
                </Text>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </Stack>
    </Container>
  );
};
