import * as React from "react";
import Game from "./components/Game";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  const [newGame, setNewGame] = React.useState(false);
  const [flipped, setFlipped] = React.useState([]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
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
