import { Checkbox, FormControl, Input, Stack } from "@chakra-ui/react";
import { FullButton } from "./Buttons";
import { useState } from "react";
import { theme_primary_color } from "../App";
import { getSatuation } from "../js/API";
import { signInPassword } from "../js/Auth";
import { useNavigate } from "react-router-dom";

function setData(_state, _key, _value) {
  return { ..._state, [_key]: _value };
}

const EmailLoginForm = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    user_email: "",
    user_password: "",
  });
  return (
    <Stack spacing={"1vh"} w={"100%"}>
      <FormControl isRequired>
        <Input
          value={account.user_email}
          id="user_email"
          type="email"
          placeholder="아이디"
          defaultValue={localStorage.getItem("user_id")}
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
          onChange={(e) =>
            setAccount(setData(account, "user_password", e.target.value))
          }
        />
      </FormControl>
      <Checkbox
        defaultChecked={true}
        colorScheme={getSatuation(theme_primary_color)}
      >
        자동 로그인
      </Checkbox>
      <FullButton
        onClick={async () => {
          let uid = await signInPassword(
            account.user_email,
            account.user_password
          );
          console.log(uid);
          if (uid) {
            localStorage.setItem("user_id", account.user_email);
            navigate("/");
          } else {
            alert("로그인에 실패했습니다. 계정을 확인하세요");
            setAccount({ user_email: "", user_password: "" });
          }
        }}
        text={"로그인하기"}
        code={"orange.600"}
      />
    </Stack>
  );
};
export default EmailLoginForm;
