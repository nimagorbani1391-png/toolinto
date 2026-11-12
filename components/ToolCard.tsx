import Link from "next/link";
import { Link as LinkIcon, QrCode, Calendar, Lock, Cake, HelpCircle } from "lucide-react";
import type { Tool } from "../lib/tools";

const IconMap: Record<string, React.ElementType> = {
  Link: LinkIcon,
  QrCode: QrCode,
  Calendar: Calendar,
  Lock: Lock,
  Cake: Cake,
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const IconComponent = IconMap[tool.icon] || HelpCircle;

  return (
    <Link
      href={tool.href}
      className="group relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-[2rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-2xl hover:shadow-violet-500/20"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-500/0 via-transparent to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-violet-500/10 group-hover:to-cyan-500/10" />
      
      <span className="brand-gradient relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg">
        <IconComponent className="h-8 w-8 text-white/90 transition-colors group-hover:text-white" strokeWidth={1.5} />
      </span>
      
      <h2 className="relative z-10 text-sm font-bold tracking-wide text-slate-800 transition-colors group-hover:text-black dark:text-slate-200 dark:group-hover:text-white sm:text-base">
        {tool.title}
      </h2>
    </Link>
  );
}
