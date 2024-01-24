import logo from "./logo.svg";
import "./App.css";
import { Container, Flex } from "@chakra-ui/react";
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

// import "./reset.css";
import "./index.css";
import "./styleguide.css";

export const theme_primary_color = "orange.500";
export const theme_bright_color = "orange.200";
export const theme_secondary_color = "yellow.500";
export const white = "#ffffff";
export const black = "#000000";
export const bg = white;
export const gray_50 = "#f7fafc";
export const gray_100 = "#edf2f7";
export const gray_200 = "#e2e8f0";
export const gray_300 = "#f1f1f1";
export const gray_400 = "#ebf8ff";
export const gray_500 = "#d9d9d9";
export const gray_600 = "#8c8c8c";
export const gray_700 = "#444444";
export const gray_800 = "#4e4e4e";
export const gray_900 = "#111111";

export const product_mode = "dev"; //product
export const homepage =
  product_mode == "dev" ? "https://localhost:3000" : "https://dinnermate.kr";

function App() {
  return (
    // 모바일 뷰 호환 문제로 패딩을 없애줌
    <Container p={0} border={"1px solid #d9d9d9"} bgColor={bg}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<Information />} />
          <Route path="/modify" element={<Information />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/details" element={<Details />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/chat" element={<ChatList />} />
          <Route path="/chat/*" element={<Chat />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
