"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

const SIZES = [
  { label: "کوچک (۱۹۲)", value: 192 },
  { label: "متوسط (۲۵۶)", value: 256 },
  { label: "بزرگ (۳۸۴)", value: 384 },
];

export default function QrGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const wrapRef = useRef<HTMLDivElement>(null);

  const value = text.trim();

  function download() {
    const src = wrapRef.current?.querySelector("canvas");
    if (!src) return;

    const pad = 24;
    const out = document.createElement("canvas");
    out.width = src.width + pad * 2;
    out.height = src.height + pad * 2;

    const ctx = out.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(src, pad, pad);

    const a = document.createElement("a");
    a.href = out.toDataURL("image/png");
    a.download = "toolinto-qr.png";
    a.click();
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="qr-text" className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
          متن یا لینک
        </label>
        <textarea
          id="qr-text"
          rows={3}
          maxLength={500}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com یا هر متن دیگر"
          className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400"
        />
      </div>

      <div>
        <label htmlFor="qr-size" className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
          اندازه تصویر
        </label>
        <select
          id="qr-size"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400"
        >
          {SIZES.map((s) => (
            <option key={s.value} value={s.value} className="text-black">
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {value ? (
        <div className="space-y-4 pt-4">
          <div
            ref={wrapRef}
            className="mx-auto w-fit max-w-full rounded-2xl bg-white p-4"
          >
            <QRCodeCanvas
              value={value}
              size={size}
              level="M"
              bgColor="#ffffff"
              fgColor="#000000"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <button
            type="button"
            onClick={download}
            className="brand-gradient flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110"
          >
            <Download className="h-5 w-5" />
            دانلود تصویر PNG
          </button>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-[var(--glass-border)] px-4 py-8 text-center text-sm text-slate-500">
          برای ساخت QR کد، متنی وارد کنید.
        </p>
      )}
    </div>
  );
}
