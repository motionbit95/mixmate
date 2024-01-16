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
} from "@chakra-ui/react";
import {
  BsBell,
  BsPeopleFill,
  BsStarFill,
  BsList,
  BsPerson,
} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";
import HorizonLine from "../component/HorizontalLine";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Container py={"50px"}>
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
              direction="row"
              justify="flex-start"
              align="center"
              spacing="10px"
            >
              <Icon as={BsPeopleFill} />
              <Text
                fontFamily="SF Pro"
                lineHeight="1.31"
                fontWeight="semibold"
                fontSize="16px"
                letterSpacing="-0.32px"
                color="#000000"
                textAlign="center"
              >
                내 주변 밥친구
              </Text>
            </Stack>
            <Stack
              direction="row"
              justify="flex-start"
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
          </Stack>
          <Stack
            justify="flex-start"
            align="center"
            spacing="0px"
            alignSelf="stretch"
          >
            <Stack
              paddingY="10px"
              direction="row"
              justify="flex-start"
              align="center"
              spacing="10px"
              overflow="hidden"
              alignSelf="stretch"
            >
              <Avatar name="" src=" " size="lg" />
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
                      송*혁
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
                  나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 : 서울
                  성북구, 역삼동, 좋아하는 음식: 김치찌개, 된장찌개
                </Text>
              </Stack>
              <Button size="sm" onClick={() => navigate("/matching")}>
                신청하기
              </Button>
            </Stack>

            <Button colorScheme="blue" height="40px">
              더보기
            </Button>
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
