"use client";

import { useState, useRef } from "react";
import { UploadCloud, Download, Loader2, Image as ImageIcon } from "lucide-react";

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState("image/jpeg");
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (!selected.type.startsWith("image/")) {
        setError("لطفاً فقط فایل عکس انتخاب کنید.");
        return;
      }
      setFile(selected);
      setConvertedUrl(null);
      setError("");
    }
  };

  const convertImage = () => {
    if (!file || !canvasRef.current) return;
    setIsConverting(true);
    setError("");

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setConvertedUrl(URL.createObjectURL(blob));
          } else {
            setError("خطایی در تبدیل عکس رخ داد.");
          }
          setIsConverting(false);
          URL.revokeObjectURL(objectUrl);
        },
        targetFormat,
        0.9
      );
    };

    img.onerror = () => {
      setError("فایل عکس معتبر نیست.");
      setIsConverting(false);
      URL.revokeObjectURL(objectUrl);
    };

    img.src = objectUrl;
  };

  const getExtension = () => {
    if (targetFormat === "image/jpeg") return "jpg";
    if (targetFormat === "image/webp") return "webp";
    return "png";
  };

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

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

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {file && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4">
            <ImageIcon className="h-8 w-8 text-violet-500" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-[var(--text-main)]">{file.name}</p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
              فرمت خروجی را انتخاب کنید:
            </label>
            <select
              value={targetFormat}
              onChange={(e) => {
                setTargetFormat(e.target.value);
                setConvertedUrl(null);
              }}
              className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400"
            >
              <option value="image/jpeg" className="text-black">JPG (پس‌زمینه سفید)</option>
              <option value="image/png" className="text-black">PNG (شفافیت)</option>
              <option value="image/webp" className="text-black">WebP (حجم کم)</option>
            </select>
          </div>

          {!convertedUrl && (
            <button
              onClick={convertImage}
              disabled={isConverting}
              className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
            >
              {isConverting ? <Loader2 className="h-5 w-5 animate-spin" /> : "تبدیل فرمت"}
            </button>
          )}

          {convertedUrl && (
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
              <a
                href={convertedUrl}
                download={`converted-${file.name.split(".")[0]}.${getExtension()}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
              >
                <Download className="h-5 w-5" />
                دانلود عکس تبدیل شده
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
                }
