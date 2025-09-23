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
  VStack,
  Badge,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { createContext, useEffect, useRef, useState } from "react";
import {
  BsBell,
  BsPeopleFill,
  BsPersonFill,
  BsQuestionCircle,
  BsFilter,
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
  gray_300,
  gray_400,
  gray_500,
  gray_600,
  gray_700,
  gray_900,
  white,
  bg,
  surface,
  theme_bright_color,
  theme_primary_color,
  brand_primary,
  brand_secondary,
} from "../App";
import { Navbar } from "../component/Navbar";
import { TextLogo } from "../component/Logo";
import { Footer } from "../component/Footer";
import { User } from "../component/User";
import { getSatuation, isAdult } from "../js/API";
import { EnterpriseButton, CustomButton } from "../component/Buttons";
import { EnterpriseCard, UserCard } from "../component/EnterpriseCard";
import { SkeletonList, LoadingOverlay } from "../component/EnterpriseLoading";
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
      label: "Food Partnership",
      alt: "food_partnership",
      url: "https://picsum.photos/800/400?random=1",
    },
    {
      label: "Business Networking",
      alt: "business_networking",
      url: "https://picsum.photos/800/400?random=2",
    },
    {
      label: "Team Building",
      alt: "team_building",
      url: "https://picsum.photos/800/400?random=3",
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

    const adultItems = items?.filter(item => isAdult(item.user_birth)) || [];

    return (
      <VStack spacing="6" w="100%">
        {/* User Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)"
          }}
          gap={{ base: "4", md: "6" }}
          w="100%"
        >
          {adultItems.slice(0, visibleItems).map((item, index) => (
            <GridItem key={index}>
              <UserCard
                user={item}
                actions={
                  <VStack spacing="2" w="100%">
                    <HStack spacing="2" w="100%">
                      <EnterpriseButton
                        size={{ base: "sm", md: "md" }}
                        variant="secondary"
                        flex="1"
                        onClick={() => navigate("/matching", { state: { data: item } })}
                      >
                        <Text fontSize={{ base: "xs", md: "sm" }}>프로필</Text>
                      </EnterpriseButton>
                      <EnterpriseButton
                        size={{ base: "sm", md: "md" }}
                        variant="primary"
                        flex="1"
                        onClick={() => navigate("/matching", { state: { data: item } })}
                      >
                        <Text fontSize={{ base: "xs", md: "sm" }}>매칭</Text>
                      </EnterpriseButton>
                    </HStack>
                  </VStack>
                }
                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-lg)"
                }}
              />
            </GridItem>
          ))}
        </Grid>

        {/* Load More Button */}
        {visibleItems < adultItems.length && (
          <EnterpriseButton
            variant="secondary"
            size="md"
            onClick={handleLoadMore}
            leftIcon={<Icon as={BsPeopleFill} />}
          >
            더 많은 친구 보기 ({adultItems.length - visibleItems}명 남음)
          </EnterpriseButton>
        )}

        {/* Empty State */}
        {adultItems.length === 0 && (
          <Center py="16">
            <VStack spacing="4">
              <Icon as={BsPeopleFill} boxSize="12" color={gray_400} />
              <Text color={gray_500} fontSize="lg" fontWeight="500">
                등록된 사용자가 없습니다
              </Text>
              <Text color={gray_400} fontSize="sm" textAlign="center">
                새로운 친구들이 곧 등록될 예정입니다
              </Text>
            </VStack>
          </Center>
        )}
      </VStack>
    );
  };

  return (
    <Box bg={bg} minH="100vh">
      {/* Enterprise Header */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="sticky"
        bg={white}
        borderBottom="1px solid"
        borderColor={gray_200}
        backdropFilter="blur(8px)"
        boxShadow="var(--shadow-sm)"
      >
        <Container maxW="container.xl" px="4">
          <Flex
            h="64px"
            align="center"
            justify="space-between"
          >
            {/* Logo Section */}
            <HStack spacing="4">
              <TextLogo h="32px" />
              <Badge
                colorScheme="blue"
                variant="subtle"
                borderRadius="full"
                px="2"
                fontSize="xs"
                fontWeight="600"
              >
                Enterprise
              </Badge>
            </HStack>

            {/* User Actions */}
            <HStack spacing="2">
              <Box position="relative">
                <IconButton
                  onClick={() => navigate("/notice")}
                  variant="ghost"
                  size="md"
                  icon={<BsBell size="20px" />}
                  aria-label="알림"
                  borderRadius="8px"
                  color={gray_600}
                  _hover={{
                    bg: gray_100,
                    color: gray_900,
                    transform: "translateY(-1px)"
                  }}
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                />
                {alarmCnt > 0 && (
                  <Center
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    w="20px"
                    h="20px"
                    bg="red.500"
                    color={white}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="600"
                    boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                  >
                    {alarmCnt > 9 ? "9+" : alarmCnt}
                  </Center>
                )}
              </Box>
            </HStack>
          </Flex>
        </Container>
      </Box>
      {/* Main Content */}
      <Container maxW="container.xl" px={{ base: "4", md: "6" }} pt="80px" pb="100px">
        <VStack spacing={{ base: "6", md: "8" }} align="stretch">
          {/* Hero Section */}
          <EnterpriseCard variant="elevated" padding={{ base: "6", md: "8" }}>
            <VStack spacing={{ base: "4", md: "6" }} align="stretch">
              <VStack spacing={{ base: "2", md: "3" }} align="center">
                <Text
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="700"
                  color={gray_900}
                  textAlign="center"
                  className="text-display-md"
                  lineHeight="1.2"
                >
                  새로운 식사 친구를 찾아보세요
                </Text>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color={gray_600}
                  textAlign="center"
                  maxW={{ base: "100%", md: "600px" }}
                  className="text-body-lg"
                  px={{ base: "2", md: "0" }}
                >
                  AI 기반 매칭 시스템으로 당신과 취향이 맞는 식사 파트너를 만나보세요
                </Text>
              </VStack>

              {/* Carousel with modern styling */}
              <Box
                borderRadius={{ base: "lg", md: "xl" }}
                overflow="hidden"
                boxShadow="var(--shadow-md)"
                h={{ base: "200px", md: "300px", lg: "400px" }}
              >
                <Carousel
                  showArrows={false}
                  autoPlay={true}
                  infiniteLoop={true}
                  showThumbs={false}
                  selectedItem={currentIndex}
                  onChange={handleChange}
                  showStatus={false}
                  interval={5000}
                  transitionTime={600}
                >
                  {renderSlides}
                </Carousel>
              </Box>
            </VStack>
          </EnterpriseCard>
          {/* Navigation Tabs */}
          <EnterpriseCard variant="default" padding={{ base: "4", md: "6" }}>
            <Tabs
              variant="soft-rounded"
              colorScheme="blue"
              index={currentIndex}
              onChange={handleChange}
            >
              <TabList bg={gray_100} p="1" borderRadius="lg">
                <Tab
                  w="50%"
                  borderRadius="md"
                  fontWeight="600"
                  fontSize={{ base: "xs", md: "sm" }}
                  color={gray_600}
                  py={{ base: "2", md: "3" }}
                  _selected={{
                    bg: white,
                    color: brand_primary,
                    boxShadow: "var(--shadow-sm)"
                  }}
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <HStack spacing={{ base: "1", md: "2" }}>
                    <Icon as={BsPeopleFill} boxSize={{ base: "3", md: "4" }} />
                    <Text display={{ base: "none", sm: "block" }}>내 주변 밥친구</Text>
                    <Text display={{ base: "block", sm: "none" }}>밥친구</Text>
                  </HStack>
                </Tab>
                <Tab
                  w="50%"
                  borderRadius="md"
                  fontWeight="600"
                  fontSize={{ base: "xs", md: "sm" }}
                  color={gray_600}
                  py={{ base: "2", md: "3" }}
                  _selected={{
                    bg: white,
                    color: brand_primary,
                    boxShadow: "var(--shadow-sm)"
                  }}
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <HStack spacing={{ base: "1", md: "2" }}>
                    <Icon as={BsPersonFill} boxSize={{ base: "3", md: "4" }} />
                    <Text display={{ base: "none", sm: "block" }}>내 주변 밥멘토</Text>
                    <Text display={{ base: "block", sm: "none" }}>멘토</Text>
                  </HStack>
                </Tab>
              </TabList>

              <TabPanels mt="6">
                <TabPanel px="0">
                  <VStack spacing="6" align="stretch">
                    {/* Filter Controls */}
                    <VStack spacing="3" align="stretch">
                      <HStack spacing="2" justify={{ base: "center", md: "flex-start" }}>
                        <Icon as={BsFilter} color={gray_500} boxSize="4" />
                        <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="500" color={gray_600}>
                          필터:
                        </Text>
                      </HStack>

                      <Flex
                        direction={{ base: "column", sm: "row" }}
                        gap="2"
                        align="stretch"
                        wrap="wrap"
                        justify="center"
                      >
                        <EnterpriseButton
                          variant="secondary"
                          size={{ base: "sm", md: "md" }}
                          width={{ base: "100%", sm: "auto" }}
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
                          {gender === "남자" ? "전체" : gender === "여자" ? "남자" : "여자"}
                        </EnterpriseButton>

                        <EnterpriseButton
                          variant={tab === "거리" ? "primary" : "ghost"}
                          size={{ base: "sm", md: "md" }}
                          width={{ base: "100%", sm: "auto" }}
                          onClick={async () => {
                            setTab("거리");
                            filterGender("개인", "거리");
                          }}
                        >
                          가까운순
                        </EnterpriseButton>

                        <EnterpriseButton
                          variant={tab === "랜덤" ? "primary" : "ghost"}
                          size={{ base: "sm", md: "md" }}
                          width={{ base: "100%", sm: "auto" }}
                          onClick={async () => {
                            setTab("랜덤");
                            filterGender("개인", "랜덤");
                          }}
                        >
                          랜덤찾기
                        </EnterpriseButton>

                        <Tooltip
                          label={
                            <VStack align="start" spacing="2" p="2">
                              <Box>
                                <Text fontWeight="600" fontSize="sm">가까운순</Text>
                                <Text color="gray.300" fontSize="xs">
                                  현재 위치에서 가까운 순서대로 정렬
                                </Text>
                              </Box>
                              <Box>
                                <Text fontWeight="600" fontSize="sm">랜덤찾기</Text>
                                <Text color="gray.300" fontSize="xs">
                                  같은 지역에서 랜덤으로 정렬
                                </Text>
                              </Box>
                            </VStack>
                          }
                          bg={gray_900}
                          color={white}
                          borderRadius="lg"
                          hasArrow
                          placement="bottom-end"
                        >
                          <IconButton
                            variant="ghost"
                            size={{ base: "sm", md: "md" }}
                            icon={<BsQuestionCircle />}
                            aria-label="도움말"
                            color={gray_500}
                            _hover={{ color: gray_700 }}
                            alignSelf={{ base: "center", sm: "flex-start" }}
                          />
                        </Tooltip>
                      </Flex>
                    </VStack>

                    {/* User List */}
                    <LoadingOverlay isLoading={!customerList}>
                      {customerList && customerList.length > 0 ? (
                        <ItemList items={customerList} />
                      ) : (
                        <Center py="12">
                          <VStack spacing="4">
                            <Text color={gray_500} fontSize="lg">
                              아직 등록된 밥친구가 없습니다
                            </Text>
                            <Text color={gray_400} fontSize="sm">
                              조금 더 기다려주세요!
                            </Text>
                          </VStack>
                        </Center>
                      )}
                    </LoadingOverlay>
                  </VStack>
                </TabPanel>
                <TabPanel px="0">
                  <VStack spacing="6" align="stretch">
                    {/* Filter Controls */}
                    <Flex justify="space-between" align="center" wrap="wrap" gap="3">
                      <HStack spacing="2">
                        <Icon as={BsFilter} color={gray_500} boxSize="4" />
                        <Text fontSize="sm" fontWeight="500" color={gray_600}>
                          필터:
                        </Text>
                      </HStack>
                      <HStack spacing="2" wrap="wrap">
                        <EnterpriseButton
                          variant="secondary"
                          size="sm"
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
                          {gender === "남자" ? "전체" : gender === "여자" ? "남자" : "여자"}
                        </EnterpriseButton>
                        <EnterpriseButton
                          variant={tab === "거리" ? "primary" : "ghost"}
                          size="sm"
                          onClick={async () => {
                            setTab("거리");
                            filterGender("멘토", "거리");
                          }}
                        >
                          가까운순
                        </EnterpriseButton>
                        <EnterpriseButton
                          variant={tab === "랜덤" ? "primary" : "ghost"}
                          size="sm"
                          onClick={async () => {
                            setTab("랜덤");
                            filterGender("멘토", "랜덤");
                          }}
                        >
                          랜덤찾기
                        </EnterpriseButton>
                        <Tooltip
                          label={
                            <VStack align="start" spacing="2" p="2">
                              <Box>
                                <Text fontWeight="600" fontSize="sm">가까운순</Text>
                                <Text color="gray.300" fontSize="xs">
                                  현재 위치에서 가까운 순서대로 정렬
                                </Text>
                              </Box>
                              <Box>
                                <Text fontWeight="600" fontSize="sm">랜덤찾기</Text>
                                <Text color="gray.300" fontSize="xs">
                                  같은 지역에서 랜덤으로 정렬
                                </Text>
                              </Box>
                            </VStack>
                          }
                          bg={gray_900}
                          color={white}
                          borderRadius="lg"
                          hasArrow
                          placement="bottom-end"
                        >
                          <IconButton
                            variant="ghost"
                            size="sm"
                            icon={<BsQuestionCircle />}
                            aria-label="도움말"
                            color={gray_500}
                            _hover={{ color: gray_700 }}
                          />
                        </Tooltip>
                      </HStack>
                    </Flex>

                    {/* Business User List */}
                    <LoadingOverlay isLoading={!businessList}>
                      {businessList && businessList.length > 0 ? (
                        <ItemList items={businessList} />
                      ) : (
                        <Center py="12">
                          <VStack spacing="4">
                            <Text color={gray_500} fontSize="lg">
                              아직 등록된 밥멘토가 없습니다
                            </Text>
                            <Text color={gray_400} fontSize="sm">
                              조금 더 기다려주세요!
                            </Text>
                          </VStack>
                        </Center>
                      )}
                    </LoadingOverlay>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </EnterpriseCard>
        </VStack>

        {/* Footer */}
        <Box mt="16">
          <Footer
            companyName="(주)세이프바운더리"
            ceoName="김지훈"
            businessNumber="817-88-02796"
            address="서울특별시 서초구 서초동 1337-6 강남효성해링턴타워 103"
            commNumber="2023-서울서초-1772"
            tel="02-3471-8197"
            mail="safeboundary@naver.com"
          />
        </Box>
      </Container>

      {/* Navigation Bar */}
      <Navbar />
    </Box>
  );
};
