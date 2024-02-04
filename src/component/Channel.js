import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import { useFirestoreQuery } from "../js/Hooks";

// components
import Message from "./Message";
import { TopHeader } from "./TopHeader";
import { Box, Button, Container, Input } from "@chakra-ui/react";

// hook
import { useLocation } from "react-router-dom";
import { auth } from "../db/firebase_config";
import { db_update } from "../js/Database";
import { serverTimestamp } from "firebase/firestore";

// mixmate - 이름 끝 부분 숨김 처리
import { getDisplayName } from "../js/API";

const Channel = ({ user = null }) => {
  const location = useLocation();
  const chat_id = location.state?.chat_id;
  const matchingInfo = location.state?.data;

  const db = firebase.firestore();

  const messagesRef = db.collection(`message-${chat_id}`);
  const messages = useFirestoreQuery(
    messagesRef.orderBy("createdAt", "desc").limit(100)
  );

  const [newMessage, setNewMessage] = useState("");

  const inputRef = useRef();
  const bottomListRef = useRef();

  const { uid, displayName, photoURL } = user;

  function scrollToBottom(componentId) {
    var component = document.getElementById(componentId);

    if (component) {
      // 스크롤이 가능한 요소인지 확인
      if (component.scrollHeight > component.clientHeight) {
        // 스크롤을 최하단으로 이동
        component.scrollTop = component.scrollHeight;
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    scrollToBottom("chat-container");
  });

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: serverTimestamp(),
        uid,
        displayName,
        photoURL,
        read: false,
      });
      // Clear input field
      setNewMessage("");
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }

    //# 채팅 정보 업데이트
    await db_update(`message-${chat_id}`, "chat_info", {
      timestamp: new Date(),
      lastmessage: trimmedMessage,
    });
    scrollToBottom("chat-container");
  };

  return (
    <Box w={"100%"}>
      <TopHeader
        title={
          auth.currentUser?.uid === matchingInfo.matching_sender.doc_id
            ? getDisplayName(matchingInfo.matching_receiver.user_name)
            : getDisplayName(matchingInfo.matching_sender.user_name)
        }
      />
      <Container>
        <Box id="chat-container">
          <Box className="scroll_view" mt={"50px"} mb={"120px"}>
            {messages
              ?.sort((first, second) =>
                first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
              )
              ?.map((message) => (
                <div key={message.id}>
                  <Message {...message} />
                </div>
              ))}
          </Box>
          <div ref={bottomListRef} />
        </Box>
        <div className="bottom-fixed-box">
          <Container px={0}>
            <Box border={"1px solid #d9d9d9"} className="padding-box">
              <form className="input-wrap" onSubmit={handleOnSubmit}>
                <Input
                  border={"1px solid #d9d9d9"}
                  mr={"4px"}
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={handleOnChange}
                  placeholder="메시지를 입력하세요."
                />
                <Button type="submit" disabled={!newMessage}>
                  전송
                </Button>
              </form>
            </Box>
          </Container>
        </div>
      </Container>
    </Box>
  );
};

Channel.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

export default Channel;
