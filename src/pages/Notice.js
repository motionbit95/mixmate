import { Stack, Icon, Text, Container, Box } from "@chakra-ui/react";
import { MdChat, MdChevronLeft } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { MdChatBubbleOutline } from "react-icons/md";
import { BsList, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import HorizonLine from "../component/HorizontalLine";
import { Navbar } from "../component/Navbar";
import { TopHeader } from "../component/TopHeader";

export const Notice = () => {
  const navigate = useNavigate();
  return (
    <Container py="50px">
      <Stack
        justify="flex-start"
        align="flex-start"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        // height="852px"
        maxWidth="100%"
        background="#FFFFFF"
      >
        <TopHeader title={"알림"} />
        <Stack
          paddingX="20px"
          justify="flex-start"
          align="flex-start"
          spacing="16px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          {/* <HorizonLine /> */}
          <Text
            fontFamily="Pretendard Variable"
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
              fontFamily="Pretendard Variable"
              fontWeight="medium"
              fontSize="16px"
              color="#000000"
              textAlign="center"
            >
              매칭신청이 결제되었습니다.
            </Text>
            <Text
              fontFamily="Pretendard Variable"
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
              fontFamily="Pretendard Variable"
              fontWeight="medium"
              fontSize="16px"
              color="#000000"
              textAlign="center"
            >
              [공지] 고객센터 운영시간 안내
            </Text>
            <Text
              fontFamily="Pretendard Variable"
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
              fontFamily="Pretendard Variable"
              fontWeight="medium"
              fontSize="16px"
              color="#000000"
              textAlign="center"
            >
              매칭신청이 거절되었습니다.
            </Text>
            <Text
              fontFamily="Pretendard Variable"
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
              fontFamily="Pretendard Variable"
              fontWeight="medium"
              fontSize="16px"
              color="#000000"
              textAlign="center"
            >
              매칭신청이 결제되었습니다.
            </Text>
            <Text
              fontFamily="Pretendard Variable"
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
      </Stack>
    </Container>
  );
};
