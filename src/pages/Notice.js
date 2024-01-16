import { Stack, Icon, Text, Container } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { BsChat, BsList, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";

export const Notice = () => {
  const navigate = useNavigate();
  return (
    <Container minW={"380px"}>
      <Stack
        justify="flex-start"
        align="flex-start"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        height="852px"
        maxWidth="100%"
        background="#FFFFFF"
      >
        <Stack
          padding="10px"
          height="50px"
          alignSelf="stretch"
          alignItems={"center"}
        >
          <Icon
            boxSize={"30px"}
            position={"absolute"}
            left={"20px"}
            top={"5px"}
            as={MdChevronLeft}
            onClick={() => navigate(-1)}
          />
          <Text
            fontFamily="SF Pro"
            lineHeight="0.85"
            fontWeight="bold"
            fontSize="20px"
            color="#000000"
          >
            알림
          </Text>
        </Stack>
        <Stack
          paddingX="20px"
          justify="flex-start"
          align="flex-start"
          spacing="16px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          <HorizonLine />
          <Text
            fontFamily="Inter"
            fontWeight="semibold"
            fontSize="18px"
            color="#000000"
            textAlign="center"
          >
            01.15(월)
          </Text>
          <Stack
            direction="row"
            justify="space-between"
            align="flex-end"
            spacing="16px"
            alignSelf="stretch"
          >
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="16px"
              color="#000000"
              textAlign="center"
            >
              매칭신청이 결제되었습니다.
            </Text>
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="12px"
              color="#8C8C8C"
              textAlign="center"
            >
              오후 8시 14분
            </Text>
          </Stack>
          <HorizonLine />
          <Stack
            direction="row"
            justify="space-between"
            align="flex-end"
            spacing="16px"
            alignSelf="stretch"
          >
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="16px"
              color="#000000"
              textAlign="center"
            >
              [공지] 고객센터 운영시간 안내
            </Text>
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="12px"
              color="#8C8C8C"
              textAlign="center"
            >
              24.01.16
            </Text>
          </Stack>
          <HorizonLine />
          <Stack
            direction="row"
            justify="space-between"
            align="flex-end"
            spacing="16px"
            alignSelf="stretch"
          >
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="16px"
              color="#000000"
              textAlign="center"
            >
              매칭신청이 거절되었습니다.
            </Text>
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="12px"
              color="#8C8C8C"
              textAlign="center"
            >
              24.01.16
            </Text>
          </Stack>
          <HorizonLine />
          <Stack
            direction="row"
            justify="space-between"
            align="flex-end"
            spacing="16px"
            alignSelf="stretch"
          >
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="16px"
              color="#000000"
              textAlign="center"
            >
              매칭신청이 결제되었습니다.
            </Text>
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="12px"
              color="#8C8C8C"
              textAlign="center"
            >
              24.01.16
            </Text>
          </Stack>
          <HorizonLine />
        </Stack>
        <HorizonLine />
        <Stack
          paddingY="10px"
          direction="row"
          justify="space-between"
          align="flex-start"
          spacing="10px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Stack
            justify="center"
            align="center"
            spacing="0px"
            overflow="hidden"
            flex="1"
          >
            <Icon as={AiOutlineHome} />
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="12px"
              color="#000000"
              textAlign="center"
            >
              홈
            </Text>
          </Stack>
          <Stack
            justify="center"
            align="center"
            spacing="0px"
            overflow="hidden"
            flex="1"
          >
            <Icon as={BsList} />
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="12px"
              color="#000000"
              textAlign="center"
            >
              신청내역
            </Text>
          </Stack>
          <Stack
            justify="center"
            align="center"
            spacing="0px"
            overflow="hidden"
            flex="1"
          >
            <Icon as={BsChat} />
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="12px"
              color="#000000"
              textAlign="center"
            >
              채팅
            </Text>
          </Stack>
          <Stack
            justify="center"
            align="center"
            spacing="0px"
            overflow="hidden"
            flex="1"
          >
            <Icon as={BsPerson} />
            <Text
              fontFamily="Inter"
              fontWeight="medium"
              fontSize="12px"
              color="#000000"
              textAlign="center"
            >
              마이페이지
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
