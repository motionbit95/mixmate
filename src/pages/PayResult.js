import {
  Box,
  Center,
  Container,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/layout";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { db_add, db_set } from "../js/Database";
import { CustomButton } from "../component/Buttons";

export const PayResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    getPayment();
  }, []);

  async function getPayment() {
    // const object = {
    //   resultCode: "0000",
    //   resultMsg: "정상 처리되었습니다.",
    //   tid: "UT0000113m01012401250848171001",
    //   cancelledTid: null,
    //   orderId: "f685293a-061b-44bd-85d4-2e5e5753a04e",
    //   ediDate: "2024-01-25T08:48:18.152+0900",
    //   signature:
    //     "5a43a2413364f82b5b9210a7587c7b4a20f3ecf7d95fd2a4e2c78c1f0b22f739",
    //   status: "paid",
    //   paidAt: "2024-01-25T08:48:18.000+0900",
    //   failedAt: "0",
    //   cancelledAt: "0",
    //   payMethod: "card",
    //   amount: 30000,
    //   balanceAmt: 30000,
    //   goodsName: "매칭 서비스 결제",
    //   mallReserved: null,
    //   useEscrow: false,
    //   currency: "KRW",
    //   channel: "pc",
    //   approveNo: "000000",
    //   buyerName: null,
    //   buyerTel: null,
    //   buyerEmail: null,
    //   receiptUrl:
    //     "https://npg.nicepay.co.kr/issue/IssueLoader.do?type=0&innerWin=Y&TID=UT0000113m01012401250848171001",
    //   mallUserId: null,
    //   issuedCashReceipt: false,
    //   coupon: { couponAmt: 0 },
    //   card: {
    //     cardCode: "04",
    //     cardName: "삼성",
    //     cardNum: "123412******1234",
    //     cardQuota: 0,
    //     isInterestFree: false,
    //     cardType: "credit",
    //     canPartCancel: true,
    //     acquCardCode: "04",
    //     acquCardName: "삼성",
    //   },
    //   vbank: null,
    //   bank: null,
    //   cellphone: null,
    //   cancels: null,
    //   cashReceipts: null,
    //   messageSource: "nicepay",
    // };

    var decodedData = decodeURIComponent(window.location.search);
    var stringData = decodedData.split("?data=")[1];
    var jsonData = JSON.parse(stringData);
    console.log(jsonData);

    await db_set("payment", jsonData.orderId, jsonData);
  }
  return (
    <Container minH={"100vh"}>
      <Center minH={"100vh"}>
        <VStack>
          <Text fontSize={"x-large"} fontWeight={"bold"}>
            결제가 완료되었습니다.
          </Text>
          <CustomButton onClick={() => navigate("/")} text="홈으로 이동하기" />
          <CustomButton
            onClick={() => navigate("/details")}
            text="신청내역으로 이동하기"
          />
        </VStack>
      </Center>
    </Container>
  );
};
