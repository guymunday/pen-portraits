import * as React from "react";
import Game from "./components/Game";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Closed from "./components/Closed";
import axios from "axios";

export default function App() {
  const [gameClosed, setGameClosed] = React.useState(false);

  const isGameLive = () => {
    axios
      .get("https://play.penhaligons.com/api/v1/content")
      .then(function (response) {
        if (parseInt(response.data.data.block.on) === 2) {
          setGameClosed(true);
        }
      })
      .catch(function (error) {
        console.log(error);
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
              <Game />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}
