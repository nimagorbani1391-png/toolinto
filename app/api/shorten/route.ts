import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getSessionUserId } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import { generateShortCode } from "../../../lib/shortcode";
import { isRecord, normalizeUrl } from "../../../lib/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const input: unknown = await req.json().catch(() => null);
  const originalUrl = isRecord(input) ? normalizeUrl(input.url) : null;
  if (!originalUrl) return NextResponse.json({ error: "لینک معتبر نیست." }, { status: 400 });

  try {
    const userId = await getSessionUserId();
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const link = await prisma.link.create({
          data: { originalUrl, shortCode: generateShortCode(), userId },
          select: { id: true, originalUrl: true, shortCode: true, clicks: true, createdAt: true },
        });
        return NextResponse.json(link, { status: 201 });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") continue;
          if (error.code === "P2003") {
            return NextResponse.json({ error: "حساب یافت نشد. دوباره وارد شوید." }, { status: 401 });
          }
        }
        throw error;
      }
    }
  } catch (error) {
    console.error("Short link creation failed", error);
  }
  return NextResponse.json({ error: "ساخت لینک ناموفق بود." }, { status: 500 });
}
