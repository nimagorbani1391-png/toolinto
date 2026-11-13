"use client";

import { useMemo, useState } from "react";
import { format, isValid, parse, intervalToDuration } from "date-fns-jalali";

type Mode = "j2g" | "g2j";

const pad = (n: number) => String(n).padStart(2, "0");

function toEnglishDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .trim();
}

export default function AgeCalculator() {
  const [mode, setMode] = useState<Mode>("j2g");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const result = useMemo(() => {
    if (!year || !month || !day) return null;

    const [ys, ms, ds] = [year, month, day].map(toEnglishDigits);

    if (![ys, ms, ds].every((v) => /^\d+$/.test(v))) {
      return { error: "فقط عدد وارد کنید." };
    }

    const yy = Number(ys);
    const mm = Number(ms);
    const dd = Number(ds);

    if (yy < 1000 || yy > 3000) return { error: "سال باید بین ۱۰۰۰ تا ۳۰۰۰ باشد." };
    if (mm < 1 || mm > 12) return { error: "ماه باید بین ۱ تا ۱۲ باشد." };
    if (dd < 1 || dd > 31) return { error: "روز باید بین ۱ تا ۳۱ باشد." };

    let birthDate: Date;

    if (mode === "j2g") {
      birthDate = parse(`${yy}/${pad(mm)}/${pad(dd)}`, "yyyy/MM/dd", new Date());
      if (!isValid(birthDate)) return { error: "این تاریخ شمسی معتبر نیست." };
    } else {
      birthDate = new Date(yy, mm - 1, dd);
      if (
        birthDate.getFullYear() !== yy ||
        birthDate.getMonth() !== mm - 1 ||
        birthDate.getDate() !== dd
      ) {
        return { error: "این تاریخ میلادی معتبر نیست." };
      }
    }

    const now = new Date();
    if (birthDate > now) {
      return { error: "تاریخ تولد نمی‌تواند در آینده باشد." };
    }

    const duration = intervalToDuration({ start: birthDate, end: now });
    const totalDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years: duration.years || 0,
      months: duration.months || 0,
      days: duration.days || 0,
      totalDays,
    };
  }, [mode, year, month, day]);

  function switchMode(next: Mode) {
    setMode(next);
    setYear("");
    setMonth("");
    setDay("");
  }

  const fields = [
    { label: "سال", value: year, set: setYear, ph: mode === "j2g" ? "1380" : "2001", max: 4 },
    { label: "ماه", value: month, set: setMonth, ph: "1", max: 2 },
    { label: "روز", value: day, set: setDay, ph: "1", max: 2 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-black/20 p-1">
        {(["j2g", "g2j"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={`rounded-xl px-3 py-2.5 text-sm font-bold transition ${
              mode === m
                ? "brand-gradient text-white shadow-lg"
                : "text-slate-500 dark:text-slate-300 hover:bg-white/5"
            }`}
          >
            {m === "j2g" ? "تاریخ تولد شمسی" : "تاریخ تولد میلادی"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {fields.map((f) => (
          <div key={f.label}>
            <label className="mb-2 block text-center text-sm text-slate-500 dark:text-slate-300">
              {f.label}
            </label>
            <input
              type="text"
              inputMode="numeric"
              dir="ltr"
              maxLength={f.max}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              placeholder={f.ph}
              className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
            />
          </div>
        ))}
      </div>

      {result && "error" in result && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {result.error}
        </p>
      )}

      {/* اینجا تغییر اصلی انجام شده است: بررسی وجود totalDays */}
      {result && "totalDays" in result && (
        <div className="space-y-4 pt-2">
          <div className="rounded-xl border border-violet-400/60 bg-violet-500/10 p-5 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-300">سن دقیق شما</p>
            <p className="mt-2 text-2xl font-black text-[var(--text-main)]">
              {result.years} سال، {result.months} ماه و {result.days} روز
            </p>
          </div>
          
          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">تعداد کل روزهایی که زندگی کرده‌اید</p>
            <p dir="ltr" className="mt-1 text-lg font-bold text-violet-500">
              {result.totalDays.toLocaleString("fa-IR")} روز
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
