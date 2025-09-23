import { Box, Spinner, VStack, HStack, Text, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react";

// Enterprise Loading System - Smooth & Professional

export const EnterpriseSpinner = ({
  size = "md",
  color = "#2563eb",
  thickness = "3px",
  ...props
}) => {
  const sizes = {
    xs: "16px",
    sm: "20px",
    md: "32px",
    lg: "48px",
    xl: "64px"
  };

  return (
    <Spinner
      {...props}
      size={sizes[size] || sizes.md}
      color={color}
      thickness={thickness}
      speed="0.8s"
    />
  );
};

export const LoadingOverlay = ({
  isLoading,
  message = "로딩 중...",
  children,
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      {children}
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(2px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="overlay"
          borderRadius="inherit"
        >
          <VStack spacing="4">
            <EnterpriseSpinner size="lg" />
            <Text fontSize="sm" fontWeight="500" color="gray.600">
              {message}
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export const PageLoader = ({
  message = "페이지를 불러오고 있습니다...",
  ...props
}) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="#ffffff"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="modal"
      {...props}
    >
      <VStack spacing="6">
        <EnterpriseSpinner size="xl" />
        <VStack spacing="2">
          <Text fontSize="lg" fontWeight="600" color="gray.900">
            {message}
          </Text>
          <Text fontSize="sm" color="gray.600">
            잠시만 기다려주세요
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

// Skeleton Components
export const EnterpriseSkeleton = ({
  height = "20px",
  width = "100%",
  borderRadius = "4px",
  ...props
}) => {
  return (
    <Skeleton
      {...props}
      height={height}
      width={width}
      borderRadius={borderRadius}
      startColor="#e5e7eb"
      endColor="#d1d5db"
      speed={1.2}
    />
  );
};

export const SkeletonCard = ({ ...props }) => {
  return (
    <Box
      bg="#ffffff"
      p="6"
      borderRadius="xl"
      border="1px solid"
      borderColor="#e5e7eb"
      {...props}
    >
      <VStack align="stretch" spacing="4">
        <HStack spacing="4">
          <SkeletonCircle size="12" startColor="#e5e7eb" endColor="#d1d5db" />
          <VStack align="start" spacing="2" flex="1">
            <EnterpriseSkeleton height="16px" width="60%" />
            <EnterpriseSkeleton height="14px" width="40%" />
          </VStack>
        </HStack>
        <VStack align="stretch" spacing="2">
          <EnterpriseSkeleton height="14px" width="100%" />
          <EnterpriseSkeleton height="14px" width="80%" />
          <EnterpriseSkeleton height="14px" width="90%" />
        </VStack>
        <HStack spacing="2" justify="flex-end">
          <EnterpriseSkeleton height="32px" width="80px" borderRadius="6px" />
          <EnterpriseSkeleton height="32px" width="80px" borderRadius="6px" />
        </HStack>
      </VStack>
    </Box>
  );
};

export const SkeletonList = ({ count = 3, spacing = "4", ...props }) => {
  return (
    <VStack spacing={spacing} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} w="100%" />
      ))}
    </VStack>
  );
};

export const EnterpriseSkeletonText = ({ lines = 3, spacing = "2", ...props }) => {
  return (
    <VStack align="stretch" spacing={spacing} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <EnterpriseSkeleton
          key={index}
          height="14px"
          width={index === lines - 1 ? "75%" : "100%"}
        />
      ))}
    </VStack>
  );
};

export const SkeletonTable = ({ rows = 5, columns = 4, ...props }) => {
  return (
    <VStack align="stretch" spacing="3" {...props}>
      {/* Header */}
      <HStack spacing="4">
        {Array.from({ length: columns }).map((_, index) => (
          <EnterpriseSkeleton
            key={`header-${index}`}
            height="16px"
            width="100%"
            borderRadius="4px"
          />
        ))}
      </HStack>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <HStack key={`row-${rowIndex}`} spacing="4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <EnterpriseSkeleton
              key={`cell-${rowIndex}-${colIndex}`}
              height="14px"
              width="100%"
              borderRadius="4px"
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

// Button Loading State
export const LoadingButton = ({
  isLoading,
  loadingText = "로딩 중...",
  children,
  ...props
}) => {
  return (
    <Box position="relative" display="inline-block">
      <Box opacity={isLoading ? 0.7 : 1} pointerEvents={isLoading ? "none" : "auto"}>
        {children}
      </Box>
      {isLoading && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          alignItems="center"
          gap="2"
        >
          <EnterpriseSpinner size="sm" />
          <Text fontSize="sm" fontWeight="500">
            {loadingText}
          </Text>
        </Box>
      )}
    </Box>
  );
};