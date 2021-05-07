import * as React from "react";

export default function AjaxButton({ setFormSubmitted, prize, ...rest }) {
  const formRef = React.useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      formRef.current.submit();
    }, 3000);
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
        <input type="hidden" name="userPrize" value={prize} />
        <button type="submit" onClick={(e) => handleFormSubmit(e)}>
          Add to basket
        </button>
      </form>
    </>
  );
}
