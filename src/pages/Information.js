import {
  Stack,
  Text,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Button,
  Checkbox,
  IconButton,
  Container,
  Radio,
  RadioGroup,
  HStack,
  Flex,
  Wrap,
  Alert,
  AlertIcon,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  ModalContent,
  ModalBody,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
  VStack,
  Avatar,
  Center,
  Box,
  CircularProgress,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  add_food_tag,
  add_place_tag,
  del_tag,
  step2_confirm_blank,
} from "../js/UserAPI";
import { db_add, db_delete, db_update, get_doc_list } from "../js/Database";
import { terms } from "../assets/terms";
import {
  black,
  gray_300,
  gray_500,
  gray_600,
  theme_bright_color,
  theme_primary_color,
  white,
} from "../App";
import { getSatuation, isAdult, removeSpecialCharacters } from "../js/API";
import { TopHeader } from "../component/TopHeader";
import { CustomButton } from "../component/Buttons";
import { auth } from "../db/firebase_config";
import { deleteUser } from "firebase/auth";
import { upload_image } from "../js/Storage";
import { defaultFemale, defaultMale } from "../db/dummy";
export const Information = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cost = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const category = ["관심분야1", "관심분야2", "관심분야3"];
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
  const [userInfo, setUserInfo] = useState();
  const [user_food, setUserFood] = useState("선택");
  const [input_food, setInputFood] = useState("");
  const [input_place, setInputPlace] = useState("");
  const [check_terms, setCheckTerms] = useState(false);
  const [isValid, setValid] = useState({
    state: true,
    message: "",
  });

  const [formData, setFormData] = useState(
    location.state?.user
      ? location.state?.user
      : {
          user_profile: "",
          user_price: 2,
          user_place: [],
          user_food: [],
          user_category: "관심분야1",
          user_type: "개인",
          user_gender: "남",
          user_birth: "",
          user_name: "",
          user_phone: "",
        }
  );

  const profileRef = useRef();

  function extractQueryParameters() {
    if (!window.location.search.includes("?")) return;
    // 현재 URL에서 쿼리 문자열 추출
    var queryString = window.location.search.substring(1);

    // URL 쿼리 문자열을 객체로 변환
    var queryParams = new URLSearchParams(queryString);

    // 객체에 값을 담기
    var user = {
      name: queryParams.get("name"),
      phoneNumber: queryParams.get("phoneNumber"),
      birthdate: queryParams.get("birthdate"),
      gender: queryParams.get("gender") === "01" ? "남" : "여",
    };

    setFormData({
      ...formData,
      user_name: user.name,
      user_phone: user.phoneNumber,
      user_birth: user.birthdate,
      user_gender: user.gender,
      user_profile: user.gender === "남" ? defaultMale : defaultFemale,
    });

    if (isAdult(user.birthdate)) {
      return true;
    } else {
      return false;
    }
  }

  // 프로필 업로드 버튼 클릭 시 ref 클릭 이벤트 발생
  const onClickProfileButton = () => {
    profileRef.current.click();
  };

  const [loading, setLoading] = useState(false);

  // 이미지 업로드 함수
  const upload_profile = async (e) => {
    // 이미지 로딩 중에는 프로그레스바를 띄운다
    setLoading(true);

    // firestore에 이미지 업로드
    let url = await upload_image(e);

    if (url && url !== "") {
      setValid({
        state: true,
        message: "",
      });
    } else {
      setValid({
        state: false,
        message: "이미지를 다시 선택해주세요.",
      });
    }

    setFormData({ ...formData, user_profile: url });

    // 이미지 로딩 완료 시 프로그레스바를 지운다
    setLoading(false);
  };

  useEffect(() => {
    // 고객의 계정을 가지고 옵니다.
    if (window.location.pathname.includes("info")) {
      // 미성년자 여부 확인
      if (!extractQueryParameters()) {
        alert("미성년자는 가입할 수 없습니다. 로그인 화면으로 돌아갑니다.");

        // 회원 탈퇴 처리
        db_delete("user", auth.currentUser.uid);
        deleteUser(auth.currentUser);
        navigate("/login");
        return;
      }
    }
  }, []);

  // 음식 태그 추가하는 함수
  function add_food(tag) {
    if (tag !== "직접입력" && tag !== "선택") {
      add_food_tag(formData.user_food, tag);
    }

    setUserFood(tag);
  }

  const LocationSelector = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

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

      // 태그에 넣는 부분
      let array = add_place_tag(
        formData.user_place,
        selectedCity,
        selectedDistrict
      );

      setFormData({ ...formData, user_place: array });
    };

    return (
      <Stack w="100%">
        <HStack w="100%">
          {/* <label>시/도:</label> */}
          <Select value={selectedCity} onChange={handleCityChange}>
            <option value="">시/도</option>
            {cities.map((city) => (
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
          >
            <option value="">군/구</option>
            {selectedCity &&
              districts[selectedCity].map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </Select>
        </HStack>
      </Stack>
    );
  };

  return (
    <Container
      minH={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      w={"100%"}
      pt={"50px"}
      // alignItems={"center"}
    >
      <TopHeader title={"회원정보"} />
      {loading ? (
        <Box>
          <Center w="100vw" h="100vh" position={"fixed"} left={0}>
            <CircularProgress
              zIndex={9999}
              isIndeterminate
              color="blue.300"
              trackColor={gray_300}
            />
          </Center>
        </Box>
      ) : null}
      <Stack
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        width="100%"
        background={white}
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
          p={"2vw"}
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
              <Stack
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
                w={"100%"}
              >
                <Center w={"100%"}>
                  <VStack>
                    <Avatar src={formData.user_profile} size="2xl" />
                    <CustomButton
                      text="프로필 업로드"
                      onClick={onClickProfileButton}
                    />
                    <Input
                      display={"none"}
                      ref={profileRef}
                      type="file"
                      onChange={(e) => {
                        upload_profile(e);
                      }}
                    />
                  </VStack>
                </Center>
                <FormControl
                  isRequired
                  display="flex"
                  flexDirection="row"
                  alignItems={"center"}
                >
                  <FormLabel w={"100px"}>실명</FormLabel>
                  <Input
                    type="text"
                    placeholder="실명"
                    height="40px"
                    alignSelf="stretch"
                    value={formData?.user_name}
                    isDisabled
                  />
                </FormControl>
                <FormControl
                  isRequired
                  display="flex"
                  flexDirection="row"
                  alignItems={"center"}
                >
                  <FormLabel w={"100px"}>휴대번호</FormLabel>
                  <Input
                    type="text"
                    placeholder="휴대폰번호"
                    height="40px"
                    alignSelf="stretch"
                    value={formData.user_phone}
                    isDisabled
                  />
                </FormControl>
                <FormControl
                  isRequired
                  display="flex"
                  flexDirection="row"
                  alignItems={"center"}
                >
                  <FormLabel w={"100px"}>생년월일</FormLabel>
                  <Input
                    type="text"
                    placeholder="생년월일"
                    height="40px"
                    alignSelf="stretch"
                    value={formData?.user_birth}
                    isDisabled
                  />
                </FormControl>
                <FormControl
                  isRequired
                  display="flex"
                  flexDirection="row"
                  alignItems={"center"}
                >
                  <FormLabel w={"100px"}>성별</FormLabel>
                  <Input
                    type="text"
                    placeholder="성별"
                    height="40px"
                    alignSelf="stretch"
                    value={formData?.user_gender}
                    isDisabled
                  />
                </FormControl>
                <FormControl
                  isRequired
                  display="flex"
                  flexDirection="row"
                  alignItems={"center"}
                >
                  <FormLabel>유저구분</FormLabel>
                  <RadioGroup
                    defaultValue={formData.user_type}
                    onChange={(value) =>
                      setFormData({ ...formData, user_type: value })
                    }
                  >
                    <Radio
                      colorScheme={getSatuation(theme_primary_color)}
                      value={"개인"}
                      w="100px"
                    >
                      개인
                    </Radio>
                    <Radio
                      colorScheme={getSatuation(theme_primary_color)}
                      value={"멘토"}
                      w="100px"
                    >
                      멘토
                    </Radio>
                  </RadioGroup>
                </FormControl>
              </Stack>
              {formData.user_type === "멘토" && (
                <FormControl
                  isRequired
                  display="flex"
                  flexDirection="row"
                  alignItems={"center"}
                >
                  <FormLabel w={"100px"}>전문분야</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_category: e.target.value,
                      })
                    }
                  />
                </FormControl>
              )}

              <FormControl isRequired>
                <FormLabel>
                  나와 식사하려면 상대방이 지불해야하는 금액은?
                </FormLabel>
                <Text fontSize={"sm"} color={gray_600} mt={"-10px"}>
                  (본인의 부수입으로 입금됩니다)
                </Text>
                <InputGroup mt={"1vh"}>
                  <Input
                    // w={"70px"}
                    type="number"
                    defaultValue={2}
                    textAlign={"right"}
                    onBlur={(e) => {
                      if (parseInt(e.target.value) < 2) {
                        alert("식사권 금액은 2만원 이상으로 설정해주세요!");
                      } else {
                        setFormData({
                          ...formData,
                          user_price: e.target.value,
                        });
                      }
                    }}
                  />
                  <InputRightAddon>만원</InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>식사 가능 동네</FormLabel>
                <LocationSelector />
                <Wrap
                  mt={1}
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  overflow="hidden"
                  alignSelf="stretch"
                >
                  {formData.user_place.map((value) => (
                    <Tag
                      size="md"
                      colorScheme={getSatuation(theme_primary_color)}
                    >
                      <TagLabel>{value.split(" ")[1]}</TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          setFormData({
                            ...formData,
                            user_place: del_tag(formData.user_place, value),
                          })
                        }
                      />
                    </Tag>
                  ))}
                </Wrap>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>좋아하는 음식</FormLabel>
                <Select
                  height="40px"
                  flex="1"
                  defaultValue={"선택"}
                  onChange={(e) => add_food(e.target.value)}
                >
                  <option value={"선택"}>{"선택"}</option>
                  <option value={"한식"}>{"한식"}</option>
                  <option value={"일식"}>{"일식"}</option>
                  <option value={"중식"}>{"중식"}</option>
                  <option value={"양식"}>{"양식"}</option>
                  <option value={"직접입력"}>{"직접입력"}</option>
                </Select>
                {user_food === "직접입력" && (
                  <HStack w="100%">
                    <Input
                      placeholder={"좋아하는 음식을 입력해보세요."}
                      onChange={(e) => setInputFood(e.target.value)}
                    />
                    <IconButton
                      onClick={() =>
                        setFormData({
                          ...formData,
                          user_food: add_food_tag(
                            formData.user_food,
                            input_food
                          ),
                        })
                      }
                      icon={<MdAdd />}
                      size={"md"}
                    />
                  </HStack>
                )}
                <Wrap mt={1}>
                  {formData.user_food.map((value) => (
                    <Tag
                      size="md"
                      colorScheme={getSatuation(theme_primary_color)}
                    >
                      <TagLabel>{value}</TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          setFormData({
                            ...formData,
                            user_food: del_tag(formData.user_food, value),
                          })
                        }
                      />
                    </Tag>
                  ))}
                </Wrap>
              </FormControl>
              {/* <Stack
                justify="center"
                align="flex-start"
                spacing="10px"
                height="62px"
                alignSelf="stretch"
              >
                <Text
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="16px"
                  color={black}
                  width="100%"
                >
                  식사권 부수입 정산 받을 계좌
                </Text>
                <Stack
                  direction="row"
                  justify="center"
                  align="flex-start"
                  spacing="10px"
                  flex="1"
                  alignSelf="stretch"
                >
                  <Select
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_bank: {
                          ...formData.user_bank,
                          bank_name: e.target.value,
                        },
                      })
                    }
                    placeholder="선택"
                    size="md"
                    width="90px"
                    defaultValue={formData.user_bank.bank_name}
                  >
                    {bank.map((value) => (
                      <option value={value}>{value}</option>
                    ))}
                  </Select>
                  <Input
                    defaultValue={formData.user_bank.accout_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_bank: {
                          ...formData.user_bank,
                          accout_number: removeSpecialCharacters(
                            e.target.value
                          ),
                        },
                      })
                    }
                    placeholder
                    size="md"
                    flex="1"
                    alignSelf="stretch"
                  />
                </Stack>
              </Stack> */}
            </Stack>
            {window.location.pathname.includes("info") && (
              <Flex
                w="100%"
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Checkbox
                  defaultChecked={check_terms}
                  colorScheme={getSatuation(theme_primary_color)}
                  // width="256.42px"
                  maxWidth="100%"
                  onChange={(e) => setCheckTerms(e.target.checked)}
                >
                  이용약관에 동의합니다.
                </Checkbox>
                <Text
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="14px"
                  color={gray_600}
                  // width="108.27px"
                  textAlign="end"
                  onClick={() => onOpen()}
                >
                  자세히보기
                </Text>
              </Flex>
            )}
            {isValid.state ? null : (
              <Alert fontSize={"small"} status="error">
                <AlertIcon />
                <AlertDescription>{isValid.message}</AlertDescription>
              </Alert>
            )}
            <CustomButton
              colorScheme={getSatuation(theme_primary_color)}
              height="40px"
              alignSelf="stretch"
              onClick={async () => {
                // 데이터 빈 곳 없는지 확인
                let ret = step2_confirm_blank(
                  formData.user_price,
                  formData.user_place,
                  formData.user_food
                );

                // 데이터가 비어있는 경우
                if (ret !== "") {
                  setValid({
                    state: ret === "",
                    message: ret,
                  });
                  return;
                }

                if (window.location.pathname.includes("info")) {
                  // 이용약관 미동의 시
                  if (!check_terms) {
                    setValid({
                      state: false,
                      message: "이용약관에 동의해주세요.",
                    });
                    return;
                  }
                }

                // 모든 정보 입력 & 이용약관 동의 시
                if (ret === "" || check_terms) {
                  // 정보 추가
                  if (window.location.pathname.includes("info")) {
                    console.log(formData);
                    await db_update("user", auth.currentUser.uid, formData);
                    alert(
                      "회원가입을 완료하였습니다. 로그인 화면으로 이동합니다."
                    );
                    // 로그인 화면으로 이동
                    navigate("/login");
                  } else {
                    await db_update("user", auth.currentUser.uid, formData);
                    alert(
                      "회원가입을 정보가 수정되었습니다. 이전 화면으로 이동합니다."
                    );
                    navigate(-1);
                  }
                }
              }}
              text={
                window.location.pathname.includes("info")
                  ? "회원가입하기"
                  : "회원정보수정"
              }
              code={theme_bright_color}
            />
          </Stack>
        </Stack>
      </Stack>

      <Modal isCentered onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt="50px">이용약관</ModalHeader>
          <ModalCloseButton mt="50px" />
          <ModalBody>
            <Text fontSize={"small"} whiteSpace={"pre-wrap"}>
              {terms}
            </Text>
          </ModalBody>
          <ModalFooter>
            <CustomButton onClick={onClose} text={"확인했습니다."} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
