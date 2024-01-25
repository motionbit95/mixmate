import React from "react";

// Components
import Channel from "../component/Channel";
import { Flex } from "@chakra-ui/react";
import { useAuthState } from "../js/Hooks";
import { auth } from "../db/firebase_config";
import { Navbar } from "../component/Navbar";

/* 채팅창 - Channel 모듈을 띄워준다. */

export const Chat = () => {
  const { user } = useAuthState(auth);
  return (
    <Flex>
      <Channel user={user} />
      <Navbar />
    </Flex>
  );
};
