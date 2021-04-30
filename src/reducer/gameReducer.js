import * as React from "react";
import { createContext, useReducer, useContext } from "react";
import prize1 from "../assets/images/prizes/beauregard.png";
import prize2 from "../assets/images/prizes/helen.png";
import prize3 from "../assets/images/prizes/matthew.png";
import prize4 from "../assets/images/prizes/mr-sam.png";
import prize5 from "../assets/images/prizes/sohan.png";
import prize6 from "../assets/images/prizes/teddy.png";

export const prizes = [
  {
    prizeName: "beauregard",
    prizeId: "PRIZE1",
    prizeImage: prize1,
  },
  {
    prizeName: "helen",
    prizeId: "PRIZE2",
    prizeImage: prize2,
  },
  {
    prizeName: "matthew",
    prizeId: "PRIZE3",
    prizeImage: prize3,
  },
  {
    prizeName: "mr sam",
    prizeId: "PRIZE4",
    prizeImage: prize4,
  },
  {
    prizeName: "sohan",
    prizeId: "PRIZE5",
    prizeImage: prize5,
  },
  {
    prizeName: "teddy",
    prizeId: "PRIZE6",
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
