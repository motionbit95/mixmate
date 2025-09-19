import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminUser from "./AdminUser";
import AdminPayment from "./AdminPayment";
import AdminGroup from "./AdminGroup";
import AdminMatching from "./AdminMatching";
import { get_doc_all } from "../../js/Database";

function AdminDashboard(props) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("user");
  const [userList, setUserList] = useState(null);
  const [paymentList, setPaymentList] = useState(null);
  const [page, setPage] = useState(<AdminUser data={userList} />);
  useEffect(() => {
    console.log(localStorage.getItem("choppi-admin"));
    if (localStorage.getItem("choppi-admin")) {
      localStorage.getItem("choppi-admin");
      handleMenu(
        localStorage.getItem("menu") ? localStorage.getItem("menu") : "user"
      );
    } else {
      navigate("/login");
    }

    // Load mock data instead of Firebase
    const loadMockData = async () => {
      try {
        const users = await get_doc_all("user");
        const payments = await get_doc_all("payment");
        setUserList(users);
        setPaymentList(payments);
      } catch (error) {
        console.log("[AdminDashboard] Error loading mock data:", error);
        setUserList([]);
        setPaymentList([]);
      }
    };

    loadMockData();
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("menu"));
    // console.log(userList);
    console.log(paymentList);

    switch (localStorage.getItem("menu")) {
      case "user":
        setPage(<AdminUser data={userList} />);
        break;
      case "payment":
        setPage(<AdminPayment data={paymentList} />);
        break;
      case "group":
        setPage(<AdminGroup />);
        break;
      case "matching":
        setPage(<AdminMatching />);
        break;
      default:
        setPage(<AdminUser data={userList} />);
    }
  }, [menu]);

  const handleMenu = (menu) => {
    setMenu(menu);
    localStorage.setItem("menu", menu);
    navigate("/dashboard/" + menu);
  };

  return (
    <Flex>
      <Sidebar onChangeMenu={handleMenu} />
      <Flex
        w={"100%"}
        h={"100vh"}
        bgColor={"gray.50"}
        justifyContent={"flex-start"}
        p={4}
      >
        {page}
      </Flex>
    </Flex>
  );
}

export default AdminDashboard;
