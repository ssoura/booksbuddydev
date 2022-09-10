import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { ReducerContextProvider } from "./Context/ReducerContext";
import { ProductsContextProvider } from "./Context/ProductsContext";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
        <ReducerContextProvider>
          <ProductsContextProvider>
            <App />
          </ProductsContextProvider>
        </ReducerContextProvider>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
