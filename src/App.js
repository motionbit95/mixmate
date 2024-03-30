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
import { Details } from "./pages/Details";
import { ChatList } from "./pages/ChatList";
import { Chat } from "./pages/Chat";

// import "./reset.css";
import "./index.css";
import "./styleguide.css";
import { Loading } from "./pages/Loading";
import Find from "./pages/Find";
import CertSuccess from "./pages/CertSuccess";
import EmailLogin from "./pages/EmailLogin";
import OrderConfirm from "./pages/OrderConfirm";
import OrderResult from "./pages/OrderResult";
import AdminLogin from "./pages/AD/AdminLogin";
import AdminDashboard from "./pages/AD/AdminDashboard";
import OrderConfirmView from "./pages/MugglePayment";
import MugglePaymentResult from "./pages/MugglePaymentResult";
import MugglePayment from "./pages/MugglePayment";

export const theme_primary_color = "gray.500";
export const theme_bright_color = "gray.200";
export const theme_secondary_color = "gray.500";
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
    <BrowserRouter>
      <Routes>
        {/* <Route path="/*" element={<AdminDashboard />} /> */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
        <Route path="/muggle_payment" element={<MugglePayment />} />
        <Route
          path="/muggle_payment_result"
          element={<MugglePaymentResult />}
        />
        <Route path="/order_result" element={<OrderResult />} />
        {/* <Route path="/order_result" element={<OrderResult />} />
        <Route path="/order_confirm" element={<OrderConfirm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
