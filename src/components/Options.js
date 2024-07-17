import { useQuiz } from "../context/QuizContext";

export default function Options() {
  const { questions, dispatch, answer, stateIndex } = useQuiz();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {questions[stateIndex].options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${
            hasAnswered && index === questions[stateIndex].correctOption
              ? "correct"
              : "wrong"
          }
           `}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "answer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
