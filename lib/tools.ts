export type Tool = {
  slug: string;
  title: string;
  description: string;
  icon: "Link" | "QrCode" | "Calendar" | "Lock" | "Cake" | "Image" | "FileText" | "RefreshCw" | "FileImage" | "Palette" | "CalendarDays" | "Activity" | "Dices" | "Timer" | "Volume2";
  href: string;
  keywords: string[];
};

export const tools: Tool[] = [
  {
    slug: "url-shortener",
    title: "کوتاه‌کننده لینک",
    description: "لینک‌های بلند را به یک آدرس کوتاه و قابل اشتراک تبدیل کن.",
    icon: "Link",
    href: "/tools/url-shortener",
    keywords: ["url", "shortener", "لینک", "کوتاه", "آدرس", "short"],
  },
  {
    slug: "qr-generator",
    title: "سازنده QR کد",
    description: "از هر متن یا لینک، QR کد بساز و به‌صورت تصویر دانلود کن.",
    icon: "QrCode",
    href: "/tools/qr-generator",
    keywords: ["qr", "کیو آر", "کد", "بارکد", "qrcode"],
  },
  {
    slug: "image-compressor",
    title: "فشرده‌ساز عکس",
    description: "حجم عکس‌های خود را بدون افت کیفیت به شدت کاهش دهید.",
    icon: "Image",
    href: "/tools/image-compressor",
    keywords: ["فشرده سازی", "عکس", "تصویر", "حجم", "compress", "image", "کاهش حجم"],
  },
  {
    slug: "image-converter",
    title: "تبدیل فرمت عکس",
    description: "عکس‌های خود را بین فرمت‌های PNG، JPG و WebP تبدیل کنید.",
    icon: "RefreshCw",
    href: "/tools/image-converter",
    keywords: ["تبدیل", "فرمت", "عکس", "تصویر", "png", "jpg", "webp", "converter"],
  },
  {
    slug: "image-to-pdf",
    title: "تبدیل عکس به PDF",
    description: "چند عکس را انتخاب کنید و آن‌ها را در یک فایل PDF ذخیره کنید.",
    icon: "FileImage",
    href: "/tools/image-to-pdf",
    keywords: ["عکس به pdf", "تبدیل به پی دی اف", "تصویر", "سند", "image to pdf"],
  },
  {
    slug: "color-picker",
    title: "انتخاب رنگ از عکس",
    description: "کد رنگ (HEX) هر نقطه از عکس خود را استخراج کنید.",
    icon: "Palette",
    href: "/tools/color-picker",
    keywords: ["رنگ", "پالت", "کد رنگ", "hex", "rgb", "color picker", "استخراج رنگ"],
  },
  {
    slug: "date-converter",
    title: "تبدیل تاریخ",
    description: "تاریخ شمسی را به میلادی و میلادی را به شمسی تبدیل کن.",
    icon: "Calendar",
    href: "/tools/date-converter",
    keywords: ["تاریخ", "شمسی", "میلادی", "جلالی", "تقویم", "date"],
  },
  {
    slug: "date-difference",
    title: "محاسبه اختلاف دو تاریخ",
    description: "فاصله بین دو تاریخ شمسی یا میلادی را به روز، ماه و سال محاسبه کنید.",
    icon: "CalendarDays",
    href: "/tools/date-difference",
    keywords: ["اختلاف تاریخ", "فاصله دو تاریخ", "محاسبه روز", "date difference"],
  },
  {
    slug: "age-calculator",
    title: "محاسبه‌گر سن",
    description: "سن دقیق خود را بر اساس تاریخ شمسی یا میلادی محاسبه کنید.",
    icon: "Cake",
    href: "/tools/age-calculator",
    keywords: ["سن", "تولد", "محاسبه", "age", "calculator", "تاریخ تولد"],
  },
  {
    slug: "bmi-calculator",
    title: "محاسبه شاخص توده بدنی (BMI)",
    description: "تناسب وزن و قد خود را با محاسبه شاخص BMI بسنجید.",
    icon: "Activity",
    href: "/tools/bmi-calculator",
    keywords: ["bmi", "شاخص توده بدنی", "وزن", "قد", "تناسب اندام", "سلامتی"],
  },
  {
    slug: "random-number",
    title: "تولید عدد تصادفی",
    description: "یک یا چند عدد تصادفی در بازه دلخواه تولید کنید.",
    icon: "Dices",
    href: "/tools/random-number",
    keywords: ["عدد تصادفی", "تاس", "قرعه کشی", "random number", "شانس"],
  },
  {
    slug: "stopwatch",
    title: "کرنومتر و تایمر آنلاین",
    description: "زمان خود را دقیق اندازه‌گیری کنید یا یک تایمر معکوس بسازید.",
    icon: "Timer",
    href: "/tools/stopwatch",
    keywords: ["کرنومتر", "تایمر", "زمان", "stopwatch", "timer", "شمارش معکوس"],
  },
  {
    slug: "text-to-speech",
    title: "تبدیل متن به گفتار",
    description: "متن خود را بنویسید و آن را با صدای طبیعی مرورگر بشنوید.",
    icon: "Volume2",
    href: "/tools/text-to-speech",
    keywords: ["تبدیل متن به صدا", "گفتار", "خواندن متن", "text to speech", "tts"],
  },
  {
    slug: "word-counter",
    title: "شمارشگر کلمات",
    description: "تعداد کلمات، کاراکترها و زمان خواندن متن خود را محاسبه کنید.",
    icon: "FileText",
    href: "/tools/word-counter",
    keywords: ["شمارش", "کلمه", "کاراکتر", "متن", "word", "count", "تعداد"],
  },
  {
    slug: "password-generator",
    title: "سازنده رمز عبور",
    description: "رمز عبور قوی و تصادفی بساز و با یک کلیک کپی کن.",
    icon: "Lock",
    href: "/tools/password-generator",
    keywords: ["password", "رمز", "پسورد", "امنیت", "گذرواژه"],
  },
];

export function getTool(slug: string): Tool {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Tool not found: ${slug}`);
  return tool;
}
