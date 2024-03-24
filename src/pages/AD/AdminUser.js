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
import { convertFirestoreTimestampToDate, getDisplayAge2 } from "../../js/API";
import {
  db_add,
  db_delete,
  db_update,
  get_doc_all,
  get_doc_all2,
} from "../../js/Database";
import {
  AddIcon,
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

export const LocationSelector = (props) => {
  const [selectedCity, setSelectedCity] = useState(props.defaultCity);
  const [selectedDistrict, setSelectedDistrict] = useState(
    props.defaultDistrict
  );

  // 시/도, 군/구
  const cities = [
    "강원도",
    "경기도",
    "경상남도",
    "경상북도",
    "광주광역시",
    "대구광역시",
    "대전광역시",
    "부산광역시",
    "서울특별시",
    "세종특별자치시",
    "울산광역시",
    "인천광역시",
    "전라남도",
    "전라북도",
    "제주특별자치도",
    "충청남도",
    "충청북도",
  ];
  const districts = {
    강원도: [
      "강릉시",
      "고성군",
      "동해시",
      "삼척시",
      "속초시",
      "양구군",
      "양양군",
      "영월군",
      "원주시",
      "인제군",
      "정선군",
      "철원군",
      "춘천시",
      "태백시",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
    경기도: [
      "가평군",
      "고양시 덕양구",
      "고양시 일산동구",
      "고양시 일산서구",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시 분당구",
      "성남시 수정구",
      "성남시 중원구",
      "수원시 권선구",
      "수원시 영통구",
      "수원시 장안구",
      "수원시 팔달구",
      "시흥시",
      "안산시 단원구",
      "안산시 상록구",
      "안성시",
      "안양시 동안구",
      "안양시 만안구",
      "양주시",
      "양평군",
      "여주시",
      "연천군",
      "오산시",
      "용인시 기흥구",
      "용인시 수지구",
      "용인시 처인구",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
    ],
    경상남도: [
      "거제시",
      "거창군",
      "고성군",
      "김해시",
      "남해군",
      "밀양시",
      "사천시",
      "산청군",
      "양산시",
      "의령군",
      "진주시",
      "창녕군",
      "창원시 마산합포구",
      "창원시 마산회원구",
      "창원시 성산구",
      "창원시 의창구",
      "창원시 진해구",
      "통영시",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
    경상북도: [
      "경산시",
      "경주시",
      "고령군",
      "구미시",
      "군위군",
      "김천시",
      "문경시",
      "봉화군",
      "상주시",
      "성주군",
      "안동시",
      "영덕군",
      "영양군",
      "영주시",
      "영천시",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
      "포항시 남구",
      "포항시 북구",
    ],
    광주광역시: ["광산구", "남구", "동구", "북구", "서구"],
    대구광역시: [
      "남구",
      "달서구",
      "달성군",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
    ],
    대전광역시: ["대덕구", "동구", "서구", "유성구", "중구"],
    부산광역시: [
      "강서구",
      "금정구",
      "기장군",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
    ],
    서울특별시: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    세종특별자치시: [],
    울산광역시: ["남구", "동구", "북구", "울주군", "중구"],
    인천광역시: [
      "강화군",
      "계양구",
      "남동구",
      "동구",
      "미추홀구",
      "부평구",
      "서구",
      "연수구",
      "옹진군",
      "중구",
    ],
    전라남도: [
      "강진군",
      "고흥군",
      "곡성군",
      "광양시",
      "구례군",
      "나주시",
      "담양군",
      "목포시",
      "무안군",
      "보성군",
      "순천시",
      "신안군",
      "여수시",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
    전라북도: [
      "고창군",
      "군산시",
      "김제시",
      "남원시",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "익산시",
      "임실군",
      "장수군",
      "전주시 덕진구",
      "전주시 완산구",
      "정읍시",
      "진안군",
    ],
    제주특별자치도: ["서귀포시", "제주시"],
    충청남도: [
      "계룡시",
      "공주시",
      "금산군",
      "논산시",
      "당진시",
      "보령시",
      "부여군",
      "서산시",
      "서천군",
      "아산시",
      "예산군",
      "천안시 동남구",
      "천안시 서북구",
      "청양군",
      "태안군",
      "홍성군",
    ],
    충청북도: [
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "제천시",
      "증평군",
      "진천군",
      "청주시 상당구",
      "청주시 서원구",
      "청주시 청원구",
      "청주시 흥덕구",
      "충주시",
    ],
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);

    props.onChange(selectedCity, selectedDistrict);
  };

  return (
    <Stack w="100%">
      <HStack w="100%">
        {/* <label>시/도:</label> */}
        <Select value={selectedCity} onChange={handleCityChange} name="city">
          <option value="">시/도</option>
          {cities?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>

        {/* <label>군/구:</label> */}
        <Select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedCity}
          name="district"
        >
          <option value="">군/구</option>
          {selectedCity &&
            districts[selectedCity]?.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </Select>
      </HStack>
    </Stack>
  );
};

export const InterestSelector = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const cities = ["아웃도어/여행", "운동/스포츠"];
  const districts = {
    "아웃도어/여행": [
      "등산",
      "산책/트래킹",
      "캠핑/백팩킹",
      "국내여행",
      "해외여행",
      "낚시",
      "패러글라이딩",
    ],
    "운동/스포츠": [
      "자전거",
      "배드민턴",
      "볼링",
      "테니스/스쿼시",
      "스키/보드",
      "골프",
    ],
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
  };

  return (
    <Stack w="100%">
      <HStack w="100%">
        {/* <label>시/도:</label> */}
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          name="category1"
        >
          <option value="">관심사</option>
          {cities?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>

        {/* <label>군/구:</label> */}
        <Select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          disabled={!selectedCity}
          name="category2"
        >
          <option value="">상세관심사</option>
          {selectedCity &&
            districts[selectedCity]?.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </Select>
      </HStack>
    </Stack>
  );
};

function AdminUser({ data, ...props }) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selImage, setSelImage] = useState("");
  const [users, setUsers] = useState(data ? data : null);
  const [searchedUsers, setSearchedUsers] = useState(data ? data : null);
  const [search, setSearch] = useState({
    filter: "uid",
    keyword: "",
    order: "user_name",
    sort: "asc",
  });

  const [userData, setUserData] = useState({
    user_profile: "",
    user_name: "",
    user_gender: "",
    user_birth: "",
    user_phone: "",
  });

  const upload_profile = async (e) => {
    // firestore에 이미지 업로드
    let url = await upload_image(e);
    setUserData({ ...userData, user_profile: url });
  };

  const bank = [
    "우리",
    "기업",
    "국민",
    "신한",
    "제주",
    "농협",
    "카카오뱅크",
    "하나",
    "토스뱅크",
    "케이뱅크",
    "한국씨티",
    "우체국",
    "수협",
    "신협",
    "기타",
  ];

  useEffect(() => {
    if (!users) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    setUserData({});
    await get_doc_all2("user", search.order, search.sort).then((data) => {
      setUsers(data);
      setSearchedUsers(data);
    });
  };

  const deleteUser = async (uid) => {
    if (window.confirm("회원을 삭제하시겠습니까?")) {
      await db_delete("user", uid);
      getUsers();
    }
  };

  const addUser = async (e) => {
    if (!e) return;
    e.preventDefault();

    const updateData = {
      user_profile: "",
      user_name: "",
      user_gender: "",
      user_birth: "",
      user_phone: "",
      user_place: [],
      user_interest: [],
      user_bank: {
        bank_name: "",
        accout_number: "",
      },
    };

    let place = "";
    let interest = "";

    for (var i = 0; i < e.target.length; i++) {
      if (e.target[i].name) {
        if (e.target[i].name == "city") {
          place += e.target[i].value;
        } else if (e.target[i].name == "district") {
          place += " " + e.target[i].value;
          updateData.user_place.push(place.trim());
        } else if (e.target[i].name == "category1") {
          interest += e.target[i].value;
        } else if (e.target[i].name == "category2") {
          interest += " " + e.target[i].value;
          updateData.user_interest.push(interest.trim());
        } else if (e.target[i].name == "bank_name") {
          updateData.user_bank.bank_name = e.target[i].value;
        } else if (e.target[i].name == "accout_number") {
          updateData.user_bank.accout_number = e.target[i].value;
        } else {
          updateData[e.target[i].name] = e.target[i].value;
        }
      }
    }

    console.log(updateData);

    await db_add("user", updateData);

    if (e) {
      getUsers();
    }
  };

  const updateUser = async (id, e) => {
    if (!e) return;
    e.preventDefault();

    const updateData = {
      user_profile: "",
      user_name: "",
      user_gender: "",
      user_birth: "",
      user_phone: "",
      user_place: [],
      user_interest: [],
      user_bank: {
        bank_name: "",
        accout_number: "",
      },
    };

    // let user_place = [];
    // let user_interest = [];
    // let user_bank = {
    //   bank_name: "",
    //   accout_number: "",
    // };
    let place = "";
    let interest = "";

    for (var i = 0; i < e.target.length; i++) {
      if (e.target[i].name) {
        if (e.target[i].name == "city") {
          place += e.target[i].value;
        } else if (e.target[i].name == "district") {
          place += " " + e.target[i].value;
          updateData.user_place.push(place.trim());
        } else if (e.target[i].name == "category1") {
          interest += e.target[i].value;
        } else if (e.target[i].name == "category2") {
          interest += " " + e.target[i].value;
          updateData.user_interest.push(interest.trim());
        } else if (e.target[i].name == "bank_name") {
          updateData.user_bank.bank_name = e.target[i].value;
        } else if (e.target[i].name == "accout_number") {
          updateData.user_bank.accout_number = e.target[i].value;
        } else {
          updateData[e.target[i].name] = e.target[i].value;
        }
      }
    }

    db_update("user", id, updateData);

    if (e) {
      getUsers();
    }
  };

  const profileRef = useRef();
  const onClickProfileButton = () => {
    profileRef.current.click();
  };

  const handleSearch = () => {
    console.log(search);

    let searchedUsers = [];
    users.map((value, index) => {
      if (search.filter === "user_place") {
        if (value[search.filter].join("").includes(search.keyword)) {
          searchedUsers.push(value);
        }
      } else if (value[search.filter].includes(search.keyword)) {
        if (value[search.filter].includes(search.keyword)) {
          searchedUsers.push(value);
        }
      }
    });

    setSearchedUsers(searchedUsers);
  };

  const handleOrder = async (type) => {
    setSearch({
      ...search,
      order: type,
      sort: search.sort === "desc" ? "asc" : "desc",
    });
    await get_doc_all2(
      "user",
      type,
      search.sort === "desc" ? "asc" : "desc"
    ).then((data) => {
      setUsers(data);
      setSearchedUsers(data);
    });
  };

  return (
    <Stack w={"100%"} h={"100%"}>
      <HStack bgColor={"white"} p={"10px"} gap={"10px"} borderRadius={"10px"}>
        <PopupBase
          width={"120px"}
          colorScheme={"gray"}
          visibleButton={true}
          action={"추가"}
          title={"유저"}
          icon={<AddIcon />}
          onClose={(e) => addUser(e)}
        >
          <Text color={"gray.500"}>
            로그인이 불가능한 테스트 유저 데이터를 생성합니다.
          </Text>
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
                  <Center w={"100%"}>
                    <VStack>
                      <Avatar size="2xl" src={userData.user_profile} />
                      <Button onClick={onClickProfileButton}>
                        프로필 업로드
                      </Button>
                      <Input
                        display={"none"}
                        value={
                          userData?.user_profile ? userData?.user_profile : ""
                        }
                        name="user_profile"
                        ref={profileRef}
                        type="file"
                        onChange={(e) => {
                          upload_profile(e);
                        }}
                      />
                    </VStack>
                  </Center>
                  <HStack
                    divider={<StackDivider />}
                    spacing={"10px"}
                    w={"100%"}
                    h={"100%"}
                    alignItems={"flex-start"}
                  >
                    <Stack
                      bgColor={"white"}
                      h={"100%"}
                      w={"100%"}
                      display={"flex"}
                    >
                      <FormControl isRequired>
                        <FormLabel>이름</FormLabel>
                        <Input
                          name="user_name"
                          type="text"
                          placeholder="실명"
                          height="40px"
                          alignSelf="stretch"
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>휴대번호</FormLabel>
                        <Input
                          name="user_phone"
                          type="text"
                          placeholder="휴대폰번호"
                          height="40px"
                          alignSelf="stretch"
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>생년월일</FormLabel>
                        <Input
                          name="user_birth"
                          type="text"
                          placeholder="생년월일"
                          height="40px"
                          alignSelf="stretch"
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>성별</FormLabel>
                        <Input
                          name="user_gender"
                          type="text"
                          placeholder="성별"
                          height="40px"
                          alignSelf="stretch"
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
                        <LocationSelector onChange={(city, district) => {}} />
                      </FormControl>
                      <FormControl>
                        <FormLabel>관심사(선택)</FormLabel>
                        <InterestSelector />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>프로필 소개말</FormLabel>
                        <Textarea
                          name="user_info"
                          minLength={20}
                          placeholder={
                            "원하시는 매칭 방법(식사매칭 또는 커피매칭)과 간단한 소개를 작성해주세요!"
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>매칭권 부수입 정산받을 계좌(선택)</FormLabel>
                        <HStack w={"100%"}>
                          <Select name="bank_name" w={"100%"}>
                            <option value={""}>선택</option>
                            {bank.map((value) => (
                              <option value={value}>{value}</option>
                            ))}
                          </Select>
                          <Input
                            name="accout_number"
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
        <Select
          onChange={(e) => {
            setSearch({ ...search, filter: e.target.value });
          }}
        >
          <option value={"doc_id"}>UID</option>
          <option value={"user_name"}>이름</option>
          <option value={"user_gender"}>성별</option>
          <option value={"user_place"}>지역</option>
          <option value={"user_phone"}>휴대번호</option>
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
                <Th
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => handleOrder("doc_id")}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>uid</Text>
                    {search.order === "doc_id" &&
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
                  onClick={() => handleOrder("timestamp")}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>가입일</Text>
                    {search.order === "timestamp" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th>프로필</Th>
                <Th
                  cursor={"pointer"}
                  onClick={() => handleOrder("user_name")}
                  textAlign={"center"}
                >
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>이름</Text>
                    {search.order === "user_name" &&
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
                  onClick={() => handleOrder("user_gender")}
                >
                  {" "}
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>성별</Text>
                    {search.order === "user_gender" &&
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
                  onClick={() => handleOrder("user_birth")}
                >
                  {" "}
                  <HStack justifyContent={"center"} gap={"10px"}>
                    <Text color={"blue.500"}>나이</Text>
                    {search.order === "user_birth" &&
                      (search.sort === "desc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th
                  textAlign={"center"}
                  cursor={"pointer"}
                  onClick={() => handleOrder("user_place")}
                >
                  {" "}
                  <HStack gap={"10px"}>
                    <Text color={"blue.500"}>지역</Text>
                    {search.order === "user_place" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th
                  cursor={"pointer"}
                  onClick={() => handleOrder("user_phone")}
                  textAlign={"center"}
                >
                  <HStack gap={"10px"}>
                    <Text color={"blue.500"}>휴대번호</Text>
                    {search.order === "user_phone" &&
                      (search.sort === "asc" ? (
                        <ArrowDownIcon />
                      ) : (
                        <ArrowUpIcon />
                      ))}
                  </HStack>
                </Th>
                <Th textAlign={"center"} w={"30px"}>
                  수정
                </Th>
                <Th textAlign={"center"} w={"30px"}>
                  삭제
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchedUsers?.map((value, index) => {
                return (
                  <Tr key={value.doc_id}>
                    <Td textAlign={"center"}>
                      {value.doc_id?.substring(0, 8)}
                    </Td>
                    <Td textAlign={"center"}>
                      {convertFirestoreTimestampToDate(
                        value.timestamp
                      ).toLocaleDateString()}
                    </Td>
                    <Td textAlign={"center"}>
                      <Image
                        w={"30px"}
                        h={"30px"}
                        objectFit={"cover"}
                        src={
                          value.user_profile
                            ? value.user_profile
                            : value.user_gender === "남"
                            ? defaultMale
                            : defaultFemale
                        }
                        onClick={() => {
                          setSelImage(
                            value.user_profile
                              ? value.user_profile
                              : value.user_gender === "남"
                              ? defaultMale
                              : defaultFemale
                          );
                          onOpen();
                        }}
                      />
                    </Td>
                    <Td textAlign={"center"}>{value.user_name}</Td>
                    <Td textAlign={"center"}>
                      <Tag
                        colorScheme={
                          value.user_gender === "남" ? "blue" : "red"
                        }
                      >
                        {value.user_gender}
                      </Tag>
                    </Td>
                    <Td>{getDisplayAge2(value.user_birth)}</Td>
                    <Td>{value.user_place?.[0]}</Td>
                    <Td>{value.user_phone?.replace("+82", "0")}</Td>
                    <Td>
                      <PopupBase
                        size={"sm"}
                        colorScheme={"gray"}
                        visibleButton={true}
                        action={"수정"}
                        title={<EditIcon />}
                        onClose={(e) => updateUser(value.doc_id, e)}
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
                                <Center w={"100%"}>
                                  <VStack>
                                    <Avatar
                                      src={
                                        userData?.user_profile
                                          ? userData?.user_profile
                                          : value.user_profile === ""
                                          ? value.user_gender === "남"
                                            ? defaultMale
                                            : defaultFemale
                                          : value.user_profile
                                      }
                                      size="2xl"
                                    />
                                    <Button onClick={onClickProfileButton}>
                                      프로필 업로드
                                    </Button>
                                    <Input
                                      display={"none"}
                                      ref={profileRef}
                                      type="file"
                                      onChange={(e) => {
                                        upload_profile(e);
                                      }}
                                    />
                                    <Input
                                      display={"none"}
                                      value={
                                        userData?.user_profile
                                          ? userData?.user_profile
                                          : value.user_profile === ""
                                          ? value.user_gender === "남"
                                            ? defaultMale
                                            : defaultFemale
                                          : value.user_profile
                                      }
                                      name="user_profile"
                                    />
                                  </VStack>
                                </Center>
                                <HStack
                                  divider={<StackDivider />}
                                  spacing={"10px"}
                                  w={"100%"}
                                  h={"100%"}
                                  alignItems={"flex-start"}
                                >
                                  <Stack
                                    bgColor={"white"}
                                    h={"100%"}
                                    w={"100%"}
                                    display={"flex"}
                                  >
                                    <FormControl isRequired>
                                      <FormLabel>이름</FormLabel>
                                      <Input
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
                                        name="user_phone"
                                        type="text"
                                        placeholder="휴대폰번호"
                                        height="40px"
                                        alignSelf="stretch"
                                        defaultValue={value.user_phone}
                                      />
                                    </FormControl>
                                    <FormControl isRequired>
                                      <FormLabel>생년월일</FormLabel>
                                      <Input
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
                                        나와 식사하려면 상대방이 지불해야하는
                                        금액은?
                                      </FormLabel>
                                      <Text
                                        fontSize={"sm"}
                                        color={"gray.400"}
                                        mt={"-10px"}
                                      >
                                        (본인의 부수입으로 입금됩니다)
                                      </Text>
                                      <InputGroup mt={"1vh"}>
                                        <Input
                                          name="user_price"
                                          // w={"70px"}
                                          type="number"
                                          defaultValue={value?.user_price}
                                          textAlign={"right"}
                                        />
                                        <InputRightAddon>만원</InputRightAddon>
                                      </InputGroup>
                                    </FormControl>
                                  </Stack>
                                  <Stack
                                    bgColor={"white"}
                                    h={"100%"}
                                    w={"100%"}
                                  >
                                    <FormControl isRequired>
                                      <FormLabel>식사 가능 동네</FormLabel>
                                      <LocationSelector
                                        defaultCity={
                                          value.user_place[0].split(" ")[0]
                                        }
                                        defaultDistrict={
                                          value.user_place[0].split(" ")[1]
                                        }
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>관심사(선택)</FormLabel>
                                      <InterestSelector />
                                    </FormControl>
                                    <FormControl isRequired>
                                      <FormLabel>프로필 소개말</FormLabel>
                                      <Textarea
                                        name="user_info"
                                        defaultValue={value?.user_info}
                                        minLength={20}
                                        placeholder={
                                          "원하시는 매칭 방법(식사매칭 또는 커피매칭)과 간단한 소개를 작성해주세요!"
                                        }
                                      />
                                    </FormControl>
                                    <FormControl>
                                      <FormLabel>
                                        매칭권 부수입 정산받을 계좌(선택)
                                      </FormLabel>
                                      <HStack w={"100%"}>
                                        <Select
                                          name="bank_name"
                                          w={"100%"}
                                          defaultValue={
                                            value.user_bank?.bank_name
                                          }
                                        >
                                          <option value={""}>선택</option>
                                          {bank.map((value) => (
                                            <option value={value}>
                                              {value}
                                            </option>
                                          ))}
                                        </Select>
                                        <Input
                                          name="accout_number"
                                          defaultValue={
                                            value.user_bank?.accout_number
                                          }
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
                    </Td>
                    <Td>
                      <IconButton
                        onClick={() => deleteUser(value.doc_id)}
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

export default AdminUser;
