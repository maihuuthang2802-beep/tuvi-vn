'use client';

import Link from 'next/link';
import { useMemo } from 'react';

const GREETINGS = ['Hôm nay vận trình của bạn thế nào?', 'Hồi âm từ vũ trụ đang chờ bạn.', 'Khám phá lá số tương lai của bạn.', 'Lắng nghe thông điệp từ các vì sao.', 'Mở cánh cửa tri thức cổ xưa.'];

const services = [
  { title: 'Tử Vi', subtitle: 'Lập lá số · cung mệnh · đại hạn', href: '/tu-vi', icon: '◉' },
  { title: 'Kinh Dịch', subtitle: 'Lục Hào · Thiên Ý · Mai Hoa', href: '/kinh-dich', icon: '☯' },
  { title: 'Xin Xăm', subtitle: 'Cầu tài · tình duyên · gia đạo', href: '/xin-xam', icon: '≡' },
  { title: 'Tarot', subtitle: '78 lá Rider-Waite · trải bài', href: '/tarot', icon: '★' },
];

export default function Home() {
  const greeting = useMemo(() => GREETINGS[new Date().getHours() % GREETINGS.length], []);

  return (
    <main className="min-h-screen bg-bg text-text p-5 flex flex-col gap-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gold/40 text-gold text-lg">◯</span>
          <span className="text-gold font-bold tracking-[0.3em] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>TuVi.vn</span>
        </div>
        <div className="flex gap-3">
          <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted text-sm">◎</button>
          <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted text-sm">◐</button>
        </div>
      </div>

      {/* hero */}
      <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold-soft to-surface p-5 space-y-2">
        <p className="text-xs text-gold/70 tracking-[0.25em] uppercase">✨ {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="text-2xl font-semibold leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>{greeting}</p>
        <Link href="/tu-vi" className="inline-flex items-center gap-2 text-sm text-gold border-b border-gold/50 pb-0.5 w-fit">Xem nhanh Tử Vi hôm nay →</Link>
      </div>

      {/* grid 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        {services.map(s => (
          <Link key={s.href} href={s.href} className="rounded-2xl border border-border bg-surface/30 p-4 hover:border-gold/50 hover:bg-gold-soft transition flex flex-col gap-2">
            <span className="text-2xl text-gold">{s.icon}</span>
            <div>
              <p className="font-semibold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</p>
              <p className="text-xs text-muted">{s.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}