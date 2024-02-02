import { Box, Container, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CertSuccess(props) {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(window.location.search);
    // console.log(localStorage.getItem("ret_page"));
    // console.log(localStorage.getItem("ret_page") + window.location.search);
    navigate(localStorage.getItem("ret_page") + window.location.search);
  }, []);
  return (
    <Container minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Text textAlign={"center"}>Loading...</Text>
    </Container>
  );
}

export default CertSuccess;
