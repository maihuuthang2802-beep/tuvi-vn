'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { BirthInfo, ZiweiChart, Palace } from '@/lib/ziwei/types';
import { BRANCH_VI, STEM_VI, viPalace, viStar, viSiHua, viWuxingJu } from '@/lib/ziwei/vietnamese';
import { PROVINCES } from '@/lib/ziwei/cities';

export default function TuViPage() {
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('1995-01-01');
  const [birthTime, setBirthTime] = useState('08:00');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [province, setProvince] = useState('Hà Nội');
  const [city, setCity] = useState('Hà Nội');
  const cityList = useMemo(() => PROVINCES.find(p => p.name === province)?.cities || [], [province]);
  const longitude = cityList.find(c => c.name === city)?.longitude ?? 105.85;
  const [solarTime, setSolarTime] = useState(false);
  const [lunarDate, setLunarDate] = useState(false);

  const trueSolarBranch = useCallback(() => {
    if (!solarTime) {
      const [h] = (birthTime || '08:00').split(':');
      return Math.floor((Number(h) + 1) / 2) % 12;
    }
    const [hourText, minuteText] = (birthTime || '08:00').split(':');
    const clockMinutes = (Number(hourText) || 0) * 60 + (Number(minuteText) || 0);
    const solarMinutes = ((clockMinutes + (longitude - 105) * 4) % 1440 + 1440) % 1440;
    if (solarMinutes >= 1380 || solarMinutes < 60) return 0;
    return Math.floor((solarMinutes - 60) / 120) + 1;
  }, [birthTime, longitude, solarTime]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const date = birthDate ? new Date(birthDate) : new Date('1995-01-01');
    const info: BirthInfo = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: trueSolarBranch(),
      gender,
      name: name || undefined,
      province,
      city,
      longitude,
    };
    const chartData = generateChart(info);
    setChart(chartData);
    setSelectedPalace(null);
  }

  return (
    <main className="min-h-screen bg-bg text-text" style={{ fontFamily: 'var(--font-body)' }}>
      {/* nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <Link href="/" className="text-gold text-lg font-bold tracking-[0.35em]" style={{ fontFamily: 'var(--font-heading)' }}>TUVI.VN</Link>
        <div className="flex gap-4 text-sm text-muted">
          <Link href="/tu-vi" className="text-gold">Tử Vi</Link>
        </div>
      </nav>

      {!chart ? (
        <div className="mx-auto max-w-lg px-4 py-20">
          <h1 className="text-center text-3xl md:text-4xl text-gold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Lập Lá Số Tử Vi</h1>
          <p className="text-center text-sm text-muted mb-10">Dựa trên engine Tử Vi và dữ liệu tỉnh thành Việt Nam</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-muted">Họ tên</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none" placeholder="Nguyễn Văn A" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted">Ngày sinh</label>
                <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted">Giờ sinh</label>
                <input type="time" value={birthTime} onChange={e => setBirthTime(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-muted">Giới tính</label>
              <button type="button" onClick={() => setGender('male')} className={`px-4 py-2 rounded-full text-sm border ${gender === 'male' ? 'border-gold text-gold bg-gold-soft' : 'border-border text-muted'}`}>Nam</button>
              <button type="button" onClick={() => setGender('female')} className={`px-4 py-2 rounded-full text-sm border ${gender === 'female' ? 'border-gold text-gold bg-gold-soft' : 'border-border text-muted'}`}>Nữ</button>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={solarTime} onChange={e => setSolarTime(e.target.checked)} className="accent-gold" />
                Chân thái dương giờ
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={lunarDate} onChange={e => setLunarDate(e.target.checked)} className="accent-gold" />
                Dùng ngày âm lịch
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted">Tỉnh/thành</label>
                <select value={province} onChange={e => { const p = e.target.value; const c = PROVINCES.find(x => x.name === p)?.cities[0]?.name || ''; setProvince(p); setCity(c); }} className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none">
                  {PROVINCES.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted">Thành phố</label>
                <select value={city} onChange={e => setCity(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-text outline-none">
                  {cityList.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="w-full rounded-xl bg-gold py-4 font-semibold text-bg">Lập lá số</button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-0">
          {/* left sidebar: form */}
          <aside className="w-full lg:w-80 border-r border-border p-4 space-y-3 max-h-screen overflow-y-auto shrink-0">
            <button onClick={() => { setChart(null); setSelectedPalace(null); }} className="text-sm text-muted hover:text-gold">← Nhập lại</button>
            <div className="rounded-xl border border-border p-4 space-y-2 text-sm">
              <p className="text-gold font-semibold">{name || 'Đương số'}</p>
              <p className="text-muted">{STEM_VI[chart.lunarInfo.yearStem]} {BRANCH_VI[chart.lunarInfo.yearBranch]}</p>
              <p className="text-muted">Âm lịch {chart.lunarInfo.lunarDay}/{chart.lunarInfo.lunarMonth}/{chart.lunarInfo.lunarYear} {chart.lunarInfo.isLeapMonth ? '(nhuận)' : ''}</p>
              <p className="text-muted">{viWuxingJu(chart.wuxingJuName)}</p>
              <p className="text-muted">Tuổi: {chart.currentAge}</p>
            </div>
            <div className="space-y-2">
              {chart.palaces.map(p => (
                <button
                  key={p.branch}
                  onClick={() => setSelectedPalace(prev => prev?.branch === p.branch ? null : p)}
                  className={`w-full rounded-xl border p-3 text-left text-sm transition ${selectedPalace?.branch === p.branch ? 'border-gold bg-gold-soft' : 'border-border hover:bg-surface'}`}
                >
                  <p className="text-xs text-muted">{BRANCH_VI[p.branch]}</p>
                  <p className="font-medium" style={{ fontFamily: 'var(--font-heading)' }}>{viPalace(p.name)}</p>
                  <p className="text-xs text-muted">
                    {p.isEmpty ? 'Vô chính diệu' : p.stars.filter(s => s.type === 'major').map(s => viStar(s.name)).join(' · ')}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          {/* center: chart */}
          <section className="flex-1 p-6 flex items-center justify-center min-h-screen">
            <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full max-w-3xl aspect-square">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(idx => {
                const p = chart.palaces[idx];
                if (!p) return null;
                const isActive = selectedPalace?.branch === p.branch;
                const major = p.stars.filter(s => s.type === 'major');
                return (
                  <button
                    key={p.branch}
                    onClick={() => setSelectedPalace(prev => prev?.branch === p.branch ? null : p)}
                    className={`rounded-xl border p-1 md:p-2 text-center transition text-xs md:text-sm ${isActive ? 'border-gold bg-gold-soft' : 'border-border hover:bg-surface'}`}
                  >
                    <p className="text-[10px] text-muted truncate">{viPalace(p.name)}</p>
                    {major.map(s => {
                      const sihuaLabel = s.siHua ? ` (${viSiHua(s.siHua)})` : '';
                      return <p key={s.name} className="text-gold font-medium truncate">{viStar(s.name)}{sihuaLabel}</p>;
                    })}
                    {p.isEmpty && <p className="text-[10px] text-muted italic">Vô chính diệu</p>}
                    {p.isMingGong && <p className="text-[10px] text-gold">Mệnh</p>}
                    {p.isShenGong && <p className="text-[10px] text-gold">Thân</p>}
                  </button>
                );
              })}
              {/* 4 center cells merged */}
              <div className="row-start-2 col-start-2 row-span-2 col-span-2 flex items-center justify-center rounded-2xl border border-border bg-surface/40">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-bright animate-pulse" />
                  <p className="text-[10px] text-muted">Âm Dương</p>
                  <p className="text-[10px] text-gold font-semibold">{STEM_VI[chart.lunarInfo.yearStem]} {BRANCH_VI[chart.lunarInfo.yearBranch]}</p>
                  <p className="text-[10px] text-muted">{viWuxingJu(chart.wuxingJuName)}</p>
                </div>
              </div>
            </div>
          </section>

          {/* right / mobile bottom: insight */}
          <aside className="w-full lg:w-80 border-l border-border p-4 space-y-3 max-h-screen overflow-y-auto shrink-0">
            <h3 className="text-gold font-semibold text-sm">Luận giải</h3>
            {selectedPalace ? (
              <div className="space-y-3 text-sm">
                <p className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{viPalace(selectedPalace.name)}</p>
                <p className="text-muted">Địa chi: {BRANCH_VI[selectedPalace.branch]}</p>
                <p className="text-muted">Thiên can: {STEM_VI[selectedPalace.stem]}</p>
                {selectedPalace.isEmpty && selectedPalace.borrowedFromName && (
                  <p className="text-gold">Mượn chính tinh từ cung {viPalace(selectedPalace.borrowedFromName)}</p>
                )}
                <div className="space-y-1">
                  {selectedPalace.stars.map(s => (
                    <div key={s.name} className="flex items-center justify-between rounded-lg border border-border p-2">
                      <span>{viStar(s.name)}</span>
                      <span className="text-xs text-muted">{s.type === 'major' ? 'Chính' : s.type === 'lucky' ? 'Cát' : s.type === 'sha' ? 'Sát' : 'Phụ'} · {s.brightness === 'bright' ? 'Miếu' : s.brightness === 'dim' ? 'Hãm' : 'Bình'}{s.siHua ? ` · ${viSiHua(s.siHua)}` : ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted text-sm">Chọn một cung trên bàn lá số để xem luận giải chi tiết.</p>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}