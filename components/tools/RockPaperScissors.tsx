"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

type Choice = "rock" | "paper" | "scissors" | null;

const CHOICES = {
  rock: { emoji: "🪨", name: "سنگ" },
  paper: { emoji: "📄", name: "کاغذ" },
  scissors: { emoji: "✂️", name: "قیچی" },
};

export default function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const play = (choice: "rock" | "paper" | "scissors") => {
    setUserChoice(choice);
    
    const options: ("rock" | "paper" | "scissors")[] = ["rock", "paper", "scissors"];
    const randomChoice = options[Math.floor(Math.random() * 3)];
    setComputerChoice(randomChoice);

    // منطق برد و باخت
    if (choice === randomChoice) {
      setResult("draw");
    } else if (
      (choice === "rock" && randomChoice === "scissors") ||
      (choice === "paper" && randomChoice === "rock") ||
      (choice === "scissors" && randomChoice === "paper")
    ) {
      setResult("win");
      setUserScore((prev) => prev + 1);
    } else {
      setResult("lose");
      setComputerScore((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setUserScore(0);
    setComputerScore(0);
  };

  return (
    <div className="flex flex-col items-center space-y-8 py-4">
      {/* صفحه امتیازات */}
      <div className="flex w-full max-w-md items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
        <div className="text-center">
          <p className="text-xs text-slate-500">شما</p>
          <p className="text-2xl font-black text-green-500">{userScore}</p>
        </div>
        <div className="text-center px-4">
          <p className="text-sm font-bold text-slate-400">VS</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500">کامپیوتر</p>
          <p className="text-2xl font-black text-red-500">{computerScore}</p>
        </div>
      </div>

      {/* صحنه بازی */}
      <div className="flex w-full max-w-md h-48 items-center justify-center gap-8 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-violet-500/10 text-6xl shadow-inner">
            {userChoice ? CHOICES[userChoice].emoji : "❓"}
          </div>
          <p className="mt-2 text-sm font-bold text-[var(--text-main)]">شما</p>
        </div>

        <div className="text-2xl font-black text-slate-500">
          {result === "win" && <span className="text-green-500">بردی!</span>}
          {result === "lose" && <span className="text-red-500">باختی!</span>}
          {result === "draw" && <span className="text-yellow-500">مساوی!</span>}
          {!result && "VS"}
        </div>

        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-red-500/10 text-6xl shadow-inner">
            {computerChoice ? CHOICES[computerChoice].emoji : "❓"}
          </div>
          <p className="mt-2 text-sm font-bold text-[var(--text-main)]">کامپیوتر</p>
        </div>
      </div>

      {/* دکمه‌های انتخاب */}
      <div className="grid w-full max-w-md grid-cols-3 gap-3">
        {(["rock", "paper", "scissors"] as const).map((choice) => (
          <button
            key={choice}
            onClick={() => play(choice)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] py-4 text-4xl transition hover:-translate-y-1 hover:border-violet-500 hover:shadow-lg"
          >
            <span>{CHOICES[choice].emoji}</span>
            <span className="text-sm font-bold text-[var(--text-main)]">{CHOICES[choice].name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-[var(--text-main)] transition"
      >
        <RotateCcw className="h-4 w-4" />
        ریست کردن امتیازات
      </button>
    </div>
  );
}
