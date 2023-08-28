import { useState } from "react";
import "./App.css";
import QuizPage from "./components/QuizPage";

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  const startQuiz = () => {
    setHasStarted(true);
  };

  return (
    <div className="flex justify-center items-center bg-blue-50 h-screen">
      {hasStarted ? (
        <QuizPage />
      ) : (
        <div className="bg-blue-50 flex flex-col items-center justify-center w-full h-full">
          <h1 className="mb-10 font-karla font-bold text-6xl text-[#293264]">
            Quizzical
          </h1>
          <button
            className="py-4 px-6 rounded-md text-white bg-[#4D5B9E]"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
