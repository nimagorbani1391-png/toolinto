"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { UploadCloud, Download, Loader2, FileImage, X } from "lucide-react";

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => file.type.startsWith("image/"));
    
    if (validFiles.length !== selectedFiles.length) {
      setError("برخی از فایل‌های انتخاب شده عکس نبودند و نادیده گرفته شدند.");
    } else {
      setError("");
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const generatePdf = async () => {
    if (files.length === 0) return;
    setIsGenerating(true);
    setError("");

    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (const file of files) {
        const imgData = await readFileAsDataURL(file);
        
        // بارگذاری عکس برای گرفتن ابعاد
        const img = await loadImage(imgData);
        
        // تنظیم ابعاد A4 (پورتال)
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // محاسبه نسبت ابعاد برای فیت شدن در صفحه بدون کشیدگی
        const imgRatio = img.width / img.height;
        const pageRatio = pdfWidth / pdfHeight;
        
        let finalWidth = pdfWidth;
        let finalHeight = pdfHeight;

        if (imgRatio > pageRatio) {
          finalHeight = pdfWidth / imgRatio;
        } else {
          finalWidth = pdfHeight * imgRatio;
        }

        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        if (!isFirstPage) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "JPEG", x, y, finalWidth, finalHeight);
        isFirstPage = false;
      }

      pdf.save("toolinto-images.pdf");
    } catch (err) {
      console.error(err);
      setError("خطایی در ساخت فایل PDF رخ داد.");
    } finally {
      setIsGenerating(false);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  return (
    <div className="space-y-6">
      <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--glass-border)] bg-[var(--glass-bg)] p-8 text-center transition hover:bg-white/5">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <UploadCloud className="mb-4 h-10 w-10 text-slate-400" />
        <p className="text-sm font-medium text-[var(--text-main)]">
          برای انتخاب یک یا چند عکس کلیک کنید
        </p>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileImage className="h-6 w-6 shrink-0 text-violet-500" />
                  <p className="truncate text-sm text-[var(--text-main)]">{file.name}</p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="rounded-lg p-1 text-red-500 hover:bg-red-500/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={generatePdf}
            disabled={isGenerating}
            className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                در حال ساخت PDF...
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                دانلود فایل PDF
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
                        }
