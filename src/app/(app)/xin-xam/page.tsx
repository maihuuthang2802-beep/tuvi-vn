'use client';

import Link from 'next/link';
import ModuleHero from '@/components/shared/ModuleHero';
import { useState } from 'react';

const themes = ['Tài Lộc', 'Tình Duyên', 'Gia Đạo', 'Sức Khỏe'];

export default function XinXamPage() {
  const [active, setActive] = useState(themes[0]);
  const [drawn, setDrawn] = useState(false);
  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="❀" title="Xin Xăm Thánh Mẫu" subtitle="Cầu tài · Tình duyên · Gia đạo" accent="var(--color-xam)" />
      <section className="mx-5 mt-5 grid grid-cols-2 gap-3 md:mx-auto md:max-w-[1100px] md:max-w-[480px]">
        {themes.map((theme) => <button key={theme} onClick={() => setActive(theme)} className={`rounded-[20px] border p-5 text-center ${active === theme ? 'border-xam bg-xam-bg text-xam' : 'border-border bg-surface text-text-2'}`}><div className="text-[20px]">✦</div><div className="mt-2 text-[14px] font-semibold">{theme}</div></button>)}
      </section>
      <form action="/ket-qua/xin-xam" className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 text-center md:mx-auto md:max-w-[480px]">
        <input type="hidden" name="question" value={active} />
        <div className="mx-auto flex h-40 w-28 items-center justify-center rounded-[24px] border-2 border-[rgba(194,59,59,0.3)] bg-surface-2 text-[50px] text-xam" style={{ animation: drawn ? 'xamShake .6s ease' : undefined }}>▥</div>
        <p className="mt-4 text-[14px] text-text-2">Chắp tay khấn nguyện, rồi lắc...</p>
        <button type="button" onClick={() => setDrawn(true)} className="mt-4 w-full rounded-[14px] bg-xam px-4 py-4 text-[15px] font-bold text-white">Lắc Xăm 🏮</button>
        {drawn && <div className="mt-5 rounded-[20px] border border-[rgba(201,169,110,0.3)] bg-[linear-gradient(135deg,#C23B3B,#8B1A1A)] p-5 text-left"><div className="font-[var(--font-display)] text-[64px] font-bold text-gold">18</div><div className="font-[var(--font-display)] text-[16px] italic text-white">Hữu duyên thiên lý năng tương ngộ</div><div className="mt-3 text-[14px] text-white/80">Quẻ lành vừa phải. Cầu tài được nhỏ, tình duyên có người trợ, gia đạo cần nhẫn hòa.</div><div className="mt-4 grid gap-3"><button className="rounded-[20px] bg-ai px-5 py-3 text-[13px] font-bold text-bg">Xem quẻ đầy đủ →</button><Link href="/goi-dich-vu" className="rounded-[20px] border border-white/15 bg-white/10 px-5 py-3 text-center text-[13px] font-bold text-white">Mở AI giải xăm chuyên sâu</Link></div></div>}
      </form>
    </main>
  );
}