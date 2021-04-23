import * as React from "react";
import styled from "styled-components";

const CardStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  .card-inner {
    position: relative;
    .portrait-image {
      width: 100%;
      height: auto;
      padding: 12px;
      transition: 0.4s;
      backface-visibility: hidden;
      pointer-events: none;
      &.flipped {
        transform: rotateY(180deg) perspective(100px);
      }
    }
    .prize-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateY(180deg) perspective(100px);
      width: 60%;
      transition: 0.4s;
      backface-visibility: hidden;
      pointer-events: none;
      &.flipped {
        transform: translate(-50%, -50%) rotateY(0deg) perspective(100px);
      }
    }
  }
`;

export default function Card({
  portrait,
  prize,
  flipped,
  i,
  children,
  ...rest
}) {
  return (
    <>
      <CardStyles className={flipped.includes(i) ? " lipped" : ""} {...rest}>
        <div className="card-inner">
          <img
            className={
              flipped.includes(i) ? "portrait-image flipped" : "portrait-image"
            }
            src={portrait}
            alt=""
          />
          <img
            className={
              flipped.includes(i) ? "prize-image flipped" : "prize-image"
            }
            src={prize}
            alt=""
          />
        </div>
      </CardStyles>
    </>
  );
}
