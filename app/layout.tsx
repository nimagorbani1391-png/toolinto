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
        
        <footer className="border-t border-[var(--card-border)] py-8 text-center text-sm text-slate-500">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 sm:flex-row">
            <span><span dir="ltr" className="font-bold">TOOLINTO</span> · ابزارهای کوچک برای کارهای روزمره</span>
            
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-violet-500 transition">درباره ما</Link>
              <span className="hidden sm:inline text-slate-700">|</span>
              <Link href="/contact" className="hover:text-violet-500 transition">تماس با ما</Link>
              <span className="hidden sm:inline text-slate-700">|</span>
              <Link href="/api-docs" className="font-bold text-violet-500 hover:text-violet-400 transition">دسترسی به API</Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-600">© {new Date().getFullYear()} TOOLINTO. تمامی حقوق محفوظ است.</p>
        </footer>
      </body>
    </html>
  );
}
