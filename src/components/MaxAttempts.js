// if there is a prize, show that. if no prize show come back tomorrow message
import * as React from "react";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import { useGameStateContext } from "../reducer/gameReducer";
import roundBackup from "../assets/images/frames/round-backup.png";
import Terms from "./Terms";

export default function MaxAttempts() {
  const { previousPrize } = useGameStateContext();
  const [showTerms, setShowTerms] = React.useState(false);

  return (
    <>
      <Popup>
        {!previousPrize && (
          <>
            <h2>Oh blast!</h2>
            <SwirlSvg />
            <p>You didn’t find a match, come back tomorrow to try again.</p>
            <img src={roundBackup} alt="" />
            <button>Continue Shopping</button>
          </>
        )}
        {previousPrize && !showTerms && (
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
            <p>
              Your prize will be added to your basket with an order of £140 or
              more. Limited to 5 plays per day.{" "}
              <span
                style={{ textDecoration: "underline" }}
                role="button"
                onClick={() => setShowTerms(!showTerms)}
              >
                Peruse the full terms and conditions.
              </span>
            </p>
          </>
        )}
      </Popup>
      {showTerms && <Terms setShowTerms={setShowTerms} />}
    </>
  );
}
