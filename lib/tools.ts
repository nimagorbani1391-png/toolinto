export type Tool = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "social" | "image" | "text" | "datetime" | "utility";
  href: string;
  keywords: string[];
};

export const tools: Tool[] = [
  // --- ابزارهای فعلی ---
  { slug: "url-shortener", title: "کوتاه‌کننده لینک", description: "لینک‌های بلند را کوتاه کن.", icon: "Link", category: "utility", href: "/tools/url-shortener", keywords: ["لینک"] },
  { slug: "qr-generator", title: "سازنده QR کد", description: "QR کد بساز و دانلود کن.", icon: "QrCode", category: "utility", href: "/tools/qr-generator", keywords: ["qr"] },
  { slug: "image-compressor", title: "فشرده‌ساز عکس", description: "کاهش حجم عکس.", icon: "Image", category: "image", href: "/tools/image-compressor", keywords: ["فشرده"] },
  { slug: "image-converter", title: "تبدیل فرمت عکس", description: "PNG, JPG, WebP", icon: "RefreshCw", category: "image", href: "/tools/image-converter", keywords: ["تبدیل"] },
  { slug: "image-to-pdf", title: "تبدیل عکس به PDF", description: "عکس‌ها را PDF کن.", icon: "FileImage", category: "image", href: "/tools/image-to-pdf", keywords: ["pdf"] },
  { slug: "color-picker", title: "انتخاب رنگ", description: "کد رنگ از عکس بگیر.", icon: "Palette", category: "image", href: "/tools/color-picker", keywords: ["رنگ"] },
  { slug: "date-converter", title: "تبدیل تاریخ", description: "شمسی و میلادی", icon: "Calendar", category: "datetime", href: "/tools/date-converter", keywords: ["تاریخ"] },
  { slug: "date-difference", title: "اختلاف دو تاریخ", description: "فاصله بین دو تاریخ", icon: "CalendarDays", category: "datetime", href: "/tools/date-difference", keywords: ["فاصله"] },
  { slug: "age-calculator", title: "محاسبه‌گر سن", description: "سن دقیق شما", icon: "Cake", category: "datetime", href: "/tools/age-calculator", keywords: ["سن"] },
  { slug: "stopwatch", title: "کرنومتر و تایمر", description: "زمان‌سنج آنلاین", icon: "Timer", category: "datetime", href: "/tools/stopwatch", keywords: ["زمان"] },
  { slug: "word-counter", title: "شمارشگر کلمات", description: "تعداد کلمات و حروف", icon: "FileText", category: "text", href: "/tools/word-counter", keywords: ["متن"] },
  { slug: "text-to-speech", title: "متن به گفتار", description: "خواندن متن با صدا", icon: "Volume2", category: "text", href: "/tools/text-to-speech", keywords: ["صدا"] },
  { slug: "password-generator", title: "سازنده رمز عبور", description: "رمز قوی و تصادفی", icon: "Lock", category: "utility", href: "/tools/password-generator", keywords: ["رمز"] },
  { slug: "bmi-calculator", title: "محاسبه BMI", description: "شاخص توده بدنی", icon: "Activity", category: "utility", href: "/tools/bmi-calculator", keywords: ["وزن"] },
  { slug: "random-number", title: "عدد تصادفی", description: "تولید عدد شانسی", icon: "Dices", category: "utility", href: "/tools/random-number", keywords: ["عدد"] },

  // --- ابزارهای جدید (طبق سفارش تو) ---
  { slug: "fancy-text", title: "فونت متن", description: "استایل‌های خاص برای بیو", icon: "Type", category: "social", href: "/tools/fancy-text", keywords: ["بیو", "فونت", "متن فانتزی"] },
  { slug: "image-resizer", title: "تغییر سایز عکس", description: "تنظیم ابعاد عکس", icon: "Maximize", category: "image", href: "/tools/image-resizer", keywords: ["سایز"] },
  { slug: "pomodoro", title: "تایمر پومودورو", description: "تمرکز ۲۵ دقیقه‌ای", icon: "Clock", category: "utility", href: "/tools/pomodoro", keywords: ["تمرکز"] },
  { slug: "typing-test", title: "تست سرعت تایپ", description: "سرعت تایپ خود را بسنجید", icon: "Keyboard", category: "utility", href: "/tools/typing-test", keywords: ["تایپ"] },
  { slug: "wheel-of-fortune", title: "گردونه شانس", description: "انتخاب تصادفی", icon: "RotateCw", category: "social", href: "/tools/wheel-of-fortune", keywords: ["قرعه"] },
  { slug: "currency-price", title: "قیمت ارز و طلا", description: "نرخ لحظه‌ای دلار و...", icon: "DollarSign", category: "utility", href: "/tools/currency-price", keywords: ["دلار", "طلا"] },
  { slug: "persian-calendar", title: "تقویم پارسی", description: "تقویم ماهانه شمسی", icon: "CalendarCheck", category: "datetime", href: "/tools/persian-calendar", keywords: ["تقویم"] },
  { slug: "translator", title: "مترجم آنلاین", description: "ترجمه فارسی و انگلیسی", icon: "Languages", category: "text", href: "/tools/translator", keywords: ["ترجمه"] },
];

export function getTool(slug: string): Tool {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Tool not found: ${slug}`);
  return tool;
}
