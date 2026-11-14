"use client";

import { useState, useRef } from "react";
import { UploadCloud, Download, Link as LinkIcon, Unlock, Lock } from "lucide-react";

export default function ImageResizer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [keepRatio, setKeepRatio] = useState<boolean>(true);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setImageSrc(event.target?.result as string);
        setResizedUrl(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setWidth(val);
    if (keepRatio && originalWidth > 0) {
      setHeight(Math.round((val / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setHeight(val);
    if (keepRatio && originalHeight > 0) {
      setWidth(Math.round((val / originalHeight) * originalWidth));
    }
  };

  const resizeImage = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // کشیدن عکس با ابعاد جدید
      ctx.drawImage(img, 0, 0, width, height);
      
      // گرفتن خروجی
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setResizedUrl(dataUrl);
      setIsProcessing(false);
    };
    img.src = imageSrc;
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--card-border)] bg-[var(--card-bg)] p-8 text-center transition hover:opacity-80">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <UploadCloud className="mb-4 h-10 w-10 text-slate-400" />
          <p className="text-sm font-medium text-[var(--text-main)]">
            برای انتخاب عکس کلیک کنید
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
                عرض (پیکسل)
              </label>
              <input
                type="number"
                value={width || ""}
                onChange={handleWidthChange}
                className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
              />
            </div>
            
            <button
              onClick={() => setKeepRatio(!keepRatio)}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${
                keepRatio 
                  ? "border-violet-500 bg-violet-500/10 text-violet-500" 
                  : "border-[var(--card-border)] bg-[var(--card-bg)] text-slate-400"
              }`}
              title={keepRatio ? "نسبت تصویر قفل است" : "نسبت تصویر آزاد است"}
            >
              {keepRatio ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
            </button>

            <div className="flex-1">
              <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
                ارتفاع (پیکسل)
              </label>
              <input
                type="number"
                value={height || ""}
                onChange={handleHeightChange}
                className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
              />
            </div>
          </div>

          <div className="flex justify-center overflow-hidden rounded-xl border border-[var(--card-border)] bg-black/20 p-4">
            <img 
              src={resizedUrl || imageSrc} 
              alt="Preview" 
              className="max-h-[300px] object-contain" 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { setImageSrc(null); setResizedUrl(null); }}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 font-bold text-[var(--text-main)] transition hover:opacity-80"
            >
              انتخاب عکس دیگر
            </button>
            <button
              onClick={resizeImage}
              disabled={isProcessing || !width || !height}
              className="brand-gradient flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {isProcessing ? "در حال پردازش..." : "اعمال تغییر سایز"}
            </button>
          </div>

          {resizedUrl && (
            <a
              href={resizedUrl}
              download="resized-image.jpg"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
            >
              <Download className="h-5 w-5" />
              دانلود عکس جدید ({width}x{height})
            </a>
          )}
        </div>
      )}
    </div>
  );
}
