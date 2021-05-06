import * as React from "react";
import Game from "./components/Game";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Closed from "./components/Closed";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGameStateContext } from "./reducer/gameReducer";

export default function App() {
  const [gameClosed, setGameClosed] = React.useState(false);
  const [cookies] = useCookies([]);
  const { previousPrize } = useGameStateContext();

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
