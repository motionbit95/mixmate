import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminUser from "./AdminUser";
import AdminPayment from "./AdminPayment";
import AdminGroup from "./AdminGroup";
import AdminMatching from "./AdminMatching";
import AdminReview from "./AdminReview";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../db/firebase_config";

function AdminDashboard(props) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("user");
  const [userList, setUserList] = useState(null);
  const [page, setPage] = useState(<AdminUser data={userList} />);
  useEffect(() => {
    console.log(localStorage.getItem("muggle-admin"));

    if (localStorage.getItem("muggle-admin")) {
      localStorage.getItem("muggle-admin");
    } else {
      navigate("/login");
    }

    let userList = [];
    onSnapshot(collection(db, "user"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // 첫 추가 시 added로 들어옵니다.
          userList.push({ ...change.doc.data(), doc_id: change.doc.id });
        }
        if (change.type === "modified") {
        }
        if (change.type === "removed") {
        }
      });
    });

    setUserList(userList);
  }, []);

  useEffect(() => {
    console.log(menu);
    console.log(userList);

    switch (menu) {
      case "user":
        setPage(<AdminUser data={userList} />);
        break;
      case "payment":
        setPage(<AdminPayment />);
        break;
      case "group":
        setPage(<AdminGroup />);
        break;
      case "matching":
        setPage(<AdminMatching />);
        break;
      case "review":
        setPage(<AdminReview />);
        break;
      default:
        setPage(<AdminUser data={userList} />);
    }
  }, [menu]);

  const handleMenu = (menu) => {
    setMenu(menu);
    navigate("/dashboard/" + menu);
  };

  return (
    <Flex>
      <Sidebar onChangeMenu={handleMenu} />
      <Flex
        w={"100%"}
        h={"100vh"}
        bgColor={"gray.50"}
        justifyContent={"center"}
        p={4}
      >
        {page}
      </Flex>
    </Flex>
  );
}

export default AdminDashboard;
