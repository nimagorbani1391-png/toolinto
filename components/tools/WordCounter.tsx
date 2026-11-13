"use client";

import { useState, useMemo } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const charactersWithSpaces = text.length;
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
    const lines = text ? text.split(/\n/).length : 0;
    const readingTime = Math.ceil(words / 200);

    return { words, charactersWithSpaces, charactersWithoutSpaces, sentences, lines, readingTime };
  }, [text]);

  return (
    <div className="space-y-6">
      <div>
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="متن خود را اینجا وارد یا پیست کنید..."
          className="w-full resize-y rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">کلمات</p>
          <p className="mt-1 text-xl font-black text-violet-500">{stats.words.toLocaleString("fa-IR")}</p>
        </div>
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">کاراکتر (با فاصله)</p>
          <p className="mt-1 text-xl font-black text-violet-500">{stats.charactersWithSpaces.toLocaleString("fa-IR")}</p>
        </div>
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">کاراکتر (بدون فاصله)</p>
          <p className="mt-1 text-xl font-black text-violet-500">{stats.charactersWithoutSpaces.toLocaleString("fa-IR")}</p>
        </div>
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">جملات</p>
          <p className="mt-1 text-xl font-black text-violet-500">{stats.sentences.toLocaleString("fa-IR")}</p>
        </div>
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">خطوط</p>
          <p className="mt-1 text-xl font-black text-violet-500">{stats.lines.toLocaleString("fa-IR")}</p>
        </div>
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">زمان مطالعه</p>
          <p className="mt-1 text-xl font-black text-violet-500">
            {stats.readingTime === 0 ? "۰" : stats.readingTime.toLocaleString("fa-IR")} دقیقه
          </p>
        </div>
      </div>
    </div>
  );
}
