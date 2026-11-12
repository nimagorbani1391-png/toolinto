"use client";

import { useMemo, useState } from "react";
import ToolCard from "./ToolCard";
import { tools } from "../lib/tools";
import { Search } from "lucide-react";

const normalize = (s: string) =>
  s.toLowerCase().replace(/ي/g, "ی").replace(/ك/g, "ک").trim();

export default function ToolSearch() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return tools;
    return tools.filter((t) =>
      normalize([t.title, t.description, ...t.keywords].join(" ")).includes(q)
    );
  }, [query]);

  return (
    <>
      <div className="relative mx-auto mb-8 max-w-xl">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی ابزار… مثلاً QR یا رمز عبور"
          aria-label="جستجوی ابزار"
          className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 pr-12 text-[var(--text-main)] placeholder:text-slate-500 outline-none backdrop-blur-md transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/40"
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500 dark:text-slate-400">
          <Search className="h-5 w-5" />
        </span>
      </div>

      {filtered.length > 0 ? (
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 dark:text-slate-400">
          ابزاری با این عبارت پیدا نشد.
        </p>
      )}
    </>
  );
}
