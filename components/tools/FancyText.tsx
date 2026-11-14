"use client";

import { useState } from "react";
import CopyButton from "../CopyButton";

// نقشه تبدیل حروف انگلیسی به یونیکدهای فانتزی
const fontMaps = [
  {
    name: "Bold (بولد)",
    map: {
      a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣", k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭", u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
      A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙"
    }
  },
  {
    name: "Italic (ایتالیک)",
    map: {
      a: "𝑎", b: "𝑏", c: "𝑐", d: "𝑑", e: "𝑒", f: "𝑓", g: "𝑔", h: "ℎ", i: "𝑖", j: "𝑗", k: "𝑘", l: "𝑙", m: "𝑚", n: "𝑛", o: "𝑜", p: "𝑝", q: "𝑞", r: "𝑟", s: "𝑠", t: "𝑡", u: "𝑢", v: "𝑣", w: "𝑤", x: "𝑥", y: "𝑦", z: "𝑧",
      A: "𝐴", B: "𝐵", C: "𝐶", D: "𝐷", E: "𝐸", F: "𝐹", G: "𝐺", H: "𝐻", I: "𝐼", J: "𝐽", K: "𝐾", L: "𝐿", M: "𝑀", N: "𝑁", O: "𝑂", P: "𝑃", Q: "𝑄", R: "𝑅", S: "𝑆", T: "𝑇", U: "𝑈", V: "𝑉", W: "𝑊", X: "𝑋", Y: "𝑌", Z: "𝑍"
    }
  },
  {
    name: "Script (دست‌نویس)",
    map: {
      a: "𝒶", b: "𝒷", c: "𝒸", d: "𝒹", e: "ℯ", f: "𝒻", g: "ℊ", h: "𝒽", i: "𝒾", j: "𝒿", k: "𝓀", l: "𝓁", m: "𝓂", n: "𝓃", o: "ℴ", p: "𝓅", q: "𝓆", r: "𝓇", s: "𝓈", t: "𝓉", u: "𝓊", v: "𝓋", w: "𝓌", x: "𝓍", y: "𝓎", z: "𝓏",
      A: "𝒜", B: "ℬ", C: "𝒞", D: "𝒟", E: "ℰ", F: "ℱ", G: "𝒢", H: "ℋ", I: "ℐ", J: "𝒥", K: "𝒦", L: "ℒ", M: "ℳ", N: "𝒩", O: "𝒪", P: "𝒫", Q: "𝒬", R: "ℛ", S: "𝒮", T: "𝒯", U: "𝒰", V: "𝒱", W: "𝒲", X: "𝒳", Y: "𝒴", Z: "𝒵"
    }
  },
  {
    name: "Monospace (ماشینی)",
    map: {
      a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
      A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
    }
  }
];

function convertText(text: string, map: Record<string, string>) {
  return text.split("").map(char => map[char] || char).join("");
}

export default function FancyText() {
  const [text, setText] = useState("");

  // استایل‌های مخصوص فونت فارسی (برای پیش‌نمایش)
  const persianStyles = [
    { name: "نستعلیق (کلاسیک)", className: "font-serif" }, // از فونت پیش‌فرض سریف استفاده می‌کند
    { name: "ضخیم (بولد)", className: "font-black" },
    { name: "ساده (مدرن)", className: "font-sans" },
    { name: "کج (ایتالیک)", className: "italic" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm text-slate-500 dark:text-slate-300">
          متن خود را وارد کنید (فارسی یا انگلیسی)
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="متن خود را اینجا بنویسید..."
          className="w-full resize-none rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-[var(--text-main)] outline-none focus:border-violet-400"
          rows={3}
        />
      </div>

      {text && (
        <div className="space-y-8">
          {/* بخش انگلیسی */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[var(--text-main)]">استایل‌های انگلیسی</h3>
            <div className="space-y-3">
              {fontMaps.map((font) => {
                const converted = convertText(text, font.map);
                return (
                  <div key={font.name} className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="overflow-hidden">
                      <p className="text-xs text-slate-500 mb-1">{font.name}</p>
                      <p dir="ltr" className="truncate text-lg text-[var(--text-main)]">{converted}</p>
                    </div>
                    <CopyButton text={converted} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* بخش فارسی */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[var(--text-main)]">پیش‌نمایش استایل‌های فارسی</h3>
            <div className="space-y-3">
              {persianStyles.map((style) => (
                <div key={style.name} className="flex flex-col gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="overflow-hidden">
                    <p className="text-xs text-slate-500 mb-1">{style.name}</p>
                    <p className={`truncate text-lg text-[var(--text-main)] ${style.className}`}>{text}</p>
                  </div>
                  {/* برای فارسی فقط کپی متن ساده رو می‌ذاریم چون استایل منتقل نمیشه */}
                  <CopyButton text={text} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
