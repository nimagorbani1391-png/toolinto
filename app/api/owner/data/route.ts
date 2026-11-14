import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, year, password } = await req.json();

    // چک کردن اطلاعات محرمانه مالک
    if (name !== "نیما قربانی" || year !== "1391" || password !== "🦾&💪🏻") {
      return NextResponse.json({ error: 'دسترسی غیرمجاز! اطلاعات اشتباه است.' }, { status: 401 });
    }

    // اگر درست بود، اطلاعات رو بده
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const vips = users.filter((user) => user.isVip);

    return NextResponse.json({ users, vips }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'خطای سرور.' }, { status: 500 });
  }
}
