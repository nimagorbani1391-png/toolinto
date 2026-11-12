export type Tool = {
  slug: string;
  title: string;
  description: string;
  icon: "Link" | "QrCode" | "Calendar" | "Lock";
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
    slug: "date-converter",
    title: "تبدیل تاریخ",
    description: "تاریخ شمسی را به میلادی و میلادی را به شمسی تبدیل کن.",
    icon: "Calendar",
    href: "/tools/date-converter",
    keywords: ["تاریخ", "شمسی", "میلادی", "جلالی", "تقویم", "date"],
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
