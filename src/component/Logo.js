import React from "react";
import { Image, Stack } from "@chakra-ui/react";
import symbol_logo from "../assets/symbol_logo.svg";
import text_logo from "../assets/text_logo.svg";
import { checkNull } from "../js/API";

export const SymbolLogo = ({ ...props }) => {
  return (
    <Image
      w={checkNull(props.w, "auto")}
      h={checkNull(props.h, "auto")}
      src={symbol_logo}
    />
  );
};

export const TextLogo = ({ ...props }) => {
  return (
    <Image
      w={checkNull(props.w, "auto")}
      h={checkNull(props.h, "auto")}
      src={text_logo}
    />
  );
};

export const Logo = ({ ...props }) => {
  return (
    <Stack direction={props.direction} spacing={props.spacing}>
      <Image
        w={checkNull(props.w, "auto")}
        h={checkNull(props.h, "auto")}
        src={symbol_logo}
      />
      <Image
        w={checkNull(props.w, "auto")}
        h={checkNull(props.h, "auto")}
        src={text_logo}
      />
    </Stack>
  );
};
export default SymbolLogo;
