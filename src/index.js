import React from "react";
import ReactDOM from "react-dom/client";
import Router, { renewRouter } from "./Router";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/Theme";
import { RouterProvider } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <RouterProvider router={renewRouter} />
    </ThemeProvider>
  </>
);
