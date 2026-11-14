"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw } from "lucide-react";

const TEXTS = [
  "امروز روز خوبی برای شروع یک کار بزرگ است. اگر با دقت و تلاش پیش برویم، می‌توانیم به اهدافمان برسیم. تکنولوژی به سرعت در حال تغییر است و ما باید با آن همگام شویم.",
  "هوش مصنوعی دنیای ما را تغییر داده است. برنامه‌نویسان با استفاده از ابزارهای جدید می‌توانند سریع‌تر و بهتر کد بنویسند. مهم این است که همیشه در حال یادگیری باشیم.",
  "کتاب خواندن یکی از بهترین عادت‌هایی است که می‌توانیم داشته باشیم. با خواندن کتاب، دایره لغات ما افزایش پیدا می‌کند و دیدگاه ما نسبت به زندگی وسیع‌تر می‌شود.",
];

export default function TypingTest() {
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const startTest = () => {
    const randomText = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    setText(randomText);
    setUserInput("");
    setTimeLeft(30);
    setIsActive(true);
    setIsFinished(false);
    setScore(0);
    setErrors(0);
    setWpm(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      finishTest();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive || isFinished) return;
    const value = e.target.value;
    if (value.length > text.length) return;
    setUserInput(value);
  };

  const finishTest = () => {
    setIsActive(false);
    setIsFinished(true);

    let correctChars = 0;
    let errorCount = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) correctChars++;
      else errorCount++;
    }

    setErrors(errorCount);

    const wordsTyped = userInput.length / 5;
    const minutes = 30 / 60;
    setWpm(Math.round(wordsTyped / minutes));

    const rawScore = (correctChars / text.length) * 100;
    setScore(Math.round(rawScore));
  };

  return (
    <div className="space-y-6">
      <div 
        dir="rtl" 
        className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 text-lg leading-loose tracking-wide text-slate-500 dark:text-slate-400"
      >
        {text ? (
          text.split("").map((char, index) => {
            let colorClass = "";
            if (index < userInput.length) {
              colorClass = userInput[index] === char 
                ? "text-green-500 font-bold" 
                : "text-red-500 bg-red-500/20 rounded-sm";
            }
            return <span key={index} className={colorClass}>{char}</span>;
          })
        ) : (
          <span className="text-slate-400">برای شروع دکمه زیر را بزنید...</span>
        )}
      </div>

      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleTyping}
        disabled={!isActive || isFinished}
        placeholder={isActive ? "اینجا تایپ کنید..." : ""}
        className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-black/20 p-4 text-[var(--text-main)] outline-none focus:border-violet-400 disabled:opacity-50"
        rows={3}
        onPaste={(e) => e.preventDefault()}
      />

      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:flex-row">
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-xs text-slate-500">زمان</p>
            <p className={`text-2xl font-black ${timeLeft <= 10 ? "text-red-500" : "text-violet-500"}`}>
              {timeLeft} <span className="text-sm">ثانیه</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">سرعت</p>
            <p className="text-2xl font-black text-violet-500">{wpm} <span className="text-sm">WPM</span></p>
          </div>
          <div>
            <p className="text-xs text-slate-500">غلط‌ها</p>
            <p className="text-2xl font-black text-red-500">{errors}</p>
          </div>
        </div>

        <button
          onClick={startTest}
          className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white transition hover:brightness-110 sm:w-auto"
        >
          {isActive ? <RotateCcw className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          {isFinished ? "تلاش مجدد" : isActive ? "شروع مجدد" : "شروع تست"}
        </button>
      </div>

      {isFinished && (
        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center">
          <h3 className="text-xl font-black text-green-500">نتیجه تست شما</h3>
          <p className="mt-4 text-4xl font-black text-[var(--text-main)]">{score} <span className="text-lg">از ۱۰۰</span></p>
          <p className="mt-2 text-sm text-slate-400">
            شما در ۳۰ ثانیه، {userInput.length} کاراکتر تایپ کردید که {errors} مورد آن اشتباه بود.
          </p>
        </div>
      )}
    </div>
  );
}
