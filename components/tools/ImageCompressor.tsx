"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import { UploadCloud, Download, Loader2, Image as ImageIcon } from "lucide-react";

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("لطفاً فقط فایل عکس انتخاب کنید.");
        return;
      }
      setOriginalFile(file);
      setCompressedFile(null);
      setError("");
    }
  };

  const compressImage = async () => {
    if (!originalFile) return;
    setIsCompressing(true);
    setError("");

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(originalFile, options);
      // تبدیل Blob به File برای دسترسی راحت تر
      const newFile = new File([compressed], originalFile.name, {
        type: compressed.type,
        lastModified: Date.now(),
      });
      setCompressedFile(newFile);
    } catch (err) {
      console.error(err);
      setError("خطایی در فشرده‌سازی رخ داد. دوباره تلاش کنید.");
    } finally {
      setIsCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* باکس آپلود */}
      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 text-center transition hover:bg-white/5">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <UploadCloud className="mb-4 h-10 w-10 text-slate-400" />
        <p className="text-sm font-medium text-[var(--text-main)]">
          برای انتخاب عکس کلیک کنید یا فایل را اینجا بکشید
        </p>
        <p className="mt-1 text-xs text-slate-500">فرمت‌های پشتیبانی شده: JPG, PNG, WebP</p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* اطلاعات فایل اصلی */}
      {originalFile && (
        <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-4">
          <div className="flex items-center gap-3">
            <ImageIcon className="h-8 w-8 text-violet-500" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-[var(--text-main)]">{originalFile.name}</p>
              <p className="text-xs text-slate-500">حجم اصلی: {formatSize(originalFile.size)}</p>
            </div>
          </div>
        </div>
      )}

      {/* دکمه فشرده سازی */}
      {originalFile && !compressedFile && (
        <button
          onClick={compressImage}
          disabled={isCompressing}
          className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {isCompressing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              در حال فشرده‌سازی...
            </>
          ) : (
            "شروع فشرده‌سازی"
          )}
        </button>
      )}

      {/* نتیجه فشرده سازی */}
      {compressedFile && (
        <div className="space-y-4 rounded-xl border border-green-500/30 bg-green-500/5 p-4">
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-300">حجم جدید</p>
            <p className="text-xl font-black text-green-500">{formatSize(compressedFile.size)}</p>
            <p className="text-xs text-slate-500">
              کاهش حجم: {formatSize(originalFile!.size - compressedFile.size)}
            </p>
          </div>
          <a
            href={URL.createObjectURL(compressedFile)}
            download={`compressed-${originalFile?.name}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
          >
            <Download className="h-5 w-5" />
            دانلود عکس فشرده شده
          </a>
        </div>
      )}
    </div>
  );
            }
