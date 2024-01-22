import { Button, Flex, Text } from "@chakra-ui/react";

function checkNull(a, b) {
  return a ? a : b;
}

function getSatuation(code) {
  if (!code.includes(".")) return "white";
  return checkNull(code.split(".")[0], "white");
}

function getBrightness(code) {
  if (!code.includes(".")) return "white";
  return checkNull(parseInt(code.split(".")[1]), 50);
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
  const brightness = getBrightness(checkNull(props.code, "gray.100"));
  return (
    <Button
      w={checkNull(props.w, "100%")}
      colorScheme={getSatuation(checkNull(props.code, "gray.100"))}
      color={brightness < 500 ? "black" : "white"}
      border={"1px solid"}
      borderColor={brightness < 300 ? "gray.300" : "white"}
      leftIcon={checkNull(props.icon, null)}
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
