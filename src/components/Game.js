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
import axios from "axios";

const Title = styled.h1`
  display: block;
  text-align: center;
  color: white;
  text-transform: uppercase;
  padding: 30px;
`;

const FrameLayout = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  position: relative;
  .frames-inner {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    /* padding: 30px; */
  }
`;

const AttemptsLeft = styled.div`
  text-align: center;
  text-transform: uppercase;
  color: white;
  padding: 30px;
`;

export default function Game() {
  const [newGame, setNewGame] = React.useState(false);
  const [flipped, setFlipped] = React.useState([]);
  const { firstPrize, secondPrize, currentPrize } = useGameStateContext();
  const dispatch = useGameDispatchContext();
  const [cookies, setCookie] = useCookies(["playAttempts"]);
  const [framesLoaded, setFramesLoaded] = React.useState(false);
  const [portraitsLoaded, setPortraitsLoaded] = React.useState(false);

  const newGameStarted = () => {
    axios
      .post("https://portrait.wildishandco.co.uk/api/v1/start", {
        try: 1,
      })
      .then(function (response) {
        dispatch({
          type: "UPDATE_ID",
          id: response.data.data.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const shuffleCards = () => {
    const cardSelector = document.querySelectorAll(".card");
    for (let x = 0; x < cardSelector.length; x++) {
      let randomPos = Math.floor(Math.random() * 11);
      cardSelector[x].style.order = randomPos;
    }
  };

  const shuffleAndAnimate = () => {
    shuffleCards();
    let tl = gsap.timeline();

    tl.from(".card", {
      opacity: 0,
      stagger: 0.1,
      duration: 0.3,
      delay: 0.5,
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
  };

  React.useEffect(() => {
    shuffleAndAnimate();
  }, [framesLoaded, portraitsLoaded]);

  React.useEffect(() => {
    shuffleAndAnimate();
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
      setFlipped([i]);
      newGameStarted();
    } else if (firstPrize !== shuffledPrizes[i]) {
      dispatch({
        type: "UPDATE_FIRST_PRIZE",
        first: "",
      });
      saveToCookies();
      setFlipped([...flipped, i]);
      setTimeout(() => setFlipped([]), 500);
    } else if (firstPrize === shuffledPrizes[i]) {
      dispatch({
        type: "UPDATE_SECOND_PRIZE",
        second: shuffledPrizes[i],
      });
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
        dispatch({
          type: "UPDATE_BACKUP_PRIZE",
          prize: prizes[0],
        });
      } else if (secondPrize.includes("helen")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[1],
        });
        dispatch({
          type: "UPDATE_BACKUP_PRIZE",
          prize: prizes[1],
        });
      } else if (secondPrize.includes("matthew")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[2],
        });
        dispatch({
          type: "UPDATE_BACKUP_PRIZE",
          prize: prizes[2],
        });
      } else if (secondPrize.includes("mr-sam")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[3],
        });
        dispatch({
          type: "UPDATE_BACKUP_PRIZE",
          prize: prizes[3],
        });
      } else if (secondPrize.includes("sohan")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[4],
        });
        dispatch({
          type: "UPDATE_BACKUP_PRIZE",
          prize: prizes[4],
        });
      } else if (secondPrize.includes("teddy")) {
        dispatch({
          type: "UPDATE_PRIZE",
          prize: prizes[5],
        });
        dispatch({
          type: "UPDATE_BACKUP_PRIZE",
          prize: prizes[5],
        });
      }
    }
  }, [firstPrize, secondPrize]);

  React.useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image);
          }, 2000);

        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(frames.map((image) => loadImage(image)))
      .then(() => setFramesLoaded(true))
      .catch((err) => console.log("Failed to load images", err));

    Promise.all(portraits.map((image) => loadImage(image)))
      .then(() => setPortraitsLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  return (
    <>
      {portraitsLoaded && framesLoaded ? (
        <>
          <Title>Pair a portrait</Title>
          <FrameLayout>
            <div className="frames-inner">
              {frames.map((f, i) => {
                return (
                  <>
                    <Frame
                      i={i}
                      key={f}
                      image={f}
                      prize={shuffledPrizes[i]}
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

          <AttemptsLeft>
            Attempts{" "}
            <span style={{ fontSize: "1.6rem", margin: "0 20px" }}>
              {cookies.playAttempts ? cookies.playAttempts : 5}/5
            </span>{" "}
            Remaining
          </AttemptsLeft>
        </>
      ) : (
        <h1 style={{ color: "white" }}>Loading...</h1>
      )}

      {parseInt(cookies.playAttempts) === 0 && !currentPrize && <MaxAttempts />}
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
