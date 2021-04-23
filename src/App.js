import * as React from "react";
import Game from "./components/Game";
import { useGameStateContext, useGameDispatchContext } from "./reducer/gameReducer";
import Winner from "./components/Winner";
import { useCookies } from "react-cookie";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  const [newGame, setNewGame] = React.useState(false);
  const [flipped, setFlipped] = React.useState([]);
  const { currentPrize } = useGameStateContext();
  const [cookies] = useCookies();
  const playAttempts = parseInt(cookies.playAttempts);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/play">
            <Game
              newGame={newGame}
              setNewGame={setNewGame}
              flipped={flipped}
              setFlipped={setFlipped}
            />
          </Route>
          
        </Switch>
      </Router>
    </>
  );
}
