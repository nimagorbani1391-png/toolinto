import ToolShell from "../../components/ToolShell";
import { Code2 } from "lucide-react";

export const metadata = {
  title: "دسترسی به API | TOOLINTO",
  description: "مستندات و دسترسی برنامه‌نویسان به APIهای TOOLINTO",
};

export default function ApiDocsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-500/10">
        <Code2 className="h-10 w-10 text-orange-500" />
      </div>
      <h1 className="text-3xl font-black text-[var(--text-main)] mb-4">دسترسی به API</h1>
      <p className="text-slate-500 dark:text-slate-400 leading-8 mb-8">
        به‌زودی! ما در حال آماده‌سازی مستندات و کلیدهای دسترسی (API Keys) برای برنامه‌نویسان و توسعه‌دهندگان هستیم. 
        با استفاده از API ما، می‌توانید ابزارهای TOOLINTO را مستقیماً در اپلیکیشن یا وب‌سایت خودتان فراخوانی کنید.
      </p>
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 text-sm text-slate-500">
        این قابلیت ویژه کاربران <strong>نسخه VIP</strong> خواهد بود.
      </div>
    </div>
  );
}
