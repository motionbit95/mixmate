import logo from "./logo.svg";
import "./App.css";
import { Container, Flex } from "@chakra-ui/react";
import { Login } from "./pages/Login";
import PremiumLogin from "./pages/PremiumLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import FlatHome from "./pages/FlatHome";
import { Notice } from "./pages/Notice";
import FlatMatching from "./pages/FlatMatching";
import { Payment } from "./pages/Payment";
import { Information } from "./pages/Information";
import { MyPage } from "./pages/MyPage";
import { Details } from "./pages/Details";
import FlatChatList from "./pages/FlatChatList";
import FlatChat from "./pages/FlatChat";

// import "./reset.css";
import "./index.css";
import "./styleguide.css";
import "./styles/FlatDesignSystem.css";
import { Loading } from "./pages/Loading";
import Find from "./pages/Find";
import CertSuccess from "./pages/CertSuccess";
import EmailLogin from "./pages/EmailLogin";
import OrderConfirm from "./pages/OrderConfirm";
import OrderResult from "./pages/OrderResult";
import AdminLogin from "./pages/AD/AdminLogin";
import AdminDashboard from "./pages/AD/AdminDashboard";
import OrderConfirmView from "./pages/ChoppiPayment";
import ChoppiPaymentResult from "./pages/ChoppiPaymentResult";
import ChoppiPayment from "./pages/ChoppiPayment";
import Favorites from "./pages/Favorites";

// Enterprise Design Tokens - Modern Color System
export const theme_primary_color = "blue.600";
export const theme_bright_color = "blue.500";
export const theme_secondary_color = "indigo.600";
export const theme_accent_color = "purple.500";
export const theme_success_color = "green.500";
export const theme_warning_color = "orange.500";
export const theme_error_color = "red.500";

// Neutral Colors - Professional Grade
export const white = "#ffffff";
export const black = "#000000";
export const bg = "#fafafa";
export const surface = "#ffffff";

// Gray Scale - Carefully calibrated for accessibility
export const gray_50 = "#f9fafb";
export const gray_100 = "#f3f4f6";
export const gray_200 = "#e5e7eb";
export const gray_300 = "#d1d5db";
export const gray_400 = "#9ca3af";
export const gray_500 = "#6b7280";
export const gray_600 = "#4b5563";
export const gray_700 = "#374151";
export const gray_800 = "#1f2937";
export const gray_900 = "#111827";

// Brand Colors - Professional and Modern
export const brand_primary = "#2563eb";
export const brand_secondary = "#4f46e5";
export const brand_accent = "#7c3aed";

// Semantic Colors
export const success_light = "#dcfce7";
export const success_dark = "#166534";
export const warning_light = "#fef3c7";
export const warning_dark = "#92400e";
export const error_light = "#fee2e2";
export const error_dark = "#991b1b";
export const info_light = "#dbeafe";
export const info_dark = "#1e40af";

export const product_mode = "dev"; //product
export const homepage =
  product_mode == "dev" ? "https://localhost:3000" : "https://choppi.kr";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 일반 사용자 페이지들 */}
        <Route path="/" element={<FlatHome />} />
        <Route path="/home" element={<FlatHome />} />
        <Route path="/user-login" element={<PremiumLogin />} />
        <Route path="/login" element={<PremiumLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/matching" element={<FlatMatching />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/information" element={<Information />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/details" element={<Details />} />
        <Route path="/chatlist" element={<FlatChatList />} />
        <Route path="/chat-list" element={<FlatChatList />} />
        <Route path="/chat" element={<FlatChat />} />
        <Route path="/chat/:userId" element={<FlatChat />} />
        <Route path="/find" element={<Find />} />
        <Route path="/cert-success" element={<CertSuccess />} />
        <Route path="/email-login" element={<EmailLogin />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="/order_result" element={<OrderResult />} />
        <Route path="/choppi_payment" element={<ChoppiPayment />} />
        <Route path="/choppi_payment_result" element={<ChoppiPaymentResult />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* 관리자 페이지들 */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />

        {/* 기본 경로를 홈으로 리다이렉트 */}
        <Route path="*" element={<FlatHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
