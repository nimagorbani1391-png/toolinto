"use client";

import { useState } from "react";
import { Dices } from "lucide-react";

export default function RandomNumber() {
  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("100");
  const [count, setCount] = useState<string>("1");
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState("");

  const generateNumbers = () => {
    setError("");
    setResults([]);

    const minVal = Number(min);
    const maxVal = Number(max);
    const countVal = Number(count);

    if (isNaN(minVal) || isNaN(maxVal) || isNaN(countVal)) {
      setError("لطفاً فقط عدد وارد کنید.");
      return;
    }

    if (minVal > maxVal) {
      setError("حداقل عدد نمی‌تواند بزرگتر از حداکثر باشد.");
      return;
    }

    if (countVal < 1 || countVal > 100) {
      setError("تعداد اعداد باید بین ۱ تا ۱۰۰ باشد.");
      return;
    }

    const newNumbers: number[] = [];
    for (let i = 0; i < countVal; i++) {
      const randomNum = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      newNumbers.push(randomNum);
    }

    setResults(newNumbers);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
            حداقل عدد
          </label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
            حداکثر عدد
          </label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
            تعداد اعداد
          </label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
          />
        </div>
      </div>

      <button
        onClick={generateNumbers}
        className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110"
      >
        <Dices className="h-5 w-5" />
        تولید اعداد تصادفی
      </button>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-6 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 text-center">
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">نتیجه:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {results.map((num, index) => (
              <span
                key={index}
                dir="ltr"
                className="flex h-12 min-w-[3rem] items-center justify-center rounded-xl bg-violet-500/20 px-4 text-xl font-black text-violet-500 dark:text-violet-400"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
