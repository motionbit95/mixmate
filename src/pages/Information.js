import {
  Stack,
  Text,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Box,
  Button,
  Checkbox,
  IconButton,
  Container,
  Radio,
  RadioGroup,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Information = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Stack
        paddingY="10px"
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        width="393px"
        height="852px"
        maxWidth="100%"
        background="#FFFFFF"
      >
        <Stack
          paddingX="10px"
          direction="row"
          justify="flex-start"
          align="flex-start"
          spacing="0px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Stack size="lg" width="40px" height="40px" />
        </Stack>
        <Stack
          paddingX="20px"
          paddingY="10px"
          direction="row"
          justify="center"
          align="center"
          spacing="10px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <Stack justify="flex-start" align="center" spacing="50px" flex="1">
            <Stack
              justify="flex-start"
              align="center"
              spacing="10px"
              alignSelf="stretch"
            >
              <Stack
                direction="row"
                justify="flex-start"
                align="center"
                spacing="10px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="SF Pro"
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="14px"
                  color="#000000"
                  width="90px"
                >
                  식사권 금액
                </Text>
                <Select placeholder="2만원" height="40px" flex="1" />
              </Stack>
              <Stack
                justify="center"
                align="center"
                spacing="10px"
                alignSelf="stretch"
              >
                <Stack
                  direction="row"
                  justify="flex-start"
                  align="center"
                  spacing="10px"
                  alignSelf="stretch"
                >
                  <Text
                    fontFamily="SF Pro"
                    lineHeight="1.43"
                    fontWeight="regular"
                    fontSize="14px"
                    color="#000000"
                    width="90px"
                  >
                    식사 가능 동네
                  </Text>
                  <Select
                    placeholder="서울시"
                    size="sm"
                    height="32px"
                    flex="1"
                  />
                  <Select
                    placeholder="강남구"
                    size="sm"
                    height="32px"
                    flex="1"
                  />
                </Stack>
                <Stack
                  paddingStart="100px"
                  paddingEnd="10px"
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  overflow="hidden"
                  alignSelf="stretch"
                >
                  <Tag size="sm" colorScheme="blue">
                    <TagLabel>서초구</TagLabel>
                    <TagCloseButton />
                  </Tag>
                  <Tag size="sm" colorScheme="blue">
                    <TagLabel>강남구</TagLabel>
                    <TagCloseButton />
                  </Tag>
                </Stack>
              </Stack>
              <Stack
                justify="center"
                align="center"
                spacing="10px"
                alignSelf="stretch"
              >
                <Stack
                  direction="row"
                  justify="flex-start"
                  align="center"
                  spacing="10px"
                  alignSelf="stretch"
                >
                  <Text
                    fontFamily="SF Pro"
                    lineHeight="1.43"
                    fontWeight="regular"
                    fontSize="14px"
                    color="#000000"
                    width="90px"
                  >
                    좋아하는 음식
                  </Text>
                  <Input placeholder size="sm" height="32px" flex="1" />
                  <Box>
                    <IconButton icon={<MdAdd />} size={"sm"} />
                  </Box>
                </Stack>
                <Stack
                  paddingStart="100px"
                  paddingEnd="10px"
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  overflow="hidden"
                  alignSelf="stretch"
                >
                  <Tag size="sm" colorScheme="blue">
                    <TagLabel>김치찌개</TagLabel>
                    <TagCloseButton />
                  </Tag>
                  <Tag size="sm" colorScheme="blue">
                    <TagLabel>된장찌개</TagLabel>
                    <TagCloseButton />
                  </Tag>
                </Stack>
              </Stack>
              <Stack
                justify="center"
                align="flex-start"
                spacing="10px"
                height="62px"
                alignSelf="stretch"
              >
                <Text
                  fontFamily="SF Pro"
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="14px"
                  color="#000000"
                  width="90px"
                >
                  정산계좌
                </Text>
                <Stack
                  direction="row"
                  justify="center"
                  align="flex-start"
                  spacing="10px"
                  flex="1"
                  alignSelf="stretch"
                >
                  <Select
                    placeholder="우리"
                    size="sm"
                    width="90px"
                    height="32px"
                  />
                  <Input placeholder size="sm" flex="1" alignSelf="stretch" />
                </Stack>
              </Stack>
              <Stack
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                alignSelf="stretch"
              >
                <Stack
                  direction="row"
                  justify="flex-start"
                  align="flex-start"
                  spacing="77px"
                  alignSelf="stretch"
                >
                  <Text
                    fontFamily="SF Pro"
                    lineHeight="1.43"
                    fontWeight="regular"
                    fontSize="14px"
                    color="#000000"
                  >
                    성별
                  </Text>
                  <RadioGroup>
                    <HStack>
                      <Radio value={"남"} w="100px">
                        남
                      </Radio>
                      <Radio value={"여"} w="100px">
                        여
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </Stack>
              </Stack>
              <Flex
                w="100%"
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Checkbox
                  defaultChecked
                  variant="blue"
                  // width="256.42px"
                  maxWidth="100%"
                >
                  이용약관에 동의합니다.
                </Checkbox>
                <Text
                  fontFamily="SF Pro"
                  lineHeight="1.43"
                  fontWeight="regular"
                  fontSize="14px"
                  color="#8C8C8C"
                  // width="108.27px"
                  textAlign="end"
                >
                  자세히보기
                </Text>
              </Flex>
            </Stack>
            <Button
              colorScheme="blue"
              height="40px"
              alignSelf="stretch"
              onClick={() => navigate("/")}
            >
              회원가입하기
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
