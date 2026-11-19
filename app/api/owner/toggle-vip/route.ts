import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getAdminId } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { isRecord } from "../../../../lib/validation";

export async function POST(req: Request) {
  try {
    if (!(await getAdminId())) return NextResponse.json({ error: "دسترسی غیرمجاز است." }, { status: 403 });
    const input: unknown = await req.json().catch(() => null);
    if (!isRecord(input) || typeof input.userId !== "string" ||
        !input.userId || input.userId.length > 100 || typeof input.isVip !== "boolean") {
      return NextResponse.json({ error: "درخواست نامعتبر است." }, { status: 400 });
    }
    const user = await prisma.user.update({
      where: { id: input.userId }, data: { isVip: input.isVip }, select: { isVip: true },
    });
    return NextResponse.json({ isVip: user.isVip });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "کاربر یافت نشد." }, { status: 404 });
    }
    console.error("VIP update failed", error);
    return NextResponse.json({ error: "خطای سرور." }, { status: 500 });
  }
}
