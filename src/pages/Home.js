import {
  Stack,
  Text,
  Icon,
  Circle,
  Box,
  Button,
  Avatar,
  Center,
  Container,
  Tabs,
  TabList,
  Tab,
  HStack,
  TabPanels,
  TabPanel,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsBell, BsPeopleFill, BsStarFill, BsPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { get_current_location } from "../js/UserAPI";
import { auth } from "../db/firebase_config";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { black, gray_300, gray_600, theme_primary_color, white } from "../App";
import { Navbar } from "../component/Navbar";
import { Logo, TextLogo } from "../component/Logo";
import { Footer } from "../component/Footer";
import { User } from "../component/User";
import { get_satuation } from "../js/Basic";
import { CustomButton } from "../component/Buttons";
import { get_doc_all, get_doc_list } from "../js/Database";
import { TextAddress } from "../component/KakaoMap";
import HorizonLine from "../component/HorizontalLine";

export const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [businessList, setBusinessList] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    let customer = await get_doc_list("user", "user_type", "개인");
    let business = await get_doc_list("user", "user_type", "사업 전문가");
    console.log(customer, business);

    setBusinessList(business);
    setCustomerList(customer);
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

  const test_data_b = [
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "김아중",
      user_birth: "1990.11.14",
      user_category: "IT 기업",
      user_price: 15,
      user_place: "강남구 역삼동",
      food: "한식",
      info: "에듀테크 it기업 엑싯경험으로 다양한 경험과 노하우를 알려드리겠습니다. 사업 조언 및 방향성 등에 도움이 많이 되실거에요 식사시간은 평일 점심시간만 역삼동에서 가능합니다. 12시~1시30분 입니다. 감사합니다.",
    },
    {
      user_type: "사업 전문가",
      user_name: "송강호",
      user_birth: "1994.11.14",
      user_category: "쇼핑몰",
      user_price: 8,
      user_place: "하남 스타필드",
      food: "한식,중식",
      info: "의류 쇼핑몰 연 매출 20억 달성하고 디자이너 브랜드 런칭하여 운영중에 있어요. 의류 쇼핑몰로 매출 내고 있으신 분들만 식사권 신청 부탁드려요! 식사 가능 시간은 평일 저녁 7시~8시30분 가능합니다!",
    },
    {
      user_type: "사업 전문가",
      user_name: "전지현",
      user_birth: "1961.11.14",
      user_category: "해외구매대행",
      user_price: 5,
      user_place: "인천 송도 센트럴파크",
      food: "초밥,한식",
      info: "해외구매대행 처음 시작하시는 분들에게 방향성 및 소싱 방법에 대한 노하우 전수해드립니다. 유통업이 처음이시더라도 조언 들으신 후 사업하시는 것이 시간을 줄이실 수 있으실거에요. 해외구매대행으로만 작년 기준 매출 3억 달성하였고 올해는 아기 용품 브랜드 런칭하였습니다. 브랜드 런칭에도 도움드릴 수 있으니 관심있으신분들은 식사권 신청바랍니다. 식사가능 시간은 평일 저녁 6시 이후 부터 가능합니다.",
    },
  ];
  const test_data_p = [
    {
      user_type: "개인",
      user_name: "공지철",
      user_birth: "1999.01.20",
      user_category: "AI 인공지능",
      user_price: 2,
      user_place: "해운대 현대백화점",
      food: "한식,중식",
      info: "AI 인공지능 회사에서 CTO로 근무하고 있어요! AI 관심있으신분 평일 저녁에 해운대 현백에서 간단히 식사하면서 얘기 나눠요~",
    },
    {
      user_type: "개인",
      user_name: "이동욱",
      user_birth: "1999.01.20",
      user_category: "심리학 독서",
      user_price: 2,
      user_place: "압구정동",
      food: "일식",
      info: "심리학 공부하고 있는데 심리학 관련 밥 친구 구합니다! 심리마케팅 및 인문학, 심리학 관심 있으신 분들 식사권 신청 부탁드려요 식사시간은 조율 가능해요!",
    },
  ];

  useEffect(() => {
    // 고객의 계정을 가지고 옵니다.
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        let user_info = await get_doc_list("user", "user_id", user.uid);
        setUserInfo(user_info[0]);
        // 위치 가지고 와서 사용자 정보에 업데이트
        // console.log(user_info[0], user.uid, user_info[0].doc_id);
        get_current_location(user_info, user_info[0].doc_id);
      }
    });
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
                <TextLogo h={"3vh"} />
                {userInfo && <TextAddress user={userInfo} />}
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
              <Tabs w="100%" colorScheme={get_satuation(theme_primary_color)}>
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
                          size="xs"
                          variant="outline"
                          colorScheme={get_satuation(theme_primary_color)}
                          height="24px"
                        >
                          가까운순
                        </Button>
                        <Button
                          size="xs"
                          variant="outline"
                          colorScheme={get_satuation(theme_primary_color)}
                          height="24px"
                        >
                          랜덤찾기
                        </Button>
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
                          size="xs"
                          variant="outline"
                          colorScheme={get_satuation(theme_primary_color)}
                          height="24px"
                        >
                          가까운순
                        </Button>
                        <Button
                          size="xs"
                          variant="outline"
                          colorScheme={get_satuation(theme_primary_color)}
                          height="24px"
                        >
                          랜덤찾기
                        </Button>
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
