import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { generateShortCode } from "../../../lib/shortcode";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const runtime = "nodejs";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'toolinto-super-secret-key-123');

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function normalizeUrl(input: string): string | null {
  let value = input.trim();
  if (!value || value.length > 2048) return null;
  if (!/^https?:\/\//i.test(value)) {
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return null;
    value = `https://${value}`;
  }
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (url.username || url.password) return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch { return null; }
}

export async function POST(req: Request) {
  let body: any;
  try { body = await req.json(); } catch { return fail("درخواست نامعتبر است.", 400); }

  const originalUrl = normalizeUrl(body.url);
  if (!originalUrl) return fail("لینک معتبر نیست. مثال: https://example.com", 400);

  const customSlug = body.customSlug;
  let userId: string | null = null;

  // گرفتن کاربر از کوکی (اصلاح شده برای Next.js 14)
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (token) {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userId = payload.userId as string;
    }
  } catch (e) {
    console.error("JWT Error:", e);
  }

  // اگر لینک اختصاصی درخواست شده بود
  if (customSlug) {
    if (!userId) return fail("برای لینک اختصاصی باید وارد شوید.", 401);
    
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.isVip) return fail("این قابلیت ویژه کاربران VIP است.", 403);

    if (!/^[A-Za-z0-9]{4,32}$/.test(customSlug)) {
      return fail("نام انتخابی باید بین ۴ تا ۳۲ کاراکتر و فقط شامل حروف انگلیسی و اعداد باشد.", 400);
    }

    try {
      const exists = await prisma.link.findUnique({ where: { shortCode: customSlug } });
      if (exists) return fail("این اسم قبلاً استفاده شده است. اسم دیگری انتخاب کنید.", 400);

      const link = await prisma.link.create({
        data: { originalUrl, shortCode: customSlug, userId },
      });
      return NextResponse.json(link, { status: 201 });
    } catch (e) {
      console.error("Custom Slug Error:", e);
      return fail("خطا در ساخت لینک اختصاصی.", 500);
    }
  }

  // ساخت لینک تصادفی (UTM یا عادی)
  for (let attempt = 0; attempt < 5; attempt++) {
    const shortCode = generateShortCode();
    try {
      const link = await prisma.link.create({
        data: { originalUrl, shortCode, userId },
      });
      return NextResponse.json(link, { status: 201 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
      console.error("Random Slug Error:", e);
      return fail("خطا سرور در ساخت لینک.", 500);
    }
  }
  return fail("ساخت لینک ناموفق بود.", 500);
}
