import { create } from "zustand";

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface Quiz extends Question {
  all_answers: string[];
  isCorrect?: boolean;
}

interface QuizState {
  quiz: Quiz[];
  getQuiz: () => void;
  setQuiz: (quiz: Quiz[]) => void;
}

export const useQuizStore = create<QuizState>()((set) => ({
  quiz: [],
  getQuiz: async () => {
    const QUIZ_URL =
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
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
  setQuiz: (quiz: Quiz[]) => set({ quiz: quiz }),
}));
