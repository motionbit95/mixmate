import {
  Stack,
  Icon,
  Text,
  Box,
  Button,
  Container,
  Center,
  Image,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Select,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { MdChevronLeft, MdChatBubbleOutline } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineTicket } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";
import {
  black,
  gray_300,
  gray_400,
  gray_500,
  gray_700,
  gray_800,
  gray_900,
  theme_bright_color,
  theme_primary_color,
  white,
} from "../App";
import { matching_add } from "../js/MatchingAPI";
import { useState } from "react";
import { auth } from "../db/firebase_config";
import { FullButton } from "../component/Buttons";
import { formatCurrency, getSatuation } from "../js/API";
import { TopHeader } from "../component/TopHeader";
import { Navbar } from "../component/Navbar";
import axios from "axios";
import { uuidv4 } from "@firebase/util";

// head에 작성한 Kakao API 불러오기
const { AUTHNICE, kakao } = window;
export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const clientId = "S2_af4543a0be4d49a98122e01ec2059a56";
  const secretKey = "9eb85607103646da9f9c02b128f2e5ee";

  // 매칭 받을 테스트 계정 => motionbit.dev@gmail.com
  //# local state 로 받아오도록 수정 예정
  const test_uid = "6ANvpNStOsUj7kfehPPETnUhBHy2";

  const payMethod = [
    "kakaopay",
    "naverpayCard",
    "samsungpayCard",
    "card",
    "cellphone",
    "bank",
  ];

  const price = location.state?.price * 10000;
  const [pay_method, setPayMethod] = useState("card");
  async function onClickPayment() {
    // 현재 회원 uid 가지고 오기
    auth.onAuthStateChanged(async function (user) {
      /* 결제 메소드
      card : 신용카드
      bank : 계좌이체
      directCard : 결제창 없이 카드사 바로 노출
      vbank : 가상계좌
      cellphone : 휴대폰
      naverpayCard : 네이버페이-신용카드 전액결제(포인트 이용불가)
      kakaopay : 카카오페이(카드전액 또는 포인트전액)
      kakaopayCard : 카카오페이-신용카드 전액결제
      kakaopayMoney : 카카오페이-머니 전액결제
      samsungpayCard : 삼성페이 카드전액 결제
      payco : 페이코
      ssgpay : SSGPAY
      cardAndEasyPay : 신용카드와 간편결제 노출
      cardAndEasyPay인 경우, 아래 파라미터와 함께 사용불가
      - cardCode, cardQuota, shopInterest, quotaInterest
      */
      if (user) {
        //# 여기에 결제 API 추가
        // 결제창 띄우기
        AUTHNICE.requestPay({
          clientId: clientId,
          method: pay_method,
          orderId: uuidv4(),
          amount: price,
          goodsName: "매칭 서비스 결제",
          returnUrl: "http://localhost:3001/serverAuth",
          fnError: function (result) {
            alert("개발자확인용 : " + result.errorMsg + "");
          },
        });

        // 매칭 정보 추가
        // let matching_id = await matching_add({
        //   matching_sender: user.uid, // 매칭 신청자 (본인)
        //   matching_reciever: test_uid, // 현재 보고있는 페이지 유저(매칭 수신자)
        //   matching_state: 0, // default 신청 상태
        //   matching_payment: "", // 결제 정보 id
        // });
      }
    });
  }
  return (
    <Container py="50px">
      <TopHeader title={"결제하기"} />
      <Stack
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        maxWidth="100%"
        background={white}
      >
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
            <Text fontWeight="semibold" fontSize="18px" color={gray_900}>
              신청 전 유의사항
            </Text>
            <Text
              lineHeight="1.5"
              fontWeight="medium"
              fontSize="16px"
              color={gray_800}
              alignSelf="stretch"
            >
              <span>본 신청권의 유효기간은 구매일로부터 2주입니다.</span>
              <br />
              <Box as="span" fontWeight="bold" color={theme_primary_color}>
                유효기간 내에 신청권 사용을 완료
              </Box>
              <Box as="span">해주세요.</Box>
            </Text>
            <Text fontWeight="semibold" fontSize="18px" color={black}>
              진행과정
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
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Icon as={MdChatBubbleOutline} />
                <Text
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  결제 후 생성된 방에서 밥친구와 메시지
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
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  밥친구와 일정 조율 및 약속 장소 확정
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
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  새로운 인연과 즐거운 식사
                </Text>
              </Stack>
            </Stack>
            <Text fontWeight="semibold" fontSize="18px" color={black}>
              최종 결제 금액
            </Text>
            <Stack
              padding="10px"
              borderRadius="10px"
              justify="flex-start"
              align="flex-start"
              spacing="6px"
              alignSelf="stretch"
              background={gray_300}
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  정상가
                </Text>
                <Text
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                  textAlign="end"
                >
                  {formatCurrency(price)}
                </Text>
              </Stack>
              <HorizonLine />
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  쿠폰 할인
                </Text>
                <Text
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                  textAlign="end"
                >
                  {formatCurrency(0)}
                </Text>
              </Stack>
              <HorizonLine />
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  lineHeight="1.71"
                  fontWeight="bold"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  결제 예정 금액
                </Text>
                <Text
                  lineHeight="1.71"
                  fontWeight="bold"
                  fontSize="14px"
                  color={theme_primary_color}
                  flex="1"
                  textAlign="end"
                >
                  {formatCurrency(price)}
                </Text>
              </Stack>
            </Stack>
            <Text fontWeight="semibold" fontSize="18px" color={black}>
              결제 수단 선택
            </Text>
            <Stack
              w="100%"
              // padding="10px"
              // direction="row"
              // justify="flex-start"
              // align="flex-end"
              // spacing="10px"
              // overflow="hidden"
              // alignSelf="stretch"
            >
              <HStack w="100%">
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  backgroundColor={
                    pay_method === payMethod[0] ? theme_bright_color : "white"
                  }
                  _hover={{
                    backgroundColor: theme_bright_color,
                    borderColor: theme_primary_color,
                  }}
                  onClick={() => setPayMethod(payMethod[0])}
                >
                  <Image src={require("../assets/kakao.png")} h="24px"></Image>
                </Center>
                {/* <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  _hover={{
                    backgroundColor: gray_400,
                    borderColor: { theme_primary_color },
                  }}
                >
                  <Image src={require("../assets/toss.png")} h="50px"></Image>
                </Center> */}
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  backgroundColor={
                    pay_method === payMethod[1] ? theme_bright_color : "white"
                  }
                  _hover={{
                    backgroundColor: theme_bright_color,
                    borderColor: theme_primary_color,
                  }}
                  onClick={() => setPayMethod(payMethod[1])}
                >
                  <Image src={require("../assets/naver.png")} h="24px"></Image>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  backgroundColor={
                    pay_method === payMethod[2] ? theme_bright_color : "white"
                  }
                  _hover={{
                    backgroundColor: theme_bright_color,
                    borderColor: { theme_primary_color },
                  }}
                  onClick={() => setPayMethod(payMethod[2])}
                >
                  <Image
                    src={require("../assets/samsung.png")}
                    h="24px"
                  ></Image>
                </Center>
              </HStack>

              <HStack w="100%">
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  backgroundColor={
                    pay_method === payMethod[3] ? theme_bright_color : "white"
                  }
                  _hover={{
                    backgroundColor: theme_bright_color,
                    borderColor: theme_primary_color,
                  }}
                  onClick={() => setPayMethod(payMethod[3])}
                >
                  <Text
                    lineHeight="1.5"
                    fontWeight="semibold"
                    fontSize="16px"
                    color={gray_700}
                  >
                    신용카드
                  </Text>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  backgroundColor={
                    pay_method === payMethod[4] ? theme_bright_color : "white"
                  }
                  _hover={{
                    backgroundColor: theme_bright_color,
                    borderColor: { theme_primary_color },
                  }}
                  onClick={() => setPayMethod(payMethod[4])}
                >
                  <Text
                    lineHeight="1.5"
                    fontWeight="semibold"
                    fontSize="16px"
                    color={gray_700}
                  >
                    휴대폰결제
                  </Text>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  backgroundColor={
                    pay_method === payMethod[5] ? theme_bright_color : "white"
                  }
                  _hover={{
                    backgroundColor: theme_bright_color,
                    borderColor: theme_primary_color,
                  }}
                  onClick={() => setPayMethod(payMethod[5])}
                >
                  <Text
                    lineHeight="1.25"
                    fontWeight="semibold"
                    fontSize="16px"
                    color={gray_700}
                    textAlign="center"
                  >
                    실시간 계좌이체
                  </Text>
                </Center>
              </HStack>

              <FullButton
                onClick={onClickPayment}
                code={theme_primary_color}
                text={`${formatCurrency(price)} 결제`}
              />
            </Stack>
            {/* <Stack w="100%" spacing={"10px"}>
              <Text fontWeight="semibold" fontSize="18px" color={gray_900}>
                신용카드 정보 입력
              </Text>
              <FormControl isRequired>
                <FormLabel>신용카드 정보</FormLabel>
                <Input />
                <FormHelperText>
                  신용카드 번호 숫자만 입력해주세요.
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>만료일</FormLabel>
                <HStack>
                  <Select></Select>
                  <Select></Select>
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>비밀번호 앞 2자리</FormLabel>
                <Input type="password" maxLength={2} />
                <FormHelperText>
                  신용카드 비밀번호의 앞 2자리를 입력해주세요.
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>생년월일 6자리 또는 사업자 등록번호</FormLabel>
                <Input type="password" maxLength={2} />
                <FormHelperText>
                  개인카드는 생년월일 6자리, 법인카드는 사업자등록번호 10자리를
                  입력해주세요.
                </FormHelperText>
              </FormControl>
              <Flex py={"2vh"}>
                <HorizonLine />
              </Flex>
              <Checkbox>
                결제 조건을 확인하였으며 구매 진행에 동의합니다.
              </Checkbox>
            </Stack> */}
            {/* <Button
              onClick={onClickPayment}
              colorScheme="blue"
              height="40px"
              alignSelf="stretch"
            >
              결제하기
            </Button> */}
          </Stack>
        </Stack>
      </Stack>
      {/* <Navbar /> */}
    </Container>
  );
};
