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
import { useContext, useRef, useState } from "react";
import { auth } from "../db/firebase_config";
import { FullButton } from "../component/Buttons";
import { formatCurrency, getSatuation } from "../js/API";
import { TopHeader } from "../component/TopHeader";
import { Navbar } from "../component/Navbar";
import axios from "axios";
import { uuidv4 } from "@firebase/util";
import { db_add, db_set, get_doc_data, get_doc_list } from "../js/Database";
import { AppContext } from "./Home";

// head에 작성한 Kakao API 불러오기
const { AUTHNICE, kakao } = window;
export const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const content = useRef({
    // Default form set
    is_direct: "Y", // 결제창 방식 (DIRECT: Y | POPUP: N)
    pay_type: "card", // 결제수단
    work_type: "CERT", // 결제요청방식
    card_ver: "", // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
    payple_payer_id: "", // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)
    buyer_no: "2335", // 가맹점 회원 고유번호
    buyer_name: "홍길동", // 결제자 이름
    buyer_hp: "01012345678", // 결제자 휴대폰 번호
    buyer_email: "test@payple.kr", // 결제자 Email
    buy_goods: "매칭 식사권", // 결제 상품
    buy_total: "1000", // 결제 금액
    buy_istax: "Y", // 과세여부 (과세: Y | 비과세(면세): N)
    buy_taxtotal: "", // 부가세(복합과세인 경우 필수)
    order_num: uuidv4(), // 주문번호
    pay_year: "", // [정기결제] 결제 구분 년도
    pay_month: "", // [정기결제] 결제 구분 월
    is_reguler: "N", // 정기결제 여부 (Y | N)
    is_taxsave: "N", // 현금영수증 발행여부
    simple_flag: "N", // 간편결제 여부
    auth_type: "sms", // [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)
  });

  const price = location.state?.price * 10000;
  const [pay_method, setPayMethod] = useState("card");

  const createOid = () => {
    const now_date = new Date();
    let now_year = now_date.getFullYear();
    let now_month = now_date.getMonth() + 1;
    now_month = now_month < 10 ? "0" + now_month : now_month;
    let now_day = now_date.getDate();
    now_day = now_day < 10 ? "0" + now_day : now_day;
    const datetime = now_date.getTime();
    return now_year + now_month + now_day + datetime;
  };

  async function onClickPayment() {
    console.log(location.state);

    console.log(content.current);

    // 유저정보
    const user = await get_doc_data("user", auth.currentUser?.uid);
    console.log(user);

    // 구매정보 수정

    content.current.buyer_name = user?.user_name;
    content.current.buyer_hp = user?.user_phone;
    content.current.buyer_email = user?.user_email;
    content.current.buy_total = price;
    content.current.order_num = createOid();
    content.current.buy_goods =
      location.state.receiver.user_name +
      "(" +
      location.state.receiver.doc_id.substring(6) +
      ")";

    navigate("/order_confirm", { state: { content: content.current } });
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
                {/* <Center
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
                </Center> */}
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
                {/* <Center
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
                </Center> */}
                {/* <Center
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
                </Center> */}
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
                    pay_method === "card" ? theme_bright_color : "white"
                  }
                  _hover={{
                    backgroundColor: theme_bright_color,
                    borderColor: theme_primary_color,
                  }}
                  onClick={() => setPayMethod("card")}
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
                {/* <Center
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
                    pay_method === "transfer" ? theme_bright_color : "white"
                  }
                  _hover={{
                    backgroundColor: theme_bright_color,
                    borderColor: theme_primary_color,
                  }}
                  onClick={() => setPayMethod("transfer")}
                >
                  <Text
                    lineHeight="1.25"
                    fontWeight="semibold"
                    fontSize="16px"
                    color={gray_700}
                    textAlign="center"
                  >
                    계좌이체
                  </Text>
                </Center>
              </HStack>

              <FullButton
                my={"2vh"}
                code={theme_bright_color}
                onClick={onClickPayment}
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
