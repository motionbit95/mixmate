import {
  Stack,
  Icon,
  Text,
  Box,
  Button,
  Container,
  Center,
  Image,
  HStack,
} from "@chakra-ui/react";
import { MdChevronLeft, MdChatBubbleOutline } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineTicket } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";
import { black, gray_300, gray_400, gray_500, gray_700, gray_800, gray_900, theme_primary_color, white } from "../App";

export const Payment = () => {
  const navigate = useNavigate();
  return (
    <Container py="50px">
      <Stack
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        maxWidth="100%"
        background={white}
      >
        <Stack className="header">
          <Container>
            <Stack
              padding="10px"
              direction="row"
              justify="space-between"
              align="flex-start"
              spacing="10px"
              overflow="hidden"
              alignSelf="stretch"
            >
              <Icon
                as={MdChevronLeft}
                onClick={() => navigate(-1)}
                boxSize={"24px"}
              />
              <Text
                fontFamily="Pretendard"
                fontWeight="Bold"
                fontSize="18px"
                color={black}
                textAlign="center"
              >
                밥친구 프로필
              </Text>
              <Box height="26px"></Box>
            </Stack>
          </Container>
        </Stack>
        <Stack
          padding="10px"
          justify="center"
          align="flex-start"
          spacing="10px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Stack
            padding="10px"
            justify="flex-start"
            align="flex-start"
            spacing="15px"
            overflow="hidden"
            alignSelf="stretch"
          >
            <Text
              fontFamily="Inter"
              fontWeight="semibold"
              fontSize="18px"
              color={gray_900}
            >
              신청 전 유의사항
            </Text>
            <Text
              fontFamily="Inter"
              lineHeight="1.5"
              fontWeight="medium"
              fontSize="16px"
              color={gray_800}
              alignSelf="stretch"
            >
              <span>본 신청권의 유효기간은 구매일로부터 2주입니다.</span>
              <br />
              <Box as="span" fontWeight="bold" color={theme_primary_color}>
                유효기간 내에 신청권 사용을 완료
              </Box>
              <Box as="span">해주세요.</Box>
            </Text>
            <Text
              fontFamily="Inter"
              fontWeight="semibold"
              fontSize="18px"
              color={black}
            >
              진행과정
            </Text>
            <Stack
              padding="10px"
              borderRadius="10px"
              justify="flex-start"
              align="flex-start"
              spacing="15px"
              alignSelf="stretch"
              background={gray_300}
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Icon as={MdChatBubbleOutline} />
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  결제 후 생성된 방에서 밥친구와 메시지
                </Text>
              </Stack>
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Icon as={AiOutlineCalendar} />
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  밥친구와 일정 조율 및 약속 장소 확정
                </Text>
              </Stack>
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Icon as={HiOutlineTicket} />
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  새로운 인연과 즐거운 식사
                </Text>
              </Stack>
            </Stack>
            <Text
              fontFamily="Inter"
              fontWeight="semibold"
              fontSize="18px"
              color={black}
            >
              최종 결제 금액
            </Text>
            <Stack
              padding="10px"
              borderRadius="10px"
              justify="flex-start"
              align="flex-start"
              spacing="6px"
              alignSelf="stretch"
              background={gray_300}
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  정상가
                </Text>
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                  textAlign="end"
                >
                  20,000원
                </Text>
              </Stack>
              <HorizonLine />
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  쿠폰 할인
                </Text>
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="medium"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                  textAlign="end"
                >
                  0원
                </Text>
              </Stack>
              <HorizonLine />
              <Stack
                direction="row"
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="bold"
                  fontSize="14px"
                  color={gray_800}
                  flex="1"
                >
                  결제 예정 금액
                </Text>
                <Text
                  fontFamily="Inter"
                  lineHeight="1.71"
                  fontWeight="bold"
                  fontSize="14px"
                  color={theme_primary_color}
                  flex="1"
                  textAlign="end"
                >
                  20,000원
                </Text>
              </Stack>
            </Stack>
            <Text
              fontFamily="Inter"
              fontWeight="semibold"
              fontSize="18px"
              color={black}
            >
              결제 수단 선택
            </Text>
            <Stack
              w="100%"
              // padding="10px"
              // direction="row"
              // justify="flex-start"
              // align="flex-end"
              // spacing="10px"
              // overflow="hidden"
              // alignSelf="stretch"
            >
              <HStack w="100%">
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  _hover={{
                    backgroundColor: gray_400,
                    borderColor: theme_primary_color,
                  }}
                >
                  <Image src={require("../assets/kakao.png")} h="24px"></Image>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  _hover={{
                    backgroundColor: gray_400,
                    borderColor: {theme_primary_color},
                  }}
                >
                  <Image src={require("../assets/toss.png")} h="50px"></Image>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  _hover={{
                    backgroundColor: gray_400,
                    borderColor: theme_primary_color,
                  }}
                >
                  <Image src={require("../assets/naver.png")} h="24px"></Image>
                </Center>
              </HStack>

              <HStack w="100%">
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  _hover={{
                    backgroundColor: gray_400,
                    borderColor: {theme_primary_color},
                  }}
                >
                  <Image
                    src={require("../assets/samsung.png")}
                    h="24px"
                  ></Image>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  _hover={{
                    backgroundColor: gray_400,
                    borderColor: theme_primary_color,
                  }}
                >
                  <Text
                    fontFamily="SF Pro"
                    lineHeight="1.5"
                    fontWeight="semibold"
                    fontSize="16px"
                    color={gray_700}
                  >
                    신용카드
                  </Text>
                </Center>
                <Center
                  borderRadius="10px"
                  borderColor={gray_500}
                  borderStartWidth="1.5px"
                  borderEndWidth="1.5px"
                  borderTopWidth="1.5px"
                  borderBottomWidth="1.5px"
                  width="100%"
                  height="50px"
                  _hover={{
                    backgroundColor: gray_400,
                    borderColor: {theme_primary_color},
                  }}
                >
                  <Text
                    fontFamily="SF Pro"
                    lineHeight="1.5"
                    fontWeight="semibold"
                    fontSize="16px"
                    color={gray_700}
                  >
                    휴대폰결제
                  </Text>
                </Center>
              </HStack>

              <Center
                borderRadius="10px"
                borderColor={gray_500}
                borderStartWidth="1.5px"
                borderEndWidth="1.5px"
                borderTopWidth="1.5px"
                borderBottomWidth="1.5px"
                width="32%"
                height="50px"
                _hover={{
                  backgroundColor: gray_400,
                  borderColor: theme_primary_color,
                }}
              >
                <Text
                  fontFamily="SF Pro"
                  lineHeight="1.25"
                  fontWeight="semibold"
                  fontSize="16px"
                  color={gray_700}
                  textAlign="center"
                >
                  실시간 계좌이체
                </Text>
              </Center>
            </Stack>
            <Button colorScheme="blue" height="40px" alignSelf="stretch">
              결제하기
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
