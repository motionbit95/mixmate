import { Button, Flex, Text } from "@chakra-ui/react";

function ck_null(a, b) {
  return a ? a : b;
}

function get_satuation(code) {
  if (!code.includes(".")) return "white";
  return ck_null(code.split(".")[0], "white");
}

function get_brightness(code) {
  if (!code.includes(".")) return "white";
  return ck_null(parseInt(code.split(".")[1]), 50);
}

export const TextButton = ({ text, ...props }) => {
  return (
    <Text
      onClick={props.onClick}
      fontSize={"small"}
      color={"gray.500"}
      cursor={"pointer"}
    >
      {text}
    </Text>
  );
};

export const CustomButton = ({ ...props }) => {
  const brightness = get_brightness(ck_null(props.code, "gray.100"));
  return (
    <Button
      w={ck_null(props.w, "100%")}
      colorScheme={get_satuation(ck_null(props.code, "gray.100"))}
      color={brightness < 500 ? "black" : "white"}
      border={"1px solid"}
      borderColor={brightness < 300 ? "gray.300" : "white"}
      leftIcon={ck_null(props.icon, null)}
      onClick={() => props.onClick()}
    >
      {props.text}
    </Button>
  );
};

export const FullButton = ({ ...props }) => {
  return (
    <Flex>
      <CustomButton {...props} w="100%" />
    </Flex>
  );
};
