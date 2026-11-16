"use client";

import { useState } from "react";
import { Lock, User as UserIcon, Calendar, ShieldAlert, Loader2, Users } from "lucide-react";

export default function OwnerPage() {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [users, setUsers] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/owner/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, year, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setUsers(data.users);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[85vh] items-center justify-center px-4 bg-black">
        <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-800 bg-[#09090b] p-8 shadow-2xl">
          <div className="text-center">
            <ShieldAlert className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h1 className="text-2xl font-black text-white">منطقه ممنوعه</h1>
            <p className="mt-2 text-sm text-slate-500">این صفحه فقط برای مالک سایت است.</p>
          </div>

          {error && <div className="rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-500">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-slate-400">نام کامل مالک</label>
              <div className="relative">
                <UserIcon className="absolute right-3 top-3.5 h-5 w-5 text-slate-500" />
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="نام خود را وارد کنید" className="w-full rounded-xl border border-slate-700 bg-black/50 p-3 pr-10 text-white outline-none focus:border-red-500" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-400">سال تولد</label>
              <div className="relative">
                <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-slate-500" />
                <input type="text" required value={year} onChange={(e) => setYear(e.target.value)} placeholder="مثلاً 1391" className="w-full rounded-xl border border-slate-700 bg-black/50 p-3 pr-10 text-white outline-none focus:border-red-500" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-400">رمز عبور مالک</label>
              <div className="relative">
                <Lock className="absolute right-3 top-3.5 h-5 w-5 text-slate-500" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} dir="ltr" className="w-full rounded-xl border border-slate-700 bg-black/50 p-3 pr-10 text-left text-white outline-none focus:border-red-500" />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "ورود به سیستم"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 sm:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-black text-green-500 flex items-center gap-2">
            <ShieldAlert className="h-8 w-8" /> صفحه مالک TOOLINTO
          </h1>
          <p className="text-sm text-slate-400">خوش آمدی نیما قربانی</p>
        </div>

        {/* جدول کاربران */}
        <div className="rounded-2xl border border-slate-800 bg-[#111] overflow-hidden">
          <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <h2 className="font-bold text-lg">کل کاربران ثبت‌نام شده ({users.length} نفر)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-900/50 text-slate-400">
                <tr>
                  <th className="p-4">نام</th>
                  <th className="p-4">ایمیل</th>
                  <th className="p-4">تاریخ عضویت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.length === 0 ? (
                  <tr><td colSpan={3} className="p-6 text-center text-slate-500">هنوز کاربری ثبت‌نام نکرده است.</td></tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-4 font-bold">{u.name || "بدون نام"}</td>
                      <td className="p-4 text-slate-400" dir="ltr">{u.email}</td>
                      <td className="p-4 text-slate-500 text-xs">
                        {new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date(u.createdAt))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
