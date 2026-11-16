import type { Metadata } from "next";
import { Rocket, ShieldCheck, Zap, Heart, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "درباره ما | TOOLINTO",
  description: "درباره پروژه TOOLINTO، اهداف ما و ابزارهای رایگان فارسی",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-500/10">
          <Rocket className="h-10 w-10 text-violet-500" />
        </div>
        <h1 className="text-3xl font-black text-[var(--text-main)] sm:text-4xl">درباره TOOLINTO</h1>
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
          ابزارهای کوچک، برای کارهای روزمره
        </p>
      </div>

      <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-8">
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 sm:p-8">
          <h2 className="mb-3 text-xl font-bold text-[var(--text-main)]">داستان ما</h2>
          <p>
            TOOLINTO با یک ایده ساده شروع شد: <strong>«چرا برای کارهای کوچک و روزمره باید به ده‌ها سایت مختلف با تبلیغات مزاحم سر بزنیم؟»</strong>
            ما تصمیم گرفتیم یک پلتفرم فارسی، سریع و کاملاً رایگان بسازیم که تمام ابزارهای مورد نیاز شما را در یک جا جمع کند. از تبدیل فایل‌های PDF و عکس گرفته تا ابزارهای سرگرمی و بازی.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
            <Zap className="mb-3 h-8 w-8 text-yellow-500" />
            <h3 className="mb-2 font-bold text-[var(--text-main)]">سرعت و راحتی</h3>
            <p className="text-sm">تمامی ابزارها بدون نیاز به ثبت‌نام و با بیشترین سرعت ممکن در مرورگر شما اجرا می‌شوند.</p>
          </div>
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
            <ShieldCheck className="mb-3 h-8 w-8 text-emerald-500" />
            <h3 className="mb-2 font-bold text-[var(--text-main)]">حریم خصوصی</h3>
            <p className="text-sm">بسیاری از ابزارهای ما سمت کاربر (Client-Side) پردازش می‌شوند. یعنی فایل‌های شما به سرور ما ارسال نمی‌شوند.</p>
          </div>
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
            <Code2 className="mb-3 h-8 w-8 text-blue-500" />
            <h3 className="mb-2 font-bold text-[var(--text-main)]">تکنولوژی مدرن</h3>
            <p className="text-sm">ما از جدیدترین تکنولوژی‌های وب (مانند Next.js) برای ارائه یک تجربه کاربری روان و مدرن استفاده می‌کنیم.</p>
          </div>
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
            <Heart className="mb-3 h-8 w-8 text-pink-500" />
            <h3 className="mb-2 font-bold text-[var(--text-main)]">ساخته شده با عشق</h3>
            <p className="text-sm">این پروژه با تلاش و پشتکار یک تیم نوجوان ایرانی ساخته شده است تا به وب فارسی خدمت کند.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
