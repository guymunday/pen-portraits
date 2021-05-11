import * as React from "react";
import {
  useGameStateContext,
  useGameDispatchContext,
  prizes,
} from "../reducer/gameReducer";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import AjaxButton from "./AjaxButton";
import { useCookies } from "react-cookie";

export default function Winner({ newGame, setNewGame, setFlipped }) {
  const { currentPrize, previousPrize, id } = useGameStateContext();
  const dispatch = useGameDispatchContext();
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

  return (
    <>
      <Popup className="popup">
        {!formSubmitted ? (
          <h2>
            You found a match <br /> and won a prize!
          </h2>
        ) : (
          <h2>Prize added to bag</h2>
        )}
        <SwirlSvg />
        <img src={currentPrize.prizeImage} alt={currentPrize.prizeName} />
        {!formSubmitted ? (
          <h3>{currentPrize.prizeName}</h3>
        ) : (
          <h3>
            Your prize has been added to the bag. You will see it your bag when
            you spend a minimum of £150.
          </h3>
        )}
        <AjaxButton
          prize={previousPrize.penId}
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
          </>
        )}
      </Popup>
    </>
  );
}
