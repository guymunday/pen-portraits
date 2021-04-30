import * as React from "react";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import frameImage from "../assets/images/frames/round-backup.png";

export default function Closed() {
  return (
    <>
      <Popup>
        <h1>
          The gallery
          <br />
          is closed
        </h1>
        <SwirlSvg />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque
          tellus, sagittis vitae mauris et, molestie ultricies nisl. Quisque non
          purus sollicitudin tellus semper rutrum.
        </p>
        <img src={frameImage} alt />
        <a className="button" href="https://www.penhaligons.com/uk/en">
          Continue Shopping
        </a>
      </Popup>
    </>
  );
}
