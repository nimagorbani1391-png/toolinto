"use client";

import { useMemo, useState } from "react";
import ToolCard from "./ToolCard";
import { inputCls } from "./ui";
import { tools } from "../lib/tools";
import { Search } from "lucide-react";

const normalize = (s: string) => s.toLowerCase().replace(/ي/g, "ی").replace(/ك/g, "ک").trim();

const CATEGORIES = [
  { id: "all", label: "همه" },
  { id: "social", label: "شبکه‌های اجتماعی" },
  { id: "image", label: "عکس و تصویر" },
  { id: "text", label: "متن و محتوا" },
  { id: "datetime", label: "تاریخ و زمان" },
  { id: "utility", label: "عمومی" },
];

export default function ToolSearch() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = useMemo(() => {
    const q = normalize(query);
    return tools.filter((t) => {
      const matchesSearch = !q || normalize([t.title, t.description, ...t.keywords].join(" ")).includes(q);
      const matchesTab = activeTab === "all" || t.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [query, activeTab]);

  return (
    <>
      <div className="relative mx-auto mb-4 max-w-xl">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی ابزار…"
          className={`${inputCls} pr-12`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
          <Search className="h-5 w-5" />
        </span>
      </div>

      {/* تب‌های دسته‌بندی */}
      <div className="mb-8 flex w-full overflow-x-auto pb-2 scrollbar-hide justify-start sm:justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
              activeTab === cat.id
                ? "brand-gradient text-white shadow-lg"
                : "border border-[var(--glass-border)] bg-[var(--glass-bg)] text-slate-500 hover:text-[var(--text-main)] dark:text-slate-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mx-auto grid max-w-4xl grid-cols-4 gap-2 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500">ابزاری پیدا نشد.</p>
      )}
    </>
  );
}
