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

export const theme_primary_color = "#3182CE";
export const white = "#ffffff";
export const black = "#000000";
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

function App() {
  return (
    <Container maxW={"container-sm"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<Information />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/details" element={<Details />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
      <Navbar />
    </Container>
  );
}

export default App;
