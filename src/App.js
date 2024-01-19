import logo from "./logo.svg";
import "./App.css";
import { Container } from "@chakra-ui/react";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Notice } from "./pages/Notice";
import { Matching } from "./pages/Matching";
import { Payment } from "./pages/Payment";
import { Information } from "./pages/Information";
import { MyPage } from "./pages/MyPage";
import { Navbar } from "./component/Navbar";
import { Details } from "./pages/Details";
import { ChatList } from "./pages/ChatList";
import { Chat } from "./pages/Chat";

function App() {
  return (
    <Container maxW={"container-sm"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<Information />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/details" element={<Details />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/chat" element={<ChatList />} />
          <Route path="/chat/*" element={<Chat />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
      <Navbar />
    </Container>
  );
}

export default App;
