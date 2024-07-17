import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import FinishedScreen from "./components/FinishedScreen";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  //loading , error, ready, active, finished
  status: "loading",
  index: 0,
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
      if (state.index < state.questions.length - 1) {
        return {
          ...state,
          index: state.index + 1,
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
      if (action.payload === state.questions[state.index].correctOption) {
        return {
          ...state,
          points: state.points + state.questions[state.index].points,
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
        index: 0,
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
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    points,
    answer,
    highScore,
    remainingSeconds,
  } = state;

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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            questions={questions[index]}
            dispatch={dispatch}
            numOfQuestions={numOfQuestions}
            index={index}
            points={points}
            answer={answer}
            totalPoints={totalPoints}
            remainingSeconds={remainingSeconds}
          />
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
