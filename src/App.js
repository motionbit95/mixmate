import logo from "./logo.svg";
import "./App.css";
import { Container } from "@chakra-ui/react";
import { Login } from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";

function App() {
  return (
    <Container maxW={"container-sm"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
