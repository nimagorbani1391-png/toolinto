"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type OwnerUser = { id: string; name: string | null; email: string; createdAt: string; isVip: boolean };

export default function OwnerPage() {
  const [users, setUsers] = useState<OwnerUser[]>([]);
  const [status, setStatus] = useState<"loading" | "denied" | "ready" | "error">("loading");
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/owner/data", { signal: controller.signal, cache: "no-store" });
        if (response.status === 403) { setStatus("denied"); return; }
        if (!response.ok) throw new Error();
        const data: { users: OwnerUser[] } = await response.json();
        setUsers(data.users);
        setStatus("ready");
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  async function updateVip(user: OwnerUser) {
    setPending(user.id);
    setError("");
    try {
      const response = await fetch("/api/owner/toggle-vip", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, isVip: !user.isVip }),
      });
      if (response.status === 403) { setUsers([]); setStatus("denied"); return; }
      if (!response.ok) throw new Error();
      const { isVip }: { isVip: boolean } = await response.json();
      setUsers(current => current.map(row => row.id === user.id ? { ...row, isVip } : row));
    } catch {
      setError("تغییر عضویت انجام نشد. دوباره تلاش کنید.");
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-[var(--text-main)]">
      <h1 className="mb-6 text-2xl font-black">پنل مدیریت TOOLINTO</h1>
      {status === "loading" && <p role="status">در حال بررسی دسترسی…</p>}
      {status === "denied" && <p>این بخش فقط برای مدیر است. <Link href="/login" className="text-violet-400">ورود به حساب</Link></p>}
      {status === "error" && <p role="alert">دریافت اطلاعات انجام نشد. صفحه را دوباره بارگذاری کنید.</p>}
      {status === "ready" && (
        <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4">
          <p className="mb-4">کاربران: {users.length.toLocaleString("fa-IR")}</p>
          {error && <p role="alert" className="mb-3 text-red-400">{error}</p>}
          <table className="w-full text-right text-sm">
            <thead><tr><th scope="col">نام</th><th scope="col">ایمیل</th><th scope="col">تاریخ عضویت</th><th scope="col">عضویت ویژه</th></tr></thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-[var(--card-border)]">
                  <td className="p-2">{user.name || "بدون نام"}</td>
                  <td className="p-2"><bdi>{user.email}</bdi></td>
                  <td className="p-2">{new Date(user.createdAt).toLocaleDateString("fa-IR")}</td>
                  <td className="p-2">
                    <button type="button" aria-pressed={user.isVip} disabled={pending !== null}
                      onClick={() => void updateVip(user)} className="rounded border border-violet-500 px-3 py-1 disabled:opacity-50">
                      {pending === user.id ? "در حال ذخیره…" : user.isVip ? "فعال" : "غیرفعال"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
