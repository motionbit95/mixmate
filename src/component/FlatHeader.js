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
  BsPerson,
  BsGear,
  BsBoxArrowRight,
  BsList,
  BsChat,
  BsHeart,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getLikedUsersCount } from "../js/LikeService";

export const FlatHeader = ({
  user,
  alarmCount = 0,
  onSearch,
  showSearch = true
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      onSearch?.(searchQuery);
    }
  };

  return (
    <>
      <Box
        bg="var(--surface-primary)"
        border="0"
        borderBottom="2px solid var(--border-primary)"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="1000"
      >
        <Container maxW="container.xl" py="3">
          <Flex align="center" justify="space-between">
            {/* Left Section - Logo & Navigation */}
            <HStack spacing="6">
              {/* Mobile Menu Button */}
              <IconButton
                display={{ base: "flex", md: "none" }}
                variant="ghost"
                size="md"
                icon={<BsList size="20px" />}
                aria-label="메뉴"
                onClick={onOpen}
                color="var(--text-primary)"
                _hover={{ bg: "var(--neutral-100)" }}
              />

              {/* Logo */}
              <Flex align="center">
                <Text
                  fontSize="2xl"
                  fontWeight="700"
                  color="var(--brand-primary)"
                  className="text-heading-2"
                >
                  Choppi
                </Text>
              </Flex>

              {/* Desktop Navigation */}
              <HStack spacing="1" display={{ base: "none", md: "flex" }}>
                <Button
                  variant="ghost"
                  size="sm"
                  fontWeight="500"
                  color="var(--text-primary)"
                  bg="transparent"
                  _hover={{ bg: "var(--neutral-100)" }}
                  onClick={() => navigate("/")}
                  borderRadius="var(--radius-md)"
                >
                  홈
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fontWeight="500"
                  color="var(--text-primary)"
                  bg="transparent"
                  _hover={{ bg: "var(--neutral-100)" }}
                  onClick={() => navigate("/matching")}
                  borderRadius="var(--radius-md)"
                >
                  매칭
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fontWeight="500"
                  color="var(--text-primary)"
                  bg="transparent"
                  _hover={{ bg: "var(--neutral-100)" }}
                  onClick={() => navigate("/favorites")}
                  position="relative"
                  borderRadius="var(--radius-md)"
                >
                  찜
                  {getLikedUsersCount() > 0 && (
                    <Badge
                      position="absolute"
                      top="-1"
                      right="-1"
                      bg="var(--brand-error)"
                      color="var(--text-inverse)"
                      borderRadius="var(--radius-full)"
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
                  bg="transparent"
                  _hover={{ bg: "var(--neutral-100)" }}
                  onClick={() => navigate("/chat-list")}
                  borderRadius="var(--radius-md)"
                >
                  채팅
                </Button>
              </HStack>
            </HStack>

            {/* Center Section - Search */}
            {showSearch && (
              <Box
                flex="1"
                maxW="400px"
                mx="6"
                display={{ base: "none", lg: "block" }}
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BsSearch color="var(--text-tertiary)" />
                  </InputLeftElement>
                  <Input
                    placeholder="사용자 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearch}
                    bg="var(--surface-primary)"
                    border="1px solid var(--border-primary)"
                    borderRadius="var(--radius-md)"
                    fontSize="sm"
                    _placeholder={{ color: "var(--text-tertiary)" }}
                    _focus={{
                      borderColor: "var(--brand-primary)",
                      outline: "none",
                    }}
                  />
                </InputGroup>
              </Box>
            )}

            {/* Right Section - Actions & Profile */}
            <HStack spacing="3">
              {/* Notifications */}
              <Box position="relative">
                <IconButton
                  variant="ghost"
                  size="md"
                  icon={<BsBell size="18px" />}
                  aria-label="알림"
                  color="var(--text-secondary)"
                  bg="transparent"
                  _hover={{
                    bg: "var(--neutral-100)",
                    color: "var(--text-primary)"
                  }}
                  borderRadius="var(--radius-md)"
                />
                {alarmCount > 0 && (
                  <Flex
                    position="absolute"
                    top="-1"
                    right="-1"
                    w="6"
                    h="6"
                    bg="var(--brand-error)"
                    color="var(--text-inverse)"
                    borderRadius="var(--radius-full)"
                    fontSize="xs"
                    fontWeight="600"
                    align="center"
                    justify="center"
                  >
                    {alarmCount > 99 ? "99+" : alarmCount}
                  </Flex>
                )}
              </Box>

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
                    border="2px solid var(--border-primary)"
                  />
                </MenuButton>
                <MenuList
                  bg="var(--surface-primary)"
                  border="1px solid var(--border-primary)"
                  borderRadius="var(--radius-lg)"
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
                    bg="transparent"
                  >
                    내 프로필
                  </MenuItem>
                  <MenuItem
                    icon={<BsChat />}
                    onClick={() => navigate("/chat-list")}
                    _hover={{ bg: "var(--neutral-50)" }}
                    bg="transparent"
                  >
                    채팅 목록
                  </MenuItem>
                  <MenuItem
                    icon={<BsHeart />}
                    onClick={() => navigate("/favorites")}
                    _hover={{ bg: "var(--neutral-50)" }}
                    bg="transparent"
                  >
                    찜한 사용자 ({getLikedUsersCount()})
                  </MenuItem>
                  <MenuDivider borderColor="var(--border-secondary)" />
                  <MenuItem
                    icon={<BsGear />}
                    _hover={{ bg: "var(--neutral-50)" }}
                    bg="transparent"
                  >
                    설정
                  </MenuItem>
                  <MenuItem
                    icon={<BsBoxArrowRight />}
                    color="var(--brand-error)"
                    _hover={{ bg: "var(--neutral-50)" }}
                    bg="transparent"
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
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
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
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
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
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
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
                    color="var(--text-inverse)"
                    borderRadius="var(--radius-full)"
                    fontSize="xs"
                  >
                    {getLikedUsersCount()}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                justifyContent="start"
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
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
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
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

export default FlatHeader;