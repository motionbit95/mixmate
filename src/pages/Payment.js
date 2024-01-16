import {
  Stack,
  Icon,
  Text,
  Box,
  Button,
  Container,
  Image,
  Center,
  Wrap,
} from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { AiOutlineCalendar, AiFillHome } from "react-icons/ai";
import { HiOutlineTicket } from "react-icons/hi";
import { BsList, BsPerson, BsChat } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";

export const Payment = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Stack
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        maxWidth="100%"
        background="#FFFFFF"
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
            결제하기
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
            padding="10px"
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
              구매전 유의사항
            </Text>
            <Text
              fontFamily="Pretendard Variable"
              lineHeight="1.5"
              fontWeight="medium"
              fontSize="16px"
              color="#4E4E4E"
              alignSelf="stretch"
            >
              <div>본 이용권의 유효기간은 구매일로부터 2주입니다.</div>
              <Box as="span" fontWeight="bold" color="#3182CE">
                유효기간 내에 이용권 사용을 완료
              </Box>
              <Box as="span">해주세요.</Box>
            </Text>
            <Text
              fontFamily="Pretendard Variable"
              fontWeight="semibold"
              fontSize="18px"
              color="#000000"
            >
              진행과정
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
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Icon as={BsChat} />
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#4E4E4E"
                  flex="1"
                >
                  결제 후 생성된 방에서 안내 메세지 확인
                </Text>
              </Stack>
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Icon as={AiOutlineCalendar} />
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#4E4E4E"
                  flex="1"
                >
                  전문가와 일정 조율 및 예약 확정
                </Text>
              </Stack>
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Icon as={HiOutlineTicket} />
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#4E4E4E"
                  flex="1"
                >
                  예약 확정된 일정에 이용권 사용
                </Text>
              </Stack>
            </Stack>
            <Text
              fontFamily="Pretendard Variable"
              fontWeight="semibold"
              fontSize="18px"
              color="#000000"
            >
              최종 결제 금액
            </Text>
            <Stack
              padding="10px"
              borderRadius="10px"
              justify="flex-start"
              align="flex-start"
              spacing="6px"
              alignSelf="stretch"
              background="#F1F1F1"
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#4E4E4E"
                  flex="1"
                >
                  정상가
                </Text>
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#4E4E4E"
                  flex="1"
                  textAlign="end"
                >
                  20,000원
                </Text>
              </Stack>
              <span className="unsupported" />
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#4E4E4E"
                  flex="1"
                >
                  쿠폰 할인
                </Text>
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color="#4E4E4E"
                  flex="1"
                  textAlign="end"
                >
                  0원
                </Text>
              </Stack>
              <span className="unsupported" />
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="bold"
                  fontSize="14px"
                  color="#4E4E4E"
                  flex="1"
                >
                  결제 예정 금액
                </Text>
                <Text
                  fontFamily="Pretendard Variable"
                  lineHeight="1.71"
                  fontWeight="bold"
                  fontSize="14px"
                  color="#3182CE"
                  flex="1"
                  textAlign="end"
                >
                  20,000원
                </Text>
              </Stack>
            </Stack>
            <Text
              fontFamily="Pretendard Variable"
              fontWeight="semibold"
              fontSize="18px"
              color="#000000"
            >
              결제 수단 선택
            </Text>
            <Center w="100%">
              <Wrap
                // padding="10px"
                direction="row"
                justify="flex-start"
                align="flex-end"
                spacing="10px"
                overflow="hidden"
                alignSelf="stretch"
              >
                <Center
                  borderRadius="10px"
                  borderColor="#3182CE"
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="31%"
                  height="50px"
                  background="#EBF8FF"
                >
                  <Image src={require("../assets/kakao.png")} h="20px" />
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor="#D9D9D9"
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="31%"
                  height="50px"
                >
                  <Image src={require("../assets/toss.png")} h="50px" />
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor="#D9D9D9"
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="31%"
                  height="50px"
                >
                  <Image src={require("../assets/naverpay.png")} h="20px" />
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor="#D9D9D9"
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="31%"
                  height="50px"
                >
                  <Image src={require("../assets/samsung.png")} h="25px" />
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor="#D9D9D9"
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="31%"
                  height="50px"
                >
                  <Text
                    fontFamily="Pretendard Variable"
                    lineHeight="1.5"
                    fontWeight="semibold"
                    fontSize="16px"
                    color="#444444"
                  >
                    신용카드
                  </Text>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor="#D9D9D9"
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="31%"
                  height="50px"
                >
                  <Text
                    fontFamily="Pretendard Variable"
                    lineHeight="1.5"
                    fontWeight="semibold"
                    fontSize="16px"
                    color="#444444"
                  >
                    휴대폰결제
                  </Text>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor="#D9D9D9"
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="31%"
                  height="50px"
                >
                  <Text
                    fontFamily="Pretendard Variable"
                    lineHeight="1.25"
                    fontWeight="semibold"
                    fontSize="16px"
                    color="#444444"
                    textAlign="center"
                  >
                    실시간
                    <br />
                    계좌이체
                  </Text>
                </Center>
              </Wrap>
            </Center>
            <Button colorScheme="blue" height="40px" alignSelf="stretch">
              결제하기
            </Button>
          </Stack>
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
    </Container>
  );
};
