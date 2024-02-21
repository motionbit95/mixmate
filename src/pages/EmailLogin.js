import { CloseIcon } from "@chakra-ui/icons";
import {
  Container,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalContent,
  ModalBody,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, TextButton } from "../component/Buttons";
import EmailLoginForm from "../component/EmailLoginForm";
import { privacy, terms } from "../assets/terms";
import HTMLReactParser from "html-react-parser";
import { logout } from "../js/Auth";

const EmailLogin = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(0);

  useEffect(() => {
    logout();
  }, []);

  return (
    <Container
      minH={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      p={"4vh"}
    >
      <Stack mt={"10vh"}>
        <Flex alignItems={"center"} justifyContent={"flex-end"}>
          {/* <Text fontSize={"xx-large"} fontWeight={"bold"}>
            이메일 로그인
          </Text> */}
          <CloseIcon onClick={() => navigate(-1)} />
        </Flex>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          direction={"row"}
          py={"4vh"}
        >
          {/* <SymbolLogo w={"10vh"} /> */}
          <Text
            fontSize={"x-large"}
            color={"gray.500"}
            fontFamily={"omyu_pretty"}
          >
            밥친구가 필요한 순간,
          </Text>
          <Text
            fontSize={"xx-large"}
            color={"gray.800"}
            fontFamily={"omyu_pretty"}
            fontWeight={"bold"}
          >
            디너메이트
          </Text>
        </Stack>
        <EmailLoginForm />
        <HStack mt={"4vh"} w="100%" justifyContent={"space-between"}>
          <TextButton
            text={"회원가입"}
            onClick={async () => {
              navigate("/signup");
            }}
          />
          <TextButton
            text={"아이디 / 비밀번호 찾기"}
            onClick={() => navigate("/find")}
          />
        </HStack>
        {/* footer */}
        <Stack
          w={"100%"}
          alignItems={"center"}
          mb={"4vh"}
          spacing={"2vh"}
          mt={"4vh"}
        >
          <HStack>
            <TextButton
              style={{ textDecoration: "underline" }}
              text="이용약관"
              onClick={() => {
                setModalType(0);
                onOpen();
              }}
            />
            <Text fontSize={"small"} color={"gray.500"}>
              및
            </Text>
            <TextButton
              style={{ textDecoration: "underline" }}
              text="개인정보 취급방침"
              onClick={() => {
                setModalType(1);
                onOpen();
              }}
            />
          </HStack>
          <Text fontSize={"sm"}>우린 더 나은 식사문화를 창조합니다.</Text>
        </Stack>
      </Stack>

      <Modal zIndex={9999} onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>이용약관</ModalHeader> */}
          <ModalCloseButton zIndex={9999} />
          <ModalBody
            display={"flex"}
            // bgColor={"red"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {modalType === 0 ? (
              <Stack>
                <Text mt={"4vh"} fontSize={"x-large"} fontWeight={"bold"}>
                  이용약관
                </Text>
                <Text fontSize={"small"} whiteSpace={"pre-wrap"}>
                  {terms}
                </Text>
              </Stack>
            ) : (
              <Center>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // overflow: "hidden",
                    padding: "10px",
                    width: "100%",
                  }}
                >
                  <div>{HTMLReactParser(privacy)}</div>
                </div>
              </Center>
            )}
          </ModalBody>
          <ModalFooter>
            <CustomButton onClick={onClose} text={"확인했습니다."} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default EmailLogin;
