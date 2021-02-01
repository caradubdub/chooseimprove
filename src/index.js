require("dotenv").config();
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import GlobalStyle from "./styles/global";
import { theme } from "../src/styles/theme";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </>,
  document.getElementById("root")
);
