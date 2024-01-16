import {
  Stack,
  Text,
  Box,
  Icon,
  Circle,
  Button,
  Avatar,
  Center,
  Container,
} from "@chakra-ui/react";
import {
  BsBell,
  BsPeopleFill,
  BsStarFill,
  BsList,
  BsPerson,
  BsChat,
} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Stack
      justify="flex-start"
      align="flex-start"
      spacing="0px"
      overflow="hidden"
      // width="393px"
      maxWidth="100%"
      background="#FFFFFF"
    >
      <Stack
        paddingX="20px"
        paddingY="10px"
        direction="row"
        justify="space-between"
        align="flex-start"
        spacing="10px"
        overflow="hidden"
        alignSelf="stretch"
      >
        <Text
          fontFamily="Pretendard Variable"
          fontWeight="black"
          fontSize="24px"
          color="#000000"
          textAlign="center"
        >
          MIXMATE
        </Text>
        <Stack>
          <Icon
            as={BsBell}
            boxSize={"24px"}
            onClick={() => navigate("/notice")}
          />
          <Circle
            position={"absolute"}
            ml={"14px"}
            size="10px"
            background="#FF0000"
          />
        </Stack>
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
          height="167px"
          alignSelf="stretch"
          bgImage={require("../assets/iOS 16 Wallpaper.png")}
        >
          <Text
            fontFamily="Pretendard Variable"
            lineHeight="0.7"
            fontWeight="semibold"
            fontSize="30px"
            letterSpacing="-0.32px"
            color="#FFFFFF"
            textAlign="center"
          >
            Event
          </Text>
          <Box>
            <Center
              borderRadius="100px"
              width="74px"
              height="30px"
              background="rgba(0, 0, 0, 0.5)"
            >
              <Text
                fontFamily="Pretendard Variable"
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
          </Box>
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
              fontFamily="Pretendard Variable"
              lineHeight="1.31"
              fontWeight="semibold"
              fontSize="16px"
              letterSpacing="-0.32px"
              color="#000000"
              textAlign="center"
            >
              주변 친구
            </Text>
          </Stack>
          <Button size="xs" variant="outline" colorScheme="blue" height="24px">
            새친구찾기
          </Button>
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
            <Avatar
              name="Kola Tioluwani"
              src="https://bit.ly/tioluwani-kolawole"
              size="lg"
            />
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
                역삼동, 좋아하는 취미: 테니스, 골프
              </Text>
            </Stack>
            <Button size="sm" onClick={() => navigate("/matching")}>
              신청하기
            </Button>
          </Stack>
          <Stack
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
              size="lg"
            />
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
                역삼동, 좋아하는 취미: 테니스, 골프
              </Text>
            </Stack>
            <Button size="sm">신청하기</Button>
          </Stack>
          <Stack
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar
              name="Ryan Florence"
              src="https://bit.ly/ryan-florence"
              size="lg"
            />
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
                역삼동, 좋아하는 취미: 테니스, 골프
              </Text>
            </Stack>
            <Button size="sm">신청하기</Button>
          </Stack>
          <Stack
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar
              name="Christian Nwamba"
              src="https://bit.ly/code-beast"
              size="lg"
            />
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
                역삼동, 좋아하는 취미: 테니스, 골프
              </Text>
            </Stack>
            <Button size="sm">신청하기</Button>
          </Stack>
          <Stack
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
              size="lg"
            />
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
                역삼동, 좋아하는 취미: 테니스, 골프
              </Text>
            </Stack>
            <Button size="sm">신청하기</Button>
          </Stack>
          <Stack
            paddingY="10px"
            direction="row"
            justify="flex-start"
            align="center"
            spacing="10px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              size="lg"
            />
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
                역삼동, 좋아하는 취미: 테니스, 골프
              </Text>
            </Stack>
            <Button size="sm">신청하기</Button>
          </Stack>
          <Button
            bgGradient="linear(to-tr, #00D2FF, #3A47D5)"
            height="40px"
            color={"white"}
          >
            더보기
          </Button>
        </Stack>
      </Stack>
      <Stack
        padding="20px"
        direction="row"
        justify="space-between"
        align="center"
        spacing="10px"
        alignSelf="stretch"
        background="#F1F1F1"
      >
        <Text
          fontFamily="Apple SD Gothic Neo"
          lineHeight="1.5"
          fontWeight="regular"
          fontSize="14px"
          letterSpacing="-0.32px"
          color="#000000"
        >
          대표자명 : 김지훈 | 사업자 등록번호 : 817-88-02796 <br /> 주소 :
          서울시 강남구 서초구 강남대로 51길 10 강남효성해링턴 103 <br />
          통신판매 신고번호 : 2023-서울서초-1772 <br />
          전화번호 : 02 3471 8197 | 이메일 : safeboundary@naver.com
        </Text>
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
