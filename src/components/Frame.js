import * as React from "react";
import styled from "styled-components";

const FrameStyles = styled.div`
  width: 30%;
  height: 100%;
  padding: 3px;
  position: relative;
  overflow: hidden;
  @media screen and (min-aspect-ratio: 235 / 406) {
    width: 22%;
  }
  @media screen and (min-aspect-ratio: 45 / 43) {
    width: 18%;
  }
  @media screen and (min-aspect-ratio: 57 / 43) {
    width: 15%;
  }
  .frame-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
  .frame-image {
    display: block;
    width: 100%;
    height: auto;
    pointer-events: none;
    position: relative;
  }
`;

export default function Frame({ image, children, ...rest }) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <>
      <FrameStyles className="card" onLoad={() => setLoaded(true)} {...rest}>
        <div className="frame-inner">{children}</div>
        {loaded && (
          <img
            className="frame-image"
            src={image}
            alt="Portrait frame"
          />
        )}
      </FrameStyles>
    </>
  );
}
