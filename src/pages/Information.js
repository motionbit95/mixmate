import {
  Stack,
  Text,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Box,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  add_food_tag,
  add_place_tag,
  add_tag,
  del_tag,
  step2_confirm_blank,
} from "../js/UserAPI";
import { db_update } from "../js/Database";

export const Information = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.state?.user_id;
  const cost = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  //# 진영 - 여기 추가!!
  const bank = ["우리", "기업", "국만", "신한"];
  const [user_food, setUserFood] = useState("선택");
  const [input_food, setInputFood] = useState("");
  const [check_terms, setCheckTerms] = useState(false);
  const [isValid, setValid] = useState({
    state: true,
    message: "",
  });

  const [formData, setFormData] = useState({
    user_price: 2,
    user_place: [],
    user_food: [],
    user_bank: {
      bank_name: "",
      accout_number: "",
    },
    user_gender: "",
  });

  useEffect(() => {
    console.log("load!", user_id);
  });

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
    const [selectedTown, setSelectedTown] = useState("");

    // 가상의 시/도, 군/구, 읍/면/동 데이터 - 추가 예정
    //# 진영 - 여기 추가해주세용...!
    const cities = ["서울", "경기", "부산"];
    const districts = {
      서울: ["강남구", "강동구", "강서구"],
      경기: ["수원시", "성남시", "용인시"],
      부산: ["해운대구", "동래구", "부산진구"],
    };
    const towns = {
      강남구: ["삼성동", "역삼동", "청담동"],
      강동구: ["천호동", "둔촌동"],
      강서구: ["화곡동", "등촌동", "방화동"],
      수원시: ["장안구", "팔달구", "영통구"],
      성남시: ["수정구", "중원구", "분당구"],
      용인시: ["수지구", "기흥구", "처인구"],
      해운대구: ["우동", "재송동", "좌동"],
      동래구: ["명장동", "사직동", "온천동"],
      부산진구: ["부전동", "양정동", "연지동"],
    };

    const handleCityChange = (e) => {
      const selectedCity = e.target.value;
      setSelectedCity(selectedCity);
      setSelectedDistrict("");
      setSelectedTown("");
    };

    const handleDistrictChange = (e) => {
      const selectedDistrict = e.target.value;
      setSelectedDistrict(selectedDistrict);
      setSelectedTown("");
    };

    const handleTownChange = (e) => {
      const selectedTown = e.target.value;
      setSelectedTown(selectedTown);

      // 태그에 넣는 부분
      let array = add_place_tag(
        formData.user_place,
        selectedCity,
        selectedDistrict,
        selectedTown
      );

      setFormData({ ...formData, user_place: array });
    };

    return (
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

        {/* <label>읍/면/동:</label> */}
        <Select
          value={selectedTown}
          onChange={handleTownChange}
          disabled={!selectedDistrict}
          w="100%"
        >
          <option value="">읍/면/동</option>
          {selectedDistrict &&
            towns[selectedDistrict].map((town) => (
              <option key={town} value={town}>
                {town}
              </option>
            ))}
        </Select>
      </HStack>
    );
  };

  return (
    <Container>
      <Stack
        paddingY="10px"
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        height="852px"
        maxWidth="100%"
        background="#FFFFFF"
      >
        <Stack
          paddingX="1vw"
          direction="row"
          justify="flex-start"
          align="flex-start"
          spacing="0px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Stack size="lg" width="40px" height="40px" />
        </Stack>
        <Stack
          // paddingX="20px"
          paddingY="10px"
          direction="row"
          justify="center"
          align="center"
          spacing="10px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <Stack justify="flex-start" align="center" spacing="50px" flex="1">
            <Stack
              justify="flex-start"
              align="center"
              spacing="20px"
              alignSelf="stretch"
            >
              <Stack
                direction="column"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="SF Pro"
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="16px"
                  color="#000000"
                  // width="90px"
                >
                  부수입으로 받고 싶은 식사권 금액
                </Text>
                <Select
                  height="40px"
                  flex="1"
                  defaultValue={formData.user_price}
                  onChange={(e) =>
                    setFormData({ ...formData, user_price: e.target.value })
                  }
                >
                  {cost.map((value, index) => (
                    <option value={value}>{`${value}만원`}</option>
                  ))}
                </Select>
                ;
              </Stack>
              <Stack
                justify="center"
                align="center"
                spacing="10px"
                alignSelf="stretch"
              >
                <Stack
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  alignSelf="stretch"
                >
                  <Text
                    fontFamily="SF Pro"
                    lineHeight="1.43"
                    fontWeight="regular"
                    fontSize="16px"
                    color="#000000"
                    // width="90px"
                  >
                    식사 가능 동네
                  </Text>
                  <LocationSelector />
                </Stack>
                <Wrap
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  overflow="hidden"
                  alignSelf="stretch"
                >
                  {formData.user_place.map((value) => (
                    <Tag size="md" colorScheme="blue">
                      <TagLabel>{value.split(",")[2]}</TagLabel>
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
              </Stack>
              <Stack
                justify="center"
                align="center"
                spacing="10px"
                alignSelf="stretch"
              >
                <Stack
                  direction="column"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  alignSelf="stretch"
                >
                  <Text
                    fontFamily="SF Pro"
                    lineHeight="1.43"
                    fontWeight="regular"
                    fontSize="16px"
                    color="#000000"
                  >
                    좋아하는 음식
                  </Text>
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
                </Stack>
                <Wrap
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  overflow="hidden"
                  alignSelf="stretch"
                >
                  {formData.user_food.map((value) => (
                    <Tag size="md" colorScheme="blue">
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
              </Stack>
              <Stack
                justify="center"
                align="flex-start"
                spacing="10px"
                height="62px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="SF Pro"
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="16px"
                  color="#000000"
                  width="90px"
                >
                  정산계좌
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
                  >
                    {bank.map((value) => (
                      <option value={value}>{value}</option>
                    ))}
                  </Select>
                  <Input
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        user_bank: {
                          ...formData.user_bank,
                          accout_number: e.target.value,
                        },
                      })
                    }
                    placeholder
                    size="md"
                    flex="1"
                    alignSelf="stretch"
                  />
                </Stack>
              </Stack>
              <Stack
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Stack
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="77px"
                  alignSelf="stretch"
                >
                  <Text
                    fontFamily="SF Pro"
                    lineHeight="1.43"
                    fontWeight="regular"
                    fontSize="16px"
                    color="#000000"
                  >
                    성별
                  </Text>
                  <RadioGroup
                    onChange={(value) =>
                      setFormData({ ...formData, user_gender: value })
                    }
                  >
                    <HStack>
                      <Radio value={"남"} w="100px">
                        남
                      </Radio>
                      <Radio value={"여"} w="100px">
                        여
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </Stack>
              </Stack>
            </Stack>
            <Flex
              w="100%"
              justifyContent={"space-between"}
              alignItems={"flex-end"}
            >
              <Checkbox
                defaultChecked={check_terms}
                variant="blue"
                // width="256.42px"
                maxWidth="100%"
                onChange={(e) => setCheckTerms(e.target.checked)}
              >
                이용약관에 동의합니다.
              </Checkbox>
              <Text
                fontFamily="SF Pro"
                lineHeight="1.43"
                fontWeight="regular"
                fontSize="14px"
                color="#8C8C8C"
                // width="108.27px"
                textAlign="end"
              >
                자세히보기
              </Text>
            </Flex>
            {isValid.state ? null : (
              <Alert fontSize={"small"} status="error">
                <AlertIcon />
                <AlertDescription>{isValid.message}</AlertDescription>
              </Alert>
            )}
            <Button
              colorScheme="blue"
              height="40px"
              alignSelf="stretch"
              onClick={async () => {
                // 데이터 빈 곳 없는지 확인
                let ret = step2_confirm_blank(
                  formData.user_price,
                  formData.user_place,
                  formData.user_food,
                  formData.user_bank,
                  formData.user_gender
                );

                console.log(ret);

                // 데이터가 비어있는 경우
                if (ret !== "") {
                  setValid({
                    state: ret === "",
                    message: ret,
                  });
                  return;
                }

                // 이용약관 미동의 시
                if (!check_terms) {
                  setValid({
                    state: false,
                    message: "이용약관에 동의해주세요.",
                  });
                  return;
                }

                // 모든 정보 입력 & 이용약관 동의 시
                if (ret === "" || check_terms) {
                  // 정보 추가
                  await db_update("user", user_id, formData);

                  // 로그인 화면으로 이동
                  navigate("/");
                }
              }}
            >
              회원가입하기
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
