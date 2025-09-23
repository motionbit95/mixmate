import { Button, Flex, Text, IconButton } from "@chakra-ui/react";

// Enterprise Button System - Modern & Accessible

// Button Variants
const BUTTON_VARIANTS = {
  primary: {
    bg: "#2563eb",
    color: "#ffffff",
    _hover: { bg: "#1d4ed8", transform: "translateY(-1px)" },
    _active: { bg: "#1e40af", transform: "translateY(0)" },
    shadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
    _focus: { boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)" }
  },
  secondary: {
    bg: "transparent",
    color: "#2563eb",
    border: "2px solid",
    borderColor: "#2563eb",
    _hover: { bg: "#2563eb", color: "#ffffff", transform: "translateY(-1px)" },
    _active: { transform: "translateY(0)" },
    _focus: { boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)" }
  },
  ghost: {
    bg: "transparent",
    color: "#4b5563",
    _hover: { bg: "gray.50", color: "gray.700" },
    _active: { bg: "gray.100" },
    _focus: { boxShadow: "0 0 0 3px rgba(107, 114, 128, 0.1)" }
  },
  destructive: {
    bg: "#ef4444",
    color: "#ffffff",
    _hover: { bg: "#dc2626", transform: "translateY(-1px)" },
    _active: { bg: "#b91c1c", transform: "translateY(0)" },
    shadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
    _focus: { boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)" }
  }
};

// Button Sizes
const BUTTON_SIZES = {
  sm: {
    h: "32px",
    px: "12px",
    fontSize: "14px",
    fontWeight: "500"
  },
  md: {
    h: "40px",
    px: "16px",
    fontSize: "14px",
    fontWeight: "500"
  },
  lg: {
    h: "48px",
    px: "24px",
    fontSize: "16px",
    fontWeight: "500"
  },
  xl: {
    h: "56px",
    px: "32px",
    fontSize: "16px",
    fontWeight: "600"
  }
};

export const EnterpriseButton = ({
  variant = "primary",
  size = "md",
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}) => {
  const variantStyles = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
  const sizeStyles = BUTTON_SIZES[size] || BUTTON_SIZES.md;

  return (
    <Button
      {...props}
      {...variantStyles}
      {...sizeStyles}
      w={isFullWidth ? "100%" : "auto"}
      borderRadius="8px"
      fontFamily="var(--font-family-sans)"
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isLoading={isLoading}
      loadingText={children}
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
        _hover: { transform: "none" }
      }}
    >
      {children}
    </Button>
  );
};

export const TextButton = ({ children, ...props }) => {
  return (
    <Text
      {...props}
      fontSize="14px"
      fontWeight="500"
      color="#6b7280"
      cursor="pointer"
      transition="color 0.2s ease"
      _hover={{ color: "#4b5563" }}
      fontFamily="var(--font-family-sans)"
    >
      {children}
    </Text>
  );
};

export const IconButtonEnterprise = ({
  variant = "ghost",
  size = "md",
  icon,
  "aria-label": ariaLabel,
  ...props
}) => {
  const variantStyles = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.ghost;
  const sizeMap = { sm: "32px", md: "40px", lg: "48px", xl: "56px" };

  return (
    <IconButton
      {...props}
      {...variantStyles}
      aria-label={ariaLabel}
      icon={icon}
      size={sizeMap[size]}
      borderRadius="8px"
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      _disabled={{
        opacity: 0.5,
        cursor: "not-allowed",
        _hover: { transform: "none" }
      }}
    />
  );
};

// Legacy Components (for backward compatibility)
export const CustomButton = ({ text, code, ...props }) => {
  const variant = code?.includes("blue") ? "primary" :
                 code?.includes("red") ? "destructive" : "secondary";

  return (
    <EnterpriseButton variant={variant} {...props}>
      {text}
    </EnterpriseButton>
  );
};

export const FullButton = ({ ...props }) => {
  return (
    <Flex w="100%">
      <CustomButton {...props} isFullWidth />
    </Flex>
  );
};
