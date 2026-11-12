import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { generateShortCode } from "../../../lib/shortcode";

export const runtime = "nodejs";

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
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("درخواست نامعتبر است.", 400);
  }

  const raw =
    typeof body === "object" && body !== null
      ? (body as { url?: unknown }).url
      : undefined;

  if (typeof raw !== "string") {
    return fail("لینک را وارد کنید.", 400);
  }

  const originalUrl = normalizeUrl(raw);
  if (!originalUrl) {
    return fail("لینک معتبر نیست. مثال: https://example.com", 400);
  }

  for (let attempt = 0; attempt < 5; attempt++) {
    const shortCode = generateShortCode();
    try {
      const link = await prisma.link.create({
        data: { originalUrl, shortCode },
      });
      return NextResponse.json(
        {
          id: link.id,
          shortCode: link.shortCode,
          originalUrl: link.originalUrl,
        },
        { status: 201 }
      );
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        continue;
      }
      console.error("shorten error:", e);
      return fail("خطای سرور. بعداً دوباره تلاش کنید.", 500);
    }
  }

  return fail("ساخت لینک ناموفق بود. دوباره تلاش کنید.", 500);
}
