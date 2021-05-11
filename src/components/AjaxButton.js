import * as React from "react";
import axios from "axios";
import { useGameStateContext } from "../reducer/gameReducer";

export default function AjaxButton({
  setFormSubmitted,
  prize,
  ...rest
}) {
  const formRef = React.useRef(null);
  const [prizeState, setPrizeState] = React.useState(prize);
  const { id } = useGameStateContext();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    axios
      .post("https://portrait.wildishandco.co.uk/api/v1/end", {
        id,
        prize,
      })
      .then(function (response) {
        setPrizeState(response?.data?.data?.prize);
      })
      .then(function () {
        setTimeout(() => {
          formRef.current.submit();
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <form
        action="https://www-prep.penhaligons.com/uk/en/ajax/truck-game/submit"
        method="post"
        ref={formRef}
        {...rest}
      >
        <input type="hidden" name="userScore" value="1" />
        <input type="hidden" name="userAttempts" value="1" />
        <input type="hidden" name="userPrize" value={prizeState} />
        <button type="submit" onClick={(e) => handleFormSubmit(e)}>
          Add to bag
        </button>
      </form>
    </>
  );
}
