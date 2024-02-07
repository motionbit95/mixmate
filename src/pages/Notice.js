import { Stack, Text, Container } from "@chakra-ui/react";
import HorizonLine from "../component/HorizontalLine";
import { TopHeader } from "../component/TopHeader";
import { black, gray_600, white } from "../App";
import { useEffect, useState } from "react";
import { db_update, get_doc_list } from "../js/Database";
import { auth } from "../db/firebase_config";
import { formatDate } from "../component/Message";

export const Notice = () => {
  const [alarmList, setAlarmList] = useState([]);
  useEffect(() => {
    getAlarmList();
  }, []);

  const getAlarmList = async () => {
    auth.onAuthStateChanged(async (currentUser) => {
      console.log(currentUser.uid);
      await get_doc_list("alarm", "user_id", currentUser.uid).then(
        async (data) => {
          await db_update("alarm", data[0].doc_id, { isRead: true });
          console.log(data);
          setAlarmList(data);
        }
      );
    });
  };
  return (
    <Container py="60px">
      <Stack
        justify="flex-start"
        align="flex-start"
        spacing="0px"
        overflow="hidden"
        // width="393px"
        // height="852px"
        maxWidth="100%"
        background={white}
        minH={"100vh"}
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
          {alarmList.map((value, index) => (
            <>
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
                  {value.alarm_message}
                </Text>
                <Text
                  fontWeight="medium"
                  fontSize="12px"
                  color={gray_600}
                  textAlign="center"
                >
                  {formatDate(new Date(value.timestamp.seconds * 1000))}
                </Text>
              </Stack>
              <HorizonLine />
            </>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
