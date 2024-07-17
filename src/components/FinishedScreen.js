import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function FinishedScreen() {
  const { points, totalPoints, highScore, dispatch } = useQuiz();
  const percentage = (points / totalPoints) * 100;

  let emoji;

  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "😓";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {totalPoints}.
        <br />
        That is <strong>{percentage.toFixed(2)}%.</strong>
      </p>
      <p className="highScore">(High Score: {highScore} Points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "reset" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}
