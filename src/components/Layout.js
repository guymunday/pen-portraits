import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import light from "../assets/images/room-assets/light.png";

const LayoutStyles = styled.main`
  background: #000;
  position: relative;
  overflow: hidden;
  z-index: 1;
  .light-image {
    position: absolute;
    display: block;
    top: -20%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 30%;
    max-width: 300px;
    z-index: 0;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <LayoutStyles>
        <img src={light} alt="" className="light-image" />
        {children}
      </LayoutStyles>
      <Footer />
    </>
  );
}
