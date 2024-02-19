import {
  Alert,
  AlertIcon,
  Button,
  CloseButton,
  Container,
  Flex,
  FormControl,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db_set, db_update, findUser, get_doc_list } from "../js/Database";
import { check_password_valid } from "../js/UserAPI";

function Find(props) {
  const navigate = useNavigate();
  const [currentUser, setFindUser] = useState();
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [inputData, setInputData] = useState({
    password: "",
    confirm_password: "",
    err_msg: "",
  });

  useEffect(() => {
    localStorage.setItem("ret_page", "/find");

    if (window.location.search) {
      //   console.log("인증이 완료되었음!");
      // 현재 URL에서 쿼리 문자열 추출
      var queryString = window.location.search.substring(1);

      // URL 쿼리 문자열을 객체로 변환
      var queryParams = new URLSearchParams(queryString);

      // 객체에 값을 담기
      var user = {
        name: queryParams.get("name"),
        phoneNumber: queryParams.get("phoneNumber"),
        birthdate: queryParams.get("birthdate"),
        gender: queryParams.get("gender") === "01" ? "남" : "여",
      };

      // console.log(user);
      onFindUser(user);
    }
  }, []);

  const onFindUser = async (user) => {
    const result = await findUser(user.name, user.phoneNumber);
    console.log(result);

    if (!result) {
      alert("가입된 회원 정보가 없습니다!");
      return;
    }

    setFindUser(result);
    if (localStorage.getItem("find") == "0" || !localStorage.getItem("find")) {
      setUserEmail(result?.user_email);
    }
    if (localStorage.getItem("find") == "1") {
      setUserPassword(result?.user_password);
    }
  };

  async function onChangePassword() {
    console.log(inputData);

    var err_msg = check_password_valid(inputData.password);

    if (inputData.password !== inputData.confirm_password) {
      err_msg = "패스워드가 일치하지 않습니다.";
    }
    setInputData({ ...inputData, err_msg: err_msg });

    if (err_msg === "") {
      await db_update("user", currentUser.doc_id, {
        user_password: inputData.password,
      });

      alert("패스워드 변경이 완료되었습니다. 로그인 화면으로 이동합니다.");
      navigate("/login");
    }
  }

  const onCertButton = async () => {
    window.location.replace(
      //"http://localhost:3001/sample/make_hash"
      "https://dinnermate-node-server-0d7d5dc74685.herokuapp.com/sample/make_hash"
    );
  };
  return (
    <Container minH={"100vh"} p={"4vh"}>
      <Flex justifyContent={"flex-end"}>
        <CloseButton onClick={() => navigate("/login")} />
      </Flex>
      <Flex w={"100%"}>
        <Tabs
          defaultIndex={parseInt(
            localStorage.getItem("find") ? localStorage.getItem("find") : 0
          )}
          w={"100%"}
          onChange={(e) => localStorage.setItem("find", e)}
        >
          <TabList w={"100%"}>
            <Tab w={"100%"}>아이디찾기</Tab>
            <Tab w={"100%"}>비밀번호찾기</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Stack>
                <Input placeholder="이름" />
                <Input placeholder="전화번호" />
                {user_email === "" ? (
                  <Button onClick={onCertButton}>휴대폰 본인인증</Button>
                ) : (
                  <Stack
                    backgroundColor={"gray.100"}
                    p={"2vh"}
                    alignItems={"center"}
                  >
                    <Text>가입된 이메일 주소입니다.</Text>
                    <Text fontWeight={"bold"} color={"blue.500"}>
                      {user_email === "" ? "조회결과가 없습니다." : user_email}
                    </Text>
                    {user_email === "" ? (
                      <Button onClick={() => navigate("/signup")}>
                        회원가입하기
                      </Button>
                    ) : (
                      <Button
                        bgColor="gray.300"
                        onClick={() => navigate("/login")}
                      >
                        로그인하기
                      </Button>
                    )}
                  </Stack>
                )}
              </Stack>
            </TabPanel>
            <TabPanel>
              {!user_password ? (
                <Stack>
                  <Input placeholder="이름" />
                  <Input placeholder="전화번호" />
                  <Input placeholder="이메일(아이디)" />
                  <Button onClick={onCertButton}>휴대폰 본인인증</Button>
                </Stack>
              ) : (
                <Stack>
                  <Input
                    type="password"
                    onChange={(e) => {
                      setInputData({
                        ...inputData,
                        password: e.target.value,
                      });
                    }}
                    placeholder="변경할 비밀번호"
                  />
                  <Input
                    type="password"
                    onChange={(e) => {
                      setInputData({
                        ...inputData,
                        confirm_password: e.target.value,
                      });
                    }}
                    placeholder="변경할 비밀번호 확인"
                  />
                  {inputData.err_msg !== "" && (
                    <Alert status="error">
                      <AlertIcon />
                      {inputData.err_msg}
                    </Alert>
                  )}
                  <Button onClick={onChangePassword}>비밀번호 변경하기</Button>
                </Stack>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
}

export default Find;
