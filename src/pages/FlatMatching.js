import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Badge,
  Tag,
  TagLabel,
  IconButton,
  Flex,
  Grid,
  GridItem,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import {
  BsArrowLeft,
  BsHeart,
  BsHeartFill,
  BsChat,
  BsShare,
  BsStar,
  BsStarFill,
  BsGeoAlt,
  BsClock,
  BsCalendar,
  BsCheckCircle,
  BsShield,
  BsPeople,
} from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { isUserLiked, toggleLike } from "../js/LikeService";

export const FlatMatching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  const [reviewList, setReviewList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getReviewList();
    if (displayData?.doc_id) {
      setIsLiked(isUserLiked(displayData.doc_id));
    }
  }, []);

  const getReviewList = async () => {
    try {
      const mockReviews = [
        {
          reviewer_name: "김민수",
          reviewer_profile: "https://picsum.photos/40/40?random=1",
          review_rating: 5,
          review_score: 4.8,
          review_content: "정말 즐거운 식사 시간이었어요! 대화도 재미있고 음식 취향도 잘 맞았습니다. 다음에도 또 만나고 싶어요 😊",
          review_date: "2024-01-15",
          meeting_type: "저녁식사"
        },
        {
          reviewer_name: "이지영",
          reviewer_profile: "https://picsum.photos/40/40?random=2",
          review_rating: 5,
          review_score: 4.9,
          review_content: "처음 만나는 분이었는데 전혀 어색하지 않았어요. 맛집 추천도 해주시고 정말 감사했습니다!",
          review_date: "2024-01-10",
          meeting_type: "점심식사"
        },
        {
          reviewer_name: "박준호",
          reviewer_profile: "https://picsum.photos/40/40?random=3",
          review_rating: 4,
          review_score: 4.6,
          review_content: "좋은 대화 상대였습니다. 시간 가는 줄 모르고 얘기했네요.",
          review_date: "2024-01-08",
          meeting_type: "커피타임"
        },
        {
          reviewer_name: "최서연",
          reviewer_profile: "https://picsum.photos/40/40?random=4",
          review_rating: 5,
          review_score: 5.0,
          review_content: "정말 매너 좋으시고 배려심이 많으신 분이었어요. 강추합니다!",
          review_date: "2024-01-05",
          meeting_type: "저녁식사"
        }
      ];
      setReviewList(mockReviews);
    } catch (error) {
      console.error("리뷰 로드 오류:", error);
      setReviewList([]);
    }
  };

  const displayData = data || {
    user_name: "김미영",
    user_email: "miyoung@example.com",
    user_profile: "https://picsum.photos/400/400?random=10",
    user_info: "안녕하세요! 🙋‍♀️ 새로운 사람들과 맛있는 음식을 함께 나누는 것을 좋아해요. 특히 한식과 이탈리안 요리를 좋아하고, 맛집 탐방이 취미입니다. 대화하는 것을 좋아하고 긍정적인 에너지를 가지고 있어요. 함께 즐거운 식사 시간을 보내요! 😊",
    user_type: "개인",
    user_place: ["서울특별시", "강남구"],
    user_food: ["한식", "이탈리안", "일식", "카페"],
    user_age: 28,
    user_job: "마케팅 기획자",
    user_hobby: ["맛집탐방", "요리", "독서", "영화감상"],
    user_price: 15000,
    doc_id: "demo_user",
    verification_status: "verified",
    join_date: "2024-01-01",
    meeting_count: 24,
    response_rate: 95
  };

  const handleLikeToggle = () => {
    if (displayData?.doc_id) {
      const newLikedState = toggleLike(displayData);
      setIsLiked(newLikedState);
    }
  };

  const averageRating = reviewList.length > 0
    ? (reviewList.reduce((sum, review) => sum + review.review_score, 0) / reviewList.length).toFixed(1)
    : "4.8";

  return (
    <Box bg="var(--surface-secondary)" minH="100vh">
      <Container maxW="container.md" py="0">
        {/* Header */}
        <Box
          bg="var(--surface-primary)"
          position="sticky"
          top="0"
          zIndex="10"
          borderBottom="1px solid var(--border-primary)"
          px="4"
          py="3"
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
              <Text fontSize="lg" fontWeight="600" color="var(--text-primary)">
                밥친구 프로필
              </Text>
            </HStack>
            <HStack spacing="2">
              <IconButton
                variant="ghost"
                size="md"
                icon={<BsShare />}
                aria-label="공유하기"
                color="var(--text-secondary)"
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
              />
              <IconButton
                variant="ghost"
                size="md"
                icon={isLiked ? <BsHeartFill /> : <BsHeart />}
                aria-label="찜하기"
                color={isLiked ? "var(--brand-error)" : "var(--text-secondary)"}
                bg="transparent"
                _hover={{ bg: "var(--neutral-100)" }}
                borderRadius="var(--radius-md)"
                onClick={handleLikeToggle}
              />
            </HStack>
          </HStack>
        </Box>

        <VStack spacing="0" align="stretch">
          {/* Profile Image Section */}
          <Box position="relative" h="300px" overflow="hidden">
            <Image
              src={displayData.user_profile}
              alt={displayData.user_name}
              w="100%"
              h="100%"
              objectFit="cover"
            />

            {/* Verification Badge */}
            {displayData.verification_status === "verified" && (
              <Box position="absolute" top="4" right="4">
                <Badge
                  bg="var(--brand-success)"
                  color="var(--text-inverse)"
                  px="3"
                  py="1"
                  borderRadius="var(--radius-md)"
                  fontSize="sm"
                  fontWeight="600"
                  display="flex"
                  alignItems="center"
                  gap="1"
                >
                  <BsCheckCircle size="12px" />
                  인증완료
                </Badge>
              </Box>
            )}

            {/* Online Status */}
            <Box
              position="absolute"
              bottom="4"
              right="4"
              w="16px"
              h="16px"
              bg="var(--brand-success)"
              borderRadius="var(--radius-full)"
              border="3px solid var(--surface-primary)"
            />
          </Box>

          {/* Profile Info */}
          <Box bg="var(--surface-primary)" p="6">
            <VStack spacing="4" align="stretch">
              {/* Basic Info */}
              <VStack spacing="2" align="start">
                <HStack justify="space-between" w="100%">
                  <HStack spacing="3">
                    <Text fontSize="2xl" fontWeight="700" color="var(--text-primary)">
                      {displayData.user_name}
                    </Text>
                    <Text fontSize="lg" color="var(--text-secondary)">
                      {displayData.user_age}세
                    </Text>
                  </HStack>
                  <HStack spacing="1">
                    <BsStarFill color="var(--brand-warning)" size="16px" />
                    <Text fontSize="lg" fontWeight="600" color="var(--text-primary)">
                      {averageRating}
                    </Text>
                    <Text fontSize="sm" color="var(--text-secondary)">
                      ({reviewList.length}개 후기)
                    </Text>
                  </HStack>
                </HStack>

                <HStack spacing="4" flexWrap="wrap">
                  <HStack spacing="1">
                    <BsGeoAlt color="var(--text-tertiary)" size="14px" />
                    <Text fontSize="sm" color="var(--text-secondary)">
                      {displayData.user_place?.join(", ")}
                    </Text>
                  </HStack>
                  <HStack spacing="1">
                    <BsPeople color="var(--text-tertiary)" size="14px" />
                    <Text fontSize="sm" color="var(--text-secondary)">
                      {displayData.user_job}
                    </Text>
                  </HStack>
                  <HStack spacing="1">
                    <BsCalendar color="var(--text-tertiary)" size="14px" />
                    <Text fontSize="sm" color="var(--text-secondary)">
                      가입일: {displayData.join_date}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>

              {/* Stats */}
              <Grid templateColumns="repeat(3, 1fr)" gap="4">
                <GridItem>
                  <VStack spacing="1">
                    <Text fontSize="xl" fontWeight="700" color="var(--brand-primary)">
                      {displayData.meeting_count}
                    </Text>
                    <Text fontSize="xs" color="var(--text-secondary)">
                      총 만남
                    </Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack spacing="1">
                    <Text fontSize="xl" fontWeight="700" color="var(--brand-success)">
                      {displayData.response_rate}%
                    </Text>
                    <Text fontSize="xs" color="var(--text-secondary)">
                      응답률
                    </Text>
                  </VStack>
                </GridItem>
                <GridItem>
                  <VStack spacing="1">
                    <Text fontSize="xl" fontWeight="700" color="var(--brand-warning)">
                      {averageRating}
                    </Text>
                    <Text fontSize="xs" color="var(--text-secondary)">
                      평균 평점
                    </Text>
                  </VStack>
                </GridItem>
              </Grid>

              {/* Food Preferences */}
              <VStack spacing="2" align="start">
                <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                  선호 음식
                </Text>
                <HStack spacing="2" flexWrap="wrap">
                  {displayData.user_food?.map((food, index) => (
                    <Tag
                      key={index}
                      size="md"
                      bg="var(--brand-primary)"
                      color="var(--text-inverse)"
                      borderRadius="var(--radius-md)"
                      px="3"
                      py="1"
                    >
                      <TagLabel>{food}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
              </VStack>

              {/* Hobbies */}
              <VStack spacing="2" align="start">
                <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                  관심사
                </Text>
                <HStack spacing="2" flexWrap="wrap">
                  {displayData.user_hobby?.map((hobby, index) => (
                    <Tag
                      key={index}
                      size="md"
                      bg="var(--neutral-100)"
                      color="var(--text-secondary)"
                      borderRadius="var(--radius-md)"
                      border="1px solid var(--border-primary)"
                      px="3"
                      py="1"
                    >
                      <TagLabel>{hobby}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
              </VStack>
            </VStack>
          </Box>

          {/* Bio Section */}
          <Box bg="var(--surface-primary)" p="6" borderTop="1px solid var(--border-secondary)">
            <VStack spacing="3" align="start">
              <Text fontSize="lg" fontWeight="600" color="var(--text-primary)">
                자기소개
              </Text>
              <Text
                fontSize="md"
                color="var(--text-secondary)"
                lineHeight="1.6"
                whiteSpace="pre-wrap"
              >
                {displayData.user_info}
              </Text>
            </VStack>
          </Box>

          {/* Safety Info */}
          <Box bg="var(--brand-primary)" p="6" color="var(--text-inverse)">
            <VStack spacing="4" align="start">
              <HStack spacing="2">
                <BsShield size="20px" />
                <Text fontSize="lg" fontWeight="600">
                  안전한 만남을 위한 가이드
                </Text>
              </HStack>
              <VStack spacing="2" align="start" fontSize="sm" opacity="0.9">
                <Text>• 첫 만남은 공공장소에서 진행해주세요</Text>
                <Text>• 매칭 후 2주 내에 만남을 가져야 합니다</Text>
                <Text>• 상대방이 응답하지 않을 경우 전액 환불됩니다</Text>
                <Text>• 부적절한 행동 시 신고 기능을 이용해주세요</Text>
              </VStack>
            </VStack>
          </Box>

          {/* Reviews Section */}
          <Box bg="var(--surface-primary)" p="6" borderTop="1px solid var(--border-secondary)">
            <VStack spacing="4" align="stretch">
              <Text fontSize="lg" fontWeight="600" color="var(--text-primary)">
                만남 후기 ({reviewList.length})
              </Text>

              <VStack spacing="3" align="stretch">
                {reviewList.map((review, index) => (
                  <Box
                    key={index}
                    border="1px solid var(--border-primary)"
                    borderRadius="var(--radius-lg)"
                    p="4"
                    bg="var(--surface-secondary)"
                  >
                    <VStack spacing="3" align="start">
                      <HStack justify="space-between" w="100%">
                        <HStack spacing="3">
                          <Avatar
                            size="sm"
                            src={review.reviewer_profile}
                            name={review.reviewer_name}
                          />
                          <VStack spacing="0" align="start">
                            <Text fontSize="sm" fontWeight="600" color="var(--text-primary)">
                              {review.reviewer_name}
                            </Text>
                            <Text fontSize="xs" color="var(--text-tertiary)">
                              {review.review_date}
                            </Text>
                          </VStack>
                        </HStack>
                        <HStack spacing="1">
                          {[...Array(5)].map((_, i) => (
                            <BsStarFill
                              key={i}
                              size="12px"
                              color={i < review.review_rating ? "var(--brand-warning)" : "var(--neutral-300)"}
                            />
                          ))}
                          <Badge
                            ml="2"
                            bg="var(--neutral-100)"
                            color="var(--text-secondary)"
                            fontSize="xs"
                            borderRadius="var(--radius-sm)"
                          >
                            {review.meeting_type}
                          </Badge>
                        </HStack>
                      </HStack>
                      <Text fontSize="sm" color="var(--text-secondary)" lineHeight="1.5">
                        {review.review_content}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </Box>

          {/* Action Buttons */}
          <Box
            bg="var(--surface-primary)"
            p="6"
            borderTop="1px solid var(--border-secondary)"
            position="sticky"
            bottom="0"
          >
            <VStack spacing="3">
              <HStack spacing="3" w="100%">
                <Button
                  flex="1"
                  size="lg"
                  bg="var(--brand-primary)"
                  color="var(--text-inverse)"
                  borderRadius="var(--radius-md)"
                  _hover={{ bg: "var(--brand-primary-dark)" }}
                  onClick={() => {
                    localStorage.setItem("matching_type", "식사");
                    navigate("/payment", {
                      state: {
                        price: displayData.user_price,
                        receiver: displayData,
                      },
                    });
                  }}
                  leftIcon={<BsPeople />}
                  fontWeight="600"
                >
                  🍛 식사 매칭 신청 ({displayData.user_price?.toLocaleString()}원)
                </Button>
              </HStack>
              <HStack spacing="3" w="100%">
                <Button
                  flex="1"
                  size="md"
                  bg="var(--neutral-100)"
                  color="var(--text-primary)"
                  border="1px solid var(--border-primary)"
                  borderRadius="var(--radius-md)"
                  _hover={{ bg: "var(--neutral-200)" }}
                  onClick={() => {
                    localStorage.setItem("matching_type", "커피");
                    navigate("/payment", {
                      state: {
                        price: Math.floor(displayData.user_price * 0.7),
                        receiver: displayData,
                      },
                    });
                  }}
                  leftIcon={<BsClock />}
                  fontWeight="500"
                >
                  ☕️ 커피 매칭 신청 ({Math.floor(displayData.user_price * 0.7)?.toLocaleString()}원)
                </Button>
                <Button
                  size="md"
                  bg="var(--surface-primary)"
                  color="var(--brand-primary)"
                  border="1px solid var(--brand-primary)"
                  borderRadius="var(--radius-md)"
                  _hover={{ bg: "var(--brand-primary)", color: "var(--text-inverse)" }}
                  leftIcon={<BsChat />}
                  fontWeight="500"
                  px="6"
                >
                  채팅하기
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default FlatMatching;