"use client";

import { useState, useRef } from "react";
import { Download, FileText, Settings2 } from "lucide-react";

export default function TextToPdf() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("لطفاً پاپ‌آپ (Popup) مرورگر خود را فعال کنید.");
      return;
    }

    printWindow.document.write(`
      <html dir="rtl" lang="fa">
        <head>
          <title>${title || "متن TOOLINTO"}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');
            body {
              font-family: 'Vazirmatn', sans-serif;
              padding: 40px;
              line-height: 2;
              color: #111;
              font-size: ${fontSize}px;
            }
            h1 {
              font-size: 28px;
              border-bottom: 2px solid #8b5cf6;
              padding-bottom: 15px;
              margin-bottom: 30px;
              color: #1a1a1a;
            }
            .content {
              white-space: pre-wrap;
              text-align: justify;
            }
            @media print {
              body { padding: 0; }
              h1 { page-break-after: avoid; }
            }
          </style>
        </head>
        <body>
          ${title ? `<h1>${title}</h1>` : ""}
          <div class="content">${text || "متنی وارد نشده است."}</div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      // printWindow.close(); // اگر می‌خوای پنجره بعد از پرینت بسته بشه، این خط رو آنکامنت کن
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 space-y-4">
        
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">عنوان سند (اختیاری)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً: جزوه ریاضی فصل ۱"
              className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-[var(--text-main)] outline-none focus:border-violet-400"
            />
          </div>
          <div className="w-24">
            <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">سایز فونت</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              min={12}
              max={24}
              className="w-full rounded-xl border border-[var(--card-border)] bg-black/20 p-3 text-center text-[var(--text-main)] outline-none focus:border-violet-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">متن خود را وارد کنید</label>
          <textarea
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="متن خود را اینجا بنویسید یا پیست کنید..."
            className="w-full resize-y rounded-xl border border-[var(--card-border)] bg-black/20 p-4 text-[var(--text-main)] outline-none focus:border-violet-400"
          />
        </div>
      </div>

      <button
        onClick={handlePrint}
        disabled={!text.trim()}
        className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
      >
        <Download className="h-5 w-5" />
        دانلود / ذخیره به صورت PDF
      </button>
      
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-xs text-slate-500 leading-6">
        <p>💡 <strong>راهنما:</strong> با کلیک روی دکمه بالا ، پنجره پرینت باز می‌شود. در قسمت مقصد (Destination) گزینه <strong>Save as PDF</strong> را انتخاب کنید تا فایل با بالاترین کیفیت و فونت فارسی ذخیره شود.</p>
      </div>
    </div>
  );
}
