import { Checkbox, FormControl, Input, Stack } from "@chakra-ui/react";
import { FullButton } from "./Buttons";
import { useState } from "react";
import { theme_primary_color } from "../App";
import { get_satuation } from "../js/Basic";
import { auth_login_password } from "../js/Auth";
import { useNavigate } from "react-router-dom";

function input_data(_state, _key, _value) {
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
          placeholder="이메일"
          onChange={(e) =>
            setAccount(input_data(account, "user_email", e.target.value))
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
            setAccount(input_data(account, "user_password", e.target.value))
          }
        />
      </FormControl>
      <Checkbox
        defaultChecked={true}
        colorScheme={get_satuation(theme_primary_color)}
      >
        자동 로그인
      </Checkbox>
      <FullButton
        onClick={async () => {
          let uid = await auth_login_password(
            account.user_email,
            account.user_password
          );
          console.log(uid);
          if (uid) {
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
