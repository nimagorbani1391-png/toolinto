"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] bg-[var(--bg-main)]/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl flex-row-reverse items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-lg font-black text-white shadow-lg">
            T
          </span>
          <span className="text-xl font-black tracking-wider text-[var(--text-main)]" dir="ltr">
            TOOLINTO
          </span>
        </Link>

        <button
          onClick={() => setIsDark(!isDark)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] text-slate-500 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          aria-label="تغییر تم"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
