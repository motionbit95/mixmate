import {
  Stack,
  Text,
  Icon,
  Box,
  Button,
  Container,
  Tabs,
  TabList,
  Tab,
  HStack,
  TabPanels,
  TabPanel,
  IconButton,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import { createContext, useEffect, useRef, useState } from "react";
import {
  BsBell,
  BsPeopleFill,
  BsPersonFill,
  BsQuestionCircle,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { get_update_location } from "../js/UserAPI";
import { auth } from "../db/firebase_config";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  black,
  gray_100,
  gray_200,
  gray_600,
  theme_bright_color,
  theme_primary_color,
} from "../App";
import { Navbar } from "../component/Navbar";
import { TextLogo } from "../component/Logo";
import { Footer } from "../component/Footer";
import { User } from "../component/User";
import { getSatuation, isAdult } from "../js/API";
import { CustomButton } from "../component/Buttons";
import {
  arrange_distance,
  arrange_random,
  get_doc_data,
  get_doc_list,
} from "../js/Database";
import { TextAddress } from "../component/KakaoMap";

export const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [businessList, setBusinessList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [alarmCnt, setAlarmCnt] = useState(0);
  const [gender, setGender] = useState("남자");
  const [tab, setTab] = useState(0);

  useEffect(() => {
    getAlarmList();
  }, []);

  const filterGender = async (type, filter) => {
    let location = userInfo.user_location
      ? userInfo.user_location
      : {
          latitude: 37.5664056,
          longitude: 126.9778222,
        };
    let data;
    if (filter === "랜덤") {
      data = await arrange_random(location, userInfo.dong, type);
    } else {
      if (userInfo?.user_location) {
        data = await arrange_distance(location, type);
      } else {
        data = await get_doc_list("user", "user_type", type);
      }
    }

    if (gender === "전체") {
      type === "멘토" ? setBusinessList(data) : setCustomerList(data);
    } else if (gender === "남자") {
      const filteredData = data.filter((item) => item.user_gender === "남");
      type === "멘토"
        ? setBusinessList(filteredData)
        : setCustomerList(filteredData);
    } else if (gender === "여자") {
      const filteredData = data.filter((item) => item.user_gender === "여");
      type === "멘토"
        ? setBusinessList(filteredData)
        : setCustomerList(filteredData);
    }
  };

  const getAlarmList = async () => {
    const count = 0;
    auth.onAuthStateChanged(async (currentUser) => {
      console.log(currentUser.uid);
      let alarmList = await get_doc_list("alarm", "user_id", currentUser.uid);

      alarmList.map((value, index) => {
        if (!value.isRead) {
          setAlarmCnt(alarmCnt + 1);
        }
      });
    });
  };

  // 초기 로딩시 한번만 실행되는 로직(초기화)
  useEffect(() => {
    auth.onAuthStateChanged(async function (user) {
      if (!user) {
        // if (
        //   window.confirm(
        //     "회원 정보를 찾을 수 없습니다. 로그인 페이지로 이동하시겠습니까?"
        //   )
        // )
        navigate("/login");
      }
    });
    initialize();
  }, []);

  const initialize = async () => {
    await updateUserInfo();
  };

  const updateUserInfo = async (_key, _value) => {
    // 1. 현재 로그인 된 고객의 uid로 고객 문서를 조회합니다.
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        let userData = await get_doc_data("user", user?.uid);
        // 로그인 된 유저가 있을 때만, 고객의 위치 업데이트
        if (user) {
          setUserInfo(userData);

          // 사용자의 위치 정보를 업데이트 합니다.
          await get_update_location(user?.uid);

          await getUserList(userData);
        }
      }
    });
  };

  const getUserList = async (userInfo) => {
    //# 거리 정보를 가지고 왔을 경우, 회원 리스트를 개인/사업으로 분류하여 가지고 옵니다. (초기 -> 거리순)
    let business = [];
    let customer = [];

    if (userInfo?.user_location) {
      business = await arrange_distance(userInfo.user_location, "멘토");
      customer = await arrange_distance(userInfo.user_location, "개인");
    } else {
      business = await get_doc_list("user", "user_type", "멘토");
      customer = await get_doc_list("user", "user_type", "개인");
    }
    setBusinessList(business);
    setCustomerList(customer);
  };

  const imageData = [
    {
      label: "Image 1",
      alt: "image1",
      url: require("../assets/banner1.jpg"),
    },

    {
      label: "Image 2",
      alt: "image2",
      url: require("../assets/banner2.png"),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState();
  const [tabIndex, setTabIndex] = useState();

  function handleChange(index) {
    setCurrentIndex(index);
    setTabIndex(index);
    setGender("남자");
  }

  const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
      <img
        src={image.url}
        alt={image.alt}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "10px",
          objectFit: "cover",
          // marginBottom: "40px"
        }}
      />
    </div>
  ));

  const ItemList = ({ items }) => {
    const [visibleItems, setVisibleItems] = useState(6);

    const handleLoadMore = () => {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 6);
    };

    return (
      <Stack spacing={"4vh"} alignItems={"center"} w={"100%"}>
        <Stack alignItems={"center"} w={"100%"}>
          {items
            .slice(0, visibleItems)
            .map(
              (item, index) =>
                isAdult(item.user_birth) && <User key={index} data={item} />
            )}
        </Stack>
        {visibleItems < items.length && (
          <CustomButton
            w="90px"
            text={"더보기"}
            code={theme_bright_color}
            onClick={handleLoadMore}
          />
        )}
      </Stack>
    );
  };

  return (
    <Container px={0} pt={"50px"} pb={"55px"} minH={"100vh"}>
      <Box className="header">
        <Container border={"1px solid #d9d9d9"} p={0} bgColor={"white"}>
          <Stack>
            <HStack
              p="1vw 2vw"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <HStack w={"100%"}>
                <TextLogo h={"4vh"} />
              </HStack>

              <HStack alignItems={"flex-end"}>
                <IconButton
                  onClick={() => navigate("/notice")}
                  variant={"unstyled"}
                  icon={<BsBell size={"24px"} />}
                />
                {alarmCnt > 0 && (
                  <Center
                    zIndex={999}
                    ml={"-32px"}
                    h={"20px"}
                    w={"20px"}
                    bgColor={"red"}
                    rounded={"full"}
                  >
                    <Text color={"white"}>{alarmCnt}</Text>
                  </Center>
                )}
              </HStack>
            </HStack>
          </Stack>
        </Container>
      </Box>
      <Stack
        justify="flex-start"
        align="flex-start"
        spacing="0px"
        overflow="hidden"
        maxWidth="100%"
        d
        minH={"100vh"}
      >
        <Stack
          pt={"10px"}
          justify="flex-start"
          align="flex-start"
          spacing="20px"
          overflow="hidden"
          alignSelf="stretch"
          m={"2vh"}
        >
          <Carousel
            showArrows={false}
            autoPlay={false}
            infiniteLoop={true}
            showThumbs={false}
            selectedItem={currentIndex}
            onChange={handleChange}
            showStatus={false}
          >
            {renderSlides}
          </Carousel>
          <Stack
            direction="row"
            justify="space-between"
            align="flex-start"
            spacing="10px"
            alignSelf="stretch"
          >
            <Stack
              w="100%"
              direction="row"
              justify="flex-start"
              align="center"
              spacing="10px"
            >
              <Tabs
                w="100%"
                colorScheme={getSatuation(theme_primary_color)}
                onChange={handleChange}
                index={currentIndex}
              >
                <TabList>
                  <Tab w="100%">
                    <HStack>
                      <Icon as={BsPeopleFill} />
                      <Text
                        lineHeight="1.31"
                        fontWeight="semibold"
                        fontSize="16px"
                        letterSpacing="-0.32px"
                        // color={black}
                        textAlign="left"
                      >
                        내 주변 밥친구
                      </Text>
                    </HStack>
                  </Tab>
                  <Tab w="100%">
                    <HStack>
                      <Icon as={BsPersonFill} />
                      <Text
                        lineHeight="1.31"
                        fontWeight="semibold"
                        fontSize="16px"
                        letterSpacing="-0.32px"
                        // color={black}
                        textAlign="center"
                      >
                        내 주변 밥멘토
                      </Text>
                    </HStack>
                  </Tab>
                </TabList>

                <TabPanels width={"100%"}>
                  <TabPanel px={0} width={"100%"}>
                    <Stack>
                      <Stack
                        w="100%"
                        direction="row"
                        justify="flex-end"
                        align="flex-start"
                        spacing="10px"
                      >
                        {/* {userInfo && userInfo.user_location && (
                          <TextAddress user={userInfo} />
                        )} */}
                        <Button
                          size="xs"
                          variant="outline"
                          colorScheme={getSatuation(theme_primary_color)}
                          onClick={() => {
                            if (gender === "남자") {
                              setGender("여자");
                            } else if (gender === "여자") {
                              setGender("전체");
                            } else if (gender === "전체") {
                              setGender("남자");
                            }

                            filterGender("개인", tab);
                          }}
                        >
                          {gender === "남자"
                            ? "전체"
                            : gender === "여자"
                            ? "남자"
                            : "여자"}
                        </Button>
                        <Button
                          onClick={async () => {
                            setTab("거리");
                            filterGender("개인", "거리");
                          }}
                          size="xs"
                          variant="outline"
                          colorScheme={getSatuation(theme_primary_color)}
                        >
                          가까운순
                        </Button>
                        <Button
                          onClick={async () => {
                            setTab("랜덤");
                            filterGender("개인", "랜덤");
                          }}
                          size="xs"
                          variant="outline"
                          colorScheme={getSatuation(theme_primary_color)}
                        >
                          랜덤찾기
                        </Button>
                        <Tooltip
                          hasArrow
                          whiteSpace={"pre-wrap"}
                          placement="bottom-end"
                          label={
                            <Stack>
                              <Text fontWeight={"bold"}>가까운순</Text>
                              <Text color={gray_600} fontSize={"small"}>
                                {`현재 사용자의 위치에서 가까운 순서대로 밥친구를 정렬합니다.`}
                              </Text>
                              <Text fontWeight={"bold"}>랜덤찾기</Text>
                              <Text color={gray_600} fontSize={"small"}>
                                {`현재 사용자의 동내에서 랜덤으로 밥친구를 정렬합니다.`}
                              </Text>
                            </Stack>
                          }
                          bg={gray_100}
                          color={black}
                        >
                          <IconButton
                            variant={"ghost"}
                            size={"xs"}
                            icon={<BsQuestionCircle />}
                          />
                        </Tooltip>
                      </Stack>
                      <Stack
                        justify="flex-start"
                        align="center"
                        spacing="2vh"
                        alignSelf="stretch"
                      >
                        <ItemList items={customerList} />
                      </Stack>
                    </Stack>
                  </TabPanel>
                  <TabPanel px={0} width={"100%"}>
                    <Stack>
                      <Stack
                        w="100%"
                        direction="row"
                        justify="flex-end"
                        align="flex-start"
                        spacing="10px"
                      >
                        {/* {userInfo && userInfo.user_location && (
                          <TextAddress user={userInfo} />
                        )} */}
                        <Button
                          size="xs"
                          variant="outline"
                          colorScheme={getSatuation(theme_primary_color)}
                          onClick={() => {
                            if (gender === "남자") {
                              setGender("여자");
                            } else if (gender === "여자") {
                              setGender("전체");
                            } else if (gender === "전체") {
                              setGender("남자");
                            }

                            filterGender("멘토", tab);
                          }}
                        >
                          {gender === "남자"
                            ? "전체"
                            : gender === "여자"
                            ? "남자"
                            : "여자"}
                        </Button>
                        <Button
                          onClick={async () => {
                            setTab("거리");
                            filterGender("멘토", "거리");
                          }}
                          size="xs"
                          variant="outline"
                          colorScheme={getSatuation(theme_primary_color)}
                        >
                          가까운순
                        </Button>
                        <Button
                          onClick={async () => {
                            setTab("랜덤");
                            filterGender("멘토", "랜덤");
                          }}
                          size="xs"
                          variant="outline"
                          colorScheme={getSatuation(theme_primary_color)}
                        >
                          랜덤찾기
                        </Button>
                        <Tooltip
                          hasArrow
                          whiteSpace={"pre-wrap"}
                          placement="bottom-end"
                          label={
                            <Stack>
                              <Text fontWeight={"bold"}>가까운순</Text>
                              <Text color={gray_600} fontSize={"small"}>
                                {`현재 사용자의 위치에서 가까운 순서대로 밥친구를 정렬합니다.`}
                              </Text>
                              <Text fontWeight={"bold"}>랜덤찾기</Text>
                              <Text color={gray_600} fontSize={"small"}>
                                {`현재 사용자의 동내에서 랜덤으로 밥친구를 정렬합니다.`}
                              </Text>
                            </Stack>
                          }
                          bg={gray_100}
                          color={black}
                        >
                          <IconButton
                            variant={"ghost"}
                            size={"xs"}
                            icon={<BsQuestionCircle />}
                          />
                        </Tooltip>
                      </Stack>
                      <Stack
                        justify="flex-start"
                        align="center"
                        spacing="2vh"
                        alignSelf="stretch"
                      >
                        <ItemList items={businessList} />
                      </Stack>
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </Stack>
        </Stack>
        <Stack display={"flex"} flex={1}></Stack>

        <Footer
          companyName="(주)세이프바운더리"
          ceoName="김지훈"
          businessNumber="817-88-02796"
          address="서울특별시 서초구 서초동 1337-6 강남효성해링턴타워 103"
          commNumber="2023-서울서초-1772"
          tel="02-3471-8197"
          mail="safeboundary@naver.com"
        />
      </Stack>
      <Navbar />
    </Container>
  );
};
