import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { GlobalProvider } from "./reducer/gameReducer";
import { createGlobalStyle } from "styled-components";
import reset from "./assets/styles/reset";
import global from "./assets/styles/global";
import Layout from "./components/Layout";
import "./assets/styles/oldGame.css";
import { Helmet } from "react-helmet";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${global}
`;

export default function Root() {
  return (
    <>
      <Helmet>
        <title>Penhaligon's Pair a Portrait</title>
      </Helmet>
      <GlobalStyle />
      <CookiesProvider>
        <GlobalProvider>
          <Layout>
            <App />
          </Layout>
        </GlobalProvider>
      </CookiesProvider>
    </>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
