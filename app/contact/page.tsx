import type { Metadata } from "next";
import { MessageCircle, Mail, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "تماس با ما | TOOLINTO",
  description: "راه‌های ارتباطی با پشتیبانی سایت TOOLINTO",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:py-24">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-[var(--text-main)]">تماس با ما</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          ما همیشه خوشحال می‌شویم نظرات ، پیشنهادات یا انتقادات شما را بشنویم.
        </p>
      </div>

      <div className="space-y-4">
        <a
          href="https://rubika.ir/IM_NIMA_GORBANI"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition hover:bg-white/5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-main)]">پشتیبانی در روبیکا</h3>
              <p className="text-sm text-slate-500">سریع‌ترین راه ارتباطی</p>
            </div>
          </div>
        </a>

        <a
          href="mailto:support@toolinto.ir"
          className="flex items-center justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition hover:bg-white/5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-main)]">ایمیل</h3>
              <p className="text-sm text-slate-500" dir="ltr">support@toolinto.ir</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
