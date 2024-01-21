import { Button, HStack, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdLocationPin, MdLocationSearching } from "react-icons/md";
import { gray_600, gray_700 } from "../App";

export const TextAddress = ({ user }) => {
  // head에 작성한 Kakao API 불러오기
  const { kakao } = window;
  const [dong, setDong] = useState();

  useEffect(() => {
    handleMapClick();
  });

  const handleMapClick = () => {
    if (!dong) {
      console.log(user);
      const location = user.user_location;
      console.log(location);
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
          } else {
            alert("주소를 가져오지 못했습니다.");
          }
        }
      );
    }
  };

  return (
    <HStack w={"100%"}>
      <IconButton
        variant={"goast"}
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
