import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import PwaRegister from "../components/PwaRegister";
import Link from "next/link";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  verification: { google: "hpWvmi9hBvnLrzOn00ScS87_PXkSJ31S5wIPLFjwYGU" },
  title: "TOOLINTO | ابزارهای کوچک و کاربردی",
  description: "مجموعه ابزارهای کوچک و رایگان برای کارهای روزمره",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`dark ${vazirmatn.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <PwaRegister />
        <Header />
        <main className="flex-1">{children}</main>
        
        {/* فوتر سایت */}
        <footer className="border-t border-[var(--card-border)] py-6 text-center text-sm text-slate-500">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <span><span dir="ltr" className="font-bold">TOOLINTO</span> · ابزارهای کوچک برای کارهای روزمره</span>
            <span className="hidden sm:inline">|</span>
            <Link href="/api-docs" className="font-bold text-violet-500 hover:text-violet-400 transition">
              دسترسی به API
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
