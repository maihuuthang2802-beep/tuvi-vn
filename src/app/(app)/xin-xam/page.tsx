'use client';

import ModuleHero from '@/components/shared/ModuleHero';
import { useState } from 'react';

const themes = [
  { name: 'Tài Lộc', icon: '💰', desc: 'Vận may kinh tế' },
  { name: 'Tình Duyên', icon: '💕', desc: 'Nhân duyên tình cảm' },
  { name: 'Gia Đạo', icon: '🏠', desc: 'Gia đình hòa thuận' },
  { name: 'Sức Khỏe', icon: '💪', desc: 'Sức khỏe an khang' },
];

export default function XinXamPage() {
  const [active, setActive] = useState(themes[0].name);
  const [shaken, setShaken] = useState(false);
  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="❀" title="Xin Xăm Thánh Mẫu" subtitle="Cầu tài · Tình duyên · Gia đạo" accent="var(--color-xam)" />
      <section className="mx-5 mt-5 grid grid-cols-2 gap-3 md:mx-auto md:max-w-[480px]">
        {themes.map((theme) => <button key={theme.name} type="button" onClick={() => setActive(theme.name)} className={`rounded-[20px] border p-5 text-center transition-all ${active === theme.name ? 'border-xam bg-xam-bg text-xam' : 'border-border bg-surface text-text-2 hover:border-xam/50'}`}><div className="text-[24px]">{theme.icon}</div><div className="mt-2 text-[14px] font-semibold">{theme.name}</div><div className="mt-1 text-[11px] opacity-75">{theme.desc}</div></button>)}
      </section>
      <form action="/ket-qua/xin-xam" method="GET" className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 text-center md:mx-auto md:max-w-[480px]">
        <input type="hidden" name="question" value={active} />
        <div className="mx-auto flex h-40 w-28 items-center justify-center rounded-[24px] border-2 border-[rgba(194,59,59,0.3)] bg-surface-2 text-[50px] text-xam" style={{ animation: shaken ? 'xamShake .6s ease' : undefined }}>▥</div>
        <p className="mt-4 text-[14px] text-text-2">Chắp tay khấn nguyện, rồi lắc...</p>
        <button type="button" onClick={() => setShaken(true)} className="mt-4 w-full rounded-[14px] bg-xam px-4 py-4 text-[15px] font-bold text-white">Lắc Xăm 🏮</button>
        {shaken && (
          <button type="submit" className="mt-4 w-full rounded-[20px] bg-ai px-5 py-3 text-[14px] font-bold text-bg">
            Xem quẻ đầy đủ →
          </button>
        )}
      </form>
    </main>
  );
}
