import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import { useFirestoreQuery } from "../js/Hooks";
// Components
import Message from "./Message";
import { Box, Button, Container, Input, Textarea } from "@chakra-ui/react";
import { TopHeader } from "./TopHeader";

const Channel = ({ user = null }) => {
  const db = firebase.firestore();

  const channel_id = "test";

  const messagesRef = db.collection(`messages-${channel_id}`);
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

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
    scrollToBottom("chat-container");
  };

  return (
    <Box w={"100%"}>
      <TopHeader title={user.uid} />
      <Box>
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
          <div className="padding-box">
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
          </div>
        </div>
      </Box>
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
