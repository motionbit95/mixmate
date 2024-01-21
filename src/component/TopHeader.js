import { Box, Container, Icon, Stack, Text } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { black, theme_primary_color } from "../App";
import { get_satuation } from "../js/Basic";

export const TopHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Stack className="header" zIndex={9999} bgColor={"white"}>
      <Container p={0}>
        <Stack
          p="10px"
          direction="row"
          justify="space-between"
          align="flex-start"
          spacing="10px"
          overflow="hidden"
          alignSelf="stretch"
          border={"1px solid #d9d9d9"}
        >
          <Icon
            as={MdChevronLeft}
            onClick={() => navigate(-1)}
            boxSize={"24px"}
          />
          <Text
            fontWeight="Bold"
            fontSize="18px"
            color={black}
            textAlign="center"
          >
            {title}
          </Text>
          <Box height="26px"></Box>
        </Stack>
      </Container>
    </Stack>
  );
};
