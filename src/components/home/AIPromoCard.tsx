import Link from 'next/link';

export default function AIPromoCard() {
  return (
    <section className="relative mx-5 mt-5 overflow-hidden rounded-[20px] border px-5 py-5 md:mx-auto md:max-w-[1100px]" style={{ background: 'linear-gradient(135deg,#1E1840 0%, #2A1E50 100%)', borderColor: 'rgba(44,195,184,0.30)' }}>
      <span className="absolute -right-5 -top-5 text-[120px] opacity-[0.05] text-ai">✦</span>
      <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-ai">✦ AI LUẬN GIẢI</div>
      <div className="mt-2 font-[var(--font-display)] text-[22px] font-semibold text-text">Luận giải sâu với AI</div>
      <div className="mt-2 text-[13px] text-text-2">Nhập lá số, nhận phân tích chi tiết từng cung, đại hạn và tứ hóa.</div>
      <Link href="/goi-dich-vu" className="mt-4 inline-flex rounded-[20px] bg-ai px-5 py-[9px] text-[13px] font-bold text-bg">Thử ngay miễn phí →</Link>
    </section>
  );
}