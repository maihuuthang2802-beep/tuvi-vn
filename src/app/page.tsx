'use client';

import { FormEvent, useMemo, useState } from 'react';
import type { ReadingResult, ServiceKey } from '@/lib/readings';
import { PROVINCES } from '@/lib/ziwei/cities';

const services: Array<{ key: ServiceKey; title: string; subtitle: string; cta: string }> = [
  { key: 'tu-vi', title: 'Lá số Tử Vi', subtitle: 'Lập lá số, xem cung trọng tâm, đại hạn, luận giải AI.', cta: 'Lập lá số' },
  { key: 'kinh-dich', title: 'Quẻ Kinh Dịch', subtitle: 'Gieo quẻ theo câu hỏi, đọc thế - thời - biến.', cta: 'Gieo quẻ' },
  { key: 'xin-xam', title: 'Xin Xăm', subtitle: 'Xin quẻ nhanh cho công việc, tình cảm, tài lộc.', cta: 'Xin xăm' },
  { key: 'tarot', title: 'Bài Tarot', subtitle: 'Trải 3 lá cho tình huống hiện tại và bước tiếp theo.', cta: 'Trải bài' },
];

const plans = [
  { key: 'starter', name: 'Khởi Đầu', price: '99k', items: ['20 lượt luận giải', 'Lưu lịch sử', 'Tarot/Xăm không giới hạn'] },
  { key: 'pro', name: 'Chuyên Sâu', price: '299k', items: ['100 lượt AI', 'Hồ sơ nhiều người', 'Báo cáo PDF'] },
];

export default function Home() {
  const [service, setService] = useState<ServiceKey>('tu-vi');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('1995-01-01');
  const [birthTime, setBirthTime] = useState('08:00');
  const [province, setProvince] = useState('Hà Nội');
  const [city, setCity] = useState('Hà Nội');
  const [question, setQuestion] = useState('Tôi nên tập trung điều gì trong tháng tới?');
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const active = useMemo(() => services.find(item => item.key === service)!, [service]);
  const cityList = useMemo(() => PROVINCES.find(item => item.name === province)?.cities || [], [province]);
  const longitude = cityList.find(item => item.name === city)?.longitude ?? 105.85;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/api/reading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, name, birthDate, birthTime, question, province, city, longitude }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }

  async function checkout(plan: string) {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    const data = await response.json();
    alert(`MVP checkout: ${data.plan.name} - ${data.plan.price}đ`);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#09070f] text-[#f8f0df]">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-5 py-8 lg:grid-cols-[1fr_440px] lg:px-8">
        <div className="flex flex-col justify-between gap-12">
          <nav className="flex items-center justify-between">
            <div className="text-lg font-semibold tracking-[0.35em] text-[#d7a84f]">TUVI.VN</div>
            <div className="hidden gap-6 text-sm text-[#c9b99a] md:flex">
              <a href="#services">Dịch vụ</a>
              <a href="#pricing">Gói</a>
              <a href="#api">API</a>
            </div>
          </nav>

          <div className="max-w-4xl space-y-7">
            <p className="w-fit rounded-full border border-[#d7a84f55] bg-[#d7a84f12] px-4 py-2 text-sm text-[#d7a84f]">MVP deploy Vercel · Tử Vi · Kinh Dịch · Xin Xăm · Tarot</p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.05em] md:text-7xl">
              Nền tảng huyền học Việt hóa, dùng được ngay, mở rộng AI sau.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#c9b99a]">
              Front-end Next.js cho Vercel, API route sẵn cho luận giải, auth, thanh toán và lịch sử. Rule-based chạy local khi chưa có key AI.
            </p>
            <div className="grid gap-3 sm:grid-cols-4" id="services">
              {services.map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setService(item.key)}
                  className={`rounded-3xl border p-4 text-left transition ${service === item.key ? 'border-[#d7a84f] bg-[#d7a84f1f]' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'}`}
                >
                  <div className="font-medium">{item.title}</div>
                  <div className="mt-2 text-xs leading-5 text-[#b8a98b]">{item.subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3" id="api">
            {['/api/reading', '/api/auth', '/api/checkout + /api/history'].map(item => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-[#c9b99a]">
                <span className="font-mono text-[#d7a84f]">{item}</span>
                <p className="mt-2">Sẵn route MVP, thay provider thật khi có key/dịch vụ.</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-[#f7eddb] p-5 text-[#1d160d] shadow-2xl shadow-black/40 lg:my-auto">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#9a6b1d]">{active.title}</p>
              <h2 className="mt-2 text-3xl font-semibold">{active.cta}</h2>
            </div>
            <label className="block text-sm font-medium">Tên
              <input value={name} onChange={event => setName(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none" placeholder="Nguyễn Văn A" />
            </label>
            {service === 'tu-vi' && (
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-medium">Ngày sinh
                  <input type="date" value={birthDate} onChange={event => setBirthDate(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none" />
                </label>
                <label className="block text-sm font-medium">Giờ sinh
                  <input type="time" value={birthTime} onChange={event => setBirthTime(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none" />
                </label>
                <label className="block text-sm font-medium">Tỉnh/thành
                  <select value={province} onChange={event => { const nextProvince = event.target.value; const nextCity = PROVINCES.find(item => item.name === nextProvince)?.cities[0]?.name || ''; setProvince(nextProvince); setCity(nextCity); }} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none">
                    {PROVINCES.map(item => <option key={item.name} value={item.name}>{item.name}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium">Thành phố/quận
                  <select value={city} onChange={event => setCity(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none">
                    {cityList.map(item => <option key={item.name} value={item.name}>{item.name}</option>)}
                  </select>
                </label>
              </div>
            )}
            <label className="block text-sm font-medium">Câu hỏi
              <textarea value={question} onChange={event => setQuestion(event.target.value)} className="mt-2 min-h-28 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none" />
            </label>
            <button disabled={loading} className="w-full rounded-2xl bg-[#1d160d] px-5 py-4 font-medium text-white disabled:opacity-60">
              {loading ? 'Đang luận giải...' : active.cta}
            </button>
          </form>

          {result && (
            <section className="mt-5 rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-xl font-semibold">{result.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/70">{result.summary}</p>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {result.details.map(item => <li key={item}>• {item}</li>)}
              </ul>
              <p className="mt-4 rounded-2xl bg-[#f1e3c4] p-4 text-sm font-medium">{result.advice}</p>
            </section>
          )}
        </aside>
      </section>

      <section id="pricing" className="mx-auto grid max-w-7xl gap-5 px-5 pb-16 md:grid-cols-2 lg:px-8">
        {plans.map(plan => (
          <div key={plan.key} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                <p className="mt-1 text-[#c9b99a]">{plan.items.join(' · ')}</p>
              </div>
              <div className="text-3xl font-semibold text-[#d7a84f]">{plan.price}</div>
            </div>
            <button onClick={() => checkout(plan.key)} className="mt-6 rounded-full border border-[#d7a84f] px-5 py-3 text-sm text-[#d7a84f]">Mua gói</button>
          </div>
        ))}
      </section>
    </main>
  );
}
