import * as React from "react";

export default function AjaxButton({ click, prize }) {
  return (
    <>
      <form
        action="https://www-prep.penhaligons.com/uk/en/ajax/truck-game/submit"
        method="post"
      >
        <input type="hidden" name="userScore" value="0" />
        <input type="hidden" name="userAttempts" value="1" />
        <input type="hidden" name="userPrize" value={prize} />
        <button type="submit" onClick={click}>
          Add to basket
        </button>
      </form>
    </>
  );
}
