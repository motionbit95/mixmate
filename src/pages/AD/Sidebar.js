import {
  AttachmentIcon,
  CheckCircleIcon,
  DownloadIcon,
  DragHandleIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { Box, Button, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  MdCoffee,
  MdGroup,
  MdLogout,
  MdPayment,
  MdPerson,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Sidebar(props) {
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState(
    localStorage.getItem("menu") ? localStorage.getItem("menu") : "home"
  );
  const handleClick = (menu) => {
    setCurrentMenu(menu);
    localStorage.setItem("menu", menu);
    props.onChangeMenu(menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("muggle-admin");
    navigate("/login");
  };
  return (
    <Box
      p={4}
      h={"100vh"}
      bgColor={"white"}
      //   mt={4}
      //   position="absolute"
      //   left={0}
      w={"200px"}
      borderRight={"1px solid #d9d9d9"}
    >
      <Stack h={"100%"} justifyContent={"space-between"}>
        {/* 네비게이션 아이템 추가 */}
        <Stack>
          <Button
            leftIcon={<MdPerson />}
            onClick={() => handleClick("user")}
            variant={currentMenu === "user" ? "solid" : "ghost"}
            justifyContent={"flex-start"}
            w={"100%"}
          >
            유저관리
          </Button>
          <Button
            leftIcon={<MdGroup />}
            onClick={() => handleClick("group")}
            variant={currentMenu === "group" ? "solid" : "ghost"}
            justifyContent={"flex-start"}
            w={"100%"}
          >
            모임관리
          </Button>
          <Button
            leftIcon={<MdPayment />}
            onClick={() => handleClick("payment")}
            variant={currentMenu === "payment" ? "solid" : "ghost"}
            justifyContent={"flex-start"}
            w={"100%"}
          >
            결제관리
          </Button>
          <Button
            leftIcon={<MdCoffee />}
            onClick={() => handleClick("matching")}
            variant={currentMenu === "matching" ? "solid" : "ghost"}
            justifyContent={"flex-start"}
            w={"100%"}
          >
            매칭관리
          </Button>
        </Stack>
        <Button
          leftIcon={<MdLogout />}
          onClick={handleLogout}
          variant={currentMenu === "account" ? "solid" : "ghost"}
          justifyContent={"flex-start"}
          w={"100%"}
        >
          로그아웃
        </Button>
      </Stack>
    </Box>
  );
}

export default Sidebar;
