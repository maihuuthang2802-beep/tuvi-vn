/**
 * Lớp trừu tượng payment provider — hiện chỉ có mock, chuẩn hóa để cắm PayOS/Stripe sau
 * mà không phải đổi route /api/checkout.
 */

export interface CheckoutInput {
  plan: 'starter' | 'pro';
  planName: string;
  price: number;
  service?: string;
  returnTo: string;
}

export interface CheckoutResult {
  checkoutUrl: string;
  provider: string;
}

export interface PaymentProvider {
  name: string;
  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
}

const mockProvider: PaymentProvider = {
  name: 'mock',
  async createCheckout({ returnTo, plan, service }) {
    const checkoutUrl = `${returnTo}?upgraded=1&plan=${plan}${service ? `&service=${encodeURIComponent(service)}` : ''}`;
    return { checkoutUrl, provider: 'mock' };
  },
};

/**
 * TODO khi gắn provider thật:
 * - payos: gọi PayOS createPaymentLink API, trả checkoutUrl thật, xác minh qua webhook trước khi set upgraded=1.
 * - stripe: tạo Stripe Checkout Session, trả session.url, xác minh qua webhook stripe.checkout.session.completed.
 * Cả hai đều phải set unlocked qua DB (User.plan) sau khi webhook xác nhận, không chỉ qua query param như mock hiện tại.
 */
export function getPaymentProvider(): PaymentProvider {
  const key = process.env.PAYMENT_PROVIDER || 'mock';
  if (key === 'mock') return mockProvider;
  // Chưa có provider thật — fallback an toàn về mock thay vì crash.
  return mockProvider;
}
