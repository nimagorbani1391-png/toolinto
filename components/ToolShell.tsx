"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Tool } from "../lib/tools";
import { ChevronDown, Info } from "lucide-react";

export default function ToolShell({
  tool,
  children,
}: {
  tool: Tool;
  children: ReactNode;
}) {
  const [isSeoOpen, setIsSeoOpen] = useState(false);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-[var(--text-main)]"
      >
        <span aria-hidden>→</span> همه ابزارها
      </Link>

      <div className="mb-6 flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-main)]">{tool.title}</h1>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {tool.description}
          </p>
        </div>
      </div>

      {/* توضیحات سئو (باکس تاشو) */}
      {tool.seoText && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
          <button
            onClick={() => setIsSeoOpen(!isSeoOpen)}
            className="flex w-full items-center justify-between p-4 text-sm font-bold text-[var(--text-main)] transition hover:bg-white/5"
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-violet-500" />
              درباره این ابزار بیشتر بدانید
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${
                isSeoOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          
          {isSeoOpen && (
            <div className="border-t border-[var(--card-border)] p-4 text-sm leading-7 text-slate-500 dark:text-slate-400 animate-in slide-in-from-top-2 fade-in duration-200">
              {tool.seoText}
            </div>
          )}
        </div>
      )}

      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 sm:p-6">
        {children}
      </div>
    </div>
  );
}
