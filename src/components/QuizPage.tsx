import { Quiz, useQuizStore } from "@/store";
import { decode } from "html-entities";
import { useEffect, useState } from "react";

const QuizPage = () => {
  const [quiz, getQuiz] = useQuizStore((state) => [state.quiz, state.getQuiz]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});

  const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    getQuiz();
  }, [getQuiz]);

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
        <h2 className="text-[#293264] mx-6 md:mx-10 font-bold text-xl">
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
    <div>
      <h1 className="flex w-full justify-center mt-10 mb-14 font-bold font-karla text-5xl text-[#293264]">
        Quizzical
      </h1>
      {renderedQuestions}
      {hasCheckedAnswers ? (
        <div className="flex justify-center space-x-4">
          <p className="my-10 py-4 px-6 text-sm">
            You scored {score}/{quiz.length} correct answers
          </p>
          <button
            className="my-10 py-4 px-6 rounded-2xl text-white bg-[#4D5B9E] text-sm"
            onClick={playAgain}
          >
            Play Again
          </button>
        </div>
      ) : (
        <button
          className="block mx-auto my-10 py-4 px-6 rounded-2xl text-white bg-[#4D5B9E] text-sm"
          onClick={checkAnswers}
        >
          Check Answers
        </button>
      )}
    </div>
  );
};

export default QuizPage;