import { NextResponse } from "next/server";
import { getSessionUserId } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "ابتدا وارد حساب شوید." }, { status: 401 });
    const links = await prisma.link.findMany({
      where: { userId }, orderBy: { createdAt: "desc" },
      select: { id: true, originalUrl: true, shortCode: true, clicks: true, createdAt: true },
    });
    return NextResponse.json({ links }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Link history lookup failed", error);
    return NextResponse.json({ error: "دریافت لینک‌ها ناموفق بود." }, { status: 500 });
  }
}
