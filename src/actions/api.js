import axios from "axios";

export const newGameStarted = () => {
  axios
    .post("https://portrait.wildishandco.co.uk/api/v1/start", {
      try: 3,
    })
    .then(function (response) {
      console.log(response.data.data.id);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const finishGameAndPrize = (id, prize) => {
  axios
    .post("https://portrait.wildishandco.co.uk/api/v1/end", {
      id,
      prize,
    })
    .catch(function (error) {
      console.log(error);
    });
};
