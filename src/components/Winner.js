import * as React from "react";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import Terms from "./Terms";
import { finishGameAndPrize } from "../actions/api";
import AjaxButton from "./AjaxButton";
import { useCookies } from "react-cookie";

export default function Winner({ newGame, setNewGame, setFlipped }) {
  const { currentPrize, previousPrize, id } = useGameStateContext();
  const dispatch = useGameDispatchContext();
  const [showTerms, setShowTerms] = React.useState(false);
  const [cookies] = useCookies([]);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const handleNewGame = () => {
    dispatch({
      type: "UPDATE_FIRST_PRIZE",
      first: "",
    });
    dispatch({
      type: "UPDATE_SECOND_PRIZE",
      second: "",
    });
    dispatch({
      type: "UPDATE_PRIZE",
      prize: "",
    });
    setFlipped([]);
    setNewGame(!newGame);
  };

  const handleAddToBasket = () => {
    finishGameAndPrize(id, previousPrize.prizeId);
  };

  return (
    <>
      {!showTerms && (
        <>
          <Popup className="popup">
            {!formSubmitted ? (
              <h2>
                You found a match <br /> and won a prize!
              </h2>
            ) : (
              <h2>Prize added to basket</h2>
            )}
            <SwirlSvg />
            <img src={currentPrize.prizeImage} alt={currentPrize.prizeName} />
            {!formSubmitted ? (
              <h3>{currentPrize.prizeName}</h3>
            ) : (
              <h3>
                Your prize has been added to the basket. You will see it your
                basket when you spend a minimum of £150.
              </h3>
            )}
            <AjaxButton
              prize={previousPrize.penId}
              click={handleAddToBasket}
              setFormSubmitted={setFormSubmitted}
              style={{ display: formSubmitted ? "none" : null }}
            />
            {!formSubmitted && (
              <>
                {parseInt(cookies.playAttempts) > 0 && (
                  <button onClick={handleNewGame}>
                    {cookies.playAttempts} tries left
                  </button>
                )}
                <p>
                  Your prize will be added to your basket with an order of £150
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
            )}
          </Popup>
        </>
      )}
      {showTerms && <Terms setShowTerms={setShowTerms} />}
    </>
  );
}
