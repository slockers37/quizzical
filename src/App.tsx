import { useState } from "react";
import "./App.css";
import QuizPage from "./components/QuizPage";
import StartPage from "./components/StartPage";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("18");

  const startQuiz = (difficulty: string, category: string) => {
    setDifficulty(difficulty);
    setCategory(category);
    setHasStarted(true);
  };

  return (
    <div className="flex justify-center items-center bg-blue-50 h-screen">
      {hasStarted ? (
        <QuizPage difficulty={difficulty} category={category} />
      ) : (
        <StartPage startQuiz={startQuiz} />
      )}
    </div>
  );
}

export default App;
