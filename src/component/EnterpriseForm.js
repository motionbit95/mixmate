import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  VStack,
  HStack,
  Text,
  Select,
  Switch,
  Checkbox,
  Radio,
  RadioGroup
} from "@chakra-ui/react";
import { useState } from "react";

// Enterprise Form System - Modern & Accessible

export const EnterpriseInput = ({
  label,
  error,
  helperText,
  required = false,
  size = "md",
  variant = "outline",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizes = {
    sm: { h: "32px", fontSize: "14px" },
    md: { h: "40px", fontSize: "14px" },
    lg: { h: "48px", fontSize: "16px" }
  };

  const sizeStyles = sizes[size] || sizes.md;

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {label && (
        <FormLabel
          fontSize="14px"
          fontWeight="500"
          color="#111827"
          mb="2"
          fontFamily="var(--font-family-sans)"
        >
          {label}
        </FormLabel>
      )}
      <Input
        {...props}
        {...sizeStyles}
        borderRadius="8px"
        borderColor={error ? "#991b1b" : isFocused ? "#2563eb" : "#d1d5db"}
        bg="#ffffff"
        _hover={{
          borderColor: error ? "#991b1b" : "#2563eb"
        }}
        _focus={{
          borderColor: error ? "#991b1b" : "#2563eb",
          boxShadow: error
            ? `0 0 0 3px #fee2e2`
            : `0 0 0 3px rgba(37, 99, 235, 0.1)`,
          bg: white
        }}
        _placeholder={{
          color: "#6b7280",
          fontSize: sizeStyles.fontSize
        }}
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        fontFamily="var(--font-family-sans)"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
      {error && (
        <FormErrorMessage fontSize="12px" color="#991b1b" mt="1">
          {error}
        </FormErrorMessage>
      )}
      {helperText && !error && (
        <FormHelperText fontSize="12px" color="#4b5563" mt="1">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const EnterpriseTextarea = ({
  label,
  error,
  helperText,
  required = false,
  size = "md",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {label && (
        <FormLabel
          fontSize="14px"
          fontWeight="500"
          color="#111827"
          mb="2"
          fontFamily="var(--font-family-sans)"
        >
          {label}
        </FormLabel>
      )}
      <Textarea
        {...props}
        borderRadius="8px"
        borderColor={error ? "#991b1b" : isFocused ? "#2563eb" : "#d1d5db"}
        bg="#ffffff"
        minH="80px"
        _hover={{
          borderColor: error ? "#991b1b" : "#2563eb"
        }}
        _focus={{
          borderColor: error ? "#991b1b" : "#2563eb",
          boxShadow: error
            ? `0 0 0 3px #fee2e2`
            : `0 0 0 3px rgba(37, 99, 235, 0.1)`,
          bg: white
        }}
        _placeholder={{
          color: "#6b7280",
          fontSize: "14px"
        }}
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        fontFamily="var(--font-family-sans)"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      />
      {error && (
        <FormErrorMessage fontSize="12px" color="#991b1b" mt="1">
          {error}
        </FormErrorMessage>
      )}
      {helperText && !error && (
        <FormHelperText fontSize="12px" color="#4b5563" mt="1">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const EnterpriseSelect = ({
  label,
  error,
  helperText,
  required = false,
  placeholder = "선택하세요",
  options = [],
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      {label && (
        <FormLabel
          fontSize="14px"
          fontWeight="500"
          color="#111827"
          mb="2"
          fontFamily="var(--font-family-sans)"
        >
          {label}
        </FormLabel>
      )}
      <Select
        {...props}
        placeholder={placeholder}
        h="40px"
        borderRadius="8px"
        borderColor={error ? "#991b1b" : isFocused ? "#2563eb" : "#d1d5db"}
        bg="#ffffff"
        _hover={{
          borderColor: error ? "#991b1b" : "#2563eb"
        }}
        _focus={{
          borderColor: error ? "#991b1b" : "#2563eb",
          boxShadow: error
            ? `0 0 0 3px #fee2e2`
            : `0 0 0 3px rgba(37, 99, 235, 0.1)`,
          bg: white
        }}
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        fontFamily="var(--font-family-sans)"
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && (
        <FormErrorMessage fontSize="12px" color="#991b1b" mt="1">
          {error}
        </FormErrorMessage>
      )}
      {helperText && !error && (
        <FormHelperText fontSize="12px" color="#4b5563" mt="1">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const EnterpriseCheckbox = ({
  label,
  helperText,
  children,
  ...props
}) => {
  return (
    <FormControl>
      <Checkbox
        {...props}
        colorScheme="blue"
        borderRadius="4px"
        fontFamily="var(--font-family-sans)"
        _focus={{
          boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`
        }}
      >
        <Text fontSize="14px" fontWeight="400" color={gray_900}>
          {label || children}
        </Text>
      </Checkbox>
      {helperText && (
        <FormHelperText fontSize="12px" color={gray_600} mt="1" ml="6">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const EnterpriseSwitch = ({
  label,
  helperText,
  ...props
}) => {
  return (
    <FormControl>
      <HStack justify="space-between" align="center">
        <VStack align="start" spacing="1">
          <Text fontSize="14px" fontWeight="500" color={gray_900}>
            {label}
          </Text>
          {helperText && (
            <Text fontSize="12px" color={gray_600}>
              {helperText}
            </Text>
          )}
        </VStack>
        <Switch
          {...props}
          colorScheme="blue"
          _focus={{
            boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`
          }}
        />
      </HStack>
    </FormControl>
  );
};

export const FormSection = ({
  title,
  description,
  children,
  ...props
}) => {
  return (
    <VStack align="stretch" spacing="6" {...props}>
      {(title || description) && (
        <VStack align="start" spacing="1">
          {title && (
            <Text fontSize="lg" fontWeight="600" color={gray_900}>
              {title}
            </Text>
          )}
          {description && (
            <Text fontSize="sm" color={gray_600}>
              {description}
            </Text>
          )}
        </VStack>
      )}
      <VStack align="stretch" spacing="4">
        {children}
      </VStack>
    </VStack>
  );
};