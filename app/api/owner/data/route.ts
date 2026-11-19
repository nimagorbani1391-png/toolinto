import { NextResponse } from "next/server";
import { getAdminId } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  try {
    if (!(await getAdminId())) return NextResponse.json({ error: "دسترسی غیرمجاز است." }, { status: 403 });
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true, isVip: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ users }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Admin user lookup failed", error);
    return NextResponse.json({ error: "خطای سرور." }, { status: 500 });
  }
}
