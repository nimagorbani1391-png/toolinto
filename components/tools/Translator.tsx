"use client";

import { useState } from "react";
import { ArrowLeftRight, Loader2, Languages } from "lucide-react";
import CopyButton from "../CopyButton";

export default function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLang, setFromLang] = useState("fa");
  const [toLang, setToLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsLoading(true);
    setError("");
    setTranslatedText("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sourceText, from: fromLang, to: toLang }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "خطا در ترجمه");
      }

      setTranslatedText(data.translatedText);
    } catch (err) {
      setError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const langName = (code: string) => (code === "fa" ? "فارسی" : "انگلیسی");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center justify-between rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-2">
          <span className="px-4 text-sm font-bold text-[var(--text-main)]">{langName(fromLang)}</span>
          
          <button
            onClick={swapLanguages}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-[var(--text-main)]"
            title="تعویض زبان‌ها"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>
          
          <span className="px-4 text-sm font-bold text-[var(--text-main)]">{langName(toLang)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* بخش متن مبدا */}
        <div>
          <textarea
            rows={6}
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="متن خود را اینجا بنویسید..."
            className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-[var(--text-main)] outline-none focus:border-violet-400"
            dir={fromLang === "fa" ? "rtl" : "ltr"}
          />
        </div>

        {/* بخش متن مقصد */}
        <div className="relative">
          <textarea
            rows={6}
            value={translatedText}
            readOnly
            placeholder="ترجمه اینجا ظاهر می‌شود..."
            className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-[var(--text-main)] outline-none focus:border-violet-400"
            dir={toLang === "fa" ? "rtl" : "ltr"}
          />
          {translatedText && (
            <div className="absolute bottom-3 left-3">
              <CopyButton text={translatedText} />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleTranslate}
        disabled={isLoading || !sourceText.trim()}
        className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Languages className="h-5 w-5" />}
        {isLoading ? "در حال ترجمه..." : "ترجمه کن"}
      </button>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}
    </div>
  );
      }
