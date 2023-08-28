import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StartPageProps {
  startQuiz: (difficulty: string, category: string) => void;
}

const StartPage: React.FC<StartPageProps> = ({ startQuiz }) => {
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startQuiz(difficulty, category);
  };

  return (
    <div className="bg-blue-50 flex flex-col items-center justify-center w-full h-full">
      <h1 className="mb-10 font-karla font-bold text-6xl text-[#293264]">
        Quizzical
      </h1>
      <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
        <Select onValueChange={(value) => setDifficulty(value as string)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setCategory(value as string)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9">General Knowledge</SelectItem>
            <SelectItem value="11">Entertainment: Film</SelectItem>
            <SelectItem value="12">Entertainment: Music</SelectItem>
            <SelectItem value="14">Entertainment: Television</SelectItem>
            <SelectItem value="15">Entertainment: Video Games</SelectItem>
            <SelectItem value="17">Science & Nature</SelectItem>
            <SelectItem value="18">Science: Computers</SelectItem>
            <SelectItem value="19">Science: Mathematics</SelectItem>
            <SelectItem value="21">Sports</SelectItem>
            <SelectItem value="24">Politics</SelectItem>
            <SelectItem value="26">Celebrities</SelectItem>
            <SelectItem value="31">
              Entertainment: Japanese Anime & Manga
            </SelectItem>
            <SelectItem value="32">
              Entertainment: Cartoon & Animations
            </SelectItem>
          </SelectContent>
        </Select>
        <button
          className="w-full py-2 px-4 rounded-md text-xl text-white bg-[#4D5B9E] mt-4"
          type="submit"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default StartPage;
