import React, { useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  Divider,
  IconButton,
  useToast,
  Image,
  Flex,
  Link,
} from "@chakra-ui/react";
import {
  BsPerson,
  BsLock,
  BsEye,
  BsEyeSlash,
  BsGoogle,
  BsApple,
  BsArrowLeft,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { signInPassword } from "../js/MockAuth";

export const PremiumLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await signInPassword(formData.email, formData.password);

      toast({
        title: "로그인 성공",
        description: "환영합니다!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "로그인 실패",
        description: error.message || "이메일 또는 비밀번호가 올바르지 않습니다",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast({
      title: `${provider} 로그인`,
      description: "개발 중인 기능입니다",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, var(--brand-primary-50) 0%, var(--surface-secondary) 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Background Elements */}
      <Box
        position="absolute"
        top="-10%"
        right="-10%"
        w="400px"
        h="400px"
        bg="var(--brand-primary-100)"
        borderRadius="full"
        opacity="0.3"
        filter="blur(60px)"
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-10%"
        w="300px"
        h="300px"
        bg="var(--brand-secondary)"
        borderRadius="full"
        opacity="0.2"
        filter="blur(60px)"
      />

      <Container maxW="container.xl" h="100vh" py="8">
        <Flex h="100%" align="center" justify="center">
          <Box w="100%" maxW="900px">
            <HStack spacing="0" h="600px" borderRadius="var(--radius-3xl)" overflow="hidden" boxShadow="var(--shadow-2xl)">
              {/* Left Panel - Branding */}
              <VStack
                flex="1"
                bg="var(--brand-primary)"
                color="white"
                spacing="8"
                p="12"
                justify="center"
                display={{ base: "none", md: "flex" }}
                position="relative"
              >
                {/* Decorative Elements */}
                <Box
                  position="absolute"
                  top="10%"
                  right="10%"
                  w="100px"
                  h="100px"
                  border="2px solid rgba(255, 255, 255, 0.1)"
                  borderRadius="full"
                />
                <Box
                  position="absolute"
                  bottom="20%"
                  left="10%"
                  w="60px"
                  h="60px"
                  bg="rgba(255, 255, 255, 0.1)"
                  borderRadius="var(--radius-xl)"
                  transform="rotate(45deg)"
                />

                <VStack spacing="6" zIndex="10">
                  <Text
                    fontSize="4xl"
                    fontWeight="800"
                    textAlign="center"
                    className="text-display-xl"
                  >
                    Choppi
                  </Text>
                  <Text
                    fontSize="lg"
                    textAlign="center"
                    opacity="0.9"
                    lineHeight="1.6"
                    maxW="300px"
                  >
                    AI 기반 스마트 매칭으로 완벽한 식사 파트너를 만나보세요
                  </Text>
                  <Box w="60px" h="2px" bg="white" opacity="0.7" />
                  <VStack spacing="2">
                    <Text fontSize="sm" opacity="0.8" textAlign="center">
                      ✨ 검증된 사용자들과 안전한 만남
                    </Text>
                    <Text fontSize="sm" opacity="0.8" textAlign="center">
                      🎯 맞춤형 AI 추천 시스템
                    </Text>
                    <Text fontSize="sm" opacity="0.8" textAlign="center">
                      💼 프리미엄 비즈니스 네트워킹
                    </Text>
                  </VStack>
                </VStack>
              </VStack>

              {/* Right Panel - Login Form */}
              <VStack
                flex="1"
                bg="var(--surface-primary)"
                spacing="0"
                p={{ base: "8", md: "12" }}
                justify="center"
                position="relative"
              >
                {/* Back Button */}
                <IconButton
                  position="absolute"
                  top="6"
                  left="6"
                  variant="ghost"
                  size="sm"
                  icon={<BsArrowLeft />}
                  aria-label="뒤로가기"
                  onClick={() => navigate("/")}
                  color="var(--text-secondary)"
                  _hover={{ bg: "var(--neutral-100)" }}
                />

                <VStack spacing="8" w="100%" maxW="360px">
                  {/* Header */}
                  <VStack spacing="3" textAlign="center">
                    <Text
                      fontSize="2xl"
                      fontWeight="700"
                      color="var(--text-primary)"
                      className="text-display-md"
                    >
                      로그인
                    </Text>
                    <Text
                      fontSize="sm"
                      color="var(--text-secondary)"
                      lineHeight="1.5"
                    >
                      계정에 로그인하여 새로운 인연을 시작하세요
                    </Text>
                  </VStack>

                  {/* Social Login Buttons */}
                  <VStack spacing="3" w="100%">
                    <Button
                      w="100%"
                      h="12"
                      bg="white"
                      border="1px solid var(--border-primary)"
                      color="var(--text-primary)"
                      borderRadius="var(--radius-xl)"
                      leftIcon={<BsGoogle />}
                      fontSize="sm"
                      fontWeight="500"
                      className="interactive-scale"
                      _hover={{
                        bg: "var(--neutral-50)",
                        borderColor: "var(--border-secondary)"
                      }}
                      onClick={() => handleSocialLogin("Google")}
                    >
                      Google로 계속하기
                    </Button>

                    <Button
                      w="100%"
                      h="12"
                      bg="black"
                      color="white"
                      borderRadius="var(--radius-xl)"
                      leftIcon={<BsApple />}
                      fontSize="sm"
                      fontWeight="500"
                      className="interactive-scale"
                      _hover={{ bg: "gray.800" }}
                      onClick={() => handleSocialLogin("Apple")}
                    >
                      Apple로 계속하기
                    </Button>
                  </VStack>

                  {/* Divider */}
                  <HStack w="100%" spacing="4">
                    <Divider borderColor="var(--border-primary)" />
                    <Text fontSize="sm" color="var(--text-tertiary)" whiteSpace="nowrap">
                      또는
                    </Text>
                    <Divider borderColor="var(--border-primary)" />
                  </HStack>

                  {/* Login Form */}
                  <form onSubmit={handleLogin} style={{ width: "100%" }}>
                    <VStack spacing="5" w="100%">
                      {/* Email Input */}
                      <FormControl isInvalid={!!errors.email}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="500"
                          color="var(--text-primary)"
                          mb="2"
                        >
                          이메일
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="var(--text-tertiary)" />
                          </InputLeftElement>
                          <Input
                            type="email"
                            placeholder="이메일을 입력하세요"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            h="12"
                            bg="var(--surface-primary)"
                            border="1px solid var(--border-primary)"
                            borderRadius="var(--radius-xl)"
                            fontSize="sm"
                            _placeholder={{ color: "var(--text-tertiary)" }}
                            _focus={{
                              borderColor: "var(--brand-primary)",
                              boxShadow: "var(--focus-ring)",
                            }}
                          />
                        </InputGroup>
                        <FormErrorMessage fontSize="xs" mt="1">
                          {errors.email}
                        </FormErrorMessage>
                      </FormControl>

                      {/* Password Input */}
                      <FormControl isInvalid={!!errors.password}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="500"
                          color="var(--text-primary)"
                          mb="2"
                        >
                          비밀번호
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <BsLock color="var(--text-tertiary)" />
                          </InputLeftElement>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            h="12"
                            bg="var(--surface-primary)"
                            border="1px solid var(--border-primary)"
                            borderRadius="var(--radius-xl)"
                            fontSize="sm"
                            _placeholder={{ color: "var(--text-tertiary)" }}
                            _focus={{
                              borderColor: "var(--brand-primary)",
                              boxShadow: "var(--focus-ring)",
                            }}
                          />
                          <InputRightElement>
                            <IconButton
                              variant="ghost"
                              size="sm"
                              icon={showPassword ? <BsEyeSlash /> : <BsEye />}
                              onClick={() => setShowPassword(!showPassword)}
                              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                              color="var(--text-tertiary)"
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage fontSize="xs" mt="1">
                          {errors.password}
                        </FormErrorMessage>
                      </FormControl>

                      {/* Remember Me & Forgot Password */}
                      <HStack justify="space-between" w="100%">
                        <Checkbox
                          size="sm"
                          colorScheme="blue"
                          isChecked={formData.rememberMe}
                          onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                        >
                          <Text fontSize="sm" color="var(--text-secondary)">
                            로그인 상태 유지
                          </Text>
                        </Checkbox>
                        <Link
                          fontSize="sm"
                          color="var(--brand-primary)"
                          fontWeight="500"
                          _hover={{ textDecoration: "underline" }}
                          onClick={() => navigate("/find")}
                        >
                          비밀번호 찾기
                        </Link>
                      </HStack>

                      {/* Login Button */}
                      <Button
                        type="submit"
                        w="100%"
                        h="12"
                        bg="var(--brand-primary)"
                        color="white"
                        borderRadius="var(--radius-xl)"
                        fontSize="sm"
                        fontWeight="600"
                        isLoading={loading}
                        loadingText="로그인 중..."
                        className="interactive-scale"
                        _hover={{ bg: "var(--brand-primary-700)" }}
                        _active={{ transform: "scale(0.98)" }}
                      >
                        로그인
                      </Button>
                    </VStack>
                  </form>

                  {/* Sign Up Link */}
                  <HStack spacing="1" fontSize="sm">
                    <Text color="var(--text-secondary)">
                      아직 계정이 없으신가요?
                    </Text>
                    <Link
                      color="var(--brand-primary)"
                      fontWeight="500"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => navigate("/signup")}
                    >
                      회원가입
                    </Link>
                  </HStack>
                </VStack>
              </VStack>
            </HStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PremiumLogin;