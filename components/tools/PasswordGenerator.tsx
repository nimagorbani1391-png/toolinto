"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import CopyButton from "../CopyButton";

const CHARSETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?/~",
};

type ToggleKey = "lower" | "upper" | "digits" | "symbols";

function randomInt(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    lower: true,
    upper: true,
    digits: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let pools: string[] = [];
    if (options.lower) pools.push(CHARSETS.lower);
    if (options.upper) pools.push(CHARSETS.upper);
    if (options.digits) pools.push(CHARSETS.digits);
    if (options.symbols) pools.push(CHARSETS.symbols);

    if (pools.length === 0) {
      setPassword("");
      return;
    }

    const all = pools.join("");
    const chars: string[] = pools.map((p) => p[randomInt(p.length)]);
    
    while (chars.length < length) {
      chars.push(all[randomInt(all.length)]);
    }

    for (let i = chars.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    
    setPassword(chars.join(""));
  }, [length, options]);

  useEffect(() => {
    generate();
  }, [generate]);

  // محاسبه قدرت رمز عبور
  const getStrength = () => {
    let poolSize = 0;
    if (options.lower) poolSize += 26;
    if (options.upper) poolSize += 26;
    if (options.digits) poolSize += 10;
    if (options.symbols) poolSize += 30;

    if (poolSize === 0) return { label: "هیچ", color: "bg-gray-500", width: "0%" };

    const entropy = length * Math.log2(poolSize);
    
    if (entropy < 40) return { label: "ضعیف", color: "bg-red-500", width: "33%" };
    if (entropy < 60) return { label: "متوسط", color: "bg-yellow-500", width: "66%" };
    if (entropy < 80) return { label: "قوی", color: "bg-green-500", width: "100%" };
    return { label: "بسیار قوی", color: "bg-emerald-500", width: "100%" };
  };

  const strength = getStrength();

  return (
    <div className="space-y-6">
      <div>
        <div
          dir="ltr"
          className="min-h-[3.5rem] select-all break-all rounded-xl border border-[var(--glass-border)] bg-black/40 px-4 py-3 font-mono text-lg leading-relaxed text-[var(--text-main)]"
        >
          {password || "—"}
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-3">
          <CopyButton text={password} />
          <button 
            onClick={generate} 
            className="brand-gradient flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition hover:brightness-110"
          >
            <RefreshCw className="h-4 w-4" />
            تولید مجدد
          </button>
        </div>
      </div>

      {/* نشانگر قدرت رمز عبور */}
      <div>
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="text-slate-500 dark:text-slate-300">قدرت رمز</span>
          <span className="font-bold text-[var(--text-main)]">{strength.label}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-black/20 dark:bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: strength.width }}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-slate-500 dark:text-slate-300">
          <span>طول رمز</span>
          <span className="font-bold text-[var(--text-main)]">{length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-violet-500"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(Object.keys(CHARSETS) as ToggleKey[]).map((key) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-sm text-[var(--text-main)]"
          >
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => setOptions((p) => ({ ...p, [key]: !p[key] }))}
              className="h-4 w-4 accent-violet-500"
            />
            {key === "lower" && "حروف کوچک (a-z)"}
            {key === "upper" && "حروف بزرگ (A-Z)"}
            {key === "digits" && "اعداد (0-9)"}
            {key === "symbols" && "نمادها (!@#$…)"}
          </label>
        ))}
      </div>
    </div>
  );
            }
