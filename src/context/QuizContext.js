import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //loading , error, ready, active, finished
  status: "loading",
  stateIndex: 0,
  points: 0,
  answer: null,
  highScore: 0,
  
  remainingSeconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "FETCH_QUESTIONS_ERROR":
      return {
        ...state,
        status: "error",
      };
    case "ACTIVE":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "increment":
      if (state.stateIndex < state.questions.length - 1) {
        return {
          ...state,
          stateIndex: state.stateIndex + 1,
          status: "active",
          answer: null,
        };
      } else {
        if (state.points > state.highScore) {
          return {
            ...state,
            status: "finished",
            highScore: state.points,
          };
        } else {
          return {
            ...state,
            status: "finished",
            highScore: state.highScore,
          };
        }
      }
    case "answer":
      if (action.payload === state.questions[state.stateIndex].correctOption) {
        return {
          ...state,
          points: state.points + state.questions[state.stateIndex].points,
          answer: action.payload,
          status: "active",
        };
      } else {
        return {
          ...state,
          answer: action.payload,
          status: "active",
        };
      }
    case "reset": {
      return {
        ...state,
        stateIndex: 0,
        points: 0,
        answer: null,
        status: "ready",
        remainingSeconds: 10,
      };
    }
    case "tick": {
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
      };
    }
    default:
      throw new Error("Action is Unknown");
  }
}

function QuizContextProvider({ children }) {
  const [
    { questions, status, stateIndex, points, answer, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  let totalPoints = 0;
  for (let i = 0; i < numOfQuestions; i++) {
    totalPoints = totalPoints + questions[i].points;
  }
  useEffect(function () {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:9000/questions");
        const data = await response.json();
        dispatch({
          type: "FETCH_QUESTIONS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "FETCH_QUESTIONS_ERROR",
        });
      }
    }
    fetchQuestions();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        stateIndex,
        points,
        answer,
        highScore,
        remainingSeconds,
        numOfQuestions,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizContextProvider");
  }
  return context;
}

export { QuizContextProvider, useQuiz };
