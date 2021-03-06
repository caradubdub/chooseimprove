import React from "react";
import ReactDOM, { render } from "react-dom";
import App from "./App.js";
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
