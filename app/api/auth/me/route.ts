import { NextResponse } from "next/server";
import { getSessionUserId } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    const id = await getSessionUserId();
    const user = id ? await prisma.user.findUnique({
      where: { id }, select: { id: true, name: true, isVip: true },
    }) : null;
    return NextResponse.json({
      user: user ? { name: user.name || "کاربر", userId: user.id, isVip: user.isVip } : null,
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Session lookup failed", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
