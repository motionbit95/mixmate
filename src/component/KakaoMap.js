import { HStack, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { gray_700 } from "../App";
import { db_update } from "../js/Database";

export const TextAddress = ({ user }) => {
  // head에 작성한 Kakao API 불러오기
  const { kakao } = window;
  const [dong, setDong] = useState(user.dong ? user.dong : "");

  useEffect(() => {
    handleMapClick();
  });

  const handleMapClick = async () => {
    if (!user) return;
    // if (!dong) {
    const location = user.user_location;
    const geolocation = new kakao.maps.services.Geocoder();
    //좌표로 행정동 정보 가져오기
    geolocation.coord2Address(
      location.longitude,
      location.latitude,
      (result, status) => {
        if (status) {
          //   console.log(result[0].address.region_3depth_name);
          const address = result[0].address.region_3depth_name;
          setDong(address);

          db_update("user", user.doc_id, { dong: address });
        } else {
          alert("주소를 가져오지 못했습니다.");
        }
      }
    );
    // }
  };

  return (
    <HStack w={"100%"}>
      <IconButton
        display={"none"}
        variant={"ghost"}
        icon={<MdLocationPin color={gray_700} size={"24px"} />}
        onClick={handleMapClick}
      >
        찾기
      </IconButton>
      <Text color={gray_700} fontSize={"xl"} fontWeight={"bold"}>
        {dong}
      </Text>
    </HStack>
  );
};

export default TextAddress;
