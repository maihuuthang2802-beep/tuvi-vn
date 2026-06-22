import Link from 'next/link';
import ModuleHero from '@/components/shared/ModuleHero';

const plans = [
  {
    name: 'Miễn phí',
    price: '0đ',
    desc: 'Xem kết quả nền, tóm lược ngắn, chưa mở AI chuyên sâu.',
    features: ['Kết quả cơ bản 4 bộ môn', 'Tóm lược nhanh', 'Không lưu lịch sử premium'],
    cta: 'Dùng miễn phí',
    href: '/',
    accent: 'border-border bg-surface',
  },
  {
    name: 'AI Chuyên Sâu',
    price: '99.000đ',
    desc: 'Luận giải theo từng cung, quẻ, lá bài, có CTA mở rộng nâng cấp.',
    features: ['AI phân tích sâu', 'Gợi ý hành động', 'Ưu tiên kết quả premium'],
    cta: 'Mở paywall',
    href: '/goi-dich-vu?plan=starter',
    accent: 'border-[rgba(44,195,184,0.3)] bg-ai-bg',
  },
  {
    name: 'AI Trọn Gói',
    price: '299.000đ',
    desc: 'Dành cho người dùng xem nhiều bộ môn, ưu tiên lịch sử và gói mở rộng.',
    features: ['Toàn bộ AI flow', 'Ưu tiên hỗ trợ', 'Sẵn cho subscription thật sau'],
    cta: 'Chọn gói Pro',
    href: '/goi-dich-vu?plan=pro',
    accent: 'border-gold/40 bg-[rgba(201,169,110,0.10)]',
  },
];

export default function GoiDichVuPage() {
  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="✦" title="Gói Dịch Vụ AI" subtitle="Paywall rõ · CTA rõ · Mở khóa luận giải chuyên sâu" accent="var(--color-ai)" />
      <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className={`rounded-[24px] border p-5 ${plan.accent}`}>
            <div className="text-[11px] uppercase tracking-[2px] text-ai">TuVi.vn AI</div>
            <h2 className="mt-3 font-[var(--font-display)] text-[28px] font-bold text-text">{plan.name}</h2>
            <div className="mt-2 text-[30px] font-bold text-gold">{plan.price}</div>
            <p className="mt-3 text-[14px] text-text-2">{plan.desc}</p>
            <ul className="mt-4 space-y-2 text-[14px] text-text">
              {plan.features.map((feature) => <li key={feature}>• {feature}</li>)}
            </ul>
            <Link href={plan.href} className="mt-5 block rounded-[14px] bg-gradient-to-br from-ai to-[#6BE0D7] px-4 py-3 text-center text-[14px] font-bold text-bg">
              {plan.cta}
            </Link>
          </article>
        ))}
      </section>
      <section className="mx-5 mt-5 rounded-[24px] border border-border bg-surface p-5 md:mx-auto md:max-w-[1100px]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[2px] text-gold">AI flow</div>
            <h2 className="mt-2 font-[var(--font-display)] text-[26px] font-bold text-text">Mỗi kết quả đều có lối vào AI riêng</h2>
            <p className="mt-2 max-w-[700px] text-[14px] text-text-2">Kết quả miễn phí cho xem nhanh. Từ từng trang kết quả, người dùng bấm CTA để mở paywall rồi đi tiếp sang AI luận giải chuyên sâu.</p>
          </div>
          <Link href="/tu-vi" className="rounded-[14px] border border-gold/30 bg-tuvi-bg px-4 py-3 text-center text-[14px] font-semibold text-gold">Bắt đầu từ Tử Vi</Link>
        </div>
      </section>
    </main>
  );
}
