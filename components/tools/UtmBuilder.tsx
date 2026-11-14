"use client";

import { useState, useMemo } from "react";
import { Link2, Copy, Check } from "lucide-react";

export default function UtmBuilder() {
  const [baseUrl, setBaseUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="space-y-6">
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
          <p className="text-sm text-slate-500 mb-2">لینک نهایی شما:</p>
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
    </div>
  );
}
