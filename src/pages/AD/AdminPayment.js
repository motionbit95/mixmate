import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { formatCurrency, getDisplayAge2 } from "../../js/API";
import {
  db_delete,
  db_update,
  get_doc_all,
  get_doc_all2,
  get_doc_data,
} from "../../js/Database";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { defaultFemale, defaultMale } from "../../db/dummy";
import { useNavigate } from "react-router-dom";
import PopupBase from "../../modals/PopupBase";
import { upload_image } from "../../js/Storage";
import { post } from "jquery";

export const UserInfo = ({ uid, ...props }) => {
  const [value, setValue] = useState({
    user_profile: "",
    user_name: "",
    user_gender: "",
    user_birth: "",
    user_phone: "",
    user_place: [],
    user_interest: [],
    user_bank: {
      bank_name: "",
      account_number: "",
    },
  });
  useEffect(() => {
    console.log(uid);
    get_doc_data("user", uid).then((data) => {
      setValue(data);
    });
  }, [uid]);
  return (
    <PopupBase
      variant={"ghost"}
      size={"sm"}
      colorScheme={"gray"}
      visibleButton={false}
      title={
        value?.user_name ? (
          <>
            <HStack>
              <Avatar src={value?.user_profile} size="sm" />
              <Text>{value?.user_name}</Text>
            </HStack>
          </>
        ) : (
          <Text>정보없음</Text>
        )
      }
      onClose={() => {}}
    >
      <Stack
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        width="100%"
      >
        <Stack
          direction="row"
          justify="center"
          align="flex-start"
          spacing="10px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
          w={"100%"}
        >
          <Stack
            justify="flex-start"
            align="flex-start"
            spacing="4vh"
            flex="1"
            w={"100%"}
          >
            <Stack
              justify="flex-start"
              align="flex-start"
              spacing="2vh"
              alignSelf="stretch"
              w={"100%"}
            >
              <HStack
                divider={<StackDivider />}
                spacing={"10px"}
                w={"100%"}
                h={"100%"}
                alignItems={"flex-start"}
              >
                <Stack bgColor={"white"} h={"100%"} w={"100%"} display={"flex"}>
                  <FormControl isRequired>
                    <FormLabel>이름</FormLabel>
                    <Input
                      readOnly
                      name="user_name"
                      type="text"
                      placeholder="실명"
                      height="40px"
                      alignSelf="stretch"
                      defaultValue={value?.user_name}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>휴대번호</FormLabel>
                    <Input
                      readOnly
                      name="user_phone"
                      type="text"
                      placeholder="휴대폰번호"
                      height="40px"
                      alignSelf="stretch"
                      defaultValue={value?.user_phone}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>생년월일</FormLabel>
                    <Input
                      readOnly
                      name="user_birth"
                      type="text"
                      placeholder="생년월일"
                      height="40px"
                      alignSelf="stretch"
                      defaultValue={value?.user_birth}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>성별</FormLabel>
                    <Input
                      readOnly
                      name="user_gender"
                      type="text"
                      placeholder="성별"
                      height="40px"
                      alignSelf="stretch"
                      defaultValue={value?.user_gender}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>
                      나와 식사하려면 상대방이 지불해야하는 금액은?
                    </FormLabel>
                    <Text fontSize={"sm"} color={"gray.400"} mt={"-10px"}>
                      (본인의 부수입으로 입금됩니다)
                    </Text>
                    <InputGroup mt={"1vh"}>
                      <Input
                        readOnly
                        name="user_price"
                        // w={"70px"}
                        type="number"
                        defaultValue={2}
                        textAlign={"right"}
                      />
                      <InputRightAddon>만원</InputRightAddon>
                    </InputGroup>
                  </FormControl>
                </Stack>
                <Stack bgColor={"white"} h={"100%"} w={"100%"}>
                  <FormControl isRequired>
                    <FormLabel>식사 가능 동네</FormLabel>
                    <Input readOnly defaultValue={value?.user_place[0]} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>관심사(선택)</FormLabel>
                    <Input readOnly defaultValue={value?.user_interest?.[0]} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>프로필 소개말</FormLabel>
                    <Textarea
                      readOnly
                      name="user_info"
                      defaultValue={value?.user_info}
                      minLength={20}
                      placeholder={
                        "원하시는 매칭 방법(식사매칭 또는 커피매칭)과 간단한 소개를 작성해주세요!"
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>매칭권 부수입 정산받을 계좌(선택)</FormLabel>
                    <HStack w={"100%"}>
                      <Input
                        readOnly
                        placeholder="은행명"
                        name="bank_name"
                        w={"100%"}
                        defaultValue={value?.user_bank?.bank_name}
                      />
                      <Input
                        readOnly
                        name="accout_number"
                        defaultValue={value?.user_bank?.accout_number}
                        placeholder="계좌번호"
                        size="md"
                        w={"100%"}
                      />
                    </HStack>
                  </FormControl>
                </Stack>
              </HStack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </PopupBase>
  );
};

function AdminPayment({ data, ...props }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selImage, setSelImage] = useState("");
  const [payments, setPayments] = useState(data ? data : null);
  const [searchPayments, setSearchPayments] = useState(data ? data : null);
  const [search, setSearch] = useState({
    filter: "doc_id",
    keyword: "",
  });

  useEffect(() => {
    if (!payments) {
      getPayments();
    }
  }, []);

  const getPayments = async () => {
    await get_doc_all("payment").then((data) => {
      setPayments(data);
      setSearchPayments(data);
    });
  };

  const deletePayment = async (oid) => {
    if (window.confirm("결제내역을 삭제하시겠습니까?")) {
      await db_delete("payment", oid);
      getPayments();
    }
  };

  const handleSearch = (payments) => {
    console.log(payments);

    let searchPayments = [];
    payments.map((value, index) => {
      if (value[search.filter].includes(search.keyword)) {
        if (value[search.filter].includes(search.keyword)) {
          searchPayments.push(value);
        }
      }
    });

    setSearchPayments(searchPayments);
  };

  const handlePayRefund = async (oid) => {
    const payResult = await get_doc_data("payment", oid);

    console.log(payResult);

    const params = {
      cst_id: process.env.REACT_APP_CST_ID, // 파트너 ID (실결제시 발급받은 운영ID를 작성하시기 바랍니다.)
      custKey: process.env.REACT_APP_CUST_KEY, // 파트너 인증키 (실결제시 발급받은 운영Key를 작성하시기 바랍니다.)
      PCD_PAYCANCEL_FLAG: "Y", // 상황별 파트너 인증 파라미터
    };

    post(process.env.REACT_APP_AUTH_URL, JSON.stringify(params), {
      headers: {
        "content-type": "application/json",
        referer: process.env.REACT_APP_HOSTNAME, // Referer 필수
      },
    }).then((r) => {
      alert(r.result_msg);
      // 토큰값 세팅
      const refundURL = r.return_url; // 리턴 받은 환불(승인취소) URL
      const params = {
        PCD_CST_ID: r.cst_id, // 리턴 받은 cst_id Token
        PCD_CUST_KEY: r.custKey, // 리턴 받은 custKey Token
        PCD_AUTH_KEY: r.AuthKey, // 결제용 인증키
        PCD_REFUND_KEY: process.env.REACT_APP_PCD_REFUND_KEY, // 환불서비스 Key (관리자페이지 상점정보 > 기본정보에서 확인하실 수 있습니다.)
        PCD_PAYCANCEL_FLAG: "Y", // 'Y' – 고정 값
        PCD_PAY_OID: payResult.PCD_PAY_OID, // 주문번호
        PCD_PAY_DATE: payResult.PCD_PAY_TIME.substring(0, 8), // 취소할 원거래일자
        PCD_REFUND_TOTAL: payResult.PCD_PAY_AMOUNT, // 환불 요청금액 (기존 결제금액보다 적은 금액 입력 시 부분취소로 진행)
        PCD_REGULER_FLAG: payResult.PCD_REGULER_FLAG, // 월 중복결제 방지 Y(사용) | N(그 외)
        PCD_PAY_YEAR: payResult.PCD_PAY_YEAR, // 결제 구분 년도
        PCD_PAY_MONTH: payResult.PCD_PAY_MONTH, // 결제 구분 월
      };

      console.log(refundURL, params);

      // 파트너 인증이 성공하면 결제 취소 요청을 수행합니다.
      post(refundURL, JSON.stringify(params), {
        headers: {
          "content-type": "application/json",
          referer: process.env.REACT_APP_HOSTNAME, // Referer 필수
        },
      }).then(async (r) => {
        console.log(r);
        if (r.PCD_PAY_RST == "success") {
          console.log("취소 성공");
          // 승인 취소 성공 시 수행
          // payment 데이터를 업데이트 합니다.
          onClose();
          await db_update("payment", oid, r);
        } else {
          alert(r.PCD_PAY_MSG);
          onClose();
          window.location.reload();
        }
      });
    });
  };

  const handleOrder = async (type) => {
    setSearch({
      ...search,
      order: type,
      sort: search.sort === "desc" ? "asc" : "desc",
    });
    await get_doc_all2(
      "payment",
      type,
      search.sort === "desc" ? "asc" : "desc"
    ).then((data) => {
      setPayments(data);
      setSearchPayments(data);
      handleSearch(data);
    });
  };

  return (
    <Stack w={"100%"} h={"100%"}>
      <HStack bgColor={"white"} p={"10px"} gap={"10px"} borderRadius={"10px"}>
        <Select
          onChange={(e) => {
            setSearch({ ...search, filter: e.target.value });
          }}
        >
          <option value={"doc_id"}>OID</option>
          <option value={"PCD_PAY_AMOUNT"}>결제금액</option>
          <option value={"PCD_PAY_CARDNAME"}>결제수단</option>
          <option value={"PCD_PAY_MSG"}>결제결과</option>
        </Select>
        <Input
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        />
        <IconButton
          onClick={() => handleSearch(payments)}
          icon={<SearchIcon />}
        />
      </HStack>
      <TableContainer
        border={"1px solid #d9d9d9"}
        bgColor={"white"}
        borderRadius={"10px"}
        p={"10px"}
      >
        <div style={{ maxHeight: "100%", overflowY: "auto" }}>
          <Table variant="simple" size={"sm"}>
            <Thead h={"40px"}>
              <Tr>
                <Th textAlign={"center"}>oid</Th>
                <Th textAlign={"center"}>결제자</Th>
                <Th
                  cursor={"pointer"}
                  onClick={() => handleOrder("PCD_PAY_TIME")}
                  textAlign={"center"}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>결제날짜</Text>
                    {search.order === "PCD_PAY_TIME" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th
                  cursor={"pointer"}
                  onClick={() => handleOrder("PCD_PAY_AMOUNT")}
                  textAlign={"center"}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>결제금액</Text>
                    {search.order === "PCD_PAY_AMOUNT" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th
                  cursor={"pointer"}
                  onClick={() => handleOrder("PCD_PAY_CARDNAME")}
                  textAlign={"center"}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>결제수단</Text>
                    {search.order === "PCD_PAY_CARDNAME" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th
                  cursor={"pointer"}
                  onClick={() => handleOrder("PCD_PAY_MSG")}
                  textAlign={"center"}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>결제결과</Text>
                    {search.order === "PCD_PAY_MSG" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th textAlign={"center"} w={"30px"}>
                  결제취소
                </Th>
                <Th textAlign={"center"} w={"30px"}>
                  삭제
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchPayments?.map((value, index) => {
                return (
                  <Tr key={value.doc_id}>
                    <Td textAlign={"center"}>{value.doc_id}</Td>
                    <Td textAlign={"center"}>
                      {<UserInfo uid={value.sender} />}
                    </Td>
                    <Td textAlign={"center"} whiteSpace={"pre-wrap"}>
                      {value.PCD_PAY_TIME.substr(0, 4)}.
                      {value.PCD_PAY_TIME.substr(4, 2)}.
                      {value.PCD_PAY_TIME.substr(6, 2)}
                      {"\n"}
                      {value.PCD_PAY_TIME.substr(8, 2)}:
                      {value.PCD_PAY_TIME.substr(10, 2)}:
                      {value.PCD_PAY_TIME.substr(12, 2)}
                    </Td>
                    <Td>{formatCurrency(value.PCD_PAY_AMOUNT)}</Td>
                    <Td>
                      <Text>
                        {value.PCD_PAY_TYPE === "card"
                          ? value.PCD_PAY_CARDNAME
                          : ""}
                      </Text>
                      <Text>
                        {value.PCD_PAY_TYPE === "card"
                          ? value.PCD_PAY_CARDNUM
                          : ""}
                      </Text>
                    </Td>
                    <Td>{value.PCD_PAY_MSG}</Td>
                    <Td>
                      <Button
                        size={"sm"}
                        onClick={() => {
                          if (window.confirm("결제를 취소하시겠습니까?")) {
                            handlePayRefund(value.doc_id);
                          }
                        }}
                      >
                        취소
                      </Button>
                    </Td>
                    <Td>
                      <IconButton
                        onClick={() => deletePayment(value.doc_id)}
                        size={"sm"}
                        icon={<DeleteIcon />}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
        <Modal isCentered onClose={onClose} size={"md"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton bgColor={"gray.100"} />
            <Image src={selImage} />
          </ModalContent>
        </Modal>
      </TableContainer>
    </Stack>
  );
}

export default AdminPayment;
