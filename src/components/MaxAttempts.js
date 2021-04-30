import * as React from "react";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import { useGameStateContext } from "../reducer/gameReducer";
import roundBackup from "../assets/images/frames/round-backup.png";
import Terms from "./Terms";
import { finishGameAndPrize } from "../actions/api";

export default function MaxAttempts() {
  const { previousPrize } = useGameStateContext();
  const [showTerms, setShowTerms] = React.useState(false);
  const [addToBasket, setAddToBasket] = React.useState(false);

  const handleAddToBasket = () => {
    setAddToBasket(true);
    finishGameAndPrize(previousPrize.prizeId);
  };

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
        {previousPrize && !showTerms && (
          <>
            {addToBasket ? (
              <h2>Prize added to basket </h2>
            ) : (
              <h2>
                Oh blast!
                <br />
                You used your last attempt and didn’t win.
              </h2>
            )}
            <SwirlSvg />
            <img src={previousPrize.prizeImage} alt={previousPrize.prizeName} />
            {addToBasket ? (
              <p>
                Your prize has been added to the basket. You will see it your
                basket when you spend a minimum of £140.
              </p>
            ) : (
              <p>Have no fear, you still win the last prize you matched.</p>
            )}
            {!addToBasket ? (
              <>
                <button onClick={handleAddToBasket}>Add to basket</button>
                <p>
                  Your prize will be added to your basket with an order of £140
                  or more. Limited to 5 plays per day.{" "}
                  <span
                    style={{ textDecoration: "underline" }}
                    role="button"
                    onClick={() => setShowTerms(!showTerms)}
                  >
                    Peruse the full terms and conditions.
                  </span>
                </p>
              </>
            ) : (
              <a className="button" href="https://www.penhaligons.com/uk/en">
                Continue Shopping
              </a>
            )}
          </>
        )}
      </Popup>
      {showTerms && <Terms setShowTerms={setShowTerms} />}
    </>
  );
}
