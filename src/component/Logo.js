import React from "react";
import { Image, Stack } from "@chakra-ui/react";
import symbol_logo from "../assets/symbol_logo.svg";
import text_logo from "../assets/text_logo.svg";
import { ck_null } from "../js/Basic";

export const SymbolLogo = ({ ...props }) => {
  return (
    <Image
      w={ck_null(props.w, "auto")}
      h={ck_null(props.h, "auto")}
      src={symbol_logo}
    />
  );
};

export const TextLogo = ({ ...props }) => {
  return (
    <Image
      w={ck_null(props.w, "auto")}
      h={ck_null(props.h, "auto")}
      src={text_logo}
    />
  );
};

export const Logo = ({ ...props }) => {
  return (
    <Stack direction={props.direction} spacing={props.spacing}>
      <Image
        w={ck_null(props.w, "auto")}
        h={ck_null(props.h, "auto")}
        src={symbol_logo}
      />
      <Image w={ck_null(props.w, "auto")} h={"auto"} src={text_logo} />
    </Stack>
  );
};
export default SymbolLogo;
