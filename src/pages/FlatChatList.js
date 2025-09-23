import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Divider,
} from "@chakra-ui/react";
import {
  BsArrowLeft,
  BsSearch,
  BsThreeDotsVertical,
  BsCheck,
  BsCheckAll,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const FlatChatList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    // 임시 채팅 목록 데이터
    const mockChatList = [
      {
        id: "user1",
        name: "김미영",
        profile: "https://picsum.photos/100/100?random=10",
        lastMessage: "완벽해요! 그럼 토요일에 만나요 🍝",
        lastMessageTime: "오후 2:36",
        unreadCount: 0,
        isOnline: true,
        messageType: "text",
        isLastMessageMine: false,
        messageStatus: "read"
      },
      {
        id: "user2",
        name: "박준호",
        profile: "https://picsum.photos/100/100?random=11",
        lastMessage: "네 알겠습니다! 기대되네요 😊",
        lastMessageTime: "오후 1:45",
        unreadCount: 2,
        isOnline: false,
        lastSeen: "30분 전",
        messageType: "text",
        isLastMessageMine: true,
        messageStatus: "read"
      },
      {
        id: "user3",
        name: "이지영",
        profile: "https://picsum.photos/100/100?random=12",
        lastMessage: "사진",
        lastMessageTime: "오전 11:20",
        unreadCount: 1,
        isOnline: true,
        messageType: "image",
        isLastMessageMine: false,
        messageStatus: "delivered"
      },
      {
        id: "user4",
        name: "최서연",
        profile: "https://picsum.photos/100/100?random=13",
        lastMessage: "안녕하세요! 매칭 신청해주셔서 감사해요",
        lastMessageTime: "어제",
        unreadCount: 0,
        isOnline: false,
        lastSeen: "2시간 전",
        messageType: "text",
        isLastMessageMine: false,
        messageStatus: "read"
      },
      {
        id: "user5",
        name: "정민수",
        profile: "https://picsum.photos/100/100?random=14",
        lastMessage: "좋은 시간이었어요. 감사합니다!",
        lastMessageTime: "일요일",
        unreadCount: 0,
        isOnline: false,
        lastSeen: "1일 전",
        messageType: "text",
        isLastMessageMine: true,
        messageStatus: "read"
      }
    ];

    setChatList(mockChatList);
  }, []);

  const filteredChatList = chatList.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timeString) => {
    // 실제로는 타임스탬프를 처리하지만 여기서는 mock 데이터 그대로 사용
    return timeString;
  };

  const getMessagePreview = (chat) => {
    if (chat.messageType === "image") {
      return "📷 사진";
    }
    return chat.lastMessage;
  };

  const ChatItem = ({ chat }) => {
    return (
      <Box
        onClick={() => navigate(`/chat/${chat.id}`)}
        cursor="pointer"
        _hover={{ bg: "var(--neutral-50)" }}
        transition="background-color var(--transition-fast)"
      >
        <HStack
          spacing="3"
          p="4"
          align="start"
        >
          {/* 프로필 사진 */}
          <Box position="relative">
            <Avatar
              size="lg"
              src={chat.profile}
              name={chat.name}
            />
            {chat.isOnline && (
              <Box
                position="absolute"
                bottom="0"
                right="0"
                w="4"
                h="4"
                bg="var(--brand-success)"
                borderRadius="var(--radius-full)"
                border="2px solid var(--surface-primary)"
              />
            )}
          </Box>

          {/* 채팅 정보 */}
          <VStack flex="1" spacing="1" align="start">
            <HStack justify="space-between" w="100%">
              <Text
                fontSize="md"
                fontWeight="600"
                color="var(--text-primary)"
                noOfLines={1}
              >
                {chat.name}
              </Text>
              <HStack spacing="1">
                <Text
                  fontSize="xs"
                  color="var(--text-tertiary)"
                >
                  {formatTime(chat.lastMessageTime)}
                </Text>
                {chat.isLastMessageMine && (
                  <Box color={chat.messageStatus === "read" ? "var(--brand-primary)" : "var(--text-tertiary)"}>
                    {chat.messageStatus === "sent" && <BsCheck size="12px" />}
                    {(chat.messageStatus === "delivered" || chat.messageStatus === "read") && <BsCheckAll size="12px" />}
                  </Box>
                )}
              </HStack>
            </HStack>

            <HStack justify="space-between" w="100%" align="center">
              <Text
                fontSize="sm"
                color={chat.unreadCount > 0 ? "var(--text-primary)" : "var(--text-secondary)"}
                fontWeight={chat.unreadCount > 0 ? "500" : "normal"}
                noOfLines={1}
                flex="1"
              >
                {getMessagePreview(chat)}
              </Text>

              {chat.unreadCount > 0 && (
                <Badge
                  bg="var(--brand-error)"
                  color="var(--text-inverse)"
                  borderRadius="var(--radius-full)"
                  fontSize="xs"
                  minW="20px"
                  h="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                </Badge>
              )}
            </HStack>

            {!chat.isOnline && chat.lastSeen && (
              <Text fontSize="xs" color="var(--text-tertiary)">
                {chat.lastSeen}
              </Text>
            )}
          </VStack>
        </HStack>
        <Divider borderColor="var(--border-secondary)" />
      </Box>
    );
  };

  return (
    <Box bg="var(--surface-secondary)" minH="100vh">
      {/* 헤더 */}
      <Box
        bg="var(--surface-primary)"
        borderBottom="1px solid var(--border-primary)"
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Container maxW="container.md" py="0">
          <HStack justify="space-between" py="4">
            <HStack spacing="3">
              <IconButton
                variant="ghost"
                size="md"
                icon={<BsArrowLeft />}
                aria-label="뒤로가기"
                onClick={() => navigate(-1)}
                color="var(--text-secondary)"
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
              />
              <Text fontSize="xl" fontWeight="700" color="var(--text-primary)">
                채팅
              </Text>
            </HStack>

            <IconButton
              variant="ghost"
              size="md"
              icon={<BsThreeDotsVertical />}
              aria-label="더보기"
              color="var(--text-secondary)"
              bg="transparent"
              _hover={{ bg: "var(--neutral-100)" }}
              borderRadius="var(--radius-md)"
            />
          </HStack>
        </Container>
      </Box>

      <Container maxW="container.md" py="0">
        {/* 검색 */}
        <Box p="4">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BsSearch color="var(--text-tertiary)" />
            </InputLeftElement>
            <Input
              placeholder="이름으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="var(--surface-primary)"
              border="1px solid var(--border-primary)"
              borderRadius="var(--radius-lg)"
              fontSize="sm"
              _placeholder={{ color: "var(--text-tertiary)" }}
              _focus={{
                borderColor: "var(--brand-primary)",
                outline: "none",
              }}
            />
          </InputGroup>
        </Box>

        {/* 채팅 목록 */}
        <Box bg="var(--surface-primary)" borderRadius="var(--radius-lg)" overflow="hidden" mx="4" mb="4">
          {filteredChatList.length > 0 ? (
            <VStack spacing="0" align="stretch">
              {filteredChatList.map((chat, index) => (
                <ChatItem key={chat.id} chat={chat} />
              ))}
            </VStack>
          ) : (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py="20"
              color="var(--text-secondary)"
            >
              {searchQuery ? (
                <>
                  <Text fontSize="lg" fontWeight="500" mb="2">
                    검색 결과가 없습니다
                  </Text>
                  <Text fontSize="sm">
                    다른 이름으로 검색해보세요
                  </Text>
                </>
              ) : (
                <>
                  <Text fontSize="lg" fontWeight="500" mb="2">
                    아직 채팅이 없습니다
                  </Text>
                  <Text fontSize="sm" textAlign="center" maxW="300px">
                    새로운 밥친구와 매칭하여 첫 대화를 시작해보세요!
                  </Text>
                </>
              )}
            </Flex>
          )}
        </Box>

        {/* 통계 */}
        {filteredChatList.length > 0 && (
          <Box p="4">
            <HStack justify="center" spacing="6">
              <VStack spacing="1">
                <Text fontSize="lg" fontWeight="700" color="var(--brand-primary)">
                  {filteredChatList.length}
                </Text>
                <Text fontSize="xs" color="var(--text-secondary)">
                  총 채팅
                </Text>
              </VStack>
              <VStack spacing="1">
                <Text fontSize="lg" fontWeight="700" color="var(--brand-error)">
                  {filteredChatList.reduce((sum, chat) => sum + chat.unreadCount, 0)}
                </Text>
                <Text fontSize="xs" color="var(--text-secondary)">
                  읽지 않음
                </Text>
              </VStack>
              <VStack spacing="1">
                <Text fontSize="lg" fontWeight="700" color="var(--brand-success)">
                  {filteredChatList.filter(chat => chat.isOnline).length}
                </Text>
                <Text fontSize="xs" color="var(--text-secondary)">
                  온라인
                </Text>
              </VStack>
            </HStack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FlatChatList;