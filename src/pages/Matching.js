import {
  Stack,
  Icon,
  Text,
  Avatar,
  Tabs,
  Tab,
  TabPanels,
  Button,
  Container,
  TabList,
  TabPanel,
  StackDivider,
} from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { BsStarFill, BsList, BsPerson, BsChat } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";

export const Matching = () => {
  const navigate = useNavigate();
  return (
    <Stack
      justify="flex-start"
      align="center"
      spacing="0px"
      overflow="hidden"
      // width="393px"
      maxWidth="100%"
      background="#FFFFFF"
      mt={4}
    >
      <Stack
        padding="10px"
        height="50px"
        alignSelf="stretch"
        alignItems={"center"}
      >
        <Icon
          boxSize={"30px"}
          position={"absolute"}
          left={"20px"}
          top={"5px"}
          as={MdChevronLeft}
          onClick={() => navigate(-1)}
        />
        <Text
          fontFamily="Pretendard Variable"
          lineHeight="0.85"
          fontWeight="bold"
          fontSize="20px"
          color="#000000"
        >
          친구 프로필
        </Text>
      </Stack>
      <Stack
        padding="10px"
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
          <Avatar name="TA" src=" " size="lg" />
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
                  fontFamily="Pretendard Variable"
                  fontWeight="bold"
                  fontSize="16px"
                  color="#000000"
                  textAlign="center"
                >
                  송*혁
                </Text>
                <Icon as={BsStarFill} color={"#F6E05E"} />
                <Text
                  fontFamily="Pretendard Variable"
                  fontWeight="medium"
                  fontSize="16px"
                  color="#000000"
                  textAlign="center"
                >
                  5.0
                </Text>
                <Text
                  fontFamily="Pretendard Variable"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#8C8C8C"
                  textAlign="center"
                >
                  (169)
                </Text>
              </Stack>
              <Text
                fontFamily="Pretendard Variable"
                fontWeight="medium"
                fontSize="14px"
                color="#3182CE"
                textAlign="center"
              >
                140m
              </Text>
            </Stack>
            <Text
              fontFamily="Pretendard Variable"
              lineHeight="1.42"
              fontWeight="medium"
              fontSize="12px"
              color="#000000"
              alignSelf="stretch"
            >
              나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 : 서울 성북구,
              역삼동 좋아하는 취미: 테니스, 골프
            </Text>
          </Stack>
        </Stack>
        <Tabs w="100%">
          <TabList>
            <Tab flex="1">친구 소개</Tab>
            <Tab flex="1">후기(53)</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack
                //   padding="10px"
                justify="flex-start"
                align="flex-start"
                spacing="15px"
                overflow="hidden"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="Pretendard Variable"
                  fontWeight="semibold"
                  fontSize="18px"
                  color="#111111"
                >
                  프로필 소개말
                </Text>
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.5"
                  fontWeight="medium"
                  fontSize="16px"
                  color="#4E4E4E"
                  alignSelf="stretch"
                >
                  안녕하세요! 저는 성북구 역삼동에 거주하는 30~35세의
                  남성입니다. 테니스와 골프를 즐기며, 스포츠를 통해 삶의 균형을
                  찾고 있습니다. 사람들과의 소통을 즐기며 새로운 친구들을 만나고
                  싶어하는 성격이에요. 함께 즐길 취미나 이야기가 있다면 언제든지
                  말씀해주세요! 즐거운 인연이 되길 기대하고 있습니다. 😊
                </Text>
                <Text
                  fontFamily="Pretendard Variable"
                  fontWeight="semibold"
                  fontSize="18px"
                  color="#000000"
                >
                  서비스 소개 및 매칭 과정 안내
                </Text>
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.5"
                  fontWeight="medium"
                  fontSize="16px"
                  color="#4E4E4E"
                  alignSelf="stretch"
                >
                  서비스 소개 및 매칭 과정 안내 안녕하세요! 믹스메이트입니다.
                  저희의 매칭 서비스를 이용해 주셔서 감사합니다. 우리는 안전하고
                  효율적인 매칭을 위한 플랫폼을 제공하고 있습니다. 회원님들은
                  다양한 관심사와 성향을 고려하여 최적의 상대방을 찾을 수
                  있습니다. 저희의 매칭 알고리즘은 회원님들의 프로필 정보를
                  기반으로 정확하고 맞춤형으로 매칭해 드립니다.
                </Text>
                <Button
                  bgGradient="linear(to-tr, #00D2FF, #3A47D5)"
                  height="40px"
                  alignSelf="stretch"
                  color={"white"}
                  onClick={() => navigate("/payment")}
                >
                  매칭 신청하기
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack
                //   padding="10px"
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
                    <Icon as={BsStarFill} color={"#F6E05E"} />
                    <Text
                      fontFamily="Pretendard Variable"
                      fontWeight="medium"
                      fontSize="16px"
                      color="#000000"
                      textAlign="center"
                    >
                      5.0
                    </Text>
                  </Stack>
                  <Text
                    fontFamily="Pretendard Variable"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="14px"
                    color="#444444"
                    alignSelf="stretch"
                  >
                    친구 매칭 서비스 덕분에 우연히 만난 친구가 있어서 너무
                    행복해요. 서로의 취향과 성향이 꽤 일치해서 처음 만났을
                    때부터 편안한 느낌이었어요. 이제는 함께 많은 추억을 쌓아가고
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
                    <Icon as={BsStarFill} color={"#F6E05E"} />
                    <Text
                      fontFamily="Pretendard Variable"
                      fontWeight="medium"
                      fontSize="16px"
                      color="#000000"
                      textAlign="center"
                    >
                      5.0
                    </Text>
                  </Stack>
                  <Text
                    fontFamily="Pretendard Variable"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="14px"
                    color="#444444"
                    alignSelf="stretch"
                  >
                    서비스를 통해 만난 친구는 정말로 나를 이해해주는 사람이에요.
                    채팅을 통해 서로에게 열린 마음을 보여주고, 이해하며 존중하는
                    관계를 쌓아가고 있어서 더욱 뜻깊습니다.
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
                    <Icon as={BsStarFill} color={"#F6E05E"} />
                    <Text
                      fontFamily="Pretendard Variable"
                      fontWeight="medium"
                      fontSize="16px"
                      color="#000000"
                      textAlign="center"
                    >
                      5.0
                    </Text>
                  </Stack>
                  <Text
                    fontFamily="Pretendard Variable"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="14px"
                    color="#444444"
                    alignSelf="stretch"
                  >
                    이 서비스 덕분에 소소한 일상을 함께 즐길 수 있는 친구를
                    만났어요. 함께 커피 마시러 가거나 산책하는 것도 즐겁고,
                    서로의 관심사에 대해 이야기 나누면서 더 친해지고 있습니다.
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
                    <Icon as={BsStarFill} color={"#F6E05E"} />
                    <Text
                      fontFamily="Pretendard Variable"
                      fontWeight="medium"
                      fontSize="16px"
                      color="#000000"
                      textAlign="center"
                    >
                      5.0
                    </Text>
                  </Stack>
                  <Text
                    fontFamily="Pretendard Variable"
                    lineHeight="1.43"
                    fontWeight="medium"
                    fontSize="14px"
                    color="#444444"
                    alignSelf="stretch"
                  >
                    처음 만났을 때부터 서로에게 열린 마음을 가지고 있어, 신뢰와
                    이해가 깊어지고 있습니다. 이 서비스는 정말로 특별한 우정을
                    찾을 수 있는 좋은 기회를 제공해준 것 같아 감사합니다.
                  </Text>
                </Stack>
                <Button
                  bgGradient="linear(to-tr, #00D2FF, #3A47D5)"
                  height="40px"
                  alignSelf="stretch"
                  color={"white"}
                  onClick={() => navigate("/payment")}
                >
                  매칭 신청하기
                </Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
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
          <Icon as={AiFillHome} color="#3182CE" boxSize={"24px"} />
          <Text
            fontFamily="Pretendard Variable"
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
          <Icon as={BsList} boxSize={"24px"} />
          <Text
            fontFamily="Pretendard Variable"
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
          <Icon as={BsChat} boxSize={"24px"} />
          <Text
            fontFamily="Pretendard Variable"
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
          <Icon as={BsPerson} boxSize={"24px"} />
          <Text
            fontFamily="Pretendard Variable"
            fontWeight="medium"
            fontSize="12px"
            color="#000000"
            textAlign="center"
          >
            마이페이지
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
