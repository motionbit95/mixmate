import { Stack, Text } from "@chakra-ui/react";

export const Footer = ({
  companyName = "",
  ceoName = "",
  businessNumber = "",
  address = "",
  commNumber = "",
  tel = "",
  mail = "",
}) => {
  return (
    <Stack bgColor={"gray.100"} p="4vh" gap={0} w={"100%"}>
      <Text fontSize="small" fontWeight="bold" mb={"2vh"}>
        {companyName}
      </Text>
      <Text fontSize="xs">대표자명 : {ceoName}</Text>
      <Text fontSize="xs">사업자등록번호 : {businessNumber}</Text>
      <Text fontSize="xs">주소 : {address}</Text>
      <Text fontSize="xs">통신판매신고번호 : {commNumber}</Text>
      <Text fontSize="xs">전화번호 : {tel}</Text>
      <Text fontSize="xs">이메일 : {mail}</Text>
    </Stack>
  );
};
