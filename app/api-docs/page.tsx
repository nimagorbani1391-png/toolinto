import Link from "next/link";
import { ArrowRight, Code2, Terminal, Zap, Lock, Loader2, Sparkles, Server, Shield } from "lucide-react";

export const metadata = {
  title: "دسترسی به API | TOOLINTO",
  description: "APIهای TOOLINTO به زودی در دسترس توسعه‌دهندگان قرار می‌گیرد",
};

export default function ApiDocsPage() {
  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-[#050508]">
      
      {/* پس‌زمینه گرید تکنولوژیک */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />
      
      {/* هاله‌های نوری */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      {/* محتوا */}
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-24">
        
        {/* دکمه بازگشت */}
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowRight className="h-4 w-4" />
          بازگشت به صفحه اصلی
        </Link>

        {/* آیکون مرکزی با انیمیشن */}
        <div className="mb-10 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-3xl bg-violet-500/30" />
            <div className="absolute inset-0 animate-pulse rounded-3xl bg-cyan-500/20" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.4)]">
              <Code2 className="h-12 w-12 text-violet-400" />
            </div>
          </div>
        </div>

        {/* برچسب وضعیت */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            در حال توسعه فعال
          </div>
        </div>

        {/* تیتر اصلی */}
        <h1 className="mb-5 text-center text-4xl font-black leading-tight text-white sm:text-5xl">
          API در حال{" "}
          <span className="bg-gradient-to-l from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            راه‌اندازی
          </span>{" "}
          است
        </h1>

        <p className="mx-auto mb-12 max-w-lg text-center text-base leading-8 text-slate-400">
          ما در حال ساخت یک API قدرتمند و سریع هستیم تا توسعه‌دهندگان بتوانند از تمام ابزارهای TOOLINTO به صورت مستقیم در پروژه‌های خود استفاده کنند.
        </p>

        {/* ترمینال نمونه */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-slate-800 bg-[#0d0d12] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-800 bg-[#131318] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <div className="mr-4 flex items-center gap-1.5 text-xs text-slate-500">
              <Terminal className="h-3 w-3" />
              toolinto-api
            </div>
          </div>
          <div className="p-6 font-mono text-sm" dir="ltr">
            <p className="text-slate-500">// به زودی...</p>
            <p className="mt-2 text-cyan-400">
              <span className="text-violet-400">const</span> response = <span className="text-violet-400">await</span> fetch(
            </p>
            <p className="pl-6 text-emerald-400">
              <span className="text-yellow-400">'</span>https://api.toolinto.com/v1/shorten<span className="text-yellow-400">'</span>,
            </p>
            <p className="pl-6 text-slate-400">{`{ method: 'POST', body: ... }`}</p>
            <p className="text-cyan-400">);</p>
            <p className="mt-4 flex items-center gap-2 text-slate-500">
              <Loader2 className="h-3 w-3 animate-spin" />
              Waiting for launch...
            </p>
          </div>
        </div>

        {/* کارت‌های امکانات آینده */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-[#0d0d12] p-5 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
              <Zap className="h-6 w-6 text-violet-400" />
            </div>
            <h3 className="mb-1 text-sm font-bold text-white">سرعت بالا</h3>
            <p className="text-xs text-slate-500">پاسخ‌دهی در میلی‌ثانیه</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#0d0d12] p-5 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
              <Shield className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="mb-1 text-sm font-bold text-white">امنیت کامل</h3>
            <p className="text-xs text-slate-500">کلیدهای اختصاصی</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-[#0d0d12] p-5 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <Server className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="mb-1 text-sm font-bold text-white">پایداری ۹۹.۹٪</h3>
            <p className="text-xs text-slate-500">زیرساخت قدرتمند</p>
          </div>
        </div>

        {/* دعوت به اطلاع‌رسانی */}
        <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 p-8 text-center backdrop-blur-sm">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-yellow-400" />
          <h3 className="mb-2 text-xl font-black text-white">می‌خواهی جزو اولین‌ها باشی؟</h3>
          <p className="mb-6 text-sm text-slate-400">
            به محض راه‌اندازی، از طریق کانال پشتیبانی بهت خبر می‌دهیم.
          </p>
          <a
            href="https://rubika.ir/IM_NIMA_GORBANI"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
          >
            <Zap className="h-4 w-4" />
            اطلاع‌رسانی به من
          </a>
        </div>

        {/* فوتر کوچک */}
        <p className="mt-12 text-center text-xs text-slate-600">
          © TOOLINTO · ساخته شده با ❤️ برای توسعه‌دهندگان ایرانی
        </p>
      </div>
    </div>
  );
        }
