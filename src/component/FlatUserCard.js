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
  Flex,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import {
  BsHeart,
  BsHeartFill,
  BsChat,
  BsStar,
  BsGeoAlt,
} from "react-icons/bs";
import { isUserLiked, toggleLike } from "../js/LikeService";

export const FlatUserCard = ({
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

      if (onLike) {
        onLike(user);
      }
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case "premium":
        return "var(--brand-primary)";
      case "featured":
        return "var(--brand-secondary)";
      default:
        return "var(--border-primary)";
    }
  };

  return (
    <Box
      bg="var(--surface-primary)"
      border="2px solid"
      borderColor={getBorderColor()}
      borderRadius="var(--radius-lg)"
      overflow="hidden"
      cursor="pointer"
      onClick={onView}
      position="relative"
      transition="border-color var(--transition-fast)"
      _hover={{
        borderColor: variant === "default" ? "var(--brand-primary)" : getBorderColor()
      }}
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
            bg="var(--brand-primary)"
            color="var(--text-inverse)"
            px="2"
            py="1"
            borderRadius="var(--radius-sm)"
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
        />

        {/* Like Button */}
        {showActions && (
          <Box
            position="absolute"
            top="3"
            left="3"
          >
            <IconButton
              size="sm"
              bg="var(--surface-primary)"
              color={isLiked ? "var(--brand-error)" : "var(--neutral-600)"}
              icon={isLiked ? <BsHeartFill /> : <BsHeart />}
              aria-label="좋아요"
              borderRadius="var(--radius-md)"
              onClick={handleLikeClick}
              _hover={{
                color: "var(--brand-error)"
              }}
              transition="color var(--transition-fast)"
            />
          </Box>
        )}

        {/* Status Indicator */}
        <Box
          position="absolute"
          bottom="3"
          right="3"
          w="12px"
          h="12px"
          bg="var(--brand-success)"
          borderRadius="var(--radius-full)"
          border="2px solid var(--surface-primary)"
        />
      </Box>

      {/* Content */}
      <VStack spacing="3" p="4" align="stretch">
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
              bg="var(--neutral-100)"
              color="var(--text-secondary)"
              borderRadius="var(--radius-md)"
              border="1px solid var(--border-primary)"
            >
              <TagLabel>{food}</TagLabel>
            </Tag>
          ))}
          {user?.user_food?.length > 2 && (
            <Tag
              size="sm"
              bg="var(--neutral-200)"
              color="var(--text-secondary)"
              borderRadius="var(--radius-md)"
              border="1px solid var(--border-primary)"
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

        {/* Actions */}
        {showActions && (
          <HStack spacing="2" pt="2">
            <Button
              flex="1"
              size="sm"
              bg="var(--brand-primary)"
              color="var(--text-inverse)"
              borderRadius="var(--radius-md)"
              _hover={{ bg: "var(--brand-primary-dark)" }}
              onClick={(e) => {
                e.stopPropagation();
                onChat?.(user);
              }}
              leftIcon={<BsChat />}
              fontWeight="500"
            >
              채팅하기
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default FlatUserCard;