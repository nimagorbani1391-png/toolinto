"use client";

import { useState, useEffect } from "react";
import { Play, Square, Volume2 } from "lucide-react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lang, setLang] = useState("fa-IR");
  const [error, setError] = useState("");

  useEffect(() => {
    // وقتی کاربر از صفحه خارج می‌شود، صدا قطع شود
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (!text.trim()) return;
    
    setError("");
    window.speechSynthesis.cancel(); // قطع کردن صدای قبلی

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1; // سرعت عادی

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      setIsSpeaking(false);
      if (e.error !== "interrupted") {
        setError("مرورگر شما از این زبان پشتیبانی نمی‌کند یا صدایی نصب نشده است.");
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label className="text-sm text-slate-500 dark:text-slate-300">
            متن خود را وارد کنید
          </label>
          <div className="flex rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] p-1">
            <button
              onClick={() => setLang("fa-IR")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                lang === "fa-IR" ? "bg-violet-500/20 text-violet-500" : "text-slate-500 hover:text-[var(--text-main)]"
              }`}
            >
              فارسی
            </button>
            <button
              onClick={() => setLang("en-US")}
              className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                lang === "en-US" ? "bg-violet-500/20 text-violet-500" : "text-slate-500 hover:text-[var(--text-main)]"
              }`}
            >
              انگلیسی
            </button>
          </div>
        </div>

        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="متنی که می‌خواهید خوانده شود را اینجا بنویسید..."
          className="w-full resize-y rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400"
        />
      </div>

      <div className="flex gap-3">
        {!isSpeaking ? (
          <button
            onClick={handleSpeak}
            disabled={!text.trim()}
            className="brand-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            <Play className="h-5 w-5" />
            پخش صدا
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
          >
            <Square className="h-5 w-5" />
            توقف
          </button>
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 text-sm text-slate-500 dark:text-slate-400">
        <p className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 shrink-0" />
          نکته: کیفیت و وجود صدای فارسی به مرورگر و سیستم‌عامل شما بستگی دارد. برای بهترین نتیجه از مرورگر کروم استفاده کنید.
        </p>
      </div>
    </div>
  );
}
