import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  if (!/^[A-Za-z0-9]{4,32}$/.test(code)) {
    return NextResponse.redirect(new URL("/", _req.url));
  }

  const link = await prisma.link.findUnique({ where: { shortCode: code } });
  if (!link) {
    return NextResponse.redirect(new URL("/", _req.url));
  }

  return NextResponse.redirect(link.originalUrl, 302);
}
