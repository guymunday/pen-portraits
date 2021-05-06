import * as React from "react";
import { createContext, useReducer, useContext } from "react";
import prize1 from "../assets/images/prizes/teddy.png";
import prize2 from "../assets/images/prizes/helen.png";
import prize3 from "../assets/images/prizes/matthew.png";
import prize4 from "../assets/images/prizes/flora.png";
import prize5 from "../assets/images/prizes/radcliff.png";
import prize6 from "../assets/images/prizes/beauregard.png";

export const prizes = [
  {
    prizeName: "I say! You have won Terrible Teddy worth £204",
    prizeId: "PRIZE1",
    penId: "PLAY1",
    prizeImage: prize1,
  },
  {
    prizeName: "I say! You have won Heartless Helen worth £204",
    prizeId: "PRIZE2",
    penId: "PLAY2",
    prizeImage: prize2,
  },
  {
    prizeName: "I say! You have won Cousin Matthew worth £204",
    prizeId: "PRIZE3",
    penId: "PLAY3",
    prizeImage: prize3,
  },
  {
    prizeName: "I say! You have won Cousin Flora, worth £204",
    prizeId: "PRIZE4",
    penId: "PLAY4",
    prizeImage: prize4,
  },
  {
    prizeName: "I say! You have won Roaring Radcliffe worth £204",
    prizeId: "PRIZE5",
    penId: "PLAY5",
    prizeImage: prize5,
  },
  {
    prizeName: "I say! You have won Monsiuer Beauregard worth £204",
    prizeId: "PRIZE6",
    penId: "PLAY6",
    prizeImage: prize6,
  },
];

let initialGameContext = {
  firstPrize: "",
  secondPrize: "",
  currentPrize: null,
};

const GameStateContext = createContext(initialGameContext);
const GameDispatchContext = createContext();

const gameReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ID": {
      return {
        ...state,
        id: action.id,
      };
    }
    case "UPDATE_PRIZE": {
      return {
        ...state,
        currentPrize: action.prize,
      };
    }
    case "UPDATE_BACKUP_PRIZE": {
      return {
        ...state,
        previousPrize: action.prize,
      };
    }
    case "UPDATE_FIRST_PRIZE": {
      return {
        ...state,
        firstPrize: action.first,
      };
    }
    case "UPDATE_SECOND_PRIZE": {
      return {
        ...state,
        secondPrize: action.second,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameContext);

  return (
    <GameDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={state}>
        {children}
      </GameStateContext.Provider>
    </GameDispatchContext.Provider>
  );
};

export const useGameStateContext = () => useContext(GameStateContext);
export const useGameDispatchContext = () => useContext(GameDispatchContext);
