import * as React from "react";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";

export default function Terms({ setShowTerms }) {
  return (
    <>
      <Popup>
        <h1>Terms & Conditions</h1>
        <SwirlSvg />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque
          tellus, sagittis vitae mauris et, molestie ultricies nisl. Quisque non
          purus sollicitudin tellus semper rutrum.
          <br />
          <br />
          Lorem ipsum dolor sit amensectetur adipiscing elit. Etiam ntellus,
          sagittis vitae mauris et, molestie ultricies nisl. Quisque non purus
          sollicitudin utrum.
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam neque
          tellus, sagittis vitae mauris et, molestie ultricies nisl. Quisque non
          purus sollicitudin tellus semper rutrum.
          <br />
          <br />
          Lorem ipsum dolo Etiam neque tellus, sagittis vitae mauris et,
          molestie ultricies nisl. Quisque non purus sollicitudin tellus semper
          rutrum.
        </p>
        <button style={{ marginTop: 20 }} onClick={() => setShowTerms(false)}>
          Close
        </button>
      </Popup>
    </>
  );
}
