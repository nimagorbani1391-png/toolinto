"use client";

import { useState, useMemo, useEffect } from "react";
import { Link2, Copy, Check, Crown, Lock, Loader2, BarChart3, ExternalLink } from "lucide-react";

export default function UtmBuilder() {
  const [baseUrl, setBaseUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  
  const [isVip, setIsVip] = useState(false);
  const [isLoadingVip, setIsLoadingVip] = useState(true);
  
  // استیت‌های مربوط به VIP
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [clicks, setClicks] = useState(0);
  const [isShortening, setIsShortening] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // چک کردن وضعیت VIP کاربر
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setIsVip(true); // فعلاً برای تست، هر کسی لاگین کنه VIP در نظر گرفته میشه
        setIsLoadingVip(false);
      })
      .catch(() => setIsLoadingVip(false));
  }, []);

  const generatedUrl = useMemo(() => {
    if (!baseUrl.trim()) return "";
    try {
      const url = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
      if (source) url.searchParams.set("utm_source", source);
      if (medium) url.searchParams.set("utm_medium", medium);
      if (campaign) url.searchParams.set("utm_campaign", campaign);
      return url.toString();
    } catch {
      return "لینک نامعتبر است...";
    }
  }, [baseUrl, source, medium, campaign]);

  const handleCopy = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateTrackableLink = async () => {
    if (!generatedUrl || generatedUrl === "لینک نامعتبر است...") return;
    setIsShortening(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: generatedUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setShortCode(data.shortCode);
        setShortenedUrl(`${window.location.origin}/${data.shortCode}`);
        setClicks(data.clicks);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsShortening(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* فرم UTM */}
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">آدرس سایت (Base URL) *</label>
          <input type="text" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://example.com" dir="ltr" className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">منبع (Source)</label>
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="instagram" dir="ltr" className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">رسانه (Medium)</label>
            <input type="text" value={medium} onChange={(e) => setMedium(e.target.value)} placeholder="social" dir="ltr" className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">کمپین (Campaign)</label>
            <input type="text" value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="summer_sale" dir="ltr" className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
        </div>
      </div>

      {generatedUrl && (
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4">
          <p className="text-sm text-slate-500 mb-2">لینک UTM شما:</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div dir="ltr" className="flex-1 break-all rounded-lg bg-black/30 p-3 text-sm text-violet-300 font-mono">
              {generatedUrl}
            </div>
            <button onClick={handleCopy} className="flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 font-bold text-white transition hover:bg-violet-600 shrink-0">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? "کپی شد" : "کپی لینک"}
            </button>
          </div>
        </div>
      )}

      {/* بخش آمار (ویژه VIP) */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 relative">
        <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 z-10">
          <Crown className="h-3 w-3" /> VIP
        </div>

        <div className="p-6">
          <h3 className="text-lg font-black text-[var(--text-main)] mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-yellow-500" />
            آمار کسایی که به لینک مراجعه کردن📊
          </h3>

          {isLoadingVip ? (
            <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-yellow-500" /></div>
          ) : !isVip ? (
            // حالت قفل برای کاربران عادی
            <div className="flex flex-col items-center justify-center p-6 text-center opacity-70">
              <Lock className="h-12 w-12 text-yellow-500 mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                این قابلیت ویژه کاربران VIP است. با ارتقا به VIP می‌توانید لینک‌های قابل ردیابی بسازید و آمار دقیق بازدید را ببینید.
              </p>
              <button className="rounded-xl bg-yellow-500 px-6 py-2 text-sm font-bold text-black hover:bg-yellow-400">ارتقا به VIP</button>
            </div>
          ) : (
            // حالت باز برای کاربران VIP
            <div className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                با کلیک روی دکمه زیر، لینک UTM شما به یک لینک کوتاه قابل ردیابی تبدیل می‌شود.
              </p>
              
              {!shortenedUrl ? (
                <button onClick={handleCreateTrackableLink} disabled={isShortening || !generatedUrl} className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50">
                  {isShortening ? <Loader2 className="h-5 w-5 animate-spin" /> : <Link2 className="h-5 w-5" />}
                  {isShortening ? "در حال ساخت..." : "ساخت لینک کوتاه قابل ردیابی"}
                </button>
              ) : (
                <div className="rounded-xl border border-yellow-500/20 bg-black/20 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">لینک کوتاه شما:</span>
                    <a href={shortenedUrl} target="_blank" rel="noreferrer" className="text-sm text-yellow-500 font-bold flex items-center gap-1 hover:underline">
                      {shortenedUrl} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-yellow-500/20">
                    <span className="text-sm text-slate-400">تعداد بازدید (کلیک):</span>
                    <span className="text-2xl font-black text-green-500">{clicks.toLocaleString("fa-IR")}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
