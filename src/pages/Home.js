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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
import { black, gray_200, gray_600, theme_primary_color } from "../App";
import { Navbar } from "../component/Navbar";
import { Logo, TextLogo } from "../component/Logo";
import { Footer } from "../component/Footer";
import { User } from "../component/User";
import { getSatuation } from "../js/API";
import { CustomButton } from "../component/Buttons";
import { arrange_distance, arrange_random, get_doc_list } from "../js/Database";
import { TextAddress } from "../component/KakaoMap";

export const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [businessList, setBusinessList] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    getUserList();
  });

  const getUserList = async () => {
    if (businessList.length === 0 || customerList.length === 0) {
      if (userInfo?.user_location) {
        let business = await arrange_distance(
          userInfo.user_location,
          "사업 전문가"
        );
        setBusinessList(business);

        let customer = await arrange_distance(userInfo.user_location, "개인");
        setCustomerList(customer);
      }
    }
  };

  const imageData = [
    {
      label: "Image 1",
      alt: "image1",
      url: require("../assets/banner.png"),
    },

    {
      label: "Image 2",
      alt: "image2",
      url: require("../assets/banner.png"),
    },

    {
      label: "Image 3",
      alt: "image3",
      url: require("../assets/banner.png"),
    },

    {
      label: "Image 4",
      alt: "image4",
      url: require("../assets/banner.png"),
    },

    {
      label: "Image 5",
      alt: "image5",
      url: require("../assets/banner.png"),
    },
  ];

  useEffect(() => {
    // 고객의 계정을 가지고 옵니다.
    if (!userInfo) {
      auth.onAuthStateChanged(async function (user) {
        if (user) {
          let user_info = await get_doc_list("user", "user_id", user.uid);
          setUserInfo(user_info[0]);
          // 위치 가지고 와서 사용자 정보에 업데이트
          console.log(user_info[0], user.uid, user_info[0]?.doc_id);
          get_update_location(user_info, user_info[0]?.doc_id);
        }
      });
    }
  });

  const [currentIndex, setCurrentIndex] = useState();

  function handleChange(index) {
    setCurrentIndex(index);
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
          {items.slice(0, visibleItems).map((item, index) => (
            <User data={item} />
          ))}
        </Stack>
        {visibleItems < items.length && (
          <CustomButton
            w="90px"
            text={"더보기"}
            code={theme_primary_color}
            onClick={handleLoadMore}
          />
        )}
      </Stack>
    );
  };

  return (
    <Container px={0} pt={"50px"} pb={"55px"}>
      <Box className="header">
        <Container border={"1px solid #d9d9d9"} p={0} bgColor={"white"}>
          <Stack>
            <HStack
              p="1vw 2vw"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <HStack w={"100%"}>
                <TextLogo h={"2vh"} />
                {userInfo && userInfo.user_location && (
                  <TextAddress user={userInfo} />
                )}
              </HStack>

              <IconButton
                onClick={() => navigate("/notice")}
                variant={"unstyled"}
                icon={<BsBell size={"24px"} />}
              />
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
            selectedItem={imageData[currentIndex]}
            onChange={handleChange}
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
              <Tabs w="100%" colorScheme={getSatuation(theme_primary_color)}>
                <TabList>
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
                        사업 전문가
                      </Text>
                    </HStack>
                  </Tab>
                  <Tab w="100%">
                    <HStack>
                      <Icon as={BsPeopleFill} />
                      <Text
                        lineHeight="1.31"
                        fontWeight="semibold"
                        fontSize="16px"
                        letterSpacing="-0.32px"
                        // color={black}
                        textAlign="center"
                      >
                        내 주변 밥친구
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
                        <Button
                          onClick={async () => {
                            let data = await arrange_distance(
                              userInfo.user_location,
                              "사업 전문가"
                            );
                            setBusinessList(data);
                          }}
                          size="xs"
                          variant="outline"
                          colorScheme={getSatuation(theme_primary_color)}
                        >
                          가까운순
                        </Button>
                        <Button
                          onClick={async () => {
                            let data = await arrange_random(
                              userInfo.user_location,
                              userInfo.dong,
                              "사업 전문가"
                            );
                            setBusinessList(data);
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
                          bg={gray_200}
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
                  <TabPanel px={0} width={"100%"}>
                    <Stack>
                      <Stack
                        w="100%"
                        direction="row"
                        justify="flex-end"
                        align="flex-start"
                        spacing="10px"
                      >
                        <Button
                          onClick={async () => {
                            let data = await arrange_distance(
                              userInfo.user_location,
                              "개인"
                            );
                            setBusinessList(data);
                          }}
                          size="xs"
                          variant="outline"
                          colorScheme={getSatuation(theme_primary_color)}
                        >
                          가까운순
                        </Button>
                        <Button
                          onClick={async () => {
                            let data = await arrange_random(
                              userInfo.user_location,
                              userInfo.dong,
                              "개인"
                            );
                            setBusinessList(data);
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
                          bg={gray_200}
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
          address="서울시 강남구
            서초구 강남대로 51길10 강남효성해링턴 103"
          commNumber="2023-서울서초-1772"
          tel="02-3471-8197"
          mail="safeboundary@naver.com"
        />
      </Stack>
      <Navbar />
    </Container>
  );
};
