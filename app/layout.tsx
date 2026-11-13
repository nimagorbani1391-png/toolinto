import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import PwaRegister from "../components/PwaRegister";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  verification: {
    google: "hpWvmi9hBvnLrzOn00ScS87_PXkSJ31S5wIPLFjwYGU",
  },
  title: "TOOLINTO | ابزارهای کوچک و کاربردی",
  description: "مجموعه ابزارهای کوچک و رایگان: کوتاه‌کننده لینک، سازنده QR کد، تبدیل تاریخ، محاسبه BMI و ۱۰ ابزار کاربردی دیگر.",
  keywords: ["ابزار آنلاین", "کوتاه کننده لینک", "سازنده QR کد", "تبدیل تاریخ", "محاسبه BMI", "TOOLINTO"],
  authors: [{ name: "Nima" }],
  openGraph: {
    title: "TOOLINTO | ابزارهای کوچک و کاربردی",
    description: "سریع، رایگان و بدون نیاز به ثبت‌نام. ابزار مورد نظرت رو انتخاب کن.",
    url: "https://toolinto.vercel.app",
    siteName: "TOOLINTO",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOOLINTO | ابزارهای کوچک و کاربردی",
    description: "سریع، رایگان و بدون نیاز به ثبت‌نام. ابزار مورد نظرت رو انتخاب کن.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`dark ${vazirmatn.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <PwaRegister />
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
