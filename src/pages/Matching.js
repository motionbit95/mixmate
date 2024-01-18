import {
  Stack,
  Icon,
  Text,
  Avatar,
  Tabs,
  Tab,
  TabPanels,
  Button,
  Box,
  Container,
  TabList,
  TabPanel,
} from "@chakra-ui/react";
import { MdChevronLeft, MdChatBubbleOutline } from "react-icons/md";
import { BsStarFill, BsList, BsPerson } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import HorizonLine from "../component/HorizontalLine";
import { useLocation, useNavigate } from "react-router-dom";

export const Matching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  return (
    <Container py="50px">
      {data && (
        <Stack
          justify="flex-start"
          align="center"
          spacing="0px"
          overflow="hidden"
          // width="393px"
          maxWidth="100%"
          background="#FFFFFF"
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
                <Icon
                  as={MdChevronLeft}
                  onClick={() => navigate(-1)}
                  boxSize={"24px"}
                />
                <Text
                  fontFamily="Pretendard"
                  fontWeight="Bold"
                  fontSize="18px"
                  color="#000000"
                  textAlign="center"
                >
                  밥친구 프로필
                </Text>
                <Box height="26px"></Box>
              </Stack>
            </Container>
          </Stack>
          <Stack
            // padding="10px"
            justify="center"
            align="flex-start"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Stack
              paddingY="10px"
              direction="row"
              justify="flex-start"
              align="center"
              spacing="20px"
              overflow="hidden"
              alignSelf="stretch"
            >
              <Avatar name="" src=" " size="lg" />
              <Stack
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                overflow="hidden"
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
                      {data.name.slice(0, -1) + "*"}
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
                  {`나이 : ${data.age}, 사업분야 : ${data.business}, 매칭 금액 : ${data.price}, 매칭 가능 동네 :
                          ${data.place}`}
                </Text>
              </Stack>
            </Stack>
            <Tabs w="100%">
              <TabList>
                <Tab height="54px" flex="1">
                  밥친구 소개
                </Tab>
                <Tab height="52px" flex="1">
                  후기(53)
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel
                px={0}
                >
                  <Stack
                    // padding="10px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="15px"
                    overflow="hidden"
                    alignSelf="stretch"
                  >
                    <Text
                      fontFamily="Inter"
                      fontWeight="semibold"
                      fontSize="18px"
                      color="#111111"
                    >
                      프로필 소개말
                    </Text>
                    <Text
                      fontFamily="Inter"
                      lineHeight="1.71"
                      fontWeight="medium"
                      fontSize="14px"
                      color="#4E4E4E"
                      alignSelf="stretch"
                    >
                      {data.info}
                    </Text>
                    <Stack
                      padding="10px"
                      borderRadius="10px"
                      justify="flex-start"
                      align="flex-start"
                      spacing="15px"
                      alignSelf="stretch"
                      background="#F1F1F1"
                    >
                      <Text
                        fontFamily="Inter"
                        fontWeight="semibold"
                        fontSize="18px"
                        color="#000000"
                      >
                        식사권이란?
                      </Text>
                      <Text
                        fontFamily="Inter"
                        lineHeight="1.5"
                        fontWeight="medium"
                        fontSize="16px"
                        color="#4E4E4E"
                        alignSelf="stretch"
                      >
                        기재해주신 식사권 금액을 상대 신청자가 플랫폼에 결제를
                        하면 식사권 신청을 할 수 있어요!
                        <br />
                        <br />
                        신청 받으신 유저는 식사권 수령 후 앱 채팅으로 약속을
                        잡으시면 끝!
                        <br />
                        <br />
                        식사 후 2영업일 내로 매칭 수수료 제외된 금액이 식사권
                        신청 받으신 유저에게 입금됩니다.
                      </Text>
                    </Stack>
                    <Button
                      colorScheme="blue"
                      height="40px"
                      alignSelf="stretch"
                      onClick={() => navigate("/payment")}
                    >
                      매칭 신청하기
                    </Button>
                  </Stack>
                </TabPanel>
                <TabPanel
                px={0}
                >
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
                          fontFamily="Inter"
                          fontWeight="medium"
                          fontSize="16px"
                          color="#000000"
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                      <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color="#444444"
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
                          fontFamily="Inter"
                          fontWeight="medium"
                          fontSize="16px"
                          color="#000000"
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                      <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color="#444444"
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
                          fontFamily="Inter"
                          fontWeight="medium"
                          fontSize="16px"
                          color="#000000"
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                      <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color="#444444"
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
                          fontFamily="Inter"
                          fontWeight="medium"
                          fontSize="16px"
                          color="#000000"
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                      <Text
                        fontFamily="Inter"
                        lineHeight="1.43"
                        fontWeight="medium"
                        fontSize="14px"
                        color="#444444"
                        alignSelf="stretch"
                      >
                        처음 만났을 때부터 서로에게 열린 마음을 가지고 있어,
                        신뢰와 이해가 깊어지고 있습니다. 이 서비스는 정말로
                        특별한 우정을 찾을 수 있는 좋은 기회를 제공해준 것 같아
                        감사합니다.
                      </Text>
                    </Stack>
                    <Button
                      my={"10px"}
                      colorScheme="blue"
                      height="40px"
                      alignSelf="stretch"
                      onClick={() => navigate("/payment")}
                    >
                      매칭 신청하기
                    </Button>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
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
      )}
    </Container>
  );
};
