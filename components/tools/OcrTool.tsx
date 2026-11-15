"use client";

import { useState, useRef } from "react";
import { UploadCloud, Loader2, ScanText, Copy, Check } from "lucide-react";

export default function OcrTool() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("fas+eng");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setText("");
      setError("");
    }
  };

  const extractText = async () => {
    if (!image) return;
    setIsLoading(true);
    setError("");
    setText("");

    try {
      // ایمپورت داینامیک برای جلوگیری از سنگین شدن لود اولیه
      const { createWorker } = await import("tesseract.js");
      
      const worker = await createWorker(lang, 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      const ret = await worker.recognize(image);
      setText(ret.data.text);
      await worker.terminate();
    } catch (err) {
      setError("خطایی در پردازش عکس رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {!preview ? (
        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center transition hover:bg-white/5">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <UploadCloud className="mb-4 h-10 w-10 text-slate-400" />
          <p className="text-sm font-medium text-[var(--text-main)]">
            عکس متن یا جزوه خود را انتخاب کنید
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 flex-1 overflow-hidden">
               <img src={preview} alt="Preview" className="h-12 w-12 rounded object-cover" />
               <span className="text-sm font-bold text-[var(--text-main)] truncate">{image?.name}</span>
            </div>
            
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-3 text-sm font-bold text-[var(--text-main)] outline-none"
            >
              <option value="fas+eng">فارسی و انگلیسی</option>
              <option value="fas">فقط فارسی</option>
              <option value="eng">فقط انگلیسی</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { setPreview(null); setText(""); }}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 font-bold text-[var(--text-main)] transition hover:bg-white/10"
            >
              عکس دیگر
            </button>
            <button
              onClick={extractText}
              disabled={isLoading}
              className="brand-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ScanText className="h-5 w-5" />}
              {isLoading ? `در حال پردازش (${progress}%)` : "استخراج متن"}
            </button>
          </div>

          {error && <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-500">{error}</p>}

          {text && (
            <div className="relative rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full resize-y bg-transparent text-[var(--text-main)] outline-none"
                dir="auto"
              />
              <button
                onClick={copyText}
                className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-violet-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-violet-600"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "کپی شد" : "کپی متن"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
