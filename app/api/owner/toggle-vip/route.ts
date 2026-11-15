import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId, password } = await req.json();

    if (password !== "🦾&💪🏻") {
      return NextResponse.json({ error: 'دسترسی غیرمجاز!' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: 'کاربر یافت نشد' }, { status: 404 });

    // تغییر وضعیت VIP (اگر true بود، false میشه و برعکس)
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isVip: !user.isVip },
    });

    return NextResponse.json({ success: true, isVip: updatedUser.isVip });
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور' }, { status: 500 });
  }
}
