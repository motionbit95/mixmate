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
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
