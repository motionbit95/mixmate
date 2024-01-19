import { Stack, Text, Container } from "@chakra-ui/react";
import HorizonLine from "../component/HorizontalLine";
import { TopHeader } from "../component/TopHeader";
import { black, gray_600, white } from "../App";

export const Notice = () => {
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
        background={white}
      >
        <TopHeader title={"알림"} />
        <Stack
          // paddingX="20px"
          justify="flex-start"
          align="flex-start"
          spacing="16px"
          overflow="hidden"
          flex="1"
          alignSelf="stretch"
        >
          {/* <HorizonLine /> */}
          <Text
            fontWeight="semibold"
            fontSize="18px"
            color={black}
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
              fontWeight="medium"
              fontSize="16px"
              color={black}
              textAlign="center"
            >
              매칭신청이 결제되었습니다.
            </Text>
            <Text
              fontWeight="medium"
              fontSize="12px"
              color={gray_600}
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
              fontWeight="medium"
              fontSize="16px"
              color={black}
              textAlign="center"
            >
              [공지] 고객센터 운영시간 안내
            </Text>
            <Text
              fontWeight="medium"
              fontSize="12px"
              color={gray_600}
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
              fontWeight="medium"
              fontSize="16px"
              color={black}
              textAlign="center"
            >
              매칭신청이 거절되었습니다.
            </Text>
            <Text
              fontWeight="medium"
              fontSize="12px"
              color={gray_600}
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
              fontWeight="medium"
              fontSize="16px"
              color={black}
              textAlign="center"
            >
              매칭신청이 결제되었습니다.
            </Text>
            <Text
              fontWeight="medium"
              fontSize="12px"
              color={gray_600}
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
