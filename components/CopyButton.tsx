"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  }

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="flex items-center justify-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-3 font-medium text-[var(--text-main)] transition hover:bg-white/10 disabled:opacity-50"
    >
      {copied ? "✓ کپی شد✅" : "📋 کپی"}
    </button>
  );
}
