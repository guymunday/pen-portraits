// if there is a prize, show that. if no prize show come back tomorrow message
import * as React from "react";
import Popup from "./Popup";
import SwirlSvg from "./SwirlSvg";
import {
  useGameDispatchContext,
  useGameStateContext,
} from "../reducer/gameReducer";

export default function MaxAttempts() {
  const { previousPrize } = useGameStateContext();

  return (
    <>
      <Popup>
        <h2>You've reached the max attempts for today</h2>
        <SwirlSvg />
        {previousPrize && (
          <img src={previousPrize.prizeImage} alt={previousPrize.prizeName} />
        )}
      </Popup>
    </>
  );
}
