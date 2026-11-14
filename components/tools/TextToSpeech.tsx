"use client";

import { useState } from "react";
import { Play, Square, Download, Loader2, Volume2 } from "lucide-react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [voice, setVoice] = useState("fa-IR-DilaraNeural");

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    setError("");
    setAudioUrl(null);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice }),
      });

      if (!response.ok) {
        throw new Error('خطا در تولید صدا');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      setError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsGenerating(false);
    }
  };

  const stopAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm text-slate-500 dark:text-slate-300">متن خود را وارد کنید</label>
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-1 text-sm text-[var(--text-main)] outline-none focus:border-violet-400"
        >
          <option value="fa-IR-DilaraNeural">صدای زنانه (دلارا)</option>
          <option value="fa-IR-FaridNeural">صدای مردانه (فرید)</option>
        </select>
      </div>

      <textarea
        rows={6}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="متنی که می‌خواهید خوانده شود را اینجا بنویسید..."
        className="w-full resize-y rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--text-main)] outline-none focus:border-violet-400"
      />

      <div className="flex gap-3">
        {!audioUrl ? (
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !text.trim()}
            className="brand-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
            {isGenerating ? "در حال تولید..." : "تبدیل به صدا"}
          </button>
        ) : (
          <>
            <a
              href={audioUrl}
              download="toolinto-speech.mp3"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
            >
              <Download className="h-5 w-5" />
              دانلود فایل صوتی
            </a>
            <button
              onClick={stopAudio}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600"
            >
              <Square className="h-5 w-5" />
              توقف
            </button>
          </>
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {audioUrl && (
        <audio controls autoPlay src={audioUrl} className="w-full" />
      )}

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-sm text-slate-500 dark:text-slate-400">
        <p className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 shrink-0" />
          نکته: کیفیت صدا در این روش بسیار بالا و طبیعی است و توسط هوش مصنوعی مایکروسافت تولید می‌شود.
        </p>
      </div>
    </div>
  );
}
