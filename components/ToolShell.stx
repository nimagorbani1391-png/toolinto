import Link from "next/link";
import type { ReactNode } from "react";
import type { Tool } from "../lib/tools";

export default function ToolShell({
  tool,
  children,
}: {
  tool: Tool;
  children: ReactNode;
}) {
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

      <div className="rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 backdrop-blur-xl sm:p-6">
        {children}
      </div>
    </div>
  );
}
