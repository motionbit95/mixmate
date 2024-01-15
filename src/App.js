import logo from "./logo.svg";
import "./App.css";
import { Container } from "@chakra-ui/react";
import { Login } from "./pages/Login";

function App() {
  return (
    <Container maxW={"container-sm"}>
      <Login />
    </Container>
  );
}

export default App;
