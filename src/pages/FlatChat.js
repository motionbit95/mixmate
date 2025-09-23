import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Avatar,
  Flex,
  Image,
  Badge,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import {
  BsArrowLeft,
  BsThreeDotsVertical,
  BsSend,
  BsPlus,
  BsImage,
  BsCamera,
  BsEmojiSmile,
  BsCheck,
  BsCheckAll,
  BsTelephone,
  BsInfoCircle,
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

export const FlatChat = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 채팅 상대방 정보 (실제로는 props나 API에서 가져올 것)
  const chatPartner = {
    id: userId || "demo_user",
    name: "김미영",
    profile: "https://picsum.photos/100/100?random=10",
    isOnline: true,
    lastSeen: "방금 전"
  };

  // 임시 채팅 데이터
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        text: "안녕하세요! 매칭 신청해주셔서 감사해요 😊",
        sender: "other",
        time: "오후 2:30",
        status: "read",
        timestamp: new Date(Date.now() - 1000 * 60 * 30)
      },
      {
        id: 2,
        text: "안녕하세요! 저도 반가워요. 언제 만나볼까요?",
        sender: "me",
        time: "오후 2:32",
        status: "read",
        timestamp: new Date(Date.now() - 1000 * 60 * 28)
      },
      {
        id: 3,
        text: "이번 주말에 어떠세요? 강남 쪽에 맛있는 이탈리안 레스토랑 알고 있어요!",
        sender: "other",
        time: "오후 2:33",
        status: "read",
        timestamp: new Date(Date.now() - 1000 * 60 * 27)
      },
      {
        id: 4,
        text: "좋아요! 토요일 저녁 7시는 어떠신가요?",
        sender: "me",
        time: "오후 2:35",
        status: "read",
        timestamp: new Date(Date.now() - 1000 * 60 * 25)
      },
      {
        id: 5,
        text: "완벽해요! 그럼 토요일에 만나요 🍝",
        sender: "other",
        time: "오후 2:36",
        status: "read",
        timestamp: new Date(Date.now() - 1000 * 60 * 24)
      },
      {
        id: 6,
        image: "https://picsum.photos/300/200?random=food",
        text: "미리 메뉴 사진도 공유해드릴게요!",
        sender: "other",
        time: "오후 2:37",
        status: "read",
        timestamp: new Date(Date.now() - 1000 * 60 * 23)
      }
    ];
    setMessages(mockMessages);
  }, []);

  // 메시지 전송
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "me",
        time: new Date().toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }),
        status: "sent",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage("");

      // 상대방 타이핑 시뮬레이션
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          // 상대방 응답 시뮬레이션
          const responses = [
            "네 알겠습니다!",
            "좋아요 👍",
            "기대되네요!",
            "그렇게 해요 😊"
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];

          const responseMessage = {
            id: messages.length + 2,
            text: randomResponse,
            sender: "other",
            time: new Date().toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            }),
            status: "read",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, responseMessage]);
        }, 2000);
      }, 1000);
    }
  };

  // 스크롤을 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 메시지 컴포넌트
  const MessageBubble = ({ message: msg }) => {
    const isMe = msg.sender === "me";

    return (
      <Flex
        justify={isMe ? "flex-end" : "flex-start"}
        mb="3"
        align="flex-end"
      >
        {!isMe && (
          <Avatar
            size="sm"
            src={chatPartner.profile}
            name={chatPartner.name}
            mr="2"
          />
        )}

        <VStack spacing="1" align={isMe ? "flex-end" : "flex-start"} maxW="70%">
          {msg.image && (
            <Box
              borderRadius="var(--radius-lg)"
              overflow="hidden"
              border="1px solid var(--border-primary)"
              mb="1"
            >
              <Image
                src={msg.image}
                alt="공유 이미지"
                maxW="250px"
                cursor="pointer"
                onClick={() => {
                  // 이미지 확대 보기 구현
                }}
              />
            </Box>
          )}

          {msg.text && (
            <Box
              bg={isMe ? "var(--brand-primary)" : "var(--surface-primary)"}
              color={isMe ? "var(--text-inverse)" : "var(--text-primary)"}
              px="4"
              py="2"
              borderRadius="var(--radius-lg)"
              border={!isMe ? "1px solid var(--border-primary)" : "none"}
              maxW="100%"
              wordBreak="break-word"
            >
              <Text fontSize="sm" lineHeight="1.4">
                {msg.text}
              </Text>
            </Box>
          )}

          <HStack spacing="1" fontSize="xs" color="var(--text-tertiary)">
            <Text>{msg.time}</Text>
            {isMe && (
              <Box color={msg.status === "read" ? "var(--brand-primary)" : "var(--text-tertiary)"}>
                {msg.status === "sent" && <BsCheck />}
                {msg.status === "delivered" && <BsCheckAll />}
                {msg.status === "read" && <BsCheckAll />}
              </Box>
            )}
          </HStack>
        </VStack>
      </Flex>
    );
  };

  return (
    <Box bg="var(--surface-secondary)" minH="100vh" display="flex" flexDirection="column">
      {/* 채팅 헤더 */}
      <Box
        bg="var(--surface-primary)"
        borderBottom="1px solid var(--border-primary)"
        px="4"
        py="3"
        position="sticky"
        top="0"
        zIndex="10"
      >
        <HStack justify="space-between">
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

            <HStack spacing="3" cursor="pointer" onClick={() => navigate("/matching", { state: { data: chatPartner } })}>
              <Box position="relative">
                <Avatar
                  size="md"
                  src={chatPartner.profile}
                  name={chatPartner.name}
                />
                {chatPartner.isOnline && (
                  <Box
                    position="absolute"
                    bottom="0"
                    right="0"
                    w="3"
                    h="3"
                    bg="var(--brand-success)"
                    borderRadius="var(--radius-full)"
                    border="2px solid var(--surface-primary)"
                  />
                )}
              </Box>

              <VStack spacing="0" align="start">
                <Text fontSize="md" fontWeight="600" color="var(--text-primary)">
                  {chatPartner.name}
                </Text>
                <Text fontSize="xs" color="var(--text-tertiary)">
                  {chatPartner.isOnline ? "온라인" : chatPartner.lastSeen}
                </Text>
              </VStack>
            </HStack>
          </HStack>

          <HStack spacing="2">
            <IconButton
              variant="ghost"
              size="md"
              icon={<BsTelephone />}
              aria-label="전화걸기"
              color="var(--text-secondary)"
              bg="transparent"
              _hover={{ bg: "var(--neutral-100)" }}
              borderRadius="var(--radius-md)"
              onClick={() => {
                toast({
                  title: "기능 준비중",
                  description: "음성 통화 기능은 곧 업데이트됩니다!",
                  status: "info",
                  duration: 2000,
                });
              }}
            />

            <Menu>
              <MenuButton
                as={IconButton}
                variant="ghost"
                size="md"
                icon={<BsThreeDotsVertical />}
                aria-label="더보기"
                color="var(--text-secondary)"
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
              />
              <MenuList
                bg="var(--surface-primary)"
                border="1px solid var(--border-primary)"
                borderRadius="var(--radius-lg)"
              >
                <MenuItem
                  icon={<BsInfoCircle />}
                  onClick={() => navigate("/matching", { state: { data: chatPartner } })}
                  bg="transparent"
                  _hover={{ bg: "var(--neutral-50)" }}
                >
                  프로필 보기
                </MenuItem>
                <MenuItem
                  color="var(--brand-error)"
                  bg="transparent"
                  _hover={{ bg: "var(--neutral-50)" }}
                >
                  채팅방 나가기
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Box>

      {/* 채팅 메시지 영역 */}
      <Box
        flex="1"
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <VStack
          flex="1"
          spacing="0"
          p="4"
          overflowY="auto"
          align="stretch"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'var(--neutral-300)',
              borderRadius: '2px',
            },
          }}
        >
          {/* 채팅 시작 알림 */}
          <Flex justify="center" mb="6">
            <Box
              bg="var(--neutral-100)"
              px="4"
              py="2"
              borderRadius="var(--radius-lg)"
              border="1px solid var(--border-primary)"
            >
              <Text fontSize="xs" color="var(--text-secondary)" textAlign="center">
                {new Date().toLocaleDateString("ko-KR")} 매칭이 성사되었습니다! 🎉
              </Text>
            </Box>
          </Flex>

          {/* 메시지들 */}
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* 타이핑 인디케이터 */}
          {isTyping && (
            <Flex justify="flex-start" mb="3" align="flex-end">
              <Avatar
                size="sm"
                src={chatPartner.profile}
                name={chatPartner.name}
                mr="2"
              />
              <Box
                bg="var(--surface-primary)"
                px="4"
                py="2"
                borderRadius="var(--radius-lg)"
                border="1px solid var(--border-primary)"
              >
                <HStack spacing="1">
                  <Box w="2" h="2" bg="var(--neutral-400)" borderRadius="full" className="typing-dot" />
                  <Box w="2" h="2" bg="var(--neutral-400)" borderRadius="full" className="typing-dot" style={{ animationDelay: "0.2s" }} />
                  <Box w="2" h="2" bg="var(--neutral-400)" borderRadius="full" className="typing-dot" style={{ animationDelay: "0.4s" }} />
                </HStack>
              </Box>
            </Flex>
          )}

          <div ref={messagesEndRef} />
        </VStack>

        {/* 메시지 입력 영역 */}
        <Box
          bg="var(--surface-primary)"
          borderTop="1px solid var(--border-primary)"
          p="4"
        >
          <HStack spacing="3">
            <Menu>
              <MenuButton
                as={IconButton}
                variant="ghost"
                size="md"
                icon={<BsPlus />}
                aria-label="첨부"
                color="var(--text-secondary)"
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
              />
              <MenuList
                bg="var(--surface-primary)"
                border="1px solid var(--border-primary)"
                borderRadius="var(--radius-lg)"
              >
                <MenuItem
                  icon={<BsImage />}
                  bg="transparent"
                  _hover={{ bg: "var(--neutral-50)" }}
                  onClick={() => {
                    toast({
                      title: "기능 준비중",
                      description: "사진 전송 기능은 곧 업데이트됩니다!",
                      status: "info",
                      duration: 2000,
                    });
                  }}
                >
                  사진
                </MenuItem>
                <MenuItem
                  icon={<BsCamera />}
                  bg="transparent"
                  _hover={{ bg: "var(--neutral-50)" }}
                  onClick={() => {
                    toast({
                      title: "기능 준비중",
                      description: "카메라 기능은 곧 업데이트됩니다!",
                      status: "info",
                      duration: 2000,
                    });
                  }}
                >
                  카메라
                </MenuItem>
              </MenuList>
            </Menu>

            <Input
              flex="1"
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              bg="var(--surface-secondary)"
              border="1px solid var(--border-primary)"
              borderRadius="var(--radius-lg)"
              fontSize="sm"
              _focus={{
                borderColor: "var(--brand-primary)",
                outline: "none",
              }}
              _placeholder={{ color: "var(--text-tertiary)" }}
            />

            <IconButton
              variant="ghost"
              size="md"
              icon={<BsEmojiSmile />}
              aria-label="이모지"
              color="var(--text-secondary)"
              bg="transparent"
              _hover={{ bg: "var(--neutral-100)" }}
              borderRadius="var(--radius-md)"
              onClick={() => {
                toast({
                  title: "기능 준비중",
                  description: "이모지 기능은 곧 업데이트됩니다!",
                  status: "info",
                  duration: 2000,
                });
              }}
            />

            <IconButton
              bg={message.trim() ? "var(--brand-primary)" : "var(--neutral-200)"}
              color={message.trim() ? "var(--text-inverse)" : "var(--text-tertiary)"}
              size="md"
              icon={<BsSend />}
              aria-label="전송"
              borderRadius="var(--radius-md)"
              isDisabled={!message.trim()}
              onClick={handleSendMessage}
              _hover={{
                bg: message.trim() ? "var(--brand-primary-dark)" : "var(--neutral-300)"
              }}
            />
          </HStack>
        </Box>
      </Box>

      <style jsx>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .typing-dot {
          animation: typing 1.4s infinite ease-in-out;
        }
      `}</style>
    </Box>
  );
};

export default FlatChat;