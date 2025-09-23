import { Box, VStack, HStack, Text, Divider } from "@chakra-ui/react";

// Enterprise Card System - Professional & Modern

export const EnterpriseCard = ({
  variant = "default",
  padding = "6",
  shadow = "md",
  borderRadius = "xl",
  children,
  ...props
}) => {
  const variants = {
    default: {
      bg: "#ffffff",
      border: "1px solid",
      borderColor: "#e5e7eb",
      shadow: "var(--shadow-md)"
    },
    elevated: {
      bg: "#ffffff",
      shadow: "var(--shadow-lg)"
    },
    outlined: {
      bg: "#ffffff",
      border: "2px solid",
      borderColor: "#e5e7eb",
      shadow: "none"
    },
    filled: {
      bg: "#f3f4f6",
      shadow: "none"
    }
  };

  const variantStyle = variants[variant] || variants.default;

  return (
    <Box
      {...props}
      {...variantStyle}
      p={padding}
      borderRadius={borderRadius}
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: variant === "elevated" ? "translateY(-2px)" : "none",
        shadow: variant === "elevated" ? "var(--shadow-xl)" : variantStyle.shadow
      }}
    >
      {children}
    </Box>
  );
};

export const CardHeader = ({ title, subtitle, action, ...props }) => {
  return (
    <VStack align="stretch" spacing="2" {...props}>
      <HStack justify="space-between" align="start">
        <VStack align="start" spacing="1">
          <Text
            fontSize="lg"
            fontWeight="600"
            color="#111827"
            lineHeight="1.25"
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              fontSize="sm"
              color="#4b5563"
              lineHeight="1.5"
            >
              {subtitle}
            </Text>
          )}
        </VStack>
        {action && <Box>{action}</Box>}
      </HStack>
      <Divider borderColor="#e5e7eb" />
    </VStack>
  );
};

export const CardBody = ({ children, ...props }) => {
  return (
    <Box {...props}>
      {children}
    </Box>
  );
};

export const CardFooter = ({ children, justify = "flex-end", ...props }) => {
  return (
    <>
      <Divider borderColor="#e5e7eb" my="4" />
      <HStack justify={justify} {...props}>
        {children}
      </HStack>
    </>
  );
};

// Specialized Card Components
export const UserCard = ({ user, actions, ...props }) => {
  return (
    <EnterpriseCard variant="elevated" {...props}>
      <VStack align="stretch" spacing="4">
        <HStack spacing="4">
          <Box
            w="12"
            h="12"
            borderRadius="full"
            bg="#e5e7eb"
            backgroundImage={user?.user_profile ? `url(${user.user_profile})` : "none"}
            backgroundSize="cover"
            backgroundPosition="center"
          />
          <VStack align="start" spacing="1" flex="1">
            <Text fontWeight="600" color="#111827">
              {user?.user_name || "익명 사용자"}
            </Text>
            <Text fontSize="sm" color="#4b5563">
              {user?.user_email || "이메일 없음"}
            </Text>
          </VStack>
        </HStack>
        {actions && (
          <HStack spacing="2" justify="flex-end">
            {actions}
          </HStack>
        )}
      </VStack>
    </EnterpriseCard>
  );
};

export const StatsCard = ({ title, value, subtitle, trend, icon, ...props }) => {
  return (
    <EnterpriseCard variant="elevated" {...props}>
      <VStack align="stretch" spacing="3">
        <HStack justify="space-between">
          <Text fontSize="sm" fontWeight="500" color="#4b5563">
            {title}
          </Text>
          {icon && <Box color="#4b5563">{icon}</Box>}
        </HStack>
        <Text fontSize="2xl" fontWeight="700" color="#111827">
          {value}
        </Text>
        {(subtitle || trend) && (
          <HStack justify="space-between">
            {subtitle && (
              <Text fontSize="sm" color="#4b5563">
                {subtitle}
              </Text>
            )}
            {trend && (
              <Text
                fontSize="sm"
                fontWeight="500"
                color={trend.type === "positive" ? "green.600" : "red.600"}
              >
                {trend.value}
              </Text>
            )}
          </HStack>
        )}
      </VStack>
    </EnterpriseCard>
  );
};