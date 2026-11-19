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

  const link = await prisma.link.findUnique({
    where: { shortCode: code }, select: { originalUrl: true },
  });
  if (!link) return NextResponse.redirect(new URL("/", _req.url));
  let destination: URL;
  try {
    destination = new URL(link.originalUrl);
    if (!["http:", "https:"].includes(destination.protocol) || destination.username || destination.password) {
      return NextResponse.redirect(new URL("/", _req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/", _req.url));
  }

  try {
    await prisma.link.update({
      where: { shortCode: code }, data: { clicks: { increment: 1 } }, select: { id: true },
    });
  } catch (error) {
    console.error("Click counter update failed", error);
  }
  return NextResponse.redirect(destination, 302);
}
