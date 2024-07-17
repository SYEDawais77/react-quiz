import React, { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Timer() {
  const { remainingSeconds, dispatch } = useQuiz();
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds - min * 60;
  const seconds = sec < 10 ? `0${sec}` : sec;
  const minutes = min < 10 ? `0${min}` : min;

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({
          type: "tick",
        });
      }, 1000);

      return () => {
        clearInterval(id);
      };
    },

    [dispatch]
  );
  return (
    <button className="btn btn-ui timer">{`${minutes}:${seconds}`}</button>
  );
}
