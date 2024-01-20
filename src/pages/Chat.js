import React from "react";

// Components
import Channel from "../component/Channel";
import { Flex } from "@chakra-ui/react";
import { useAuthState } from "../js/chatHooks";
import { auth } from "../db/firebase_config";
import { Navbar } from "../component/Navbar";

export const Chat = () => {
  const { user } = useAuthState(auth);
  return (
    <Flex>
      <Channel user={user} />
      <Navbar />
    </Flex>
  );
};
