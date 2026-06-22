import { NextResponse } from 'next/server';

const plans = {
  starter: { name: 'Gói Khởi Đầu', price: 99000 },
  pro: { name: 'Gói Chuyên Sâu', price: 299000 },
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const plan = body.plan === 'pro' ? plans.pro : plans.starter;

  return NextResponse.json({
    checkoutUrl: `/checkout/mock?plan=${encodeURIComponent(plan.name)}&amount=${plan.price}`,
    plan,
    provider: process.env.PAYMENT_PROVIDER || 'mock',
  });
}
