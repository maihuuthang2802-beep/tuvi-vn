import { NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/payment/provider';

const plans = {
  starter: { key: 'starter' as const, name: 'Gói Khởi Đầu', price: 99000 },
  pro: { key: 'pro' as const, name: 'Gói Chuyên Sâu', price: 299000 },
};

async function readBody(request: Request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) return request.json().catch(() => ({}));
  if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
    const formData = await request.formData().catch(() => null);
    return formData ? Object.fromEntries(formData.entries()) : {};
  }
  return {};
}

export async function POST(request: Request) {
  const body = await readBody(request);
  const plan = body.plan === 'pro' ? plans.pro : plans.starter;
  const returnTo = typeof body.returnTo === 'string' && body.returnTo.startsWith('/') ? body.returnTo : '/goi-dich-vu';
  const service = typeof body.service === 'string' ? body.service : undefined;

  const provider = getPaymentProvider();
  const { checkoutUrl } = await provider.createCheckout({ plan: plan.key, planName: plan.name, price: plan.price, service, returnTo });

  if ((request.headers.get('accept') || '').includes('text/html')) {
    return NextResponse.redirect(new URL(checkoutUrl, request.url), { status: 303 });
  }

  return NextResponse.json({ checkoutUrl, plan, provider: provider.name });
}
