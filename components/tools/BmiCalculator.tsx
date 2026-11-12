"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; status: string; color: string } | null>(null);
  const [error, setError] = useState("");

  const calculateBMI = () => {
    setError("");
    setResult(null);

    const h = Number(height);
    const w = Number(weight);

    if (!h || !w) {
      setError("لطفاً قد و وزن خود را وارد کنید.");
      return;
    }

    if (h < 50 || h > 250) {
      setError("قد باید بین ۵۰ تا ۲۵۰ سانتی‌متر باشد.");
      return;
    }

    if (w < 10 || w > 300) {
      setError("وزن باید بین ۱۰ تا ۳۰۰ کیلوگرم باشد.");
      return;
    }

    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
    
    let status = "";
    let color = "";

    if (bmi < 18.5) {
      status = "کمبود وزن";
      color = "text-blue-500 bg-blue-500/10 border-blue-500/30";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      status = "وزن نرمال و سالم";
      color = "text-green-500 bg-green-500/10 border-green-500/30";
    } else if (bmi >= 25 && bmi < 29.9) {
      status = "اضافه وزن";
      color = "text-orange-500 bg-orange-500/10 border-orange-500/30";
    } else {
      status = "چاقی";
      color = "text-red-500 bg-red-500/10 border-red-500/30";
    }

    setResult({ bmi: Number(bmi.toFixed(1)), status, color });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
            قد (سانتی‌متر)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="مثلاً 175"
            className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
            وزن (کیلوگرم)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="مثلاً 70"
            className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
          />
        </div>
      </div>

      <button
        onClick={calculateBMI}
        className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110"
      >
        <Activity className="h-5 w-5" />
        محاسبه شاخص BMI
      </button>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {result && (
        <div className={`mt-6 rounded-xl border p-6 text-center ${result.color}`}>
          <p className="text-sm opacity-80">شاخص توده بدنی شما</p>
          <p className="my-2 text-4xl font-black">{result.bmi}</p>
          <p className="text-lg font-bold">{result.status}</p>
        </div>
      )}
    </div>
  );
      }
