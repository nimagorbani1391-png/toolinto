"use client";

import { useState, useRef } from "react";
import { UploadCloud, Palette } from "lucide-react";
import CopyButton from "../CopyButton";

export default function ColorPicker() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [color, setColor] = useState<{ hex: string; rgb: string } | null>(null);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("لطفاً فقط فایل عکس انتخاب کنید.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setColor(null);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !imageSrc) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageSrc;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // محاسبه دقیق مختصات کلیک روی بوم (با توجه به ریسایز شدن با CSS)
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];

      const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
      const rgb = `rgb(${r}, ${g}, ${b})`;

      setColor({ hex, rgb });
    } catch (err) {
      setError("خطا در خواندن رنگ.");
    }
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 text-center transition hover:bg-white/5">
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
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-[var(--glass-border)] bg-black/50 text-center">
            <img
              src={imageSrc}
              alt="Uploaded"
              className="hidden"
              onLoad={handleImageLoad}
            />
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="mx-auto max-h-[400px] max-w-full cursor-crosshair object-contain"
            />
          </div>
          <p className="text-center text-xs text-slate-500">
            روی هر نقطه از عکس کلیک کنید تا کد رنگ آن را بگیرید.
          </p>

          <button
            onClick={() => {
              setImageSrc(null);
              setColor(null);
            }}
            className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-3 font-medium text-[var(--text-main)] transition hover:bg-white/10"
          >
            انتخاب عکس دیگر
          </button>
        </div>
      )}

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {color && (
        <div className="grid gap-4 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4 sm:grid-cols-2">
          <div 
            className="flex h-24 w-full items-center justify-center rounded-xl shadow-inner"
            style={{ backgroundColor: color.hex }}
          >
            <Palette className="h-8 w-8 text-white/50 mix-blend-overlay" />
          </div>
          <div className="space-y-3 flex flex-col justify-center">
            <div className="flex items-center justify-between rounded-lg bg-black/20 p-2">
              <span dir="ltr" className="font-mono text-sm text-[var(--text-main)]">{color.hex}</span>
              <CopyButton text={color.hex} />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-black/20 p-2">
              <span dir="ltr" className="font-mono text-sm text-[var(--text-main)]">{color.rgb}</span>
              <CopyButton text={color.rgb} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
