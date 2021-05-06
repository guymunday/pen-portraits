import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import light from "../assets/images/room-assets/light.png";
import chair from "../assets/images/room-assets/chair.png";
import plant from "../assets/images/room-assets/plant.png";
import leaves from "../assets/images/room-assets/leaves.png";
import clock from "../assets/images/room-assets/clock.png";
import Terms from "./Terms";
import music from "../assets/music.mp3";
import { VolumeMute, VolumeUp } from "@styled-icons/material";

const LayoutStyles = styled.main`
  background: #01263c;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 500px) {
    padding-bottom: 30px;
  }
  .furniture {
    position: absolute;
    display: block;
    transform: translate(-50%, 0);
    /* width: 30%; */
    max-width: 300px;
    &.light-image {
      top: -30%;
      left: 50%;
    }
    &.chair-image {
      bottom: -18%;
      right: -15%;
    }
    &.left-plant-image {
      bottom: -25%;
      left: 25%;
    }
    &.right-plant-image {
      bottom: -25%;
      right: 10%;
    }
    &.left-leaves-image {
      bottom: -8%;
      left: 10%;
      max-width: 400px;
      transform: translate(-50%, 0) scaleX(-1) rotate(30deg);
    }
    &.clock-image {
      bottom: -8%;
      left: 10%;
      max-width: 220px;
    }
  }
  @media screen and (max-width: 768px) {
    .hide-mobile {
      display: none;
    }
  }
  .layout-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(rgba(0, 0, 0, 0.3) 35%, rgba(0, 0, 0, 1));
  }
`;

const ButtonFlex = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  padding: 30px;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  width: 100%;
  align-self: baseline;
  justify-self: baseline;
  .controls {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default function Layout({ children }) {
  const [showTerms, setShowTerms] = React.useState(false);
  const audioRef = React.useRef(null);
  const [audioPlaying, setAudioPlaying] = React.useState(true);

  return (
    <>
      <Header />
      <LayoutStyles>
        <img src={light} alt="" className="light-image furniture" />
        <img src={chair} alt="" className="chair-image furniture hide-mobile" />
        <img src={clock} alt="" className="clock-image furniture hide-mobile" />
        <img
          src={plant}
          alt=""
          className="left-plant-image furniture hide-mobile"
        />
        <img
          src={plant}
          alt=""
          className="right-plant-image furniture hide-mobile"
        />
        <img
          src={leaves}
          alt=""
          className="left-leaves-image furniture hide-mobile"
        />
        <div className="layout-gradient" />
        <div style={{ position: "relative" }}>{children}</div>
        <ButtonFlex id="buttons">
          <div
            role="button"
            className="controls"
            onClick={() => {
              audioRef?.current?.paused
                ? audioRef.current.play()
                : audioRef.current.pause();

              setAudioPlaying(!audioPlaying);
            }}
          >
            {!audioPlaying ? (
              <VolumeMute style={{ height: 40 }} />
            ) : (
              <VolumeUp style={{ height: 40 }} />
            )}
          </div>
          <div
            role="button"
            className="controls"
            onClick={() => setShowTerms(!showTerms)}
          >
            Terms
          </div>
        </ButtonFlex>
      </LayoutStyles>
      <Footer />
      {showTerms && <Terms setShowTerms={setShowTerms} />}
      <audio ref={audioRef} autoPlay src={music} />
    </>
  );
}
