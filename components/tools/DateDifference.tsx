"use client";

import { useMemo, useState } from "react";
import { format, isValid, parse, intervalToDuration, differenceInDays } from "date-fns-jalali";

type CalendarType = "j" | "g";

const pad = (n: number) => String(n).padStart(2, "0");

function toEnglishDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .trim();
}

export default function DateDifference() {
  const [startMode, setStartMode] = useState<CalendarType>("j");
  const [endMode, setEndMode] = useState<CalendarType>("j");

  const [sy, setSy] = useState("");
  const [sm, setSm] = useState("");
  const [sd, setSd] = useState("");

  const [ey, setEy] = useState("");
  const [em, setEm] = useState("");
  const [ed, setEd] = useState("");

  const result = useMemo(() => {
    if (!sy || !sm || !sd || !ey || !em || !ed) return null;

    const parseDate = (mode: CalendarType, y: string, m: string, d: string) => {
      const [ys, ms, ds] = [y, m, d].map(toEnglishDigits);
      if (![ys, ms, ds].every((v) => /^\d+$/.test(v))) return null;
      
      const yy = Number(ys);
      const mm = Number(ms);
      const dd = Number(ds);

      if (yy < 1000 || yy > 3000 || mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;

      if (mode === "j") {
        const dObj = parse(`${yy}/${pad(mm)}/${pad(dd)}`, "yyyy/MM/dd", new Date());
        return isValid(dObj) ? dObj : null;
      } else {
        const dObj = new Date(yy, mm - 1, dd);
        return dObj.getFullYear() === yy && dObj.getMonth() === mm - 1 && dObj.getDate() === dd ? dObj : null;
      }
    };

    const startDate = parseDate(startMode, sy, sm, sd);
    const endDate = parseDate(endMode, ey, em, ed);

    if (!startDate || !endDate) {
      return { error: "لطفاً تاریخ‌های معتبر وارد کنید." };
    }

    // ترتیب تاریخ‌ها را اصلاح می‌کنیم (تاریخ کوچکتر همیشه شروع باشد)
    const isStartBigger = startDate > endDate;
    const d1 = isStartBigger ? endDate : startDate;
    const d2 = isStartBigger ? startDate : endDate;

    const duration = intervalToDuration({ start: d1, end: d2 });
    const totalDays = differenceInDays(d2, d1);

    return {
      years: duration.years || 0,
      months: duration.months || 0,
      days: duration.days || 0,
      totalDays: totalDays,
    };
  }, [startMode, endMode, sy, sm, sd, ey, em, ed]);

  const renderInputs = (
    mode: CalendarType,
    setMode: (m: CalendarType) => void,
    y: string, setY: (v: string) => void,
    m: string, setM: (v: string) => void,
    d: string, setD: (v: string) => void,
    title: string
  ) => (
    <div className="space-y-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[var(--text-main)]">{title}</span>
        <div className="flex rounded-lg bg-black/20 p-1">
          <button
            onClick={() => setMode("j")}
            className={`rounded px-2 py-1 text-xs font-medium transition ${mode === "j" ? "bg-violet-500/30 text-violet-500 dark:text-violet-300" : "text-slate-500"}`}
          >
            شمسی
          </button>
          <button
            onClick={() => setMode("g")}
            className={`rounded px-2 py-1 text-xs font-medium transition ${mode === "g" ? "bg-violet-500/30 text-violet-500 dark:text-violet-300" : "text-slate-500"}`}
          >
            میلادی
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <input
          placeholder={mode === "j" ? "سال (1400)" : "سال (2024)"}
          value={y}
          onChange={(e) => setY(e.target.value)}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-2 text-center text-sm text-[var(--text-main)] outline-none focus:border-violet-400"
        />
        <input
          placeholder="ماه"
          value={m}
          onChange={(e) => setM(e.target.value)}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-2 text-center text-sm text-[var(--text-main)] outline-none focus:border-violet-400"
        />
        <input
          placeholder="روز"
          value={d}
          onChange={(e) => setD(e.target.value)}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2 py-2 text-center text-sm text-[var(--text-main)] outline-none focus:border-violet-400"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {renderInputs(startMode, setStartMode, sy, setSy, sm, setSm, sd, setSd, "از تاریخ")}
        {renderInputs(endMode, setEndMode, ey, setEy, em, setEm, ed, setEd, "تا تاریخ")}
      </div>

      {result && "error" in result && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {result.error}
        </p>
      )}

      {result && "totalDays" in result && (
        <div className="space-y-4 pt-2">
          <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">فاصله دقیق بین دو تاریخ</p>
            <p className="mt-3 text-2xl font-black text-[var(--text-main)]">
              {(result.years || 0)} سال، {(result.months || 0)} ماه و {(result.days || 0)} روز
            </p>
          </div>
          
          <div className="rounded-xl border border-violet-400/60 bg-violet-500/10 p-4 text-center">
            <p className="text-sm text-slate-500 dark:text-violet-200">تعداد کل روزها</p>
            <p dir="ltr" className="mt-1 text-xl font-bold text-violet-500 dark:text-violet-400">
              {(result.totalDays || 0).toLocaleString("fa-IR")} روز
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
