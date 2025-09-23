import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Flex,
  IconButton,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { BsArrowLeft, BsHeart, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FlatUserCard } from "../component/FlatUserCard";
import { getLikedUsers, clearAllLikes, toggleLike } from "../js/LikeService";

export const Favorites = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLikedUsers();
  }, []);

  const loadLikedUsers = () => {
    try {
      const users = getLikedUsers();
      setLikedUsers(users);
    } catch (error) {
      console.error("찜 목록 로드 오류:", error);
      toast({
        title: "오류",
        description: "찜 목록을 불러오는데 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = (user) => {
    try {
      toggleLike(user);
      setLikedUsers(prev => prev.filter(u => u.doc_id !== user.doc_id));

      toast({
        title: "찜 해제",
        description: `${user.user_name}님을 찜 목록에서 제거했습니다.`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("찜 해제 오류:", error);
      toast({
        title: "오류",
        description: "찜 해제에 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClearAll = () => {
    try {
      clearAllLikes();
      setLikedUsers([]);

      toast({
        title: "전체 삭제",
        description: "모든 찜 목록이 삭제되었습니다.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("전체 삭제 오류:", error);
      toast({
        title: "오류",
        description: "찜 목록 삭제에 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box bg="var(--surface-secondary)" minH="100vh">
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
      <Container maxW="container.xl" py="8">
        {/* Header */}
        <VStack spacing="6" mb="8">
          <HStack w="100%" justify="space-between" align="center">
            <HStack spacing="4">
              <IconButton
                variant="ghost"
                size="lg"
                icon={<BsArrowLeft />}
                aria-label="뒤로가기"
                onClick={() => navigate(-1)}
                color="var(--text-secondary)"
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
              />
              <VStack align="start" spacing="1">
                <HStack spacing="2">
                  <Text
                    fontSize="2xl"
                    fontWeight="700"
                    color="var(--text-primary)"
                  >
                    찜한 사용자
                  </Text>
                  <Badge
                    bg="var(--brand-primary)"
                    color="var(--text-inverse)"
                    borderRadius="var(--radius-sm)"
                    px="2"
                    py="1"
                    fontSize="sm"
                  >
                    {likedUsers.length}
                  </Badge>
                </HStack>
                <Text fontSize="sm" color="var(--text-secondary)">
                  관심있는 사용자들을 모아보세요
                </Text>
              </VStack>
            </HStack>

            {likedUsers.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                leftIcon={<BsTrash />}
                colorScheme="red"
                onClick={handleClearAll}
              >
                전체 삭제
              </Button>
            )}
          </HStack>
        </VStack>

        {/* Content */}
        {likedUsers.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            py="20"
            color="var(--text-secondary)"
          >
            <Box
              w="20"
              h="20"
              bg="var(--neutral-100)"
              borderRadius="full"
              display="flex"
              align="center"
              justify="center"
              mb="6"
            >
              <BsHeart size="40px" color="var(--neutral-400)" />
            </Box>
            <Text fontSize="lg" fontWeight="600" mb="2" textAlign="center">
              아직 찜한 사용자가 없습니다
            </Text>
            <Text fontSize="sm" textAlign="center" mb="6" maxW="300px">
              관심있는 사용자에게 하트를 눌러 찜 목록에 추가해보세요
            </Text>
            <Button
              bg="var(--brand-primary)"
              color="white"
              _hover={{ bg: "var(--brand-primary-700)" }}
              onClick={() => navigate("/")}
            >
              사용자 둘러보기
            </Button>
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
            {likedUsers.map((user, index) => (
              <FlatUserCard
                key={`liked-${user.doc_id}-${index}`}
                user={user}
                variant="premium"
                isLiked={true}
                onLike={() => handleUnlike(user)}
                onChat={(user) => navigate(`/chat/${user.user_email}`)}
                onView={() => navigate("/matching", { state: { data: user } })}
              />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default Favorites;