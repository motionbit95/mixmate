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
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Table,
  TableContainer,
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
  db_add,
  db_delete,
  get_doc_all,
  get_doc_all2,
  get_doc_data,
} from "../../js/Database";
import {
  AddIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  DeleteIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import PopupBase from "../../modals/PopupBase";
import { LocationSelector } from "./AdminUser";

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

function AdminGroup({ data, ...props }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selImage, setSelImage] = useState("");
  const [groups, setGroups] = useState(data ? data : null);
  const [searchGroups, setSearchGroups] = useState(data ? data : null);
  const [search, setSearch] = useState({
    filter: "doc_id",
    keyword: "",
    order: "group_name",
    sort: "asc",
  });

  useEffect(() => {
    if (!groups) {
      getGroups();
    }
  }, []);

  const getGroups = async () => {
    await get_doc_all("group").then((data) => {
      setGroups(data);
      setSearchGroups(data);
    });
  };

  const deleteGroup = async (gid) => {
    if (window.confirm("모임을 삭제하시겠습니까?")) {
      await db_delete("group", gid);
      getGroups();
    }
  };

  const handleSearch = () => {
    console.log(groups);

    let searchGroups = [];
    groups.map((value, index) => {
      if (value[search.filter].includes(search.keyword)) {
        if (value[search.filter].includes(search.keyword)) {
          searchGroups.push(value);
        }
      }
    });

    setSearchGroups(searchGroups);
  };

  const handleOrder = async (type) => {
    setSearch({
      ...search,
      order: type,
      sort: search.sort === "desc" ? "asc" : "desc",
    });
    await get_doc_all2(
      "group",
      type,
      search.sort === "desc" ? "asc" : "desc"
    ).then((data) => {
      setGroups(data);
      setSearchGroups(data);
    });
  };

  const handleAddGroup = async (e) => {
    if (!e) {
      return;
    }
    e.preventDefault();

    const matchInfo = {
      createAt: new Date(),
      group_place: "",
      group_type: "",
      group_name: "",
      group_target: "",
      group_personnel: 0,
      group_users: ["gh7Fa4nK82Zu2TBjVh1fVeHq0d62"],
      group_images: [],
      group_time: "",
      group_price: "",
      group_admin: "gh7Fa4nK82Zu2TBjVh1fVeHq0d62",
    };

    for (var i = 0; i < e.target.length; i++) {
      if (e.target[i].name == "city" || e.target[i].name == "district") {
        matchInfo.group_place += e.target[i].value + " ";
      } else if (e.target[i].name == "group_type") {
        matchInfo.group_type = e.target[i].value;
      } else if (e.target[i].name == "group_name") {
        matchInfo.group_name = e.target[i].value;
      } else if (e.target[i].name == "group_target") {
        matchInfo.group_target = e.target[i].value;
      } else if (e.target[i].name == "group_personnel") {
        matchInfo.group_personnel = e.target[i].value;
      } else if (e.target[i].name == "group_time") {
        matchInfo.group_time = new Date(e.target[i].value);
      } else if (e.target[i].name == "group_price") {
        matchInfo.group_price = e.target[i].value;
      } else if (e.target[i].name == "group_admin") {
        matchInfo.group_admin = e.target[i].value;
      }
    }

    await db_add("group", matchInfo);
    getGroups();
  };

  return (
    <Stack w={"100%"} h={"100%"}>
      <HStack bgColor={"white"} p={"10px"} gap={"10px"} borderRadius={"10px"}>
        <PopupBase
          w={"120px"}
          colorScheme={"gray"}
          visibleButton={true}
          action={"추가"}
          title="모임"
          icon={<AddIcon />}
          onClose={(e) => handleAddGroup(e)}
        >
          <FormControl isRequired>
            <FormLabel>모임장소</FormLabel>
            <LocationSelector
              onChange={(city, district) => {
                console.log(city, district);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>모임종류</FormLabel>
            <Select name="group_type">
              <option value={"머글 모임"}>머글 모임</option>
              <option value={"클래스 모임"}>클래스 모임</option>
              <option value={"비지니스 모임"}>비지니스 모임</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>모임이름</FormLabel>
            <Input name="group_name" placeholder="모임이름을 입력하세요." />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>모임목표</FormLabel>
            <Textarea
              name="group_target"
              placeholder="모임목표를 입력하세요."
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>모임인원</FormLabel>
            <Input
              type="number"
              name="group_personnel"
              placeholder="모임 최대 인원을 입력하세요."
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>모임시간</FormLabel>
            <Input type="datetime-local" name="group_time" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>모임금액</FormLabel>
            <Input placeholder="나누기" name="group_price" />
          </FormControl>
        </PopupBase>
        <Select
          onChange={(e) => {
            setSearch({ ...search, filter: e.target.value });
          }}
        >
          <option value={"doc_id"}>GID</option>
          <option value={"group_type"}>모임종류</option>
          <option value={"group_name"}>모임이름</option>
          <option value={"group_price"}>모임금액</option>
          <option value={"group_personnel"}>모임인원</option>
        </Select>
        <Input
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        />
        <IconButton onClick={handleSearch} icon={<SearchIcon />} />
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
                <Th textAlign={"center"}>gid</Th>
                <Th
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => handleOrder("group_type")}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>모임종류</Text>
                    {search.order === "group_type" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th textAlign={"center"}>모임장</Th>
                <Th
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => handleOrder("group_name")}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>모임이름</Text>
                    {search.order === "group_name" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th textAlign={"center"}>모임금액</Th>
                <Th
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => handleOrder("group_personnel")}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>모임인원</Text>
                    {search.order === "group_personnel" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => handleOrder("group_time")}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>모임시간</Text>
                    {search.order === "group_time" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th textAlign={"center"} w={"30px"}>
                  삭제
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchGroups?.map((value, index) => {
                return (
                  <Tr key={value.doc_id}>
                    <Td textAlign={"center"}>
                      <Text>{value.doc_id.substr(0, 6)}</Text>
                    </Td>
                    <Td textAlign={"center"}>
                      <Text>{value.group_type}</Text>
                    </Td>
                    <Td textAlign={"center"}>
                      {
                        <UserInfo
                          uid={
                            value.group_admin
                              ? value.group_admin
                              : value.group_users?.[0]
                          }
                        />
                      }
                    </Td>
                    <Td textAlign={"center"}>
                      <Text>{value.group_name}</Text>
                    </Td>
                    <Td textAlign={"center"}>
                      <Text>{value.group_price}</Text>
                    </Td>
                    <Td>
                      <HStack justifyContent={"center"}>
                        <Text color={"red.500"} fontWeight={"bold"}>
                          {value.group_users?.length}
                        </Text>
                        <Text>/</Text>
                        <Text>{value.group_personnel}</Text>
                      </HStack>
                    </Td>
                    <Td textAlign={"center"}>
                      <Text>
                        {convertFirestoreTimestampToDate(
                          value.group_time
                        ).toLocaleDateString("ko-Kr")}

                        {convertFirestoreTimestampToDate(
                          value.group_time
                        ).toLocaleTimeString("ko-Kr")}
                      </Text>
                    </Td>

                    <Td>
                      <IconButton
                        onClick={() => deleteGroup(value.doc_id)}
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

export default AdminGroup;
