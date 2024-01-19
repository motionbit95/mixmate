import React from "react";
import ReactDOM from "react-dom/client";
import App, { gray_50 } from "./App";
import reportWebVitals from "./reportWebVitals";
// 1. import `ChakraProvider` component
import { Box, ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
