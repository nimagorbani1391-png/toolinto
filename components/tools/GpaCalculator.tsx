"use client";

import { useState } from "react";
import { Plus, Trash2, Calculator as CalcIcon, RotateCcw } from "lucide-react";

export default function GpaCalculator() {
  const [grades, setGrades] = useState<string[]>(["", "", ""]);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleGradeChange = (index: number, value: string) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
    setResult(null);
    setError("");
  };

  const addGrade = () => {
    setGrades([...grades, ""]);
    setResult(null);
  };

  const removeGrade = (index: number) => {
    if (grades.length === 1) return;
    const newGrades = grades.filter((_, i) => i !== index);
    setGrades(newGrades);
    setResult(null);
  };

  const calculateGPA = () => {
    // فیلتر کردن ورودی‌های خالی
    const validGrades = grades
      .filter((g) => g.trim() !== "")
      .map((g) => Number(g));

    if (validGrades.length === 0) {
      setError("لطفاً حداقل یک نمره وارد کنید.");
      return;
    }

    // بررسی معتبر بودن اعداد
    if (validGrades.some((g) => isNaN(g))) {
      setError("لطفاً فقط عدد وارد کنید.");
      return;
    }

    // فرمول: جمع نمرات تقسیم بر تعداد دروس
    const sum = validGrades.reduce((acc, curr) => acc + curr, 0);
    const average = sum / validGrades.length;
    
    setResult(Number(average.toFixed(2)));
    setError("");
  };

  const resetForm = () => {
    setGrades(["", "", ""]);
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-[var(--text-main)]">نمرات خود را وارد کنید</label>
          <button onClick={resetForm} className="text-xs flex items-center gap-1 text-slate-500 hover:text-red-500 transition">
            <RotateCcw className="h-3 w-3" /> پاک کردن همه
          </button>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {grades.map((grade, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-bold text-violet-500">
                {(index + 1).toLocaleString("fa-IR")}
              </span>
              <input
                type="number"
                value={grade}
                onChange={(e) => handleGradeChange(index, e.target.value)}
                placeholder="نمره..."
                className="flex-1 rounded-xl border border-[var(--card-border)] bg-black/20 px-4 py-2.5 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
              />
              <button
                onClick={() => removeGrade(index)}
                disabled={grades.length === 1}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition hover:bg-red-500/20 disabled:opacity-30 disabled:hover:bg-red-500/10"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={addGrade}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--card-border)] bg-white/5 py-3 text-sm font-bold text-slate-500 transition hover:bg-white/10 hover:text-[var(--text-main)]"
          >
            <Plus className="h-4 w-4" /> افزودن درس جدید
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      <button
        onClick={calculateGPA}
        className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 font-black text-white shadow-lg transition hover:brightness-110"
      >
        <CalcIcon className="h-6 w-6" />
        محاسبه معدل
      </button>

      {result !== null && (
        <div className="animate-in zoom-in fade-in rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">معدل شما برابر است با</p>
          <p className="text-5xl font-black text-emerald-500" dir="ltr">
            {result.toLocaleString("fa-IR")}
          </p>
        </div>
      )}
    </div>
  );
}
