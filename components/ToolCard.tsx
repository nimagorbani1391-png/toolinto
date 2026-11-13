import Link from "next/link";
import * as Icons from "lucide-react";
import type { Tool } from "../lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const IconComponent = (Icons as any)[tool.icon] || Icons.HelpCircle;

  return (
    <Link
      href={tool.href}
      className="group relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-2 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:shadow-lg hover:shadow-violet-500/20 sm:gap-3 sm:rounded-[2rem] sm:p-6"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-500/0 via-transparent to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-violet-500/10 group-hover:to-cyan-500/10" />
      
      <span className="brand-gradient relative z-10 flex h-10 w-10 items-center justify-center rounded-xl shadow-inner transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 sm:rounded-2xl">
        <IconComponent className="h-5 w-5 text-white/90 sm:h-8 sm:w-8" strokeWidth={1.5} />
      </span>
      
      <h2 className="relative z-10 text-[10px] font-bold tracking-tight text-slate-800 transition-colors group-hover:text-black dark:text-slate-200 dark:group-hover:text-white sm:text-sm sm:tracking-wide">
        {tool.title}
      </h2>
    </Link>
  );
}
