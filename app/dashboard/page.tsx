"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Link as LinkIcon, Loader2, ExternalLink } from "lucide-react";
import CopyButton from "../../components/CopyButton";

type ShortLink = { id: string; shortCode: string; originalUrl: string; clicks: number };

export default function DashboardPage() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [status, setStatus] = useState<"loading" | "login" | "error" | "ready">("loading");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/user/links", { signal: controller.signal, cache: "no-store" });
        if (response.status === 401) { setStatus("login"); return; }
        if (!response.ok) throw new Error();
        const data: { links: ShortLink[] } = await response.json();
        setLinks(data.links);
        setStatus("ready");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  if (status === "loading") return <div role="status" aria-label="در حال دریافت لینک‌ها" className="flex min-h-screen items-center justify-center bg-[var(--bg-main)]"><Loader2 className="h-10 w-10 animate-spin text-violet-500" /></div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[var(--text-main)]">
        <ArrowRight className="h-4 w-4" /> برگشت به خانه
      </Link>
      
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-500">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[var(--text-main)]">لینک‌های من</h1>
          <p className="text-sm text-slate-500">تاریخچه لینک‌های کوتاه و آمار بازدید آن‌ها</p>
        </div>
      </div>

      {status === "login" ? (
        <p>برای دیدن لینک‌ها <Link href="/login" className="text-violet-400">وارد حساب شوید</Link>.</p>
      ) : status === "error" ? (
        <p role="alert">لینک‌ها دریافت نشدند. صفحه را دوباره بارگذاری کنید.</p>
      ) : links.length === 0 ? (
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center">
          <LinkIcon className="mx-auto h-12 w-12 text-slate-500 mb-4 opacity-50" />
          <p className="text-slate-500">شما هنوز هیچ لینکی نساخته‌اید.</p>
          <Link href="/tools/url-shortener" className="mt-4 inline-block rounded-xl bg-violet-500 px-6 py-2 text-sm font-bold text-white hover:bg-violet-600">ساخت اولین لینک</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {links.map((link) => (
            <div key={link.id} className="flex flex-col gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 overflow-hidden">
                <div dir="ltr" className="font-bold text-violet-500 flex items-center gap-2">
                  <a href={`${window.location.origin}/${link.shortCode}`} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                    /{link.shortCode} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div dir="ltr" className="truncate text-xs text-slate-500 mt-1">{link.originalUrl}</div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-slate-500">کلیک‌ها</p>
                  <p className="font-black text-green-500">{link.clicks.toLocaleString("fa-IR")}</p>
                </div>
                <CopyButton text={`${window.location.origin}/${link.shortCode}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
