import ToolSearch from "../components/ToolSearch";
import { Crown } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-black leading-snug text-[var(--text-main)] sm:text-4xl">
          ابزارهای کوچک، برای کارهای روزمره
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-slate-600 dark:text-slate-300 sm:text-base">
          سریع، رایگان و بدون نیاز به ثبت‌نام.
        </p>
      </section>

      <ToolSearch />

      {/* بنر اشتراک VIP */}
      <div className="mt-16 mb-8 overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-orange-500/10 p-6 text-center backdrop-blur-sm relative">
        <div className="absolute top-0 right-0 p-3 opacity-20">
           <Crown className="h-24 w-24 text-yellow-500" />
        </div>
        <h3 className="text-xl font-black text-yellow-500 mb-2 flex items-center justify-center gap-2">
          <Crown className="h-6 w-6" /> نسخه ویژه TOOLINTO VIP
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 max-w-md mx-auto">
          به‌زودی! دسترسی نامحدود به تمام ابزارها، حذف محدودیت‌ها و سرعت پردازش بالاتر.
        </p>
        <button className="rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-bold text-black transition hover:bg-yellow-400">
          خرید اشتراک
        </button>
      </div>
    </div>
  );
}
