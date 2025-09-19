import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

// components
import Message from "./Message";
import { TopHeader } from "./TopHeader";
import { Box, Button, Container, Input } from "@chakra-ui/react";

// hook
import { useLocation } from "react-router-dom";
import { auth } from "../db/firebase_config";
import { db_update, get_doc_data } from "../js/Database";

// choppi - 이름 끝 부분 숨김 처리
import { getDisplayName } from "../js/API";

const Channel = ({ user = null }) => {
  const location = useLocation();
  const chat_id = location.state?.chat_id;
  const [matchingInfo, setMatchingInfo] = useState(location.state?.data);
  const [titleName, setTitleName] = useState("");

  const getUser = async () => {
    console.log(location.state?.data, auth.currentUser?.uid);
    if (auth.currentUser?.uid === location.state?.data?.receiver) {
      const user = await get_doc_data("user", location.state?.data?.sender);
      if (user && user.user_name) {
        setTitleName(getDisplayName(user.user_name));
      } else {
        setTitleName("사용자");
      }
    } else {
      const user = await get_doc_data("user", location.state?.data?.receiver);
      if (user && user.user_name) {
        setTitleName(getDisplayName(user.user_name));
      } else {
        setTitleName("사용자");
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  // Mock messages for demo
  const [messages, setMessages] = useState([
    {
      id: "msg_1",
      text: "안녕하세요! 함께 식사하실래요?",
      createdAt: { seconds: Date.now() / 1000 },
      uid: "user_1",
      displayName: "박수정",
      read: true
    },
    {
      id: "msg_2",
      text: "네, 좋아요! 언제 만날까요?",
      createdAt: { seconds: Date.now() / 1000 + 60 },
      uid: auth.currentUser?.uid || "user_0",
      displayName: auth.currentUser?.displayName || "테스트 유저",
      read: true
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const inputRef = useRef();
  const bottomListRef = useRef();

  const { uid, displayName, photoURL } = user || {
    uid: auth.currentUser?.uid || "user_0",
    displayName: auth.currentUser?.displayName || "테스트 유저",
    photoURL: null
  };

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
    readAllMessage();
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
      // Add new message to mock messages
      const newMsg = {
        id: `msg_${Date.now()}`,
        text: trimmedMessage,
        createdAt: { seconds: Date.now() / 1000 },
        uid: auth.currentUser?.uid || "user_0",
        displayName: auth.currentUser?.displayName || "테스트 유저",
        read: false,
      };

      setMessages(prev => [...prev, newMsg]);

      // Clear input field
      setNewMessage("");

      // Mock chat info update
      console.log("[MockChat] Message sent:", trimmedMessage);

      // Scroll down to the bottom of the list
      if (bottomListRef.current) {
        bottomListRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }

    scrollToBottom("chat-container");
  };

  function readAllMessage() {
    // Mock function - just log for demo
    console.log("[MockChat] All messages marked as read");
  }

  return (
    <Box w={"100%"}>
      <TopHeader title={titleName} />
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
