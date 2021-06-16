import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ErrorMesage() {
  const dispatch = useDispatch();
  const message = useSelector((s) => s.error.message);

  return (
    <>
      {message ? (
        <div className="error">
          <p>{message}</p>
          <div>
            <button onClick={() => dispatch({ type: "CLEAR_ERROR" })}>
              Ok!
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
