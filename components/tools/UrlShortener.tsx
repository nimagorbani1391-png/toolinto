"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Lock, Crown } from "lucide-react";
import CopyButton from "../CopyButton";

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      // فعلا فقط لینک ساده رو کوتاه میکنیم (قابلیت VIP به زودی فعال میشه)
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "خطایی رخ داد. دوباره تلاش کنید.");
        return;
      }

      setShortUrl(`${window.location.origin}/${data.shortCode}`);
    } catch {
      setError("اتصال به سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
            لینک بلند را وارد کنید
          </label>
          <input
            id="url"
            type="text"
            dir="ltr"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/link"
            className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400"
          />
        </div>

        {/* بخش لینک اختصاصی (ویژه VIP) */}
        <div className="relative rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
            <Crown className="h-3 w-3" /> VIP
          </div>
          <label className="mb-2 block text-sm font-bold text-yellow-600 dark:text-yellow-500">
            لینک اختصاصی خودت رو بساز
          </label>
          <div className="flex gap-2 opacity-60">
            <span className="flex items-center bg-black/20 px-3 rounded-xl border border-[var(--card-border)] text-sm text-slate-500" dir="ltr">
              toolinto.ir/
            </span>
            <input
              type="text"
              disabled
              placeholder="اسم-دلخواه (مثلاً nima)"
              className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-main)] outline-none cursor-not-allowed"
            />
            <div className="flex items-center justify-center px-4 rounded-xl bg-black/20 border border-[var(--card-border)] cursor-not-allowed">
              <Lock className="h-5 w-5 text-slate-500" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> در حال ساخت…</>
          ) : (
            "کوتاه کن"
          )}
        </button>
      </form>

      {error && <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">{error}</p>}

      {shortUrl && (
        <div className="mt-6 space-y-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
          <p className="text-sm text-slate-500 dark:text-slate-300">لینک کوتاه شما:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" dir="ltr" className="block break-all text-lg font-bold text-violet-500 hover:text-violet-400">
            {shortUrl}
          </a>
          <div className="grid grid-cols-2 gap-3">
            <CopyButton text={shortUrl} />
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-3 font-medium text-[var(--text-main)] transition hover:bg-white/10">
              ↗ باز کردن
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
