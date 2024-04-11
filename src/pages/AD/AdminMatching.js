import {
  Avatar,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { convertFirestoreTimestampToDate } from "../../js/API";
import {
  db_delete,
  get_doc_all,
  get_doc_all2,
  get_doc_data,
  get_user,
} from "../../js/Database";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import PopupBase from "../../modals/PopupBase";

export function ReviewContent({ data }) {
  console.log(data);
  return (
    <Stack px={"10px"}>
      <Text fontSize={"small"}>
        {convertFirestoreTimestampToDate(data.timestamp).toLocaleString()}
      </Text>
      <Textarea readOnly placeholder="후기를 입력해주세요." minH={"200px"}>
        {data.review_comment}
      </Textarea>
    </Stack>
  );
}

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
    const getUser = async (uid) => {
      get_user(uid).then(async (data) => {
        setValue(data);
        console.log(data);
      });
    };
    getUser(uid);
  }, []);
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

function AdminMatching({ data, ...props }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selImage, setSelImage] = useState("");
  const [matchings, setMatchings] = useState(data ? data : null);
  const [searchMatchings, setSearchMatchings] = useState(data ? data : null);
  const [reviewMatching, setReviewMatching] = useState(null);
  const [search, setSearch] = useState({
    filter: "doc_id",
    keyword: "",
    order: "doc_id",
    sort: "asc",
  });

  useEffect(() => {
    if (!matchings) {
      getMatchings();
    }
  }, []);

  const getMatchings = async () => {
    await get_doc_all("matching").then((data) => {
      setMatchings(data);
      setSearchMatchings(data);
    });
  };

  const deleteMatching = async (gid) => {
    if (window.confirm("모임을 삭제하시겠습니까?")) {
      await db_delete("matching", gid);
      getMatchings();
    }
  };

  const handleSearch = (matchings) => {
    console.log(matchings);

    let searchMatchings = [];
    matchings.map((value, index) => {
      if (value[search.filter].includes(search.keyword)) {
        if (value[search.filter].includes(search.keyword)) {
          searchMatchings.push(value);
        }
      }
    });

    setSearchMatchings(searchMatchings);
  };

  const handleOrder = async (type) => {
    setSearch({
      ...search,
      order: type,
      sort: search.sort === "desc" ? "asc" : "desc",
    });
    await get_doc_all2(
      "matching",
      type,
      search.sort === "desc" ? "asc" : "desc"
    ).then((data) => {
      setMatchings(data);
      setSearchMatchings(data);
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
        </Select>
        <Input
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        />
        <IconButton
          onClick={() => handleSearch(matchings)}
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
                <Th textAlign={"center"}>신청자</Th>
                <Th textAlign={"center"}>→</Th>
                <Th textAlign={"center"}>수락자</Th>
                <Th textAlign={"center"}>매칭상태</Th>
                <Th textAlign={"center"} w={"30px"}>
                  삭제
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchMatchings?.map((value, index) => {
                return (
                  <Tr key={value.doc_id}>
                    <Td textAlign={"center"}>
                      <Text>{value.doc_id}</Text>
                    </Td>{" "}
                    <Td textAlign={"center"}>
                      {<UserInfo uid={value.sender} />}
                    </Td>
                    <Td textAlign={"center"}>→</Td>
                    <Td textAlign={"center"}>
                      {<UserInfo uid={value.receiver} />}
                    </Td>
                    <Td textAlign={"center"}>
                      {
                        <Tag
                          cursor={value.matching_review ? "pointer" : "auto"}
                          onClick={() => {
                            if (value.matching_review) {
                              setReviewMatching(value.matching_review);
                              onOpen();
                            }
                          }}
                          colorScheme={
                            value.matching_state < 400 ? "green" : "red"
                          }
                        >
                          {value.matching_state === "0"
                            ? "결제완료"
                            : value.matching_state === "1"
                            ? "매칭완료"
                            : value.matching_state === "2"
                            ? "후기작성"
                            : value.matching_state === "400"
                            ? "매칭거절"
                            : ""}
                        </Tag>
                      }
                    </Td>
                    <Td>
                      <IconButton
                        onClick={() => deleteMatching(value.doc_id)}
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
            <ModalHeader>
              <HStack>
                <UserInfo uid={reviewMatching?.review_receiver} />
                <Text>→</Text>
                <UserInfo uid={reviewMatching?.review_sender} />
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ReviewContent data={reviewMatching} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </TableContainer>
    </Stack>
  );
}

export default AdminMatching;
