import React from "react";

// Components
import Channel from "../component/Channel";
import { Flex } from "@chakra-ui/react";
import { useAuthState } from "../js/Hooks";
import { auth } from "../db/firebase_config";
import { Navbar } from "../component/Navbar";
import { useLocation } from "react-router-dom";

export const Chat = () => {
  const { user } = useAuthState(auth);
  return (
    <Flex>
      <Channel user={user} />
      <Navbar />
    </Flex>
  );
};
