import { decode } from "html-entities";
import { useEffect, useState } from "react";

interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface Quiz extends Question {
  all_answers: string[];
}

interface QuizPageProps {
  difficulty: string;
  category: string;
  resetQuiz: () => void;
}

const QuizPage = ({ difficulty, category, resetQuiz }: QuizPageProps) => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});

  const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const getQuiz = async () => {
    setLoading(true);
    const QUIZ_URL = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(QUIZ_URL);
    const data = await res.json();
    const modifiedQuiz = data.results.map((question: Question) => {
      const allAnswers = [...question.incorrect_answers];
      const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
      allAnswers.splice(randomIndex, 0, question.correct_answer);
      return {
        ...question,
        all_answers: allAnswers,
      };
    });

    setQuiz(modifiedQuiz);
    setLoading(false);
  };

  useEffect(() => {
    getQuiz();
  }, [difficulty, category]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answer,
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;

    quiz.forEach((question: Quiz) => {
      const isCorrect =
        selectedAnswers[question.question] === question.correct_answer;
      if (isCorrect) {
        correctCount++;
      }
    });

    setHasCheckedAnswers(true);
    setScore(correctCount);
  };

  const playAgain = () => {
    getQuiz();
    setSelectedAnswers({});
    setHasCheckedAnswers(false);
    setScore(null);
  };

  const renderedQuestions = quiz.map((question: Quiz) => {
    return (
      <div key={question.question}>
        <h2 className="text-[#293264] mx-6 md:mx-10 font-bold text-md md:text-xl">
          {decode(question.question)}
        </h2>
        <div className="flex max-w-xl md:max-w-2xl mx-6 my-4 md:mx-10 md:my-4 gap-3">
          {question.all_answers.map((answer, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`${question.question}-${index}`}
                name={question.question}
                value={answer}
                checked={selectedAnswers[question.question] === answer}
                onChange={() => handleAnswerChange(question.question, answer)}
                className="hidden"
              />
              <label
                htmlFor={`${question.question}-${index}`}
                className={`inline-block border text-sm border-[#4D5B9E] px-4 py-1 rounded-xl cursor-pointer whitespace-normal ${
                  selectedAnswers[question.question] === answer
                    ? "bg-[#D6DBF5] border-[#D6DBF5]"
                    : ""
                } ${
                  hasCheckedAnswers
                    ? answer === question.correct_answer
                      ? "bg-green-300 border-green-300"
                      : selectedAnswers[question.question] === answer
                      ? "bg-red-300 border-red-300 opacity-50"
                      : "opacity-50"
                    : ""
                }
                `}
              >
                {decode(answer)}
              </label>
            </div>
          ))}
        </div>
        <hr className="[#DBDEF0] mb-5" />
      </div>
    );
  });
  return (
    <div className="flex flex-col">
      {loading ? (
        // Render skeleton screen
        <div className="text-3xl font-bold">Loading ⏳...</div>
      ) : (
        // Render Quiz
        <>
          <h1
            onClick={resetQuiz}
            className="flex w-full justify-center cursor-pointer mt-6 mb-8 md:mb-14 md:mt-10 font-bold font-karla text-3xl text-[#293264] md:text-4xl"
          >
            Quizzical
          </h1>
          <div className="overflow-y-auto space-y-4 pb-10">
            {renderedQuestions}
            {hasCheckedAnswers ? (
              <div className="flex justify-center items-center space-x-4">
                <p className="my-10 py-4 px-6 text-[#4D5B9E] text-md md:text-lg lg:text-xl">
                  You scored {score}/{quiz.length} correct answers
                </p>
                <button
                  className="my-10 py-4 px-6 md:px-8 md:py-6 rounded-2xl text-white bg-[#4D5B9E] text-md md:text-lg lg:text-xl"
                  onClick={playAgain}
                >
                  Play Again
                </button>
              </div>
            ) : (
              <button
                className="block mx-auto my-10 py-4 px-6 md:px-8 md:py-6 rounded-2xl text-white bg-[#4D5B9E] text-md md:text-lg lg:text-xl"
                onClick={checkAnswers}
              >
                Check Answers
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;
