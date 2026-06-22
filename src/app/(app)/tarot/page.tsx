'use client';

import Link from 'next/link';
import ModuleHero from '@/components/shared/ModuleHero';
import { useState } from 'react';

export default function TarotPage() {
  const [spread, setSpread] = useState<'1' | '3'>('1');
  const [revealed, setRevealed] = useState(false);
  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="✦" title="Bài Tarot" subtitle="78 lá chuẩn Rider-Waite · AI luận giải" accent="var(--color-tarot)" />
      <section className="mx-5 mt-5 grid gap-3 md:mx-auto md:max-w-[1100px] md:grid-cols-2">
        <button onClick={() => setSpread('1')} className={`rounded-[20px] border p-5 text-left ${spread === '1' ? 'border-tarot shadow-[0_0_24px_rgba(123,95,221,0.25)]' : 'border-border bg-surface'}`}><div className="text-[12px] uppercase tracking-[2px] text-tarot">✦</div><div className="mt-2 font-[var(--font-display)] text-[22px] font-semibold text-text">1 Lá</div><div className="text-[13px] text-text-2">Câu hỏi nhanh</div></button>
        <button onClick={() => setSpread('3')} className={`rounded-[20px] border p-5 text-left ${spread === '3' ? 'border-tarot shadow-[0_0_24px_rgba(123,95,221,0.25)]' : 'border-border bg-surface'}`}><div className="text-[12px] uppercase tracking-[2px] text-tarot">✦✦✦</div><div className="mt-2 font-[var(--font-display)] text-[22px] font-semibold text-text">3 Lá</div><div className="text-[13px] text-text-2">Quá khứ · Hiện tại · Tương lai</div></button>
      </section>
      <form action="/ket-qua/tarot" className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 md:mx-auto md:max-w-[1100px]">
        <input type="hidden" name="spread" value={spread} />
        <label className="text-[11px] font-bold uppercase tracking-[1px] text-tarot">CÂU HỎI CỦA BẠN</label>
        <textarea name="question" className="mt-2 min-h-20 w-full rounded-[12px] border border-border bg-surface-2 px-[14px] py-3 text-[14px] text-text outline-none" placeholder="Nhập câu hỏi hoặc để trống để rút ngẫu nhiên..." />
        <div className="mt-2 text-[12px] text-text-3">Để trống = rút bài ngẫu nhiên</div>
        <div className="mt-6 flex items-center justify-center gap-3">
          {Array.from({ length: spread === '1' ? 1 : 3 }).map((_, i) => <div key={i} className="flex h-[170px] w-[100px] items-center justify-center rounded-[10px] border border-border bg-[linear-gradient(135deg,#39295F,#221E3E)] text-center text-[12px] font-semibold text-white/80" style={{ transform: revealed ? 'rotateY(180deg)' : `translateX(${i * -8}px)` }}>{revealed ? (spread === '1' ? '1 lá\nXuôi / Ngược' : i === 0 ? 'Quá khứ' : i === 1 ? 'Hiện tại' : 'Hướng đi') : '✦'}</div>)}
        </div>
        <button type="button" onClick={() => setRevealed(true)} className="mt-5 w-full rounded-[14px] bg-tarot px-4 py-4 text-[15px] font-bold text-white">Rút thử bộ {spread === '1' ? '1 lá' : '3 lá'}</button>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <button className="rounded-[14px] bg-tarot px-4 py-4 text-[15px] font-bold text-white">Xem trải bài →</button>
          <Link href="/goi-dich-vu" className="rounded-[14px] border border-[rgba(44,195,184,0.3)] bg-ai-bg px-4 py-4 text-center text-[15px] font-semibold text-ai">Mở AI luận giải Tarot</Link>
        </div>
      </form>
    </main>
  );
}