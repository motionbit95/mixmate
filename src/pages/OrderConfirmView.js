import { parse } from "querystring";
import React, { useEffect, useState } from "react";

function OrderConfirmView(props) {
  const [content, setContent] = useState({});
  const [payResult, setPayResult] = useState({});
  const [orderInfo, setOrderInfo] = useState(null);
  useEffect(() => {
    if (window.location.search) {
      //   console.log("인증이 완료되었음!");
      // 현재 URL에서 쿼리 문자열 추출
      var queryString = window.location.search.substring(1);

      // URL 쿼리 문자열을 객체로 변환
      var queryParams = new URLSearchParams(decodeURIComponent(queryString));

      var content = {
        auth_type: queryParams.get("auth_type"),
        buy_goods: queryParams.get("buy_goods"),
        buy_istax: queryParams.get("buy_istax"),
        buy_total: queryParams.get("buy_total"),
        buy_taxtotal: queryParams.get("buy_taxtotal"),
        buyer_email: queryParams.get("buyer_email"),
        buyer_name: queryParams.get("buyer_name"),
        buyer_no: queryParams.get("buyer_no"),
        card_ver: queryParams.get("card_ver"),
        is_direct: queryParams.get("is_direct"),
        is_reguler: queryParams.get("is_reguler"),
        is_taxsave: queryParams.get("is_taxsave"),
        order_num: queryParams.get("order_num"),
        pay_month: queryParams.get("pay_month"),
        pay_type: queryParams.get("pay_type"),
        pay_year: queryParams.get("pay_year"),
        payple_payer_id: queryParams.get("payple_payer_id"),
        simple_flag: queryParams.get("simple_flag"),
        work_type: queryParams.get("work_type"),
      };

      setContent(content);

      // URL 쿼리 문자열을 객체로 변환

      openPopup(content);
    }
  }, []);

  const getResult = (res) => {
    if (res.PCD_PAY_RST === "success") {
      payResult = res;

      // 전달받은 결제 파라미터값을 state에 저장 후  '/react/order_result'로 이동
      //   navigate("/order_result", { state: { payResult: payResult } });
    } else {
      // 결제 실패일 경우 알림 메시지
      window.alert(res.PCD_PAY_MSG);
    }
  };

  const openPopup = (content) => {
    const obj = {};
    /*
     *  공통 설정
     */
    obj.PCD_PAY_TYPE = content.pay_type; // (필수) 결제 방법 (transfer | card)
    obj.PCD_PAY_WORK = content.work_type; // (필수) 결제요청 업무구분 (AUTH : 본인인증+계좌등록, CERT: 본인인증+계좌등록+결제요청등록(최종 결제승인요청 필요), PAY: 본인인증+계좌등록+결제완료)
    if (content.pay_type === "card")
      obj.PCD_CARD_VER = content.card_ver || "02"; // DEFAULT: 01 (01: 정기결제 플렛폼, 02: 일반결제 플렛폼), 카드결제 시 필수
    obj.PCD_PAYER_AUTHTYPE = content.auth_type; // (선택) [간편결제/정기결제] 본인인증 방식 (sms : 문자인증 | pwd : 패스워드 인증)

    // IOS, AOS앱 및 인앱브라우저에서는 결제창 호출 방식을 다이렉트로 연결해 주세요.
    // content.is_direct === 'Y' 인 경우, POST 요청을 처리할 서버 도메인을 입력해 주세요.
    // direct(절대경로): https://payple.kr/sample/pay.html | popup(상대경로) https:// 로 시작하지 않고, 중간경로( /sample/pay.html)를 표기한 URL
    // ref: https://developer.payple.kr/service/faq

    if (
      content.is_direct === "Y"
        ? (obj.PCD_RST_URL = process.env.REACT_APP_REMOTE_HOSTNAME + "/api")
        : (obj.PCD_RST_URL = "/react/order_result")
    );
    // obj.PCD_RST_URL = pcd_rst_url;							 // (필수) 결제(요청)결과 RETURN URL

    // (선택) 결과를 받고자 하는 callback 함수명 (callback함수를 설정할 경우 PCD_RST_URL 이 작동하지 않음)
    // ref: https://developer.payple.kr/service/faq
    obj.callbackFunction = getResult;

    /*
     *  빌링키 등록 (pay_work === 'AUTH')
     */
    if (content.pay_type === "AUTH") {
      obj.PCD_PAYER_NO = content.buyer_no; // (선택) 가맹점 회원 고유번호 (결과전송 시 입력값 그대로 RETURN)
      obj.PCD_PAYER_NAME = content.buyer_name; // (선택) 결제자 이름
      obj.PCD_PAYER_HP = content.buyer_hp; // (선택) 결제자 휴대폰 번호
      obj.PCD_PAYER_EMAIL = content.buyer_email; // (선택) 결제자 Email
      obj.PCD_TAXSAVE_FLAG = content.is_taxsave; // (선택) 현금영수증 발행여부
      obj.PCD_REGULER_FLAG = content.is_reguler; // (선택) 정기결제 여부 (Y|N)
      obj.PCD_SIMPLE_FLAG = content.simple_flag; // (선택) 간편결제 여부 (Y|N)
    } else {
      /*
       *  최초결제 및 단건(일반,비회원)결제
       */
      // 간편결제 여부('N')
      if (content.simple_flag !== "Y" || content.payple_payer_id === "") {
        obj.PCD_PAYER_NO = content.buyer_no; // (선택) 가맹점 회원 고유번호 (결과전송 시 입력값 그대로 RETURN)
        obj.PCD_PAYER_NAME = content.buyer_name; // (선택) 결제자 이름
        obj.PCD_PAYER_HP = content.buyer_hp; // (선택) 결제자 휴대폰 번호
        obj.PCD_PAYER_EMAIL = content.buyer_email; // (선택) 결제자 Email
        obj.PCD_PAY_GOODS = content.buy_goods; // (필수) 결제 상품
        obj.PCD_PAY_TOTAL = content.buy_total; // (필수) 결제 금액
        obj.PCD_PAY_TAXTOTAL = content.buy_taxtotal; // (선택) 부가세 (복합과세인 경우 필수)
        obj.PCD_PAY_ISTAX = content.buy_istax; // (선택) 과세여부 (과세: Y | 비과세(면세): N)
        obj.PCD_PAY_OID = content.order_num; // 주문번호 (미입력 시 임의 생성)
        obj.PCD_REGULER_FLAG = content.is_reguler; // (선택) 정기결제 여부 (Y|N)
        obj.PCD_PAY_YEAR = content.pay_year; // (PCD_REGULER_FLAG = Y 일때 필수) [정기결제] 결제 구분 년도 (PCD_REGULER_FLAG : 'Y' 일때 필수)
        obj.PCD_PAY_MONTH = content.pay_month; // (PCD_REGULER_FLAG = Y 일때 필수) [정기결제] 결제 구분 월 (PCD_REGULER_FLAG : 'Y' 일때 필수)
        obj.PCD_TAXSAVE_FLAG = content.is_taxsave; // (선택) 현금영수증 발행 여부 (Y|N)
      }
      // 간편결제 여부('Y'), 등록된 빌링키(PCD_PAYER_ID)의 결제창 호출
      else if (content.simple_flag === "Y" && content.payple_payer_id !== "") {
        obj.PCD_SIMPLE_FLAG = content.simple_flag; // 간편결제 여부 (Y|N)
        //-- PCD_PAYER_ID 는 소스상에 표시하지 마시고 반드시 Server Side Script 를 이용하여 불러오시기 바랍니다. --//
        obj.PCD_PAYER_ID = content.payple_payer_id; // 결제자 고유ID (본인인증 된 결제회원 고유 KEY)

        obj.PCD_PAYER_NO = content.buyer_no; // (선택) 가맹점 회원 고유번호 (결과전송 시 입력값 그대로 RETURN)
        obj.PCD_PAY_GOODS = content.buy_goods; // (필수) 결제 상품
        obj.PCD_PAY_TOTAL = content.buy_total; // (필수) 결제 금액
        obj.PCD_PAY_TAXTOTAL = content.buy_taxtotal; // (선택) 부가세(복합과세인 경우 필수)
        obj.PCD_PAY_ISTAX = content.buy_istax; // (선택) 과세여부 (과세: Y | 비과세(면세): N)
        obj.PCD_PAY_OID = content.order_num; // 주문번호 (미입력 시 임의 생성)
        obj.PCD_REGULER_FLAG = content.is_reguler; // (선택) 정기결제 여부 (Y|N)
        obj.PCD_PAY_YEAR = content.pay_year; // (PCD_REGULER_FLAG = Y 일때 필수) [정기결제] 결제 구분 년도 (PCD_REGULER_FLAG : 'Y' 일때 필수)
        obj.PCD_PAY_MONTH = content.pay_month; // (PCD_REGULER_FLAG = Y 일때 필수) [정기결제] 결제 구분 월 (PCD_REGULER_FLAG : 'Y' 일때 필수)
        obj.PCD_TAXSAVE_FLAG = content.is_taxsave; // (선택) 현금영수증 발행 여부 (Y|N)
      }
    }

    // 파트너 인증 - 클라이언트 키(clientKey)
    obj.clientKey = process.env.REACT_APP_CLIENT_KEY;

    window.PaypleCpayAuthCheck(obj);
  };

  return;
}

export default OrderConfirmView;
