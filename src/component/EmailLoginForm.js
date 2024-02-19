import {
  Box,
  Checkbox,
  Container,
  Flex,
  FormControl,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FullButton } from "./Buttons";
import { useState } from "react";
import { theme_bright_color, theme_primary_color } from "../App";
import { getSatuation, setData } from "../js/API";
import { signInPassword } from "../js/Auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../db/firebase_config";
import { useAuthState } from "../js/Hooks";
import { motion, useAnimation } from "framer-motion";

const EmailLoginForm = ({ ...props }) => {
  const { user } = useAuthState(auth);
  const navigate = useNavigate();
  const [save, setSave] = useState(Boolean(localStorage.getItem("id_save")));
  const [account, setAccount] = useState({
    user_email: localStorage.getItem("user_email"),
    user_password: localStorage.getItem("user_password"),
  });
  const [isView, setView] = useState(false);
  const controls = useAnimation();

  async function onClickButton() {
    let success = await signInPassword(
      account.user_email,
      account.user_password
    );
    if (success) {
      // 로그인 성공
      navigate("/");
      if (save) {
        localStorage.setItem("user_email", account.user_email);
        localStorage.setItem("user_password", account.user_password);
        localStorage.setItem("id_save", save);
      } else {
        localStorage.clear();
      }
    } else {
      // 로그인 실패
      alert("로그인에 실패했습니다. 계정을 확인하세요");
      setAccount({ user_email: "", user_password: "" });
    }
  }

  return (
    <Stack spacing={"2vh"} w={"100%"}>
      <Stack spacing={"1vh"} py={"2vh"} bgColor={"white"}>
        <FormControl isRequired>
          <Input
            value={account.user_email}
            id="user_email"
            type="email"
            placeholder="이메일"
            defaultValue={localStorage.getItem("user_email")}
            onChange={(e) =>
              setAccount(setData(account, "user_email", e.target.value))
            }
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            value={account.user_password}
            id="user_password"
            type="password"
            placeholder="패스워드"
            defaultValue={localStorage.getItem("user_password")}
            onChange={(e) =>
              setAccount(setData(account, "user_password", e.target.value))
            }
          />
        </FormControl>
        <Checkbox
          defaultChecked={save}
          colorScheme={getSatuation(theme_primary_color)}
          onChange={(e) => setSave(e.target.checked)}
        >
          아이디 / 비밀번호 저장하기
        </Checkbox>
      </Stack>
      <FullButton
        height={"50px"}
        onClick={onClickButton}
        text={"회원정보로 로그인하기"}
        code={theme_bright_color}
      />
    </Stack>
  );
};
export default EmailLoginForm;
