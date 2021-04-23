// if there is a prize, show that. if no prize show come back tomorrow message
import * as React from "react";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";

export default function MaxAttempts() {
  return (
    <>
      <Popup>
        <h2>You've reached the max attempts for today</h2>
        <SwirlSvg />
      </Popup>
    </>
  );
}
