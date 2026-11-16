"use client";

import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { Download, Image as ImageIcon, Loader2, ArrowRight, BadgeCheck } from "lucide-react";

export default function TweetMaker() {
  const [name, setName] = useState("custom name");
  const [handle, setHandle] = useState("@Sirvan");
  const [text, setText] = useState("سلام ، میتونی اینجا کلی پست توییت بسازی!");
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
        scale: 3, // کیفیت بالا
        useCORS: true,
        backgroundColor: "#000000", // بک‌گراند مشکی توییتر
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

      {/* پیش‌نمایش توییت */}
      <div className="flex justify-center overflow-hidden rounded-2xl border border-[var(--card-border)] bg-black p-4">
        <div ref={tweetRef} className="w-full max-w-[500px] bg-black p-5 font-sans" dir="rtl">
          
          {/* هدر توییتر */}
          <div className="flex items-center gap-4 mb-6">
             <ArrowRight className="h-5 w-5 text-white" />
             <span className="text-lg font-bold text-white">Tweet</span>
          </div>

          {/* پروفایل و اسم */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-700">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">👤</div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-bold text-white">{name}</span>
                  {isVerified && <BadgeCheck className="h-4 w-4 text-[#1D9BF0]" fill="#1D9BF0" color="#000" />}
                </div>
                <span className="text-[15px] text-[#71767b]" dir="ltr">{handle}</span>
              </div>
            </div>
          </div>

          {/* متن توییت */}
          <div className="mt-4 text-[20px] leading-relaxed text-[#e7e9ea]">
            {text}
          </div>

          {/* لینک ترجمه */}
          <div className="mt-4">
            <span className="text-[15px] text-[#1D9BF0] cursor-pointer hover:underline">Translate from Persian</span>
          </div>

          {/* تاریخ و ساعت */}
          <div className="mt-4 text-[15px] text-[#71767b]" dir="ltr">
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
