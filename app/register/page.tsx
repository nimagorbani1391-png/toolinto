"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      router.push("/login");
    } catch (err: any) {
      setError(err.message || "خطایی رخ داد.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-black text-[var(--text-main)]">ساخت حساب کاربری</h1>
          <p className="mt-2 text-sm text-slate-500">به TOOLINTO خوش آمدید</p>
        </div>

        {error && <div className="rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-500">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-500">نام (اختیاری)</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-500">ایمیل</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-left text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-500">رمز عبور</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr" className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-left text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>

          <button type="submit" disabled={isLoading} className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "ثبت‌نام"}
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          حساب دارید؟ <Link href="/login" className="font-bold text-violet-500 hover:underline">وارد شوید</Link>
        </div>
      </div>
    </div>
  );
}
