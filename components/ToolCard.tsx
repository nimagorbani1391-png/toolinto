import Link from "next/link";
import * as Icons from "lucide-react";
import type { Tool } from "../lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const IconComponent = (Icons as any)[tool.icon] || Icons.HelpCircle;

  return (
    <Link
      href={tool.href}
      className="group relative flex flex-col items-center justify-center gap-2 aspect-square overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-2 text-center transition-transform duration-200 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
    >
      <span className="brand-gradient relative z-10 flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl shadow-md transition-transform duration-200 group-hover:scale-110">
        <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 text-white" strokeWidth={2} />
      </span>
      
      <h2 className="relative z-10 w-full text-[10px] font-bold leading-tight text-slate-700 transition-colors group-hover:text-black dark:text-slate-300 dark:group-hover:text-white sm:text-xs">
        {tool.title}
      </h2>
    </Link>
  );
}
