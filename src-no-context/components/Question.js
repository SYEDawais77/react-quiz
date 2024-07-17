import React from "react";
import Options from "./Options";
import Timer from "./Timer";


export default function Question({
  questions,
  dispatch,
  numOfQuestions,
  index,
  points,
  answer,
  totalPoints,
  remainingSeconds,
}) {
  return (
    <div>
      <header className="progress">
        <progress
          max={numOfQuestions}
          value={index + Number(answer !== null)}
        />
        <p>
          Question <strong>{index + 1}</strong>/{numOfQuestions}
        </p>
        <p>
          <strong>{points}</strong>/{totalPoints} Points
        </p>
      </header>

      <h4>{questions.question}</h4>
      <Options question={questions} dispatch={dispatch} answer={answer} />

      {answer !== null && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "increment" })}
        >
          {index < numOfQuestions - 1 ? "Next" : "Finish"}
        </button>
      )}
      <Timer remainingSeconds={remainingSeconds} dispatch={dispatch} />
    </div>
  );
}
