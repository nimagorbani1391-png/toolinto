"use client";

import { useMemo, useState } from "react";
import { format, isValid, parse } from "date-fns-jalali";

type Mode = "j2g" | "g2j";

type Result = {
  jalaliNumeric: string;
  jalaliText: string;
  gregorianNumeric: string;
  gregorianText: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function toEnglishDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .trim();
}

function convert(
  mode: Mode,
  y: string,
  m: string,
  d: string
): { result?: Result; error?: string } {
  const [ys, ms, ds] = [y, m, d].map(toEnglishDigits);

  if (![ys, ms, ds].every((v) => /^\d+$/.test(v))) {
    return { error: "فقط عدد وارد کنید." };
  }

  const yy = Number(ys);
  const mm = Number(ms);
  const dd = Number(ds);

  if (yy < 1000 || yy > 3000) return { error: "سال باید بین ۱۰۰۰ تا ۳۰۰۰ باشد." };
  if (mm < 1 || mm > 12) return { error: "ماه باید بین ۱ تا ۱۲ باشد." };
  if (dd < 1 || dd > 31) return { error: "روز باید بین ۱ تا ۳۱ باشد." };

  let date: Date;

  if (mode === "j2g") {
    date = parse(`${yy}/${pad(mm)}/${pad(dd)}`, "yyyy/MM/dd", new Date());
    if (!isValid(date)) return { error: "این تاریخ شمسی معتبر نیست." };
  } else {
    date = new Date(yy, mm - 1, dd);
    if (
      date.getFullYear() !== yy ||
      date.getMonth() !== mm - 1 ||
      date.getDate() !== dd
    ) {
      return { error: "این تاریخ میلادی معتبر نیست." };
    }
  }

  return {
    result: {
      jalaliNumeric: format(date, "yyyy/MM/dd"),
      jalaliText: new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        dateStyle: "full",
      }).format(date),
      gregorianNumeric: `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(
        date.getDate()
      )}`,
      gregorianText: new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
      }).format(date),
    },
  };
}

export default function DateConverter() {
  const [mode, setMode] = useState<Mode>("j2g");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const outcome = useMemo(
    () => (year && month && day ? convert(mode, year, month, day) : null),
    [mode, year, month, day]
  );

  function switchMode(next: Mode) {
    setMode(next);
    setYear("");
    setMonth("");
    setDay("");
  }

  function fillToday() {
    const now = new Date();
    if (mode === "j2g") {
      const [y, m, d] = format(now, "yyyy/MM/dd").split("/");
      setYear(y);
      setMonth(String(Number(m)));
      setDay(String(Number(d)));
    } else {
      setYear(String(now.getFullYear()));
      setMonth(String(now.getMonth() + 1));
      setDay(String(now.getDate()));
    }
  }

  const fields = [
    { label: "سال", value: year, set: setYear, ph: mode === "j2g" ? "1405" : "2026", max: 4 },
    { label: "ماه", value: month, set: setMonth, ph: "8", max: 2 },
    { label: "روز", value: day, set: setDay, ph: "21", max: 2 },
  ];

  const result = outcome?.result;

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
            {m === "j2g" ? "شمسی ← میلادی" : "میلادی ← شمسی"}
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

      <button 
        type="button" 
        onClick={fillToday} 
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-3 font-medium text-[var(--text-main)] transition hover:bg-white/10"
      >
        📍 تاریخ امروز
      </button>

      {outcome?.error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {outcome.error}
        </p>
      )}

      {result && (
        <div className="space-y-3">
          <div className={`rounded-xl border p-4 ${mode === "g2j" ? "border-violet-400/60 bg-violet-500/10" : "border-[var(--glass-border)] bg-[var(--glass-bg)]"}`}>
            <p className="text-xs text-slate-500 dark:text-slate-400">تاریخ شمسی</p>
            <p dir="ltr" className="mt-1 text-2xl font-black text-[var(--text-main)]">
              {result.jalaliNumeric}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{result.jalaliText}</p>
          </div>

          <div className={`rounded-xl border p-4 ${mode === "j2g" ? "border-violet-400/60 bg-violet-500/10" : "border-[var(--glass-border)] bg-[var(--glass-bg)]"}`}>
            <p className="text-xs text-slate-500 dark:text-slate-400">تاریخ میلادی</p>
            <p dir="ltr" className="mt-1 text-2xl font-black text-[var(--text-main)]">
              {result.gregorianNumeric}
            </p>
            <p dir="ltr" className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {result.gregorianText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
      }
