import { Quiz, useQuizStore } from "@/store";
import { decode } from "html-entities";
import { useEffect, useState } from "react";

const QuizPage = () => {
  const [quiz, getQuiz] = useQuizStore((state) => [state.quiz, state.getQuiz]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    getQuiz();
  }, [getQuiz]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answer,
    }));
  };

  const renderedQuestions = quiz.map((question: Quiz) => {
    return (
      <div key={question.question}>
        <h2>{decode(question.question)}</h2>
        {question.all_answers.map((answer, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`${question.question}-${index}`}
              name={question.question}
              value={answer}
              checked={selectedAnswers[question.question] === answer}
              onChange={() => handleAnswerChange(question.question, answer)}
            />
            <label htmlFor={`${question.question}-${index}`}>
              {decode(answer)}
            </label>
          </div>
        ))}
      </div>
    );
  });
  return <div>{renderedQuestions}</div>;
};

export default QuizPage;
