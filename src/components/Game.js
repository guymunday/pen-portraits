import * as React from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import Frame from "./Frame";
import Card from "./Card";
import Winner from "./Winner";
import { frames, portraits, shuffledPrizes } from "../assets/imageImports";
import {
  useGameStateContext,
  useGameDispatchContext,
  prizes,
} from "../reducer/gameReducer";
import { useCookies } from "react-cookie";
import MaxAttempts from "./MaxAttempts";

const Title = styled.h1`
  display: block;
  text-align: center;
  color: white;
  text-transform: uppercase;
  padding: 30px;
`;

const FrameLayout = styled.div`
  width: 100%;
  .frames-inner {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }
`;

export default function Game({ newGame, setNewGame, flipped, setFlipped }) {
  const [match, setMatch] = React.useState(false);
  const { firstPrize, secondPrize, currentPrize } = useGameStateContext();
  const dispatch = useGameDispatchContext();
  const [cookies, setCookie] = useCookies(["playAttempts"]);

  const shuffleCards = () => {
    const cardSelector = document.querySelectorAll(".card");
    for (let x = 0; x < cardSelector.length; x++) {
      let randomPos = Math.floor(Math.random() * 11);
      cardSelector[x].style.order = randomPos;
    }
  };

  React.useEffect(() => {
    shuffleCards();

    let tl = gsap.timeline();

    tl.from(".card", {
      opacity: 0,
      stagger: 0.1,
      duration: 0.3,
    }).fromTo(
      ".card",
      { rotation: -20 },
      {
        rotation: 0,
        ease: "elastic.out(2, 0.2)",
        duration: 2,
        stagger: 0.1,
        transformOrigin: "50% 10%",
      },
      "<"
    );
  }, [newGame]);

  const saveToCookies = () => {
    let tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

    if (!cookies.playAttempts) {
      setCookie("playAttempts", "4", { path: "/", expires: tomorrow });
    } else {
      let attempts = parseInt(cookies.playAttempts) - 1;
      setCookie("playAttempts", attempts.toString(), {
        path: "/",
        expires: tomorrow,
      });
    }
  };

  const handleCardClick = (i) => {
    if (parseInt(cookies.playAttempts) === 0) {
      return;
    } else if (flipped.includes(i)) {
      return;
    } else if (!firstPrize) {
      dispatch({
        type: "UPDATE_FIRST_PRIZE",
        first: shuffledPrizes[i],
      });
      setMatch(false);
      setFlipped([i]);
    } else if (firstPrize !== shuffledPrizes[i]) {
      dispatch({
        type: "UPDATE_FIRST_PRIZE",
        first: "",
      });
      setMatch(false);
      setFlipped([...flipped, i]);
      setTimeout(() => setFlipped([]), 800);
    } else if (firstPrize === shuffledPrizes[i]) {
      dispatch({
        type: "UPDATE_SECOND_PRIZE",
        second: shuffledPrizes[i],
      });
      setMatch(true);
      setFlipped([...flipped, i]);
      saveToCookies();
    }
  };

  React.useEffect(() => {
    if (firstPrize === secondPrize) {
      if (secondPrize.includes("beauregard")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[0],
        });
      } else if (secondPrize.includes("helen")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[1],
        });
      } else if (secondPrize.includes("matthew")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[2],
        });
      } else if (secondPrize.includes("mr-sam")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[3],
        });
      } else if (secondPrize.includes("sohan")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[4],
        });
      } else if (secondPrize.includes("teddy")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[5],
        });
      }
    }
  }, [firstPrize, secondPrize]);

  // React.useEffect(() => {
  //   if (match) {
  //     console.log(currentPrize);
  //   }
  // }, [currentPrize]);

  return (
    <>
      <Title>Pair a portrait</Title>
      <FrameLayout>
        <div className="frames-inner">
          {frames.map((f, i) => {
            return (
              <>
                <Frame
                  key={i}
                  image={f}
                  onClick={() => {
                    handleCardClick(i);
                  }}
                >
                  <Card
                    portrait={portraits[i]}
                    prize={shuffledPrizes[i]}
                    flipped={flipped}
                    i={i}
                  />
                </Frame>
              </>
            );
          })}
        </div>
      </FrameLayout>
      <Title>
        Music Attempts Terms {cookies.playAttempts ? cookies.playAttempts : 5}
      </Title>

      {parseInt(cookies.playAttempts) === 0 && <MaxAttempts />}
      {currentPrize && (
        <Winner
          newGame={newGame}
          setNewGame={setNewGame}
          setFlipped={setFlipped}
        />
      )}
    </>
  );
}
