import {
  Stack,
  Icon,
  Text,
  Tabs,
  Tab,
  TabPanels,
  Avatar,
  Button,
  Container,
  TabPanel,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  TabList,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  ModalContent,
  ModalBody,
  Flex,
  Textarea,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { BsStarFill, BsFillStarFill } from "react-icons/bs";
import { TopHeader } from "../component/TopHeader";
import HorizonLine from "../component/HorizontalLine";
import { black, gray_300, gray_600, gray_800, gray_900, white } from "../App";
import { useEffect, useState } from "react";
import { auth } from "../db/firebase_config";
import { get_doc_info } from "../js/Database";
import {
  matching_add,
  matching_get_list,
  matching_set,
} from "../js/MatchingAPI";
import { HorizontalScrollBox } from "../component/HorizontalScrollBox";

export const Details = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal_type, setModalType] = useState();
  const [matching_refund_message, setRefundMessage] = useState();

  // 매칭 받을 테스트 계정 => motionbit.dev@gmail.com
  //# local state 로 받아오도록 수정 예정
  const test_uid = "6ANvpNStOsUj7kfehPPETnUhBHy2";
  const [my_uid, setUID] = useState();

  // 테스트용 매칭 id 저장 변수
  const [test_matching_id, setMatchingId] = useState();

  useEffect(() => {
    get_matching_list();
  });

  async function get_matching_list() {
    // 현재 로그인 한 고객의 계정을 가지고 옵니다.
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        console.log(user.uid);
        let user_info = await get_doc_info("user", "user_id", user.uid);
        console.log(user_info);

        // uid를 저장합니다.
        if (!my_uid) {
          setUID(user.uid);
        }

        // 매칭 리스트에서 내가 받은 신청인지 보낸 신청인지 구분해서 저장해둡니다.
        let send_list = await matching_get_list(0);
        let receive_list = await matching_get_list(1);
        console.log("send_list", send_list, "recieve_list", receive_list);
      }
    });
  }

  async function onClickRefundMatching() {
    // 거절 모달 띄우기
    setModalType("refund");
    onOpen();
  }

  async function onClickRefundMessage(message) {
    if (window.confirm("매칭을 거절하시겠습니까?")) {
      await matching_set(test_matching_id, {
        matching_state: 400, // 매칭 거절 코드
        matching_refund_message: message,
      });
      onClose();
    }
  }

  async function onClickCompleteMatching() {
    if (window.confirm("매칭을 확정지으시겠습니까?")) {
      await matching_set(test_matching_id, {
        matching_state: 2, // 매칭 완료 코드
      });
    }
    window.location.reload();
  }

  function ReviewContent() {
    return (
      <Stack
        paddingX="30px"
        justify="flex-start"
        align="center"
        spacing="40px"
        width="393px"
        maxWidth="100%"
      >
        <Text
          lineHeight="1.31"
          fontWeight="semibold"
          fontSize="16px"
          letterSpacing="-0.32px"
          color={black}
          textAlign="center"
        >
          후기 평점을 남겨주세요!
        </Text>
        <Box>
          <Icon as={BsFillStarFill} />
          <Icon as={BsFillStarFill} />
          <Icon as={BsFillStarFill} />
          <Icon as={BsFillStarFill} />
          <Icon as={BsFillStarFill} />
        </Box>
        <Stack
          borderRadius="6px"
          borderColor="gray.200"
          borderStartWidth="1px"
          borderEndWidth="1px"
          borderTopWidth="1px"
          borderBottomWidth="1px"
          width="320px"
          height="219px"
          maxWidth="100%"
          background="white"
        />
        <Button size="sm" colorScheme="blue" height="32px" alignSelf="stretch">
          후기작성하기
        </Button>
      </Stack>
    );
  }

  function RefundContent() {
    const [message, setMessage] = useState("매칭 신청 폭주");
    return (
      <Stack width="393px" height="852px" maxWidth="100%" background="#FFFFFF">
        <Stack size="lg" width="40px" height="40px" />
        <Stack
          paddingX="30px"
          justify="flex-start"
          align="center"
          spacing="40px"
          width="393px"
          maxWidth="100%"
        >
          <Text
            lineHeight="1.31"
            fontWeight="semibold"
            fontSize="16px"
            letterSpacing="-0.32px"
            color="#000000"
            textAlign="center"
          >
            거절 사유를 입력하세요.
          </Text>
          <RadioGroup
            w="100%"
            defaultValue={message}
            onChange={(value) => setMessage(value)}
          >
            <Stack>
              <Radio value="매칭 신청 폭주">매칭 신청 폭주</Radio>
              <Radio value="신청자 사정의 취소">신청자 사정의 취소</Radio>
              <Radio value="부적절한 언행">부적절한 언행</Radio>
              <Radio value="일정합의 불가">일정합의 불가</Radio>
              <Radio value="">직접입력</Radio>
              <Textarea
                placeholder="거절 사유룰 입력해주세요."
                onChange={(e) => setMessage(e.target.value)}
              />
            </Stack>
          </RadioGroup>
          <Button
            size="sm"
            colorScheme="blue"
            height="32px"
            alignSelf="stretch"
            onClick={() => onClickRefundMessage(message)}
          >
            신청 거절하기
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Container py={"50px"}>
      <Box>
        <Button>후기작성</Button>
        <Button>채팅하기</Button>
        <Button>다시신청하기</Button>
      </Box>
      <Stack
        justify="flex-start"
        align="center"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        maxWidth="100%"
        background={white}
      >
        <TopHeader title={"신청내역"} />
        <Stack
          paddingX="10px"
          paddingBottom="10px"
          justify="center"
          align="flex-start"
          spacing="10px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Tabs w="100%">
            <TabList>
              <Tab w={"100%"}>진행</Tab>
              <Tab w={"100%"}>종료</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack
                  padding="10px"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  overflow="hidden"
                  alignSelf="stretch"
                  background={white}
                >
                  <Text
                    lineHeight="1.56"
                    fontWeight="bold"
                    fontSize="18px"
                    color={black}
                    textAlign="center"
                  >
                    결제완료
                  </Text>
                  <Stack
                    paddingY="10px"
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="20px"
                    overflow="hidden"
                    alignSelf="stretch"
                  >
                    <Avatar name="TA" src=" " size="lg" />
                    <Stack
                      justify="flex-start"
                      align="flex-start"
                      spacing="10px"
                      overflow="hidden"
                      height="78px"
                      flex="1"
                    >
                      <Stack
                        direction="row"
                        justify="space-between"
                        align="center"
                        spacing="5px"
                        overflow="hidden"
                        height="19px"
                        alignSelf="stretch"
                      >
                        <Stack
                          direction="row"
                          justify="flex-start"
                          align="center"
                          spacing="5px"
                        >
                          <Text
                            fontWeight="bold"
                            fontSize="16px"
                            color={black}
                            textAlign="center"
                          >
                            송*혁
                          </Text>
                          <Icon as={BsStarFill} />
                          <Text
                            fontWeight="medium"
                            fontSize="16px"
                            color={black}
                            textAlign="center"
                          >
                            5.0
                          </Text>
                          <Text
                            fontWeight="medium"
                            fontSize="14px"
                            color={gray_600}
                            textAlign="center"
                          >
                            (169)
                          </Text>
                        </Stack>
                        <Text
                          fontWeight="medium"
                          fontSize="14px"
                          textAlign="center"
                        >
                          140m
                        </Text>
                      </Stack>
                      <Text
                        lineHeight="1.42"
                        fontWeight="medium"
                        fontSize="12px"
                        color={black}
                        alignSelf="stretch"
                      >
                        나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 : 서울
                        성북구, 역삼동 좋아하는 취미: 테니스, 골프
                      </Text>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    overflow="hidden"
                    alignSelf="stretch"
                    background={white}
                  >
                    <Button size="sm" height="32px" flex="1">
                      채팅하기
                    </Button>
                    <Button
                      onClick={onClickCompleteMatching}
                      size="sm"
                      colorScheme="blue"
                      height="32px"
                      flex="1"
                    >
                      구매확정하기
                    </Button>
                  </Stack>
                </Stack>
                <HorizonLine />
                <Stack
                  padding="10px"
                  justify="flex-start"
                  align="flex-start"
                  spacing="10px"
                  overflow="hidden"
                  alignSelf="stretch"
                  background={white}
                >
                  <Text
                    lineHeight="1.56"
                    fontWeight="bold"
                    fontSize="18px"
                    color={black}
                    textAlign="center"
                  >
                    매칭신청
                  </Text>
                  <Stack
                    paddingY="10px"
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="20px"
                    overflow="hidden"
                    alignSelf="stretch"
                  >
                    <Avatar name="TA" src=" " size="lg" />
                    <Stack
                      justify="flex-start"
                      align="flex-start"
                      spacing="10px"
                      overflow="hidden"
                      height="78px"
                      flex="1"
                    >
                      <Stack
                        direction="row"
                        justify="space-between"
                        align="center"
                        spacing="5px"
                        overflow="hidden"
                        height="19px"
                        alignSelf="stretch"
                      >
                        <Stack
                          direction="row"
                          justify="flex-start"
                          align="center"
                          spacing="5px"
                        >
                          <Text
                            fontWeight="bold"
                            fontSize="16px"
                            color={black}
                            textAlign="center"
                          >
                            송*혁
                          </Text>
                          <Icon as={BsStarFill} />
                          <Text
                            fontWeight="medium"
                            fontSize="16px"
                            color={black}
                            textAlign="center"
                          >
                            5.0
                          </Text>
                          <Text
                            fontWeight="medium"
                            fontSize="14px"
                            color={gray_600}
                            textAlign="center"
                          >
                            (169)
                          </Text>
                        </Stack>
                        <Text
                          fontWeight="medium"
                          fontSize="14px"
                          textAlign="center"
                        >
                          140m
                        </Text>
                      </Stack>
                      <Text
                        lineHeight="1.42"
                        fontWeight="medium"
                        fontSize="12px"
                        color={black}
                        alignSelf="stretch"
                      >
                        나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 : 서울
                        성북구, 역삼동 좋아하는 취미: 테니스, 골프
                      </Text>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    overflow="hidden"
                    alignSelf="stretch"
                    background={white}
                  >
                    <Button size="sm" height="32px" flex="1">
                      채팅하기
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      height="32px"
                      flex="1"
                      onClick={onClickRefundMatching}
                    >
                      거절하기
                    </Button>
                  </Stack>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack
                  // paddingX="10px"
                  paddingBottom="10px"
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
                    spacing="10px"
                    overflow="hidden"
                    alignSelf="stretch"
                    background={white}
                  >
                    <Text
                      lineHeight="1.56"
                      fontWeight="bold"
                      fontSize="18px"
                      color={black}
                      textAlign="center"
                    >
                      구매확정완료
                    </Text>
                    <Stack
                      paddingY="10px"
                      direction="row"
                      justify="flex-start"
                      align="center"
                      spacing="20px"
                      overflow="hidden"
                      alignSelf="stretch"
                    >
                      <Avatar name="TA" src=" " size="lg" />
                      <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                        overflow="hidden"
                        height="78px"
                        flex="1"
                      >
                        <Stack
                          direction="row"
                          justify="space-between"
                          align="center"
                          spacing="5px"
                          overflow="hidden"
                          height="19px"
                          alignSelf="stretch"
                        >
                          <Stack
                            direction="row"
                            justify="flex-start"
                            align="center"
                            spacing="5px"
                          >
                            <Text
                              fontWeight="bold"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              송*혁
                            </Text>
                            <Icon as={BsStarFill} />
                            <Text
                              fontWeight="medium"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              5.0
                            </Text>
                            <Text
                              fontWeight="medium"
                              fontSize="14px"
                              color={gray_600}
                              textAlign="center"
                            >
                              (169)
                            </Text>
                          </Stack>
                          <Text
                            fontWeight="medium"
                            fontSize="14px"
                            textAlign="center"
                          >
                            140m
                          </Text>
                        </Stack>
                        <Text
                          lineHeight="1.42"
                          fontWeight="medium"
                          fontSize="12px"
                          color={black}
                          alignSelf="stretch"
                        >
                          나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 :
                          서울 성북구, 역삼동 좋아하는 취미: 테니스, 골프
                        </Text>
                      </Stack>
                    </Stack>
                    <Stack
                      direction="row"
                      justify="flex-start"
                      align="flex-start"
                      spacing="10px"
                      overflow="hidden"
                      alignSelf="stretch"
                      background={white}
                    >
                      <Button size="sm" height="32px" flex="1">
                        다시 신청하기
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        height="32px"
                        flex="1"
                        onClick={() => {
                          setModalType("review");
                          onOpen();
                        }}
                      >
                        후기작성하기
                      </Button>
                    </Stack>
                  </Stack>
                  <HorizonLine />
                  <Stack
                    padding="10px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    overflow="hidden"
                    alignSelf="stretch"
                    background={white}
                  >
                    <Text
                      lineHeight="1.56"
                      fontWeight="bold"
                      fontSize="18px"
                      color={black}
                      textAlign="center"
                    >
                      매칭거절
                    </Text>
                    <Stack
                      paddingY="10px"
                      direction="row"
                      justify="flex-start"
                      align="center"
                      spacing="20px"
                      overflow="hidden"
                      alignSelf="stretch"
                    >
                      <Avatar name="TA" src=" " size="lg" />
                      <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                        overflow="hidden"
                        height="78px"
                        flex="1"
                      >
                        <Stack
                          direction="row"
                          justify="space-between"
                          align="center"
                          spacing="5px"
                          overflow="hidden"
                          height="19px"
                          alignSelf="stretch"
                        >
                          <Stack
                            direction="row"
                            justify="flex-start"
                            align="center"
                            spacing="5px"
                          >
                            <Text
                              fontWeight="bold"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              송*혁
                            </Text>
                            <Icon as={BsStarFill} />
                            <Text
                              fontWeight="medium"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              5.0
                            </Text>
                            <Text
                              fontWeight="medium"
                              fontSize="14px"
                              color={gray_600}
                              textAlign="center"
                            >
                              (169)
                            </Text>
                          </Stack>
                          <Text
                            fontWeight="medium"
                            fontSize="14px"
                            textAlign="center"
                          >
                            140m
                          </Text>
                        </Stack>
                        <Text
                          lineHeight="1.42"
                          fontWeight="medium"
                          fontSize="12px"
                          color={black}
                          alignSelf="stretch"
                        >
                          나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 :
                          서울 성북구, 역삼동 좋아하는 취미: 테니스, 골프
                        </Text>
                      </Stack>
                    </Stack>
                    <Text
                      lineHeight="1.43"
                      fontWeight="semibold"
                      fontSize="14px"
                      color={black}
                      alignSelf="stretch"
                    >
                      <span>거절사유</span>
                      <Box
                        as="span"
                        lineHeight="1.67"
                        fontWeight="regular"
                        fontSize="12px"
                      >
                        매칭에 감사드립니다만, 현재 지리적으로 너무 멀어 만남이
                        어려울 것으로 판단되어 거절하게 되었습니다. 미래에 더
                        나은 조건에서 만남을 찾기를 기원합니다.
                      </Box>
                    </Text>
                    <Accordion width="100%" background={gray_300}>
                      <AccordionItem width="100%">
                        <AccordionButton
                          width="100%"
                          height="44px"
                          alignSelf="stretch"
                        >
                          <Text
                            lineHeight="1.71"
                            fontWeight="regular"
                            fontSize="14px"
                            color={gray_900}
                            flex="1"
                          >
                            결제 취소 안내
                          </Text>
                          <Icon />
                        </AccordionButton>
                        <AccordionPanel>
                          <Text
                            lineHeight="1.67"
                            fontWeight="regular"
                            fontSize="12px"
                            whiteSpace="pre-wrap"
                            color={gray_800}
                            maxWidth="100%"
                          >
                            안녕하세요,식사회입니다. 고객님의 결제 취소에 관한
                            안내드립니다. 결제 취소 요청이 정상적으로
                            접수되었습니다. 아래는 취소에 관한 상세 정보입니다.
                            <br />
                            주문번호: 192930
                            <br />
                            취소 금액: 20,000원
                            <br />
                            취소 일시: 2024.01.16
                            <br />
                            취소된 금액은 최대 3 영업일 이내에 원래 결제
                            수단으로 환불될 예정입니다. 추가적인 궁금한 사항이나
                            도움이 필요하신 경우, 언제든지 고객센터로 문의해
                            주세요. 감사합니다. 식사회 드림
                          </Text>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Stack>
                  <HorizonLine />
                  <Stack
                    padding="10px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    overflow="hidden"
                    alignSelf="stretch"
                    background={white}
                  >
                    <Text
                      lineHeight="1.56"
                      fontWeight="bold"
                      fontSize="18px"
                      color={black}
                      textAlign="center"
                    >
                      매칭완료
                    </Text>
                    <Stack
                      paddingY="10px"
                      direction="row"
                      justify="flex-start"
                      align="center"
                      spacing="20px"
                      overflow="hidden"
                      alignSelf="stretch"
                    >
                      <Avatar name="TA" src=" " size="lg" />
                      <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                        overflow="hidden"
                        height="78px"
                        flex="1"
                      >
                        <Stack
                          direction="row"
                          justify="space-between"
                          align="center"
                          spacing="5px"
                          overflow="hidden"
                          height="19px"
                          alignSelf="stretch"
                        >
                          <Stack
                            direction="row"
                            justify="flex-start"
                            align="center"
                            spacing="5px"
                          >
                            <Text
                              fontWeight="bold"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              송*혁
                            </Text>
                            <Icon as={BsStarFill} />
                            <Text
                              fontWeight="medium"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              5.0
                            </Text>
                            <Text
                              fontWeight="medium"
                              fontSize="14px"
                              color={gray_600}
                              textAlign="center"
                            >
                              (169)
                            </Text>
                          </Stack>
                          <Text
                            fontWeight="medium"
                            fontSize="14px"
                            textAlign="center"
                          >
                            140m
                          </Text>
                        </Stack>
                        <Text
                          lineHeight="1.42"
                          fontWeight="medium"
                          fontSize="12px"
                          color={black}
                          alignSelf="stretch"
                        >
                          나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 :
                          서울 성북구, 역삼동 좋아하는 취미: 테니스, 골프
                        </Text>
                      </Stack>
                    </Stack>
                    <Text
                      lineHeight="1.43"
                      fontWeight="semibold"
                      fontSize="14px"
                      color={black}
                      alignSelf="stretch"
                    >
                      <span>후기</span>
                      <Box
                        as="span"
                        lineHeight="1.67"
                        fontWeight="regular"
                        fontSize="12px"
                      >
                        미작성
                      </Box>
                    </Text>
                  </Stack>
                  <HorizonLine />
                  <Stack
                    padding="10px"
                    justify="flex-start"
                    align="flex-start"
                    spacing="10px"
                    overflow="hidden"
                    alignSelf="stretch"
                    background={white}
                  >
                    <Text
                      lineHeight="1.56"
                      fontWeight="bold"
                      fontSize="18px"
                      color={black}
                      textAlign="center"
                    >
                      매칭완료
                    </Text>
                    <Stack
                      paddingY="10px"
                      direction="row"
                      justify="flex-start"
                      align="center"
                      spacing="20px"
                      overflow="hidden"
                      alignSelf="stretch"
                    >
                      <Avatar name="TA" src=" " size="lg" />
                      <Stack
                        justify="flex-start"
                        align="flex-start"
                        spacing="10px"
                        overflow="hidden"
                        height="78px"
                        flex="1"
                      >
                        <Stack
                          direction="row"
                          justify="space-between"
                          align="center"
                          spacing="5px"
                          overflow="hidden"
                          height="19px"
                          alignSelf="stretch"
                        >
                          <Stack
                            direction="row"
                            justify="flex-start"
                            align="center"
                            spacing="5px"
                          >
                            <Text
                              fontWeight="bold"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              송*혁
                            </Text>
                            <Icon as={BsStarFill} />
                            <Text
                              fontWeight="medium"
                              fontSize="16px"
                              color={black}
                              textAlign="center"
                            >
                              5.0
                            </Text>
                            <Text
                              fontWeight="medium"
                              fontSize="14px"
                              color={gray_600}
                              textAlign="center"
                            >
                              (169)
                            </Text>
                          </Stack>
                          <Text
                            fontWeight="medium"
                            fontSize="14px"
                            textAlign="center"
                          >
                            140m
                          </Text>
                        </Stack>
                        <Text
                          lineHeight="1.42"
                          fontWeight="medium"
                          fontSize="12px"
                          color={black}
                          alignSelf="stretch"
                        >
                          나이 : 30~35세, 매칭 금액 : 2만원, 매칭 가능 동네 :
                          서울 성북구, 역삼동 좋아하는 취미: 테니스, 골프
                        </Text>
                      </Stack>
                    </Stack>
                    <Stack
                      direction="row"
                      justify="flex-start"
                      align="flex-end"
                      spacing="5px"
                      alignSelf="stretch"
                    >
                      <Text
                        lineHeight="1.43"
                        fontWeight="semibold"
                        fontSize="14px"
                        color={black}
                      >
                        후기
                      </Text>
                      <Stack
                        direction="row"
                        justify="flex-start"
                        align="flex-start"
                        spacing="5px"
                      >
                        <Icon as={BsStarFill} />
                        <Text
                          fontWeight="medium"
                          fontSize="16px"
                          color={black}
                          textAlign="center"
                        >
                          5.0
                        </Text>
                      </Stack>
                    </Stack>
                    <Text
                      lineHeight="1.67"
                      fontWeight="regular"
                      fontSize="12px"
                      color={black}
                      alignSelf="stretch"
                    >
                      친구 매칭 서비스 덕분에 우연히 만난 친구가 있어서 너무
                      행복해요. 서로의 취향과 성향이 꽤 일치해서 처음 만났을
                      때부터 편안한 느낌이었어요. 이제는 함께 많은 추억을
                      쌓아가고 있습니다.
                    </Text>
                  </Stack>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <HorizonLine />
        </Stack>
        <HorizonLine />
        <HorizontalScrollBox title={"추천친구"} />
        {/* <Stack
          padding="20px"
          justify="flex-start"
          align="flex-start"
          spacing="10px"
          overflow="hidden"
          alignSelf="stretch"
          background={gray_300}
        >
          <Text
            lineHeight="1.56"
            fontWeight="bold"
            fontSize="18px"
            color={black}
            textAlign="center"
          >
            추천친구
          </Text>
          <Stack
            direction="row"
            justify="flex-start"
            align="flex-start"
            spacing="10px"
          >
            <Stack
              padding="10px"
              borderRadius="10px"
              justify="center"
              align="flex-start"
              spacing="20px"
              overflow="hidden"
              background={white}
              boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            >
              <Avatar name="TA" src=" " />
              <Stack
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                overflow="hidden"
                height="78px"
              >
                <Stack
                  direction="row"
                  justify="flex-start"
                  align="center"
                  spacing="5px"
                  overflow="hidden"
                  height="19px"
                >
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="5px"
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="16px"
                      color={black}
                      textAlign="center"
                    >
                      송*혁
                    </Text>
                    <Icon as={BsStarFill} />
                    <Text
                      fontWeight="medium"
                      fontSize="16px"
                      color={black}
                      textAlign="center"
                    >
                      5.0
                    </Text>
                    <Text
                      fontWeight="medium"
                      fontSize="14px"
                      color={gray_600}
                      textAlign="center"
                    >
                      (169)
                    </Text>
                  </Stack>
                </Stack>
                <Text
                  lineHeight="1.42"
                  fontWeight="medium"
                  fontSize="12px"
                  color={black}
                >
                  나이 : 30~35세 매칭 금액 : 2만원
                </Text>
              </Stack>
            </Stack>
            <Stack
              padding="10px"
              borderRadius="10px"
              justify="center"
              align="flex-start"
              spacing="20px"
              overflow="hidden"
              background={white}
              boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            >
              <Avatar name="TA" src=" " />
              <Stack
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                overflow="hidden"
                height="78px"
              >
                <Stack
                  direction="row"
                  justify="flex-start"
                  align="center"
                  spacing="5px"
                  overflow="hidden"
                  height="19px"
                >
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="5px"
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="16px"
                      color={black}
                      textAlign="center"
                    >
                      송*혁
                    </Text>
                    <Icon as={BsStarFill} />
                    <Text
                      fontWeight="medium"
                      fontSize="16px"
                      color={black}
                      textAlign="center"
                    >
                      5.0
                    </Text>
                    <Text
                      fontWeight="medium"
                      fontSize="14px"
                      color={gray_600}
                      textAlign="center"
                    >
                      (169)
                    </Text>
                  </Stack>
                </Stack>
                <Text
                  lineHeight="1.42"
                  fontWeight="medium"
                  fontSize="12px"
                  color={black}
                >
                  나이 : 30~35세 매칭 금액 : 2만원
                </Text>
              </Stack>
            </Stack>
            <Stack
              padding="10px"
              borderRadius="10px"
              justify="center"
              align="flex-start"
              spacing="20px"
              overflow="hidden"
              background={white}
              boxShadow="0px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            >
              <Avatar name="TA" src=" " />
              <Stack
                justify="flex-start"
                align="flex-start"
                spacing="10px"
                overflow="hidden"
                height="78px"
              >
                <Stack
                  direction="row"
                  justify="flex-start"
                  align="center"
                  spacing="5px"
                  overflow="hidden"
                  height="19px"
                >
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="center"
                    spacing="5px"
                  >
                    <Text
                      fontWeight="bold"
                      fontSize="16px"
                      color={black}
                      textAlign="center"
                    >
                      송*혁
                    </Text>
                    <Icon as={BsStarFill} />
                    <Text
                      fontWeight="medium"
                      fontSize="16px"
                      color={black}
                      textAlign="center"
                    >
                      5.0
                    </Text>
                    <Text
                      fontWeight="medium"
                      fontSize="14px"
                      color={gray_600}
                      textAlign="center"
                    >
                      (169)
                    </Text>
                  </Stack>
                </Stack>
                <Text
                  lineHeight="1.42"
                  fontWeight="medium"
                  fontSize="12px"
                  color={black}
                >
                  나이 : 30~35세 매칭 금액 : 2만원
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack> */}
      </Stack>

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modal_type && modal_type === "review" ? (
              <ReviewContent />
            ) : (
              <RefundContent />
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
