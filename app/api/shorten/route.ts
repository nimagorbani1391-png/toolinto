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

  let userId: string | null = null;

  try {
    const token = cookies().get('auth_token')?.value;
    if (token) {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      userId = payload.userId as string;
    }
  } catch (e) {
    console.error("JWT Verification Error:", e);
  }

  for (let attempt = 0; attempt < 5; attempt++) {
    const shortCode = generateShortCode();
    try {
      const link = await prisma.link.create({
        data: { originalUrl, shortCode, userId: userId || undefined },
      });
      return NextResponse.json(link, { status: 201 });
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
      
      // این خط رو اضافه کردم تا خطای واقعی رو توی صفحه ببینی
      console.error("Shortener Error:", e);
      return NextResponse.json({ error: `خطای دیتابیس: ${e.message}` }, { status: 500 });
    }
  }
  return fail("ساخت لینک ناموفق بود.", 500);
}
