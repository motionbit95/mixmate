import React, { useEffect } from "react";
// Firebase deps
// v9에서 v8 호환 API
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Hooks
import { useAuthState } from "../js/chatHooks";
// Components
import Channel from "../component/Channel";
import Loader from "../component/Loader";
import { Box, Button, Container, Flex } from "@chakra-ui/react";

firebase.initializeApp({
  apiKey: "AIzaSyBwCYJaEn1Ey5rU8Le5Adu_JvdJodQAOe8",
  authDomain: "dinnermate-8d37b.firebaseapp.com",
  projectId: "dinnermate-8d37b",
  storageBucket: "dinnermate-8d37b.appspot.com",
  messagingSenderId: "698586027961",
  appId: "1:698586027961:web:bfacf1423d3c895397c868",
  measurementId: "G-YJSWYJ83RK",
});

export const Chat = () => {
  const { user, initializing } = useAuthState(firebase.auth());

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderContent = () => {
    if (initializing) {
      return <Loader size="lg" />;
    }

    if (user) return <Channel user={user} />;

    return (
      <Box onClick={signInWithGoogle}>
        <Button>구글 로그인</Button>
      </Box>
    );
  };

  return (
    <Flex>
      {/* <div>{user ? <button onClick={signOut}>로그아웃</button> : null}</div> */}
      {renderContent()}
    </Flex>
  );
};
