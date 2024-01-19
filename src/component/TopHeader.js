import { Box, Container, Icon, Stack, Text } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { black } from "../App";

export const TopHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <Stack className="header">
      <Container>
        <Stack
          padding="10px"
          direction="row"
          justify="space-between"
          align="flex-start"
          spacing="10px"
          overflow="hidden"
          alignSelf="stretch"
        >
          <Icon
            as={MdChevronLeft}
            onClick={() => navigate(-1)}
            boxSize={"24px"}
          />
          <Text
            fontFamily="Pretendard"
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
