import * as React from "react";
import {
  useGameStateContext,
  useGameDispatchContext,
} from "../reducer/gameReducer";
import { useCookies } from "react-cookie";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import { gsap } from "gsap";

export default function Winner({ newGame, setNewGame, setFlipped }) {
  const { currentPrize } = useGameStateContext();
  const dispatch = useGameDispatchContext();
  const [cookies] = useCookies("playAttempts");

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

  React.useEffect(() => {
    gsap.from(".popup-inner", {
      scale: 0.3,
    });
  }, [currentPrize]);

  return (
    <>
      <Popup className="popup">
        <h2>
          You found a match <br /> and won a prize!
        </h2>
        <SwirlSvg />
        <img src={currentPrize.prizeImage} alt={currentPrize.prizeName} />
        <p>
          Prize: {currentPrize.prizeName} {cookies.playAttempts}
        </p>
        <button>Claim Prize</button>
        <button onClick={handleNewGame}>Play again</button>
      </Popup>
    </>
  );
}
