import axios from "axios";

export const newGameStarted = () => {
  axios
    .post("https://portrait.wildishandco.co.uk/api/v1/start", {
      try: 3,
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const finishGameAndPrize = (prize) => {
  axios
    .post("https://portrait.wildishandco.co.uk/api/v1/end", {
      id: "608baee48bddfb3ca955a3e3",
      point: 2,
      prize,
    })
    .catch(function (error) {
      console.log(error);
    });
};
