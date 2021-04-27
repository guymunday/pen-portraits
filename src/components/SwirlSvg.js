import * as React from "react";
import swirl from "../assets/images/svgs/swirl.svg";
import swirlWhite from "../assets/images/svgs/swirl-white.svg"

export default function SwirlSvg({ white }) {
  return (
    <>
      {!white && (
        <img
          style={{
            width: "50%",
            margin: "10px auto",
          }}
          src={swirl}
          alt=""
        />
      )}
      {white && (
        <img
          style={{
            width: "50%",
            margin: "10px auto",
          }}
          src={swirlWhite}
          alt=""
        />
      )}
    </>
  );
}
