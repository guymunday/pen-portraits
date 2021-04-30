import axios from "axios";

export const isGameLive = () => {
  axios
    .get("https://portrait.wildishandco.co.uk/api/v1/content")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      console.log("success");
    });
};

export const newGameStarted = () => {
  axios
    .post("https://portrait.wildishandco.co.uk/api/v1/start", {
      try: 3,
    })
    .then(function (response) {
      console.log(response);
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
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
