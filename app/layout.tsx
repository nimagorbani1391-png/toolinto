import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "TOOLINTO | ابزارهای کوچک و کاربردی",
  description: "مجموعه ابزارهای کوچک و رایگان: کوتاه‌کننده لینک، سازنده QR کد، تبدیل تاریخ و سازنده رمز عبور.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
