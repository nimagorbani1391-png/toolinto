"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Download, Image as ImageIcon, Loader2, ArrowLeft, BadgeCheck } from "lucide-react";

export default function TweetMaker() {
  const [name, setName] = useState("Toolinto");
  const [handle, setHandle] = useState("@toolinto");
  const [text, setText] = useState("سلام دیپ سیک این عالیه!");
  const [time, setTime] = useState("10:30 PM . 8 Jan 18");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const tweetRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (!tweetRef.current) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(tweetRef.current, {
        scale: 3, 
        useCORS: true,
        backgroundColor: "#000000", 
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `tweet-${Date.now()}.png`;
      link.click();
    } catch (err) {
      alert("خطا در ساخت عکس.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* کنترل‌ها */}
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 space-y-4 print:hidden">
        <h2 className="text-sm font-bold text-[var(--text-main)] mb-2">تنظیمات توییت</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs text-slate-500">اسم نمایشی</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-2.5 text-sm text-[var(--text-main)] outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">آیدی (با @)</label>
            <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} dir="ltr" className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-2.5 text-sm text-left text-[var(--text-main)] outline-none" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-500">متن توییت</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} dir="rtl" className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-2.5 text-sm text-[var(--text-main)] outline-none resize-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="mb-1 block text-xs text-slate-500">تاریخ و ساعت</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} dir="ltr" className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-2.5 text-sm text-left text-[var(--text-main)] outline-none" />
          </div>
          
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} className="h-4 w-4 accent-blue-500" />
              <span className="text-sm text-slate-500">تیک آبی</span>
            </label>
            
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--card-border)] bg-black/20 px-3 py-2 text-xs font-bold text-[var(--text-main)] hover:bg-white/5">
              <ImageIcon className="h-4 w-4" /> تغییر پروفایل
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* پیش‌نمایش توییت (شبیه‌سازی دقیق توییتر) */}
      <div className="flex justify-center overflow-hidden rounded-2xl border border-[var(--card-border)] bg-black p-4">
        
        {/* کادر اصلی با چیدمان LTR (چپ‌به‌راست) */}
        <div ref={tweetRef} className="w-full max-w-[500px] bg-black p-5 font-sans" dir="ltr">
          
          {/* هدر توییتر (فلش سمت چپ) */}
          <div className="flex items-center gap-6 mb-4 text-white">
             <ArrowLeft className="h-5 w-5" />
             <span className="text-[17px] font-bold">Tweet</span>
          </div>

          {/* پروفایل (آواتار سمت چپ) */}
          <div className="flex gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#16181c]">
              {avatar ? (
                <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-500 text-xl bg-[#1d9bf0]">T</div>
              )}
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-[15px] font-bold text-[#e7e9ea]">{name}</span>
                {isVerified && (
                  <svg viewBox="0 0 24 24" aria-label="Verified account" className="h-[18px] w-[18px] text-[#1d9bf0] fill-current">
                    <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.792-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.733 2.76 1.86 3.5-.036.227-.06.46-.06.7 0 2.21 1.71 3.998 3.918 3.998.47 0 .92-.084 1.336-.25C8.182 21.585 9.49 22.5 11 22.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.792 3.918-4 0-.24-.024-.473-.06-.7 1.127-.74 1.86-2.04 1.86-3.5zM10.09 16.05l-3.3-3.3 1.41-1.41 1.89 1.89 5.66-5.66 1.41 1.41-7.07 7.07z"></path></g>
                  </svg>
                )}
              </div>
              <span className="text-[15px] text-[#71767b]">{handle}</span>
            </div>
          </div>

          {/* متن توییت (راست‌چین برای فارسی) */}
          <div className="mt-3 text-[17px] leading-relaxed text-[#e7e9ea]">
            <p dir="auto" className="whitespace-pre-wrap">{text}</p>
          </div>

          {/* لینک ترجمه */}
          <div className="mt-4 text-left">
            <span className="text-[15px] text-[#1d9bf0] cursor-pointer hover:underline">Translate from Persian</span>
          </div>

          {/* تاریخ و ساعت */}
          <div className="mt-4 text-[15px] text-[#71767b] text-left">
            {time}
          </div>

        </div>
      </div>

      <button 
        onClick={downloadImage} 
        disabled={isGenerating}
        className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
      >
        {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
        {isGenerating ? "در حال ساخت عکس..." : "دانلود تصویر توییت"}
      </button>
    </div>
  );
}
