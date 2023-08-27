import { create } from "zustand";

interface QuizState {
  quiz: [];
  getQuiz: () => void;
}

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface Quiz {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  all_answers: string[];
}

export const useQuizStore = create<QuizState>()((set) => ({
  quiz: [],
  getQuiz: async () => {
    const QUIZ_URL =
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple";
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

    set({ quiz: modifiedQuiz });
  },
}));
