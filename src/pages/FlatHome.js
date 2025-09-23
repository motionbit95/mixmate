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
  SimpleGrid,
} from "@chakra-ui/react";
import {
  BsSearch,
  BsFilter,
  BsGeoAlt,
  BsPeople,
  BsChat,
  BsHeart,
  BsStar,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { auth } from "../db/firebase_config";
import { get_doc_all } from "../js/MockDatabase";
import { FlatHeader } from "../component/FlatHeader";
import { FlatUserCard } from "../component/FlatUserCard";

export const FlatHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [businessList, setBusinessList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

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
        <FlatHeader user={user} onSearch={handleSearch} />
        <Container maxW="container.xl" pt="100px">
          <VStack spacing="8">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6" w="100%">
              {[...Array(6)].map((_, i) => (
                <Box
                  key={i}
                  h="400px"
                  bg="var(--neutral-200)"
                  borderRadius="var(--radius-lg)"
                  border="1px solid var(--border-primary)"
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
      <FlatHeader
        user={user}
        alarmCount={0}
        onSearch={handleSearch}
      />

      {/* Hero Section */}
      <Box pt="80px">
        <Container maxW="container.xl" py="8">
          <Box
            bg="var(--brand-primary)"
            color="var(--text-inverse)"
            borderRadius="var(--radius-lg)"
            p="8"
            mb="8"
          >
            <VStack spacing="4" align="start" maxW="600px">
              <Badge
                bg="rgba(255, 255, 255, 0.2)"
                color="var(--text-inverse)"
                px="3"
                py="1"
                borderRadius="var(--radius-md)"
                fontSize="sm"
                fontWeight="500"
              >
                Premium Experience
              </Badge>

              <Text
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="700"
                lineHeight="1.2"
                className="text-heading-1"
              >
                AI 기반 스마트 매칭
              </Text>

              <Text
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.6"
                maxW="500px"
              >
                취향과 위치를 분석하여 완벽한 식사 파트너를 찾아드립니다
              </Text>

              <Button
                size="lg"
                bg="var(--surface-primary)"
                color="var(--brand-primary)"
                px="8"
                py="6"
                borderRadius="var(--radius-md)"
                fontWeight="600"
                _hover={{
                  bg: "var(--neutral-100)",
                }}
                onClick={() => navigate("/matching")}
              >
                매칭 시작하기
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxW="container.xl" py="8">
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing="6">
          <Box
            bg="var(--surface-primary)"
            border="1px solid var(--border-primary)"
            borderRadius="var(--radius-lg)"
            p="6"
          >
            <VStack spacing="3" align="start">
              <HStack justify="space-between" w="100%">
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                >
                  Active Users
                </Text>
                <Box
                  w="10"
                  h="10"
                  bg="var(--brand-primary)"
                  color="var(--text-inverse)"
                  borderRadius="var(--radius-md)"
                  display="flex"
                  align="center"
                  justify="center"
                >
                  <BsPeople />
                </Box>
              </HStack>
              <Text
                fontSize="2xl"
                fontWeight="700"
                color="var(--brand-primary)"
                lineHeight="1"
              >
                2,847
              </Text>
              <Text fontSize="sm" color="var(--text-secondary)">
                이번 달
              </Text>
            </VStack>
          </Box>

          <Box
            bg="var(--surface-primary)"
            border="1px solid var(--border-primary)"
            borderRadius="var(--radius-lg)"
            p="6"
          >
            <VStack spacing="3" align="start">
              <HStack justify="space-between" w="100%">
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                >
                  성공 매칭
                </Text>
                <Box
                  w="10"
                  h="10"
                  bg="var(--brand-success)"
                  color="var(--text-inverse)"
                  borderRadius="var(--radius-md)"
                  display="flex"
                  align="center"
                  justify="center"
                >
                  <BsHeart />
                </Box>
              </HStack>
              <Text
                fontSize="2xl"
                fontWeight="700"
                color="var(--brand-success)"
                lineHeight="1"
              >
                1,293
              </Text>
              <Text fontSize="sm" color="var(--text-secondary)">
                총 매칭 수
              </Text>
            </VStack>
          </Box>

          <Box
            bg="var(--surface-primary)"
            border="1px solid var(--border-primary)"
            borderRadius="var(--radius-lg)"
            p="6"
          >
            <VStack spacing="3" align="start">
              <HStack justify="space-between" w="100%">
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                >
                  만족도
                </Text>
                <Box
                  w="10"
                  h="10"
                  bg="var(--brand-warning)"
                  color="var(--text-inverse)"
                  borderRadius="var(--radius-md)"
                  display="flex"
                  align="center"
                  justify="center"
                >
                  <BsStar />
                </Box>
              </HStack>
              <Text
                fontSize="2xl"
                fontWeight="700"
                color="var(--brand-warning)"
                lineHeight="1"
              >
                4.8
              </Text>
              <Text fontSize="sm" color="var(--text-secondary)">
                평균 평점
              </Text>
            </VStack>
          </Box>

          <Box
            bg="var(--surface-primary)"
            border="1px solid var(--border-primary)"
            borderRadius="var(--radius-lg)"
            p="6"
          >
            <VStack spacing="3" align="start">
              <HStack justify="space-between" w="100%">
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color="var(--text-secondary)"
                  textTransform="uppercase"
                >
                  채팅 활성도
                </Text>
                <Box
                  w="10"
                  h="10"
                  bg="var(--brand-error)"
                  color="var(--text-inverse)"
                  borderRadius="var(--radius-md)"
                  display="flex"
                  align="center"
                  justify="center"
                >
                  <BsChat />
                </Box>
              </HStack>
              <Text
                fontSize="2xl"
                fontWeight="700"
                color="var(--brand-error)"
                lineHeight="1"
              >
                89%
              </Text>
              <Text fontSize="sm" color="var(--text-secondary)">
                응답률
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>

      {/* Search & Filter Section */}
      <Container maxW="container.xl" pb="8">
        <Box
          bg="var(--surface-primary)"
          border="1px solid var(--border-primary)"
          borderRadius="var(--radius-lg)"
          p="6"
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
                    borderRadius="var(--radius-md)"
                    border="1px solid var(--border-primary)"
                    _focus={{
                      borderColor: "var(--brand-primary)",
                    }}
                  />
                </InputGroup>
              </GridItem>

              <GridItem>
                <Select
                  placeholder="지역 선택"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  borderRadius="var(--radius-md)"
                  border="1px solid var(--border-primary)"
                  _focus={{
                    borderColor: "var(--brand-primary)",
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
                  borderRadius="var(--radius-md)"
                  border="1px solid var(--border-primary)"
                  _focus={{
                    borderColor: "var(--brand-primary)",
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
                  borderRadius="var(--radius-md)"
                  px="6"
                  bg="var(--brand-primary)"
                  color="var(--text-inverse)"
                  _hover={{ bg: "var(--brand-primary-dark)" }}
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
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList
            bg="var(--surface-primary)"
            border="1px solid var(--border-primary)"
            borderRadius="var(--radius-md)"
            mb="8"
          >
            <Tab
              flex="1"
              borderRadius="0"
              fontWeight="500"
              _selected={{
                bg: "var(--brand-primary)",
                color: "var(--text-inverse)",
              }}
            >
              개인 사용자 ({filteredCustomers.length})
            </Tab>
            <Tab
              flex="1"
              borderRadius="0"
              fontWeight="500"
              _selected={{
                bg: "var(--brand-primary)",
                color: "var(--text-inverse)",
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
                    <FlatUserCard
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
                    <FlatUserCard
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

export default FlatHome;