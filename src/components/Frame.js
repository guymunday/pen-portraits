import * as React from "react";
import styled from "styled-components";

const FrameStyles = styled.div`
  width: 30%;
  height: 100%;
  margin: 3px;
  position: relative;
  overflow: hidden;
  @media screen and (min-aspect-ratio: 10 / 16) {
    width: 22%;
  }
  @media screen and (min-aspect-ratio: 45 / 43) {
    width: 18%;
  }
  @media screen and (min-aspect-ratio: 57 / 43) {
    width: 15%;
  }

  .frame-inner,
  .frame-offwhite {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
  }
  .frame-offwhite {
    background: var(--offwhite);
  }
  .frame-image {
    display: block;
    /* width: 100%; */
    height: 100%;
    pointer-events: none;
    position: relative;
  }
`;

export default function Frame({ i, image, children, ...rest }) {
  return (
    <>
      <FrameStyles className="card" {...rest}>
        <div
          className="frame-offwhite"
          style={{ borderRadius: i === 0 || i === 6 ? "50%" : "0px" }}
        />
        <div className="frame-inner">{children}</div>
        <img className="frame-image" src={image} alt="Portrait frame" />
      </FrameStyles>
    </>
  );
}
