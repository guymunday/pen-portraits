import * as React from "react";
import styled from "styled-components";
import SwirlSvg from "./SwirlSvg";
import frame from "../assets/images/frames/frame-10.png";
import portrait from "../assets/images/frames/portrait-home.png";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Frame from "./Frame";
import Card from "./Card";
import prize from "../assets/images/prizes/matthew.png";
import { gsap } from "gsap";

const HomeStyles = styled.div`
  color: white;
  text-align: center;
  .home-inner {
    max-width: 400px;
    padding: 30px;
    > * {
      margin-bottom: 20px;
    }
  }
`;

export default function Home() {
  const [cookies] = useCookies([]);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    let tl = gsap.timeline({ repeat: -1 });

    tl.add(() => {
      setIndex(1);
    }, "+=2").add(() => {
      setIndex(0);
    }, "+=2");
  }, []);

  return (
    <>
      <HomeStyles>
        <div className="home-inner">
          <SwirlSvg white />
          {parseInt(cookies.playAttempts) === 0 ? (
            <h1 style={{ fontSize: 38 }}>Your keen!</h1>
          ) : (
            <h1 style={{ fontSize: 38 }}>PAIR A PORTRAIT</h1>
          )}
          <SwirlSvg white />
          <Link
            style={{ display: "inline-block" }}
            to={parseInt(cookies.playAttempts) === 0 ? "" :"/play" }
          >
            <Frame image={frame} style={{ width: "100%" }}>
              <Card
                portrait={portrait}
                prize={prize}
                i={index}
                flipped={"1"}
                style={
                  parseInt(cookies.playAttempts) === 0
                    ? { cursor: "auto" }
                    : null
                }
              />
            </Frame>
          </Link>
          {parseInt(cookies.playAttempts) === 0 ? (
            <p style={{ fontSize: 22 }}>
              You’ve used all of your attempts today, come back tomorrow to try
              again.
            </p>
          ) : (
            <p style={{ fontSize: 22 }}>
              Flip a frame to find a match in five attempts and win a prize.
            </p>
          )}

          {parseInt(cookies.playAttempts) === 0 ? (
            <a href="https://www.penhaligons.com/uk/en" className="button-alt">
              Continue shopping
            </a>
          ) : (
            <Link className="button-alt" to="/play">
              Play
            </Link>
          )}
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
