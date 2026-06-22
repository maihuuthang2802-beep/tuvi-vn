'use client';

import { useState } from 'react';
import Link from 'next/link';

const services = [
  { title: 'Tử Vi', subtitle: 'Lập lá số và luận giải cung mệnh, đại hạn, tứ hóa', href: '/tu-vi' },
  { title: 'Kinh Dịch', subtitle: 'Gieo quẻ Lục Hào, Thiên Ý, Mai Hoa', href: '/kinh-dich' },
  { title: 'Xin Xăm', subtitle: 'Xăm Thánh Mẫu - cầu tài, tình duyên, gia đạo', href: '/xin-xam' },
  { title: 'Tarot', subtitle: 'Trải bài 78 lá chuẩn Rider-Waite', href: '/tarot' },
];

export default function Home() {
  const [email, setEmail] = useState('');

  return (
    <main className="min-h-screen bg-bg text-text" style={{ fontFamily: 'var(--font-body)' }}>
      <section className="mx-auto max-w-7xl px-6 py-20 flex flex-col items-center text-center gap-10">
        <p className="inline-flex rounded-full border border-gold/30 bg-gold-soft px-5 py-2 text-xs text-gold tracking-[0.4em] uppercase" style={{ fontFamily: 'var(--font-heading)' }}>TuVi.vn</p>
        <h1 className="max-w-4xl text-4xl md:text-7xl font-bold leading-[1.02] tracking-[-0.04em]" style={{ fontFamily: 'var(--font-heading)' }}>
          Nền tảng huyền học Việt hóa: Tử Vi, Kinh Dịch, Tarot, Xin Xăm.
        </h1>
        <p className="max-w-2xl text-xl text-muted leading-relaxed">
          Dữ liệu tỉnh thành và kinh độ Việt Nam, engine Tử Vi chuẩn, 64 quẻ Kinh Dịch, bộ bài Tarot 78 lá — tối ưu di động và sẵn sàng mở rộng.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-4xl">
          {services.map(s => (
            <Link key={s.href} href={s.href} className="rounded-2xl border border-border bg-surface/40 p-5 hover:border-gold/60 hover:bg-gold-soft transition text-left">
              <h2 className="text-gold font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h2>
              <p className="mt-2 text-sm text-muted">{s.subtitle}</p>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex gap-2 max-w-sm w-full">
          <input value={email} onChange={e => setEmail(e.target.value)} className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none text-sm" placeholder="Email nhận thông báo sản phẩm" />
          <button className="rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-bg">Nhận tin</button>
        </div>
      </section>
    </main>
  );
}