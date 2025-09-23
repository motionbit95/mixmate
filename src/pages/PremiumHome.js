import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Badge,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  BsSearch,
  BsFilter,
  BsGeoAlt,
  BsStarFill,
  BsPeople,
  BsChat,
  BsHeart,
  BsTrendingUp,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth } from "../db/firebase_config";
import { get_doc_all } from "../js/MockDatabase";
import { PremiumHeader } from "../component/PremiumHeader";
import { PremiumUserCard, PremiumContentCard, PremiumStatsCard } from "../component/PremiumCard";

export const PremiumHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [businessList, setBusinessList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  // Hero carousel data
  const heroSlides = [
    {
      title: "AI 기반 스마트 매칭",
      description: "취향과 위치를 분석하여 완벽한 식사 파트너를 찾아드립니다",
      image: "https://picsum.photos/1200/400?random=1",
      cta: "매칭 시작하기"
    },
    {
      title: "프리미엄 비즈니스 네트워킹",
      description: "전문가들과의 고품질 미팅으로 비즈니스 기회를 확장하세요",
      image: "https://picsum.photos/1200/400?random=2",
      cta: "멘토 찾기"
    },
    {
      title: "안전하고 신뢰할 수 있는 만남",
      description: "검증된 사용자들과 안전한 환경에서 새로운 인연을 만나보세요",
      image: "https://picsum.photos/1200/400?random=3",
      cta: "지금 시작하기"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const allUsers = await get_doc_all("user");

        const business = allUsers.filter(user => user.user_type === "멘토");
        const customer = allUsers.filter(user => user.user_type === "개인");

        setBusinessList(business);
        setCustomerList(customer);
        setLoading(false);
      } catch (error) {
        console.error("초기화 오류:", error);
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        navigate("/login");
      }
    });

    initialize();

    return () => unsubscribe();
  }, [navigate]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const filteredCustomers = customerList.filter(customer => {
    if (searchQuery && !customer.user_name?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedLocation && !customer.user_place?.includes(selectedLocation)) {
      return false;
    }
    if (selectedFoodType && !customer.user_food?.includes(selectedFoodType)) {
      return false;
    }
    return true;
  });

  const filteredBusiness = businessList.filter(business => {
    if (searchQuery && !business.user_name?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedLocation && !business.user_place?.includes(selectedLocation)) {
      return false;
    }
    return true;
  });

  const currentList = tabIndex === 0 ? filteredCustomers : filteredBusiness;

  if (loading) {
    return (
      <Box bg="var(--surface-secondary)" minH="100vh">
        <PremiumHeader user={user} onSearch={handleSearch} />
        <Container maxW="container.xl" pt="100px">
          <VStack spacing="8">
            <Box
              w="100%"
              h="300px"
              bg="var(--neutral-200)"
              borderRadius="var(--radius-2xl)"
              className="shimmer"
            />
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6" w="100%">
              {[...Array(6)].map((_, i) => (
                <Box
                  key={i}
                  h="400px"
                  bg="var(--neutral-200)"
                  borderRadius="var(--radius-2xl)"
                  className="shimmer"
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="var(--surface-secondary)" minH="100vh">
      <PremiumHeader
        user={user}
        alarmCount={0}
        onSearch={handleSearch}
      />

      {/* Hero Section */}
      <Box position="relative" overflow="hidden">
        <Container maxW="container.xl" pt="72px">
          <Box
            position="relative"
            h={{ base: "400px", md: "500px" }}
            borderRadius="var(--radius-3xl)"
            overflow="hidden"
            mt="6"
            boxShadow="var(--shadow-xl)"
          >
            {/* Background Image */}
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              w="100%"
              h="100%"
              objectFit="cover"
              transition="all 1s ease-in-out"
            />

            {/* Overlay */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgGradient="linear(to-r, blackAlpha.600, blackAlpha.300)"
            />

            {/* Content */}
            <Flex
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              align="center"
              px={{ base: "6", md: "12" }}
            >
              <VStack
                align="start"
                spacing="6"
                maxW="600px"
                color="white"
              >
                <Badge
                  bg="rgba(255, 255, 255, 0.2)"
                  color="white"
                  px="3"
                  py="1"
                  borderRadius="var(--radius-full)"
                  fontSize="sm"
                  fontWeight="500"
                  backdropFilter="blur(10px)"
                >
                  Premium Experience
                </Badge>

                <Text
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="800"
                  lineHeight="1.1"
                  className="text-display-xl"
                >
                  {heroSlides[currentSlide].title}
                </Text>

                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  opacity="0.9"
                  lineHeight="1.6"
                  maxW="500px"
                >
                  {heroSlides[currentSlide].description}
                </Text>

                <Button
                  size="lg"
                  bg="white"
                  color="var(--brand-primary)"
                  px="8"
                  py="6"
                  borderRadius="var(--radius-full)"
                  fontWeight="600"
                  className="interactive-scale"
                  _hover={{
                    bg: "whiteAlpha.900",
                    transform: "scale(1.05)",
                  }}
                  onClick={() => navigate("/matching")}
                >
                  {heroSlides[currentSlide].cta}
                </Button>
              </VStack>
            </Flex>

            {/* Slide Indicators */}
            <HStack
              position="absolute"
              bottom="6"
              left="50%"
              transform="translateX(-50%)"
              spacing="2"
            >
              {heroSlides.map((_, index) => (
                <Box
                  key={index}
                  w="3"
                  h="3"
                  borderRadius="full"
                  bg={currentSlide === index ? "white" : "whiteAlpha.500"}
                  cursor="pointer"
                  transition="all var(--transition-base)"
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </HStack>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxW="container.xl" py="12">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing="6">
          <PremiumStatsCard
            title="Active Users"
            value="2,847"
            subtitle="이번 달"
            trend={{ type: "up", value: "+12%", period: "vs 지난달" }}
            icon={<BsPeople />}
            color="blue"
          />
          <PremiumStatsCard
            title="성공 매칭"
            value="1,293"
            subtitle="총 매칭 수"
            trend={{ type: "up", value: "+8%", period: "vs 지난달" }}
            icon={<BsHeart />}
            color="green"
          />
          <PremiumStatsCard
            title="만족도"
            value="4.8"
            subtitle="평균 평점"
            trend={{ type: "up", value: "+0.2", period: "vs 지난달" }}
            icon={<BsStarFill />}
            color="orange"
          />
          <PremiumStatsCard
            title="채팅 활성도"
            value="89%"
            subtitle="응답률"
            trend={{ type: "up", value: "+5%", period: "vs 지난달" }}
            icon={<BsChat />}
            color="red"
          />
        </SimpleGrid>
      </Container>

      {/* Search & Filter Section */}
      <Container maxW="container.xl" pb="8">
        <Box
          bg="var(--surface-primary)"
          border="1px solid var(--border-primary)"
          borderRadius="var(--radius-2xl)"
          p="6"
          boxShadow="var(--shadow-sm)"
        >
          <VStack spacing="4">
            <Text fontSize="lg" fontWeight="600" color="var(--text-primary)">
              완벽한 파트너를 찾아보세요
            </Text>

            <Grid
              templateColumns={{ base: "1fr", md: "2fr 1fr 1fr auto" }}
              gap="4"
              w="100%"
            >
              <GridItem>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BsSearch color="var(--text-tertiary)" />
                  </InputLeftElement>
                  <Input
                    placeholder="이름, 관심사로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    borderRadius="var(--radius-xl)"
                    border="1px solid var(--border-primary)"
                    _focus={{
                      borderColor: "var(--brand-primary)",
                      boxShadow: "var(--focus-ring)",
                    }}
                  />
                </InputGroup>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="지역 선택"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  borderRadius="var(--radius-xl)"
                  border="1px solid var(--border-primary)"
                  _focus={{
                    borderColor: "var(--brand-primary)",
                    boxShadow: "var(--focus-ring)",
                  }}
                >
                  <option value="서울특별시">서울특별시</option>
                  <option value="부산">부산</option>
                  <option value="인천">인천</option>
                </Select>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="음식 종류"
                  value={selectedFoodType}
                  onChange={(e) => setSelectedFoodType(e.target.value)}
                  borderRadius="var(--radius-xl)"
                  border="1px solid var(--border-primary)"
                  _focus={{
                    borderColor: "var(--brand-primary)",
                    boxShadow: "var(--focus-ring)",
                  }}
                >
                  <option value="한식">한식</option>
                  <option value="양식">양식</option>
                  <option value="중식">중식</option>
                  <option value="일식">일식</option>
                </Select>
              </GridItem>

              <GridItem>
                <Button
                  leftIcon={<BsFilter />}
                  borderRadius="var(--radius-xl)"
                  px="6"
                  bg="var(--brand-primary)"
                  color="white"
                  _hover={{ bg: "var(--brand-primary-700)" }}
                >
                  필터
                </Button>
              </GridItem>
            </Grid>
          </VStack>
        </Box>
      </Container>

      {/* Content Tabs */}
      <Container maxW="container.xl" pb="12">
        <Tabs index={tabIndex} onChange={setTabIndex} variant="soft-rounded">
          <TabList
            bg="var(--surface-primary)"
            p="1"
            borderRadius="var(--radius-xl)"
            border="1px solid var(--border-primary)"
            mb="8"
          >
            <Tab
              flex="1"
              borderRadius="var(--radius-lg)"
              fontWeight="500"
              _selected={{
                bg: "var(--brand-primary)",
                color: "white",
              }}
            >
              개인 사용자 ({filteredCustomers.length})
            </Tab>
            <Tab
              flex="1"
              borderRadius="var(--radius-lg)"
              fontWeight="500"
              _selected={{
                bg: "var(--brand-primary)",
                color: "white",
              }}
            >
              비즈니스 멘토 ({filteredBusiness.length})
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel p="0">
              {filteredCustomers.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
                  {filteredCustomers.map((customer, index) => (
                    <PremiumUserCard
                      key={`customer-${customer.doc_id || index}`}
                      user={customer}
                      variant={index % 3 === 0 ? "premium" : "default"}
                      onChat={(user) => navigate(`/chat/${user.user_email}`)}
                      onView={() => navigate("/matching", { state: { data: customer } })}
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py="20"
                  color="var(--text-secondary)"
                >
                  <Text fontSize="lg" fontWeight="500" mb="2">
                    검색 결과가 없습니다
                  </Text>
                  <Text fontSize="sm">
                    다른 검색 조건을 시도해보세요
                  </Text>
                </Flex>
              )}
            </TabPanel>

            <TabPanel p="0">
              {filteredBusiness.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
                  {filteredBusiness.map((business, index) => (
                    <PremiumUserCard
                      key={`business-${business.doc_id || index}`}
                      user={business}
                      variant="featured"
                      onChat={(user) => navigate(`/chat/${user.user_email}`)}
                      onView={() => navigate("/matching", { state: { data: business } })}
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  py="20"
                  color="var(--text-secondary)"
                >
                  <Text fontSize="lg" fontWeight="500" mb="2">
                    검색 결과가 없습니다
                  </Text>
                  <Text fontSize="sm">
                    다른 검색 조건을 시도해보세요
                  </Text>
                </Flex>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default PremiumHome;