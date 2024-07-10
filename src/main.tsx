import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";


const Root = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ChakraProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!); // 非nullアサーションを使用してnullチェックを回避
root.render(<Root />);
