import * as React from "react";
import styled from "styled-components";
import SwirlSvg from "./SwirlSvg";
import picture from "../assets/images/frames/square-backup.jpg";
import { Link } from "react-router-dom";

const HomeStyles = styled.div`
  color: white;
  text-align: center;
  .home-inner {
    max-width: 400px;
    padding: 30px;
  }
`;

export default function Home() {
  return (
    <>
      <HomeStyles>
        <div className="home-inner">
          <SwirlSvg white />
          <h1 style={{fontSize: 38}}>
            PAIR A<br />
            PORTRAIT
          </h1>
          <SwirlSvg white />
          <img src={picture} alt="" />
          <p style={{ fontSize: 22 }}>
            Flip a frame to find a match in five attempts and win a prize.
          </p>
          <Link className="button-alt" to="/play">
            Play
          </Link>
          <SwirlSvg white />
          <p>
            Your prize will be added to your basket with an order of £140 or
            more. Limited to 3 plays per day. Peruse the full terms and
            conditions.
          </p>
        </div>
      </HomeStyles>
    </>
  );
}
