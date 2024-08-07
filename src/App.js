import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import FinishedScreen from "./components/FinishedScreen";
import { useQuiz } from "./context/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && <Question />}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}

export default App;
