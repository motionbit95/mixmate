import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Badge,
  Button,
  IconButton,
  Avatar,
  Flex,
  Divider,
  Tag,
  TagLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  BsHeart,
  BsHeartFill,
  BsChat,
  BsShare,
  BsStar,
  BsStarFill,
  BsGeoAlt,
  BsClock,
  BsPerson,
} from "react-icons/bs";
import { isUserLiked, toggleLike } from "../js/LikeService";

// Premium User Card Component
export const PremiumUserCard = ({
  user,
  onLike,
  onChat,
  onView,
  isLiked: propIsLiked,
  showActions = true,
  variant = "default"
}) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (propIsLiked !== undefined) {
      setIsLiked(propIsLiked);
    } else if (user?.doc_id) {
      setIsLiked(isUserLiked(user.doc_id));
    }
  }, [user?.doc_id, propIsLiked]);

  const handleLikeClick = (e) => {
    e.stopPropagation();

    if (user?.doc_id) {
      const newLikedState = toggleLike(user);
      setIsLiked(newLikedState);

      // 부모 컴포넌트의 onLike 콜백도 호출
      if (onLike) {
        onLike(user);
      }
    }
  };

  const cardVariants = {
    default: {
      bg: "var(--surface-primary)",
      border: "1px solid var(--border-primary)",
      shadow: "var(--shadow-sm)",
      hoverShadow: "var(--shadow-md)",
    },
    premium: {
      bg: "var(--surface-primary)",
      border: "1px solid var(--brand-primary-200)",
      shadow: "var(--shadow-md)",
      hoverShadow: "var(--shadow-lg)",
    },
    featured: {
      bg: "linear-gradient(135deg, var(--brand-primary-50) 0%, var(--surface-primary) 100%)",
      border: "2px solid var(--brand-primary-300)",
      shadow: "var(--shadow-lg)",
      hoverShadow: "var(--shadow-xl)",
    }
  };

  const cardStyle = cardVariants[variant] || cardVariants.default;

  return (
    <Box
      bg={cardStyle.bg}
      border={cardStyle.border}
      borderRadius="var(--radius-2xl)"
      overflow="hidden"
      cursor="pointer"
      transition="all var(--transition-base)"
      className="interactive-lift"
      boxShadow={cardStyle.shadow}
      _hover={{
        boxShadow: cardStyle.hoverShadow,
        transform: "translateY(-4px)",
      }}
      onClick={onView}
      position="relative"
    >
      {/* Premium Badge */}
      {variant === "premium" && (
        <Box
          position="absolute"
          top="3"
          right="3"
          zIndex="10"
        >
          <Badge
            className="gradient-primary"
            color="white"
            px="2"
            py="1"
            borderRadius="var(--radius-lg)"
            fontSize="xs"
            fontWeight="600"
          >
            Premium
          </Badge>
        </Box>
      )}

      {/* Profile Image */}
      <Box position="relative" h="200px" overflow="hidden">
        <Image
          src={user?.user_profile || "https://picsum.photos/300/200?random=1"}
          alt={user?.user_name}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform var(--transition-base)"
          _hover={{ transform: "scale(1.05)" }}
        />

        {/* Overlay Gradient */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="60px"
          bgGradient="linear(to-t, blackAlpha.600, transparent)"
        />

        {/* Quick Actions */}
        {showActions && (
          <HStack
            position="absolute"
            top="3"
            left="3"
            spacing="1"
          >
            <IconButton
              size="sm"
              variant="solid"
              bg="rgba(255, 255, 255, 0.9)"
              color={isLiked ? "var(--brand-error)" : "var(--neutral-600)"}
              icon={isLiked ? <BsHeartFill /> : <BsHeart />}
              aria-label="좋아요"
              borderRadius="full"
              onClick={handleLikeClick}
              _hover={{
                bg: "white",
                transform: "scale(1.1)",
                color: isLiked ? "var(--brand-error)" : "var(--brand-error)"
              }}
              transition="all 0.2s ease"
            />
          </HStack>
        )}

        {/* Status Indicator */}
        <Box
          position="absolute"
          bottom="3"
          right="3"
          w="12px"
          h="12px"
          bg="var(--brand-success)"
          borderRadius="full"
          border="2px solid white"
        />
      </Box>

      {/* Content */}
      <VStack spacing="4" p="5" align="stretch">
        {/* User Info */}
        <VStack spacing="2" align="start">
          <HStack justify="space-between" w="100%">
            <Text
              fontSize="lg"
              fontWeight="600"
              color="var(--text-primary)"
              noOfLines={1}
            >
              {user?.user_name || "익명 사용자"}
            </Text>
            <HStack spacing="1">
              <BsStar color="var(--brand-warning)" size="14px" />
              <Text fontSize="sm" color="var(--text-secondary)">
                4.8
              </Text>
            </HStack>
          </HStack>

          <HStack spacing="2" flexWrap="wrap">
            <HStack spacing="1">
              <BsGeoAlt color="var(--text-tertiary)" size="12px" />
              <Text fontSize="sm" color="var(--text-secondary)" noOfLines={1}>
                {user?.user_place?.[0] || "위치 없음"}
              </Text>
            </HStack>
            <Text color="var(--text-tertiary)">•</Text>
            <Text fontSize="sm" color="var(--text-secondary)">
              {user?.user_type || "개인"}
            </Text>
          </HStack>
        </VStack>

        {/* Tags */}
        <HStack spacing="2" flexWrap="wrap">
          {user?.user_food?.slice(0, 2).map((food, index) => (
            <Tag
              key={index}
              size="sm"
              bg="var(--brand-primary-50)"
              color="var(--brand-primary-700)"
              borderRadius="var(--radius-lg)"
            >
              <TagLabel>{food}</TagLabel>
            </Tag>
          ))}
          {user?.user_food?.length > 2 && (
            <Tag
              size="sm"
              bg="var(--neutral-100)"
              color="var(--text-secondary)"
              borderRadius="var(--radius-lg)"
            >
              <TagLabel>+{user.user_food.length - 2}</TagLabel>
            </Tag>
          )}
        </HStack>

        {/* Bio */}
        {user?.user_info && (
          <Text
            fontSize="sm"
            color="var(--text-secondary)"
            noOfLines={2}
            lineHeight="1.5"
          >
            {user.user_info}
          </Text>
        )}

        {/* Divider */}
        <Divider borderColor="var(--border-secondary)" />

        {/* Actions */}
        {showActions && (
          <HStack spacing="2">
            <Button
              flex="1"
              size="sm"
              bg="var(--brand-primary)"
              color="white"
              borderRadius="var(--radius-lg)"
              _hover={{ bg: "var(--brand-primary-700)" }}
              onClick={(e) => {
                e.stopPropagation();
                onChat?.(user);
              }}
              leftIcon={<BsChat />}
            >
              채팅하기
            </Button>
            <IconButton
              size="sm"
              variant="outline"
              borderColor="var(--border-primary)"
              icon={<BsShare />}
              aria-label="공유하기"
              borderRadius="var(--radius-lg)"
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

// Premium Content Card Component
export const PremiumContentCard = ({
  title,
  description,
  image,
  category,
  date,
  author,
  readTime,
  onRead,
  featured = false
}) => {
  return (
    <Box
      bg="var(--surface-primary)"
      border="1px solid var(--border-primary)"
      borderRadius="var(--radius-2xl)"
      overflow="hidden"
      cursor="pointer"
      transition="all var(--transition-base)"
      className="interactive-lift"
      boxShadow={featured ? "var(--shadow-lg)" : "var(--shadow-sm)"}
      _hover={{
        boxShadow: "var(--shadow-xl)",
        transform: "translateY(-4px)",
      }}
      onClick={onRead}
    >
      {/* Image */}
      <Box position="relative" h="180px" overflow="hidden">
        <Image
          src={image || "https://picsum.photos/400/180?random=2"}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform var(--transition-base)"
          _hover={{ transform: "scale(1.05)" }}
        />

        {/* Category Badge */}
        <Box position="absolute" top="3" left="3">
          <Badge
            bg="var(--surface-primary)"
            color="var(--text-primary)"
            px="2"
            py="1"
            borderRadius="var(--radius-lg)"
            fontSize="xs"
            fontWeight="500"
            backdropFilter="blur(10px)"
          >
            {category}
          </Badge>
        </Box>

        {featured && (
          <Box position="absolute" top="3" right="3">
            <Badge
              className="gradient-secondary"
              color="white"
              px="2"
              py="1"
              borderRadius="var(--radius-lg)"
              fontSize="xs"
              fontWeight="600"
            >
              Featured
            </Badge>
          </Box>
        )}
      </Box>

      {/* Content */}
      <VStack spacing="3" p="5" align="stretch">
        <VStack spacing="2" align="start">
          <Text
            fontSize="lg"
            fontWeight="600"
            color="var(--text-primary)"
            noOfLines={2}
            lineHeight="1.3"
          >
            {title}
          </Text>
          <Text
            fontSize="sm"
            color="var(--text-secondary)"
            noOfLines={2}
            lineHeight="1.5"
          >
            {description}
          </Text>
        </VStack>

        <Divider borderColor="var(--border-secondary)" />

        {/* Meta Info */}
        <HStack justify="space-between" fontSize="xs" color="var(--text-tertiary)">
          <HStack spacing="3">
            <HStack spacing="1">
              <BsPerson />
              <Text>{author}</Text>
            </HStack>
            <HStack spacing="1">
              <BsClock />
              <Text>{readTime}</Text>
            </HStack>
          </HStack>
          <Text>{date}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

// Premium Stats Card Component
export const PremiumStatsCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = "blue"
}) => {
  const colorSchemes = {
    blue: {
      bg: "var(--brand-primary-50)",
      iconBg: "var(--brand-primary)",
      iconColor: "white",
      valueColor: "var(--brand-primary-700)",
    },
    green: {
      bg: "var(--neutral-50)",
      iconBg: "var(--brand-success)",
      iconColor: "white",
      valueColor: "var(--brand-success)",
    },
    orange: {
      bg: "var(--neutral-50)",
      iconBg: "var(--brand-warning)",
      iconColor: "white",
      valueColor: "var(--brand-warning)",
    },
    red: {
      bg: "var(--neutral-50)",
      iconBg: "var(--brand-error)",
      iconColor: "white",
      valueColor: "var(--brand-error)",
    }
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <Box
      bg="var(--surface-primary)"
      border="1px solid var(--border-primary)"
      borderRadius="var(--radius-2xl)"
      p="6"
      boxShadow="var(--shadow-sm)"
      transition="all var(--transition-base)"
      className="interactive-scale"
      _hover={{ boxShadow: "var(--shadow-md)" }}
    >
      <VStack spacing="4" align="stretch">
        <HStack justify="space-between">
          <Text
            fontSize="sm"
            fontWeight="500"
            color="var(--text-secondary)"
            textTransform="uppercase"
            letterSpacing="0.05em"
          >
            {title}
          </Text>
          {icon && (
            <Flex
              w="10"
              h="10"
              bg={scheme.iconBg}
              color={scheme.iconColor}
              borderRadius="var(--radius-xl)"
              align="center"
              justify="center"
            >
              {icon}
            </Flex>
          )}
        </HStack>

        <Text
          fontSize="3xl"
          fontWeight="700"
          color={scheme.valueColor}
          lineHeight="1"
        >
          {value}
        </Text>

        {(subtitle || trend) && (
          <HStack justify="space-between">
            {subtitle && (
              <Text fontSize="sm" color="var(--text-secondary)">
                {subtitle}
              </Text>
            )}
            {trend && (
              <HStack spacing="1">
                <Text
                  fontSize="sm"
                  fontWeight="500"
                  color={trend.type === "up" ? "var(--brand-success)" : "var(--brand-error)"}
                >
                  {trend.value}
                </Text>
                <Text fontSize="xs" color="var(--text-tertiary)">
                  {trend.period}
                </Text>
              </HStack>
            )}
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default { PremiumUserCard, PremiumContentCard, PremiumStatsCard };