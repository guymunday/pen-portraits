// if there is a prize, show that. if no prize show come back tomorrow message
import * as React from "react";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import { useGameStateContext } from "../reducer/gameReducer";
import roundBackup from "../assets/images/frames/round-backup.png";

export default function MaxAttempts() {
  const { previousPrize } = useGameStateContext();

  return (
    <>
      <Popup>
        {!previousPrize && (
          <>
            <h2>Oh blast!</h2>
            <SwirlSvg />
            <p>You didn’t find a match, come back tomorrow to try again.</p>
            <img src={roundBackup} alt="" />
            <button>Explore</button>
          </>
        )}
        {previousPrize && (
          <>
            <h2>
              Oh blast!
              <br />
              You used your last attempt and didn’t win.
            </h2>
            <SwirlSvg />
            <img src={previousPrize.prizeImage} alt={previousPrize.prizeName} />
            <p>Have no fear, you still win the last prize you matched.</p>
            <button>Add to basket</button>
          </>
        )}
      </Popup>
    </>
  );
}
