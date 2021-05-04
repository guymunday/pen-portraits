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

export default function Winner({ newGame, setNewGame, setFlipped }) {
  const { currentPrize, previousPrize, id } = useGameStateContext();
  const dispatch = useGameDispatchContext();
  const [showTerms, setShowTerms] = React.useState(false);

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
        <Popup className="popup">
          <h2>
            You found a match <br /> and won a prize!
          </h2>
          <SwirlSvg />
          <img src={currentPrize.prizeImage} alt={currentPrize.prizeName} />
          {/* <p>Prize: {currentPrize.prizeName}</p> */}
          <AjaxButton prize={previousPrize} click={handleAddToBasket} />
          <button onClick={handleNewGame}>Play again</button>
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
        </Popup>
      )}
      {showTerms && <Terms setShowTerms={setShowTerms} />}
    </>
  );
}
