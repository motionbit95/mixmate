import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Container,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  BsBell,
  BsSearch,
  BsGrid3X3Gap,
  BsPerson,
  BsGear,
  BsBoxArrowRight,
  BsList,
  BsChat,
  BsHeart,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getLikedUsersCount } from "../js/LikeService";

export const PremiumHeader = ({
  user,
  alarmCount = 0,
  onSearch,
  showSearch = true
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      {/* Premium Header */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="var(--z-index-sticky)"
        className="glass-effect"
        borderBottom="1px solid"
        borderColor="var(--border-secondary)"
      >
        <Container maxW="container.xl" px={{ base: "4", md: "6" }}>
          <Flex h="72px" align="center" justify="space-between">
            {/* Left Section - Logo & Navigation */}
            <HStack spacing="6">
              {/* Mobile Menu Button */}
              <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="ghost"
                size="md"
                icon={<BsList size="24px" />}
                aria-label="메뉴 열기"
                color="var(--text-primary)"
                _hover={{ bg: "var(--neutral-100)" }}
              />

              {/* Logo */}
              <Flex align="center" cursor="pointer" onClick={() => navigate("/")}>
                <Text
                  fontSize="2xl"
                  fontWeight="800"
                  className="gradient-primary"
                  bgClip="text"
                  color="transparent"
                  letterSpacing="-0.025em"
                >
                  Choppi
                </Text>
                <Badge
                  ml="2"
                  colorScheme="blue"
                  variant="subtle"
                  borderRadius="full"
                  px="2"
                  fontSize="xs"
                  fontWeight="600"
                >
                  Pro
                </Badge>
              </Flex>

              {/* Desktop Navigation */}
              <HStack spacing="1" display={{ base: "none", md: "flex" }}>
                <Button
                  variant="ghost"
                  size="sm"
                  fontWeight="500"
                  color="var(--text-primary)"
                  _hover={{ bg: "var(--neutral-100)" }}
                  onClick={() => navigate("/")}
                >
                  홈
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fontWeight="500"
                  color="var(--text-primary)"
                  _hover={{ bg: "var(--neutral-100)" }}
                  onClick={() => navigate("/matching")}
                >
                  매칭
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fontWeight="500"
                  color="var(--text-primary)"
                  _hover={{ bg: "var(--neutral-100)" }}
                  onClick={() => navigate("/favorites")}
                  position="relative"
                >
                  찜
                  {getLikedUsersCount() > 0 && (
                    <Badge
                      position="absolute"
                      top="-1"
                      right="-1"
                      bg="var(--brand-error)"
                      color="white"
                      borderRadius="full"
                      fontSize="xs"
                      minW="18px"
                      h="18px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {getLikedUsersCount()}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fontWeight="500"
                  color="var(--text-primary)"
                  _hover={{ bg: "var(--neutral-100)" }}
                  onClick={() => navigate("/chat-list")}
                >
                  채팅
                </Button>
              </HStack>
            </HStack>

            {/* Center Section - Search */}
            {showSearch && (
              <Box
                display={{ base: "none", lg: "block" }}
                flex="1"
                maxW="400px"
                mx="8"
              >
                <form onSubmit={handleSearch}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <BsSearch color="var(--text-tertiary)" />
                    </InputLeftElement>
                    <Input
                      placeholder="사람, 장소, 음식 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      bg="var(--surface-primary)"
                      border="1px solid"
                      borderColor="var(--border-primary)"
                      borderRadius="var(--radius-xl)"
                      fontSize="sm"
                      _placeholder={{ color: "var(--text-tertiary)" }}
                      _focus={{
                        borderColor: "var(--brand-primary)",
                        boxShadow: "var(--focus-ring)",
                      }}
                    />
                  </InputGroup>
                </form>
              </Box>
            )}

            {/* Right Section - Actions & Profile */}
            <HStack spacing="2">
              {/* Search Button (Mobile) */}
              <IconButton
                display={{ base: "flex", lg: "none" }}
                variant="ghost"
                size="md"
                icon={<BsSearch size="20px" />}
                aria-label="검색"
                color="var(--text-secondary)"
                _hover={{
                  bg: "var(--neutral-100)",
                  color: "var(--text-primary)"
                }}
              />

              {/* Notifications */}
              <Box position="relative">
                <IconButton
                  onClick={() => navigate("/notice")}
                  variant="ghost"
                  size="md"
                  icon={<BsBell size="20px" />}
                  aria-label="알림"
                  color="var(--text-secondary)"
                  className="interactive-scale"
                  _hover={{
                    bg: "var(--neutral-100)",
                    color: "var(--text-primary)"
                  }}
                />
                {alarmCount > 0 && (
                  <Flex
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    minW="20px"
                    h="20px"
                    bg="var(--brand-error)"
                    color="var(--text-inverse)"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="600"
                    align="center"
                    justify="center"
                    boxShadow="var(--shadow-sm)"
                  >
                    {alarmCount > 99 ? "99+" : alarmCount}
                  </Flex>
                )}
              </Box>

              {/* Quick Actions */}
              <IconButton
                display={{ base: "none", md: "flex" }}
                variant="ghost"
                size="md"
                icon={<BsGrid3X3Gap size="20px" />}
                aria-label="더보기"
                color="var(--text-secondary)"
                _hover={{
                  bg: "var(--neutral-100)",
                  color: "var(--text-primary)"
                }}
              />

              {/* Profile Menu */}
              <Menu>
                <MenuButton>
                  <Avatar
                    size="md"
                    src={user?.user_profile}
                    name={user?.user_name || "사용자"}
                    bg="var(--brand-primary)"
                    color="var(--text-inverse)"
                    cursor="pointer"
                    className="interactive-scale"
                    border="2px solid"
                    borderColor="var(--surface-primary)"
                    boxShadow="var(--shadow-sm)"
                  />
                </MenuButton>
                <MenuList
                  bg="var(--surface-primary)"
                  border="1px solid"
                  borderColor="var(--border-primary)"
                  borderRadius="var(--radius-xl)"
                  boxShadow="var(--shadow-lg)"
                  py="2"
                  minW="200px"
                >
                  <VStack spacing="1" px="3" py="2" align="start">
                    <Text fontWeight="600" color="var(--text-primary)">
                      {user?.user_name || "사용자"}
                    </Text>
                    <Text fontSize="sm" color="var(--text-secondary)">
                      {user?.user_email || "이메일 없음"}
                    </Text>
                  </VStack>
                  <MenuDivider borderColor="var(--border-secondary)" />
                  <MenuItem
                    icon={<BsPerson />}
                    onClick={() => navigate("/mypage")}
                    _hover={{ bg: "var(--neutral-50)" }}
                  >
                    내 프로필
                  </MenuItem>
                  <MenuItem
                    icon={<BsChat />}
                    onClick={() => navigate("/chat-list")}
                    _hover={{ bg: "var(--neutral-50)" }}
                  >
                    채팅 목록
                  </MenuItem>
                  <MenuItem
                    icon={<BsHeart />}
                    onClick={() => navigate("/favorites")}
                    _hover={{ bg: "var(--neutral-50)" }}
                  >
                    찜한 사용자 ({getLikedUsersCount()})
                  </MenuItem>
                  <MenuDivider borderColor="var(--border-secondary)" />
                  <MenuItem
                    icon={<BsGear />}
                    _hover={{ bg: "var(--neutral-50)" }}
                  >
                    설정
                  </MenuItem>
                  <MenuItem
                    icon={<BsBoxArrowRight />}
                    color="var(--brand-error)"
                    _hover={{ bg: "var(--neutral-50)" }}
                  >
                    로그아웃
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="var(--surface-primary)">
          <DrawerCloseButton />
          <DrawerBody pt="16">
            <VStack spacing="4" align="stretch">
              <Text fontSize="lg" fontWeight="600" color="var(--text-primary)">
                메뉴
              </Text>
              <Button
                variant="ghost"
                justifyContent="start"
                onClick={() => {
                  navigate("/");
                  onClose();
                }}
              >
                홈
              </Button>
              <Button
                variant="ghost"
                justifyContent="start"
                onClick={() => {
                  navigate("/matching");
                  onClose();
                }}
              >
                매칭
              </Button>
              <Button
                variant="ghost"
                justifyContent="start"
                onClick={() => {
                  navigate("/favorites");
                  onClose();
                }}
                position="relative"
              >
                찜한 사용자
                {getLikedUsersCount() > 0 && (
                  <Badge
                    ml="2"
                    bg="var(--brand-error)"
                    color="white"
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {getLikedUsersCount()}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                justifyContent="start"
                onClick={() => {
                  navigate("/chat-list");
                  onClose();
                }}
              >
                채팅
              </Button>
              <Button
                variant="ghost"
                justifyContent="start"
                onClick={() => {
                  navigate("/mypage");
                  onClose();
                }}
              >
                내 프로필
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PremiumHeader;