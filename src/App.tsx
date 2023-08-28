import { useState } from "react";
import "./App.css";
import QuizPage from "./components/QuizPage";
import StartPage from "./components/StartPage";

function App() {
  const [isStartPage, setIsStartPage] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("18");

  const startQuiz = (difficulty: string, category: string) => {
    setDifficulty(difficulty);
    setCategory(category);
    setIsStartPage(false);
  };

  const resetQuiz = () => {
    setIsStartPage(true);
  };

  return (
    <div className="flex justify-center items-center bg-blue-50 min-h-screen">
      {isStartPage ? (
        <StartPage startQuiz={startQuiz} />
      ) : (
        <QuizPage
          difficulty={difficulty}
          category={category}
          resetQuiz={resetQuiz}
        />
      )}
    </div>
  );
}

export default App;
