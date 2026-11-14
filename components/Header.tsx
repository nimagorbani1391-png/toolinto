"use client";

import Link from "next/link";
import { Moon, Sun, Menu, X, User, MessageCircle, Crown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--card-border)] bg-[var(--bg-main)]">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className="text-[var(--text-main)] transition hover:text-violet-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-wider text-[var(--text-main)]" dir="ltr">
                TOOLINTO
              </span>
            </Link>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsMenuOpen(false)} />
          
          <div className="relative flex h-full w-[80%] max-w-sm flex-col bg-[var(--bg-main)] p-6 shadow-2xl border-l border-[var(--card-border)] mr-auto overflow-y-auto">
            
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-black text-[var(--text-main)]" dir="ltr">TOOLINTO</span>
              <button onClick={() => setIsMenuOpen(false)} className="rounded-full p-2 bg-[var(--card-bg)] text-slate-400 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {/* این دکمه حالا مستقیم به آدرس کامل میره */}
              <a href="https://toolinto.onrender.com/login" className="flex items-center gap-3 text-[var(--text-main)] p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:opacity-80 transition text-right">
                <User className="h-5 w-5 text-violet-500" />
                <span className="font-bold text-sm">ثبت نام / ورود</span>
              </a>
              
              <a href="https://rubika.ir/IM_NIMA_GORBANI" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[var(--text-main)] p-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:opacity-80 transition text-right">
                <MessageCircle className="h-5 w-5 text-cyan-500" />
                <span className="font-bold text-sm">ارتباط با پشتیبانی</span>
              </a>
            </nav>

            <div className="mt-6 overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 p-4 relative">
              <h3 className="text-sm font-black text-yellow-500 mb-1 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> اشتراک ویژه (VIP)
              </h3>
              <p className="text-[11px] leading-5 text-slate-500 dark:text-slate-400 mb-3">
                دسترسی نامحدود به تمامی ابزارها، بدون محدودیت و با سرعت پردازش بالا.
              </p>
              <button className="w-full rounded-lg bg-yellow-500 py-2 text-xs font-bold text-black transition hover:bg-yellow-400">
                خرید اشتراک
              </button>
            </div>

            <div className="mt-auto pt-8 pb-4 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                سازنده : NimaGorbani
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
