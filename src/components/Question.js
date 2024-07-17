import React from "react";
import Options from "./Options";
import Timer from "./Timer";
import { useQuiz } from "../context/QuizContext";

export default function Question() {
  const {
    questions,
    dispatch,
    numOfQuestions,
    stateIndex,
    points,
    answer,
    totalPoints,
  } = useQuiz();
  return (
    <div>
      <header className="progress">
        <progress
          max={numOfQuestions}
          value={stateIndex + Number(answer !== null)}
        />
        <p>
          Question <strong>{stateIndex + 1}</strong>/{numOfQuestions}
        </p>
        <p>
          <strong>{points}</strong>/{totalPoints} Points
        </p>
      </header>

      <h4>{questions[stateIndex].question}</h4>
      <Options />

      {answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "increment" })}
        >
          {stateIndex < numOfQuestions - 1 ? "Next" : "Finish"}
        </button>
      )}
      <Timer />
    </div>
  );
}
