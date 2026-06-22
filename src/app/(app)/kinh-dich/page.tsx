'use client';

import ModuleHero from '@/components/shared/ModuleHero';
import { useState } from 'react';

const methods = [
  { key: 'luchao', icon: '☰', title: 'Lục Hào', desc: 'Gieo tiền đồng 6 lần' },
  { key: 'thieny', icon: '☷', title: 'Thiên Ý', desc: 'Tâm niệm 1 vật' },
  { key: 'maihoa', icon: '✿', title: 'Mai Hoa', desc: 'Theo ngày giờ âm lịch' },
];

export default function KinhDichPage() {
  const [active, setActive] = useState('luchao');
  const [step, setStep] = useState(1);
  const [lines, setLines] = useState<string[]>([]);
  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☰" title="Kinh Dịch" subtitle="64 quẻ · Lục Hào · Thiên Ý · Mai Hoa" accent="var(--color-kinh)" />
      <section className="scrollbar-none mt-5 flex gap-3 overflow-x-auto px-5 md:mx-auto md:max-w-[1100px] md:px-0">
        {methods.map((method) => (
          <button key={method.key} onClick={() => setActive(method.key)} className={`min-w-[140px] rounded-[20px] border bg-surface p-[14px] text-center ${active === method.key ? 'border-[var(--color-kinh)] shadow-[0_0_24px_rgba(74,155,111,0.25)]' : 'border-border'}`}>
            <div className="text-[28px] text-kinh">{method.icon}</div>
            <div className="mt-2 font-[var(--font-display)] text-[20px] font-semibold text-text">{method.title}</div>
            <div className="mt-1 text-[12px] text-text-2">{method.desc}</div>
          </button>
        ))}
      </section>
      <section className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 md:mx-auto md:max-w-[1100px]">
        <div className="flex justify-center gap-3">
          {[1,2,3].map((n) => <div key={n} className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-surface-2 text-[18px] text-gold" style={{ animation: active === 'luchao' ? 'coinFlip .4s ease' : undefined }}>◎</div>)}
        </div>
        <button onClick={() => { const line = Math.random() > 0.5 ? '——' : '— —'; setLines((prev) => prev.length >= 6 ? [line] : [line, ...prev]); setStep((s) => s >= 6 ? 1 : s + 1); }} className="mt-5 w-full rounded-[14px] bg-kinh px-4 py-4 text-[15px] font-bold text-bg">Gieo lần {step}/6</button>
        <div className="mt-5 flex flex-col items-center gap-2">
          {lines.length ? lines.map((line, i) => <div key={i} className="text-[28px] text-kinh">{line}</div>) : Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-3 w-24 border-b border-dashed border-border" />)}
        </div>
      </section>
    </main>
  );
}