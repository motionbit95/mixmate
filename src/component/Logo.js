import React from "react";
import { Image, Stack, Text } from "@chakra-ui/react";
import symbol_logo from "../assets/symbol_logo.png";
import text_logo from "../assets/text_logo.png";
import logo from "../assets/Logo.png";
import { checkNull } from "../js/API";

export const SymbolLogo = ({ ...props }) => {
  return (
    <Text
      fontSize={"48px"}
      fontWeight={"900"}
      fontFamily={"GapyeongHanseokbong-Bold"}
    >
      식사회
    </Text>
    // <Image
    //   w={checkNull(props.w, "auto")}
    //   h={checkNull(props.h, "auto")}
    //   src={symbol_logo}
    // />
  );
};

export const TextLogo = ({ ...props }) => {
  return (
    <Text
      fontSize={"20px"}
      fontWeight={"900"}
      fontFamily={"GapyeongHanseokbong-Bold"}
      whiteSpace={"nowrap"}
      px={"20px"}
    >
      {"식사회"}
    </Text>
    // <Image
    //   w={checkNull(props.w, "auto")}
    //   h={checkNull(props.h, "auto")}
    //   src={text_logo}
    // />
  );
};

export const Logo = ({ ...props }) => {
  return (
    <Stack direction={props.direction} spacing={props.spacing}>
      {/* <Text fontSize={"xxx-large"} fontWeight={"black"} my={"4vh"}>
        {"식사회"}
      </Text> */}
      {/* <Image
        w={checkNull(props.w, "auto")}
        h={checkNull(props.h, "auto")}
        src={symbol_logo}
      />
      <Image
        w={checkNull(props.w, "auto")}
        h={checkNull(props.h, "auto")}
        src={text_logo}
      /> */}
      <Image
        w={checkNull(props.w, "auto")}
        h={checkNull(props.h, "auto")}
        src={logo}
      />
    </Stack>
  );
};
export default SymbolLogo;
