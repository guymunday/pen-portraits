import * as React from "react";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import { useGameStateContext } from "../reducer/gameReducer";
import roundBackup from "../assets/images/frames/round-backup.png";
import { finishGameAndPrize } from "../actions/api";
import AjaxButton from "./AjaxButton";
import { Redirect } from "react-router";

export default function MaxAttempts() {
  const { previousPrize, id } = useGameStateContext();
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (!previousPrize) {
      finishGameAndPrize(id, "LOST");
    }
  });

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Popup>
        {!previousPrize && (
          <>
            <h2>Oh blast!</h2>
            <SwirlSvg />
            <p>You didn’t find a match, come back tomorrow to try again.</p>
            <img src={roundBackup} alt="" />
            <a className="button" href="https://www.penhaligons.com/uk/en">
              Continue Shopping
            </a>
          </>
        )}
        {previousPrize && (
          <>
            {!formSubmitted ? (
              <h2>
                Oh blast!
                <br />
                You used your last attempt and didn’t win.
              </h2>
            ) : (
              <h2>Prize added to bag</h2>
            )}
            <SwirlSvg />
            <img src={previousPrize.prizeImage} alt={previousPrize.prizeName} />
            {!formSubmitted ? (
              <h3>Have no fear, you still win the last prize you matched.</h3>
            ) : (
              <h3>
                Your prize has been added to the bag. You will see it your bag
                when you spend a minimum of £150.
              </h3>
            )}
            <AjaxButton
              prize={previousPrize.penId}
              setFormSubmitted={setFormSubmitted}
              style={{ display: formSubmitted ? "none" : null }}
            />
            {!formSubmitted && (
              <p>
                Your prize will be added to your bag with an order of £150 or
                more. Limited to 7 plays per day.{" "}
                <a
                  style={{ textDecoration: "underline" }}
                  href="https://www.penhaligons.com/uk/en/game-official-regulation"
                  target="_blank"
                >
                  Peruse the full terms and conditions.
                </a>
              </p>
            )}
          </>
        )}
      </Popup>
    </>
  );
}
