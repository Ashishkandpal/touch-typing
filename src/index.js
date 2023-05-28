import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TestModeContextProvider } from "./context/TestModeContext";

import { ThemeContextProvider } from "./context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TestModeContextProvider>
        <App />
      </TestModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
