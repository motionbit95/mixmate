import {
  Stack,
  Icon,
  Text,
  Tabs,
  Tab,
  TabPanels,
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
  Center,
  HStack,
} from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { BsStarFill, BsFillStarFill } from "react-icons/bs";
import { TopHeader } from "../component/TopHeader";
import HorizonLine from "../component/HorizontalLine";
import {
  black,
  gray_100,
  gray_300,
  gray_500,
  gray_600,
  gray_800,
  gray_900,
  theme_bright_color,
  theme_primary_color,
  white,
} from "../App";
import { useEffect, useState } from "react";
import { auth } from "../db/firebase_config";
import {
  arrange_distance,
  db_add,
  db_update,
  get_doc_list,
} from "../js/Database";
import {
  matching_add,
  matching_get_list,
  matching_set,
} from "../js/MatchingAPI";
import { HorizontalScrollBox } from "../component/HorizontalScrollBox";
import { useAuthState } from "../js/Hooks";
import { Navbar } from "../component/Navbar";
import { getSatuation } from "../js/API";
import { User } from "../component/User";
import { CustomButton } from "../component/Buttons";
import { useNavigate } from "react-router-dom";

export const Details = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal_type, setModalType] = useState();
  const [matching_id, setMatchingId] = useState();
  const navigate = useNavigate();

  // 신청 리스트, 받은 리스트
  const [sendList, setSendList] = useState();
  const [recieveList, setRecieveList] = useState();

  // 추천친구 리스트
  const [recommend, setRecommend] = useState();

  // 리뷰 쓰는 매칭 정보
  const [reviewMatching, setReviewMatching] = useState();

  useEffect(() => {
    get_matching_list();
  }, []);

  function get_review(value) {
    console.log(value.matcing_id);
    // let reviews = get_doc_list("review", "review_matching", value.matcing_id);
    // return reviews[0];
  }

  async function get_matching_list() {
    // 현재 로그인 한 고객의 계정을 가지고 옵니다.
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        console.log(user?.uid);
        let user_info = await get_doc_list("user", "user_id", user?.uid);
        console.log(user_info[0]);

        if (user_info[0]) {
          let array = await arrange_distance(user_info[0].user_location, "all");
          console.log(array);
          setRecommend(array);
        }

        // 매칭 리스트에서 내가 받은 신청인지 보낸 신청인지 구분해서 저장해둡니다.
        let send_list = await matching_get_list(0);
        let receive_list = await matching_get_list(1);
        console.log("send_list", send_list, "recieve_list", receive_list);

        setSendList(send_list);
        setRecieveList(receive_list);
      }
    });
  }

  async function onClickReviewMatching(value) {
    setMatchingId(value.matching_id);
    setReviewMatching(value);
    // 거절 모달 띄우기
    setModalType("review");
    onOpen();
  }

  async function onClickRefundMatching() {
    // 거절 모달 띄우기
    setModalType("refund");
    onOpen();
  }

  async function onClickRefundMessage(message) {
    if (window.confirm("매칭을 거절하시겠습니까?")) {
      await matching_set(matching_id, {
        matching_state: 400, // 매칭 거절 코드
        matching_refund_message: message,
      });
      onClose();
      window.location.reload();
    }
  }

  async function onClickCompleteMatching(matching_id) {
    if (window.confirm("매칭을 확정지으시겠습니까?")) {
      await matching_set(matching_id, {
        matching_state: 1, // 매칭 완료 코드
      });
    }
    window.location.reload();
  }

  function ReviewContent() {
    const [score, setScore] = useState();
    const [message, setMessage] = useState();

    async function onClickReviewMessage(message) {
      /*
      review_id	string	리뷰 id	NOT NULL
      review_sender	map	후기를 작성한 회원정보	NOT NULL
      review_receiver	map	후기를 받은 회원정보	NOT NULL
      review_matching	map	후기가 작성되는 매칭정보	NOT NULL
      review_score	number	후기 평점	NOT NULL
      review_comment	string	후기	NOT NULL
      timestamp	timestamp	문서생성시간	NOT NUL
   */
      if (window.confirm("후기를 등록하시겠습니까?")) {
        let doc_id = await db_add("review", {
          review_sender: reviewMatching.matching_sender,
          review_receiver: reviewMatching.matching_reciever,
          review_matching: matching_id,
          review_score: score,
          review_comment: message,
        });

        // 매칭 상태 후기등록 상태(2)로 변경
        await db_update("matching", matching_id, {
          matching_state: 2,
          matching_review: {
            review_sender: reviewMatching.matching_sender,
            review_receiver: reviewMatching.matching_reciever,
            review_matching: matching_id,
            review_score: score,
            review_comment: message,
          },
        });

        window.location.reload();
        onClose();
      }
    }

    return (
      <Stack
        paddingX="30px"
        justify="flex-start"
        align="center"
        spacing="40px"
        // width="393px"
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
        <HStack>
          <Icon
            as={BsFillStarFill}
            boxSize={"32px"}
            color={score > 0 ? "yellow.400" : gray_500}
            onClick={() => setScore(1)}
          />
          <Icon
            as={BsFillStarFill}
            boxSize={"32px"}
            color={score > 1 ? "yellow.400" : gray_500}
            v
            onClick={() => setScore(2)}
          />
          <Icon
            as={BsFillStarFill}
            boxSize={"32px"}
            color={score > 2 ? "yellow.400" : gray_500}
            onClick={() => setScore(3)}
          />
          <Icon
            as={BsFillStarFill}
            boxSize={"32px"}
            color={score > 3 ? "yellow.400" : gray_500}
            onClick={() => setScore(4)}
          />
          <Icon
            as={BsFillStarFill}
            boxSize={"32px"}
            color={score > 4 ? "yellow.400" : gray_500}
            onClick={() => setScore(5)}
          />
        </HStack>
        <Textarea
          placeholder="후기를 입력해주세요."
          onChange={(e) => setMessage(e.target.value)}
          minH={"200px"}
        />
        <CustomButton
          text="후기작성하기"
          size="md"
          code={theme_bright_color}
          alignSelf="stretch"
          onClick={() => onClickReviewMessage(message)}
        />
      </Stack>
    );
  }

  function RefundContent() {
    const [message, setMessage] = useState("매칭 신청 폭주");
    return (
      <Stack maxWidth="100%" background="#FFFFFF">
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
            colorScheme={getSatuation(theme_primary_color)}
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
                placeholder="거절 사유를 입력하세요."
                onChange={(e) => setMessage(e.target.value)}
              />
            </Stack>
          </RadioGroup>
          <HStack w="100%">
            {/* <CustomButton
              size="md"
              code={"white.100"}
              alignSelf="stretch"
              onClick={onClose}
              text={"취소"}
            /> */}
            <CustomButton
              size="md"
              code={theme_bright_color}
              alignSelf="stretch"
              onClick={() => onClickRefundMessage(message)}
              text={"신청 거절하기"}
            />
          </HStack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Container px={0}>
      <Stack
        justify="space-between"
        align="center"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        maxWidth="100%"
        background={white}
        minH={"100vh"}
        py={"50px"}
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
          <Tabs w="100%" colorScheme={getSatuation(theme_primary_color)}>
            <TabList>
              <Tab w={"100%"}>진행</Tab>
              <Tab w={"100%"}>종료</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* {sendList?.length === 0 && recieveList?.length === 0 ? (
                  <Center minH={"45vh"}>
                    <Text fontSize={"sm"} color={gray_600}>
                      매칭 신청 내역이 존재하지 않습니다.
                    </Text>
                  </Center>
                ) : 
                ( */}
                <Stack spacing={"4vh"}>
                  {sendList?.map(
                    (value, index) =>
                      value.matching_state < 1 && (
                        <Stack>
                          <Text fontSize={"large"} fontWeight={"bold"}>
                            {value.matching_state === 0
                              ? "결제완료"
                              : value.matching_state === 1
                              ? "구매확정"
                              : value.matching_state === 2
                              ? "후기작성완료"
                              : "구매취소"}
                          </Text>
                          <User data={value.matching_reciever} />
                          {value.matching_state < 400 && (
                            <HStack>
                              <CustomButton
                                onClick={() => {
                                  if (value.matching_state === 0) {
                                    navigate(
                                      `/chat/${value.matching_payment}`,
                                      {
                                        state: {
                                          chat_id: value.matching_payment,
                                          data: value,
                                        },
                                      }
                                    );
                                  }
                                }}
                                text={
                                  value.matching_state === 0
                                    ? "채팅하기"
                                    : value.matching_state === 1
                                    ? "다시신청하기"
                                    : ""
                                }
                              />
                              <CustomButton
                                code={theme_bright_color}
                                onClick={() => {
                                  if (value.matching_state === 0)
                                    onClickCompleteMatching(value.matching_id);
                                }}
                                text={
                                  value.matching_state === 0
                                    ? "구매확정하기"
                                    : value.matching_state === 1
                                    ? "후기쓰기"
                                    : ""
                                }
                              />
                            </HStack>
                          )}
                          {/* <HorizonLine /> */}
                        </Stack>
                      )
                  )}
                  {recieveList?.map(
                    (value, index) =>
                      value.matching_state < 1 && (
                        <>
                          <Text fontSize={"large"} fontWeight={"bold"}>
                            {value.matching_state === 0
                              ? "매칭신청"
                              : value.matching_state === 1
                              ? "매칭완료"
                              : "매칭거절"}
                          </Text>
                          <User data={value.matching_sender} />
                          {value.matching_state < 400 && (
                            <HStack>
                              <CustomButton
                                onClick={() => {
                                  if (value.matching_state === 0) {
                                    navigate(
                                      `/chat/${value.matching_payment}`,
                                      {
                                        state: {
                                          chat_id: value.matching_payment,
                                          data: value,
                                        },
                                      }
                                    );
                                  }
                                }}
                                text={
                                  value.matching_state === 0 ? "채팅하기" : ""
                                }
                              />
                              <CustomButton
                                code={theme_bright_color}
                                onClick={() => {
                                  setMatchingId(value.matching_id);
                                  onClickRefundMatching();
                                }}
                                text={
                                  value.matching_state === 0 ? "거절하기" : ""
                                }
                              />
                            </HStack>
                          )}
                          {/* <HorizonLine /> */}
                        </>
                      )
                  )}
                </Stack>
                {/* )} */}
              </TabPanel>
              <TabPanel>
                <>
                  {/* {sendList?.length === 0 && recieveList?.length === 0 ? (
                    <Center minH={"45vh"}>
                      <Text fontSize={"sm"} color={gray_600}>
                        매칭 신청 내역이 존재하지 않습니다.
                      </Text>
                    </Center>
                  ) : 
                  ( */}
                  <Stack>
                    {sendList?.map(
                      (value, index) =>
                        value.matching_state > 0 && (
                          <>
                            <Text fontSize={"large"} fontWeight={"bold"}>
                              {value.matching_state === 0
                                ? "결제완료"
                                : value.matching_state === 1
                                ? "구매확정"
                                : value.matching_state === 2
                                ? "후기작성완료"
                                : "구매취소"}
                            </Text>
                            <User data={value.matching_reciever} />
                            {value.matching_state < 3 && (
                              <HStack>
                                <CustomButton
                                  onClick={() => {
                                    if (value.matching_state === 1) {
                                      navigate("/matching", {
                                        state: {
                                          data: value.matching_reciever,
                                        },
                                      });
                                    }
                                  }}
                                  text={
                                    value.matching_state === 0
                                      ? "채팅하기"
                                      : value.matching_state === 1 ||
                                        value.matching_state === 2
                                      ? "다시신청하기"
                                      : ""
                                  }
                                />
                                <CustomButton
                                  code={theme_bright_color}
                                  disabled={value.matching_state > 1}
                                  onClick={() => {
                                    if (value.matching_state === 0)
                                      onClickCompleteMatching(
                                        value.matching_id
                                      );
                                    if (value.matching_state === 1)
                                      onClickReviewMatching(value);
                                  }}
                                  text={
                                    value.matching_state === 0
                                      ? "구매확정하기"
                                      : value.matching_state === 1
                                      ? "후기쓰기"
                                      : value.matching_state === 2
                                      ? "후기작성완료"
                                      : ""
                                  }
                                />
                              </HStack>
                            )}
                            {value.matching_state === 2 && (
                              <Stack
                                fontSize={"sm"}
                                w="100%"
                                bgColor={gray_100}
                                p="2vh"
                                borderRadius={"8px"}
                              >
                                <HStack alignItems={"center"}>
                                  <Icon
                                    as={BsFillStarFill}
                                    boxSize={"24px"}
                                    color={"yellow.400"}
                                  />
                                  <Text fontSize={"lg"} fontWeight={"bold"}>
                                    {value.matching_review?.review_score.toFixed(
                                      1
                                    )}
                                  </Text>
                                </HStack>
                                <Text>
                                  {value.matching_review?.review_comment}
                                </Text>
                              </Stack>
                            )}
                            <HorizonLine />
                          </>
                        )
                    )}
                    {recieveList?.map(
                      (value, index) =>
                        value.matching_state > 0 && (
                          <>
                            <Text fontSize={"large"} fontWeight={"bold"}>
                              {value.matching_state === 0
                                ? "매칭신청"
                                : value.matching_state === 1
                                ? "매칭완료"
                                : "매칭거절"}
                            </Text>
                            <User data={value.matching_sender} />
                            {value.matching_state < 400 ? (
                              <HStack>
                                <CustomButton
                                  onClick={() =>
                                    console.log(value.matching_state)
                                  }
                                  text={
                                    value.matching_state === 0 ? "채팅하기" : ""
                                  }
                                />
                                <CustomButton
                                  code={theme_bright_color}
                                  onClick={() =>
                                    setMatchingId(value.matching_id)
                                  }
                                  text={
                                    value.matching_state === 0 ? "거절하기" : ""
                                  }
                                />
                              </HStack>
                            ) : (
                              <Text
                                fontSize={"sm"}
                                w="100%"
                                bgColor={gray_100}
                                p="2vh"
                                borderRadius={"8px"}
                              >
                                매칭 거절 이유 : {value.matching_refund_message}
                              </Text>
                            )}
                            <HorizonLine />
                          </>
                        )
                    )}
                  </Stack>
                  {/* )} */}
                </>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
        <>
          <HorizontalScrollBox title={"추천친구"} model_list={recommend} />
        </>
      </Stack>

      <Navbar />

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={"50px"}></ModalHeader>
          <ModalCloseButton mt={"50px"} />
          <ModalBody>
            {modal_type && modal_type === "review" ? (
              <ReviewContent />
            ) : (
              <RefundContent />
            )}
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}></Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Container>
  );
};
