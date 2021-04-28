import * as React from "react";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import Terms from "./Terms";

export default function Winner({ newGame, setNewGame, setFlipped }) {
  const { currentPrize } = useGameStateContext();
  const dispatch = useGameDispatchContext();
  const [showTerms, setShowTerms] = React.useState(false);
  const [addToBasket, setAddToBasket] = React.useState(false);

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
      type: "UPDATE_BACKUP_PRIZE",
      prize: currentPrize,
    });
    dispatch({
      type: "UPDATE_PRIZE",
      prize: "",
    });
    setFlipped([]);
    setNewGame(!newGame);
  };

  const handleAddToBasket = () => {
    setAddToBasket(true);
  };

  return (
    <>
      {!showTerms && (
        <Popup className="popup">
          {addToBasket ? (
            <h2>Prize added to basket </h2>
          ) : (
            <h2>
              You found a match <br /> and won a prize!
            </h2>
          )}
          <SwirlSvg />

          <img src={currentPrize.prizeImage} alt={currentPrize.prizeName} />
          {/* <p>Prize: {currentPrize.prizeName}</p> */}
          {!addToBasket ? (
            <>
              <button onClick={handleAddToBasket}>Add to basket</button>
              <button onClick={handleNewGame}>Play again</button>
            </>
          ) : (
            <a className="button" href="https://www.penhaligons.com/uk/en">
              Continue Shopping
            </a>
          )}
          {addToBasket ? (
            <p>
              Your prize has been added to the basket. You will see it your
              basket when you spend a minimum of £140.
            </p>
          ) : (
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
          )}
        </Popup>
      )}
      {showTerms && <Terms setShowTerms={setShowTerms} />}
    </>
  );
}
