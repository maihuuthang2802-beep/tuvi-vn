'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ModuleHero from '@/components/shared/ModuleHero';
import { useMemo, useState } from 'react';

const methods = [
  { key: 'luchao', icon: '☰', title: 'Lục Hào', desc: 'Gieo tiền đồng 6 lần' },
  { key: 'thieny', icon: '☷', title: 'Thiên Ý', desc: 'Tâm niệm 1 vật, nhận quẻ ngay' },
  { key: 'maihoa', icon: '✿', title: 'Mai Hoa', desc: 'Theo giờ, ngày, tháng, năm' },
] as const;

export default function KinhDichPage() {
  const router = useRouter();
  const [active, setActive] = useState<(typeof methods)[number]['key']>('luchao');
  const [step, setStep] = useState(1);
  const [lines, setLines] = useState<string[]>([]);
  const [flipping, setFlipping] = useState(false);
  const [question, setQuestion] = useState('');
  const [objectName, setObjectName] = useState('');
  const [maiHoaTime, setMaiHoaTime] = useState(() => new Date().toISOString().slice(0, 16));
  const [loading, setLoading] = useState(false);
  const activeMethod = methods.find((method) => method.key === active) || methods[0];
  const derivedQuestion = useMemo(() => {
    if (active === 'thieny') return objectName.trim() ? `Thiên Ý: ${objectName.trim()}` : 'Thiên Ý: Xin quẻ theo tâm niệm hiện tại';
    if (active === 'maihoa') return question.trim() ? `Mai Hoa: ${question.trim()} @ ${maiHoaTime}` : `Mai Hoa theo thời điểm ${maiHoaTime}`;
    return question.trim() || `Kinh Dịch - ${activeMethod.title}`;
  }, [active, activeMethod.title, maiHoaTime, objectName, question]);

  const hexagramSeed = useMemo(() => {
    if (lines.length !== 6) return undefined;
    let seed = 0;
    lines.forEach((line, i) => {
      if (line === '——') seed |= (1 << i);
    });
    return seed;
  }, [lines]);

  function resetLucHao(nextMethod: (typeof methods)[number]['key']) {
    setActive(nextMethod);
    setStep(1);
    setLines([]);
    setFlipping(false);
  }

  function castLine() {
    if (flipping || step > 6) return;
    setFlipping(true);
    window.setTimeout(() => {
      const coin1 = Math.floor(Math.random() * 2);
      const coin2 = Math.floor(Math.random() * 2);
      const coin3 = Math.floor(Math.random() * 2);
      const sum = (coin1 + coin2 + coin3 + 2) * 2;
      const newLine = sum % 2 === 0 ? '— —' : '——';
      setLines((prev) => [newLine, ...prev]);
      setStep((prev) => prev + 1);
      setFlipping(false);
    }, 450);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams();
    params.set('method', active);
    params.set('question', derivedQuestion);
    params.set('objectName', objectName);
    params.set('datetime', maiHoaTime);
    if (hexagramSeed !== undefined) {
      params.set('hexagramSeed', String(hexagramSeed));
    }
    router.push(`/ket-qua/kinh-dich?${params.toString()}`);
  }

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☰" title="Kinh Dịch" subtitle="64 quẻ · Lục Hào · Thiên Ý · Mai Hoa" accent="var(--color-kinh)" />
      <section className="scrollbar-none mt-5 flex gap-3 overflow-x-auto px-5 md:mx-auto md:max-w-[1100px] md:px-0">
        {methods.map((method) => (
          <button key={method.key} type="button" onClick={() => resetLucHao(method.key)} className={`min-w-[140px] rounded-[20px] border bg-surface p-[14px] text-center ${active === method.key ? 'border-[var(--color-kinh)] shadow-[0_0_24px_rgba(74,155,111,0.25)]' : 'border-border'}`}>
            <div className="text-[28px] text-kinh">{method.icon}</div>
            <div className="mt-2 font-[var(--font-display)] text-[20px] font-semibold text-text">{method.title}</div>
            <div className="mt-1 text-[12px] text-text-2">{method.desc}</div>
          </button>
        ))}
      </section>
      <form onSubmit={handleSubmit} className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 md:mx-auto md:max-w-[1100px]">
        <div className="rounded-[18px] border border-kinh/20 bg-kinh-bg p-4 text-[14px] text-text-2">
          <div className="text-[11px] uppercase tracking-[2px] text-kinh">Flow đang dùng</div>
          <div className="mt-2 font-semibold text-text">{activeMethod.title}</div>
          <div className="mt-1">{active === 'luchao' ? 'Gieo đủ 6 lần để tạo quẻ chủ trực quan rồi xem kết quả.' : active === 'thieny' ? 'Nhập vật/tâm niệm, hệ thống tạo quẻ nhanh để đi tới result page.' : 'Nhập câu hỏi và mốc thời gian để lấy quẻ theo Mai Hoa.'}</div>
        </div>

        {active === 'luchao' ? (
          <>
            <div className="mt-5 flex justify-center gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/20 bg-surface-2 text-[18px] text-gold" style={{ animation: flipping ? 'coinFlip .45s ease' : undefined }}>
                  ◎
                </div>
              ))}
            </div>
            <button type="button" onClick={castLine} disabled={flipping} className="mt-5 w-full rounded-[14px] bg-kinh px-4 py-4 text-[15px] font-bold text-bg disabled:opacity-60">
              {flipping ? 'Đang gieo...' : `Gieo lần ${step}/6`}
            </button>
            <div className="mt-5 flex flex-col items-center gap-2">
              {lines.length ? lines.map((line, index) => <div key={`${line}-${index}`} className="text-[28px] text-kinh">{line}</div>) : Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-3 w-24 border-b border-dashed border-border" />)}
            </div>
          </>
        ) : null}

        {active === 'thieny' ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[1px] text-kinh">VẬT HOẶC ĐIỀU TÂM NIỆM</label>
              <input value={objectName} onChange={(event) => setObjectName(event.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="Ví dụ: nhẫn, lá thư, người đang nghĩ tới..." />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[1px] text-kinh">CÂU HỎI</label>
              <input value={question} onChange={(event) => setQuestion(event.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="Điều bạn muốn hỏi" />
            </div>
          </div>
        ) : null}

        {active === 'maihoa' ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[1px] text-kinh">CÂU HỎI</label>
              <input value={question} onChange={(event) => setQuestion(event.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="Nhập câu hỏi cần chiêm" />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[1px] text-kinh">GIỜ / NGÀY / THÁNG / NĂM</label>
              <input type="datetime-local" value={maiHoaTime} onChange={(event) => setMaiHoaTime(event.target.value)} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" />
            </div>
          </div>
        ) : null}

        <div className="mt-5 rounded-[18px] border border-border bg-surface-2 p-4 text-[14px] text-text-2">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Dữ liệu sẽ gửi sang trang kết quả</div>
          <div className="mt-2">{derivedQuestion}</div>
          {active === 'thieny' && objectName.trim() ? <div className="mt-2 text-[13px] text-text-3">Tâm niệm: {objectName.trim()}</div> : null}
          {active === 'maihoa' ? <div className="mt-2 text-[13px] text-text-3">Mốc thời gian Mai Hoa: {maiHoaTime}</div> : null}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <button type="submit" disabled={loading} className="rounded-[14px] bg-gradient-to-br from-kinh to-[#7AC89B] px-4 py-4 text-[15px] font-bold text-bg disabled:opacity-50">
            {loading ? 'Đang lấy quẻ...' : 'Xem kết quả quẻ →'}
          </button>
          <Link href="/goi-dich-vu" className="rounded-[14px] border border-[rgba(44,195,184,0.3)] bg-ai-bg px-4 py-4 text-center text-[15px] font-semibold text-ai">Mở AI giải quẻ chuyên sâu</Link>
        </div>
      </form>
    </main>
  );
}
