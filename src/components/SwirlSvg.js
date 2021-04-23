import * as React from "react";
import swirl from "../assets/images/svgs/swirl.svg";

export default function SwirlSvg() {
  return (
    <>
      <img
        style={{
          width: "50%",
          margin: "10px auto",
        }}
        src={swirl}
        alt=""
      />
    </>
  );
}
