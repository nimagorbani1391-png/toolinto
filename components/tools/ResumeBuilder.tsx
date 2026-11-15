"use client";

import { useState, useRef } from "react";
import { Download, User, Briefcase, GraduationCap, Code, Phone, Mail, MapPin } from "lucide-react";

export default function ResumeBuilder() {
  const [data, setData] = useState({
    name: "نیما قربانی",
    jobTitle: "توسعه‌دهنده وب",
    phone: "09123456789",
    email: "nima@example.com",
    address: "تهران، ایران",
    summary: "برنامه‌نویس علاقه‌مند به تکنولوژی با تجربه در ساخت وب‌اپلیکیشن‌های مدرن. مسلط به Next.js و طراحی رابط کاربری.",
    skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js",
    experience: "شرکت فناوری اطلاعات - توسعه‌دهنده ارشد (۱۴۰۳ تا کنون)\nاستارتاپ آنلاین - توسعه‌دهنده فرانت‌اند (۱۴۰۱ تا ۱۴۰۳)",
    education: "کارشناسی مهندسی کامپیوتر، دانشگاه تهران (۱۴۰۰ تا ۱۴۰۴)",
  });

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* فرم اطلاعات */}
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 space-y-4 print:hidden">
        <h2 className="text-lg font-bold text-[var(--text-main)] mb-4">اطلاعات خود را وارد کنید</h2>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate-500">نام و نام خانوادگی</label>
            <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-500">عنوان شغلی</label>
            <input type="text" value={data.jobTitle} onChange={(e) => setData({ ...data, jobTitle: e.target.value })} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-500">شماره تماس</label>
            <input type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-500">ایمیل</label>
            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-slate-500">آدرس</label>
            <input type="text" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-slate-500">درباره من (خلاصه)</label>
            <textarea rows={3} value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-slate-500">مهارت‌ها (با کاما جدا کنید)</label>
            <input type="text" value={data.skills} onChange={(e) => setData({ ...data, skills: e.target.value })} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-slate-500">سوابق شغلی (هر خط یک مورد)</label>
            <textarea rows={3} value={data.experience} onChange={(e) => setData({ ...data, experience: e.target.value })} className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm text-slate-500">تحصیلات</label>
            <input type="text" value={data.education} onChange={(e) => setData({ ...data, education: e.target.value })} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400" />
          </div>
        </div>

        <button onClick={handlePrint} className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition hover:brightness-110">
          <Download className="h-5 w-5" /> دانلود فایل PDF / پرینت
        </button>
      </div>

      {/* پیش‌نمایش رزومه (این بخش در چاپ دیده می‌شه) */}
      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-xl print:border-none print:shadow-none">
        <div ref={printRef} className="p-8 sm:p-12 text-black" dir="rtl">
          {/* هدر رزومه */}
          <div className="border-b-2 border-slate-800 pb-6 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-slate-900">{data.name}</h1>
              <p className="text-xl font-bold text-violet-600 mt-1">{data.jobTitle}</p>
            </div>
            <div className="space-y-1 text-sm text-slate-600">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> <span dir="ltr">{data.phone}</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> <span dir="ltr">{data.email}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {data.address}</div>
            </div>
          </div>

          {/* درباره من */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><User className="h-5 w-5 text-violet-600" /> درباره من</h2>
            <p className="text-sm text-slate-700 leading-7">{data.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ستون راست */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Briefcase className="h-5 w-5 text-violet-600" /> سوابق شغلی</h2>
                <div className="text-sm text-slate-700 leading-7 whitespace-pre-line">{data.experience}</div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2"><GraduationCap className="h-5 w-5 text-violet-600" /> تحصیلات</h2>
                <p className="text-sm text-slate-700 leading-7">{data.education}</p>
              </div>
            </div>

            {/* ستون چپ */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Code className="h-5 w-5 text-violet-600" /> مهارت‌ها</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.split(",").map((skill, index) => (
                  <span key={index} className="rounded-lg bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
