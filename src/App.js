import * as React from "react";
import Game from "./components/Game";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Closed from "./components/Closed";
import axios from "axios";

export default function App() {
  const [newGame, setNewGame] = React.useState(false);
  const [flipped, setFlipped] = React.useState([]);
  const [gameClosed, setGameClosed] = React.useState(false);

  const isGameLive = () => {
    axios
      .get("https://portrait.wildishandco.co.uk/api/v1/content")
      .then(function (response) {
        if (parseInt(response.data.data.block.on) === 2) {
          setGameClosed(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log("success");
      });
  };

  React.useEffect(() => {
    isGameLive();
  }, []);

  return (
    <>
      {gameClosed ? (
        <>
          <Closed />
        </>
      ) : (
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
      )}
    </>
  );
}
