'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import BottomSheet from '@/components/layout/BottomSheet';
import ModuleHero from '@/components/shared/ModuleHero';
import ChartBoard from '@/components/ziwei/ChartBoard';
import TimeNav, { type TimeView } from '@/components/ziwei/TimeNav';
import PalaceInsightPanel from '@/components/ziwei/PalaceInsightPanel';
import { PROVINCES } from '@/lib/ziwei/cities';
import { generateChart } from '@/lib/ziwei/algorithm';
import type { Palace, ZiweiChart } from '@/lib/ziwei/types';

const DEFAULT_PROVINCE = PROVINCES.find((item) => item.name === 'Hà Nội') || PROVINCES[0];
const DEFAULT_CITY = DEFAULT_PROVINCE.cities[0];
const HOURS = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

export default function TuViPage() {
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [calendar, setCalendar] = useState<'Dương lịch' | 'Âm lịch'>('Dương lịch');
  const [hour, setHour] = useState('Tý');
  const [province, setProvince] = useState(DEFAULT_PROVINCE.name);
  const [city, setCity] = useState(DEFAULT_CITY.name);
  const [longitude, setLongitude] = useState(DEFAULT_CITY.longitude);
  const [pickerStep, setPickerStep] = useState<'closed' | 'province' | 'city'>('closed');
  const [provinceQuery, setProvinceQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [chart, setChart] = useState<ZiweiChart | null>(null);
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [view, setView] = useState<TimeView>('mingpan');
  const [highlightBranch, setHighlightBranch] = useState<number | null>(null);
  const [liunianYear, setLiunianYear] = useState<number | null>(null);

  const filteredProvinces = useMemo(() => PROVINCES.filter((p) => p.name.toLowerCase().includes(provinceQuery.toLowerCase())), [provinceQuery]);
  const currentProvince = PROVINCES.find((p) => p.name === province);
  const filteredCities = useMemo(() => currentProvince?.cities.filter((c) => c.name.toLowerCase().includes(cityQuery.toLowerCase())) ?? [], [currentProvince, cityQuery]);

  function previewChart() {
    const sample = generateChart({
      year: 1995,
      month: 1,
      day: 1,
      hour: HOURS.indexOf(hour),
      gender: gender === 'Nữ' ? 'female' : 'male',
      name: 'Đương số',
      province,
      city,
      longitude,
    });
    setChart(sample);
    setSelectedPalace(sample.palaces.find((item) => item.isMingGong) || sample.palaces[0]);
  }

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☯" title="Lập Lá Số Tử Vi" subtitle="Workbench lá số · chọn cung · xem đại hạn hiện tại" accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 grid gap-5 md:mx-auto md:max-w-[1280px] md:grid-cols-[360px_1fr_340px]">
        <form action="/ket-qua/tu-vi" className="space-y-4 rounded-[20px] border border-border bg-surface p-5">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">HỌ TÊN</label>
            <input name="name" className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none focus:border-tuvi focus:ring-3 focus:ring-tuvi-bg" placeholder="Nhập họ tên" />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">NGÀY SINH</label>
            <input name="birthDate" type="date" className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none focus:border-tuvi focus:ring-3 focus:ring-tuvi-bg" />
            <div className="mt-3 flex gap-2">
              {(['Dương lịch', 'Âm lịch'] as const).map((item) => (
                <button key={item} type="button" onClick={() => setCalendar(item)} className={`rounded-full px-4 py-2 text-[13px] font-semibold ${calendar === item ? 'bg-tuvi-bg text-gold border border-gold/40' : 'border border-border text-text-2'}`}>{item}</button>
              ))}
            </div>
            <input type="hidden" name="calendar" value={calendar} />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">GIỜ SINH</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {HOURS.map((item) => (
                <button key={item} type="button" onClick={() => setHour(item)} className={`rounded-[12px] border px-3 py-3 text-[14px] ${hour === item ? 'border-tuvi bg-tuvi-bg text-gold' : 'border-border-2 bg-surface-2 text-text-2'}`}>{item}</button>
              ))}
            </div>
            <input type="hidden" name="birthHour" value={hour} />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">GIỚI TÍNH</label>
            <div className="mt-2 flex gap-2">
              {(['Nam', 'Nữ'] as const).map((item) => (
                <button key={item} type="button" onClick={() => setGender(item)} className={`flex-1 rounded-[12px] border px-4 py-3 text-[15px] font-semibold ${gender === item ? 'border-tuvi bg-tuvi-bg text-gold' : 'border-border-2 bg-surface-2 text-text-2'}`}>{item}</button>
              ))}
            </div>
            <input type="hidden" name="gender" value={gender} />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">TỈNH/THÀNH</label>
            <button type="button" onClick={() => { setProvinceQuery(''); setPickerStep('province'); }} className="mt-2 flex w-full items-center justify-between rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-left text-[15px] text-text">
              <span>
                <span className="block">{province}</span>
                <span className="mt-1 block text-[12px] text-text-2">{city} · {longitude.toFixed(2)}°Đ</span>
              </span>
              <span className="text-text-2">⌄</span>
            </button>
            <input type="hidden" name="province" value={province} />
            <input type="hidden" name="city" value={city} />
            <input type="hidden" name="longitude" value={longitude} />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <button type="button" onClick={previewChart} className="rounded-[14px] border border-gold/20 bg-tuvi-bg px-4 py-[14px] text-[15px] font-bold text-gold">Xem workbench</button>
            <button className="rounded-[14px] bg-gradient-to-br from-tuvi to-[#E8C87A] px-4 py-[14px] text-[15px] font-bold text-bg">Lập Lá Số →</button>
          </div>
          <Link href="/co-thu" className="block rounded-[14px] border border-border bg-surface-2 px-4 py-3 text-center text-[14px] font-semibold text-text">Mở thư viện cổ thư</Link>
        </form>

        <div className="space-y-4">
          {chart ? <TimeNav chart={chart} view={view} onViewChange={setView} onHighlightBranchChange={setHighlightBranch} onLiunianYearChange={setLiunianYear} /> : null}
          <div className="rounded-[20px] border border-border bg-surface p-5">
            {chart ? <ChartBoard chart={chart} selectedPalace={selectedPalace} onPalaceSelect={setSelectedPalace} highlightBranch={highlightBranch} /> : <div className="flex min-h-[520px] items-center justify-center rounded-[18px] border border-border bg-surface-2 text-[14px] text-text-3">Bấm &quot;Xem workbench&quot; để dựng trước lá số và chọn từng cung.</div>}
          </div>
        </div>

        <div>
          {chart ? <PalaceInsightPanel chart={chart} palace={selectedPalace} liunianYear={liunianYear} /> : <div className="rounded-[20px] border border-border bg-surface p-5 text-[14px] text-text-3">Panel này sẽ hiện giải nghĩa cung, sao và tứ hóa khi đã dựng workbench.</div>}
        </div>
      </section>

      <BottomSheet open={pickerStep === 'province'} title="Chọn Tỉnh / Thành Phố" onClose={() => setPickerStep('closed')}>
        <input value={provinceQuery} onChange={(e) => setProvinceQuery(e.target.value)} className="sticky top-0 mb-3 w-full rounded-[12px] border border-border bg-surface-2 px-[14px] py-[10px] text-[14px] text-text outline-none" placeholder="Tìm tỉnh..." />
        <div>
          {filteredProvinces.map((prov) => (
            <button key={prov.name} type="button" onClick={() => { setProvince(prov.name); setCity(prov.cities[0].name); setLongitude(prov.cities[0].longitude); setPickerStep('city'); setCityQuery(''); }} className={`flex w-full items-center justify-between border-b border-border-2 px-5 py-3 text-left text-[15px] ${province === prov.name ? 'bg-tuvi-bg text-gold font-semibold' : 'text-text hover:bg-surface-2'}`}>
              <span>{prov.name}</span>
              <span className="text-[12px] text-text-2">{prov.cities.length} TP</span>
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={pickerStep === 'city'} title={`Chọn Thành Phố • ${province}`} onClose={() => setPickerStep('closed')}>
        <div className="mb-3 flex items-center gap-2">
          <button type="button" onClick={() => setPickerStep('province')} className="rounded-[8px] border border-border bg-surface-2 px-3 py-1 text-[12px] text-text-2 hover:text-text">← Quay lại</button>
          <input value={cityQuery} onChange={(e) => setCityQuery(e.target.value)} className="flex-1 rounded-[12px] border border-border bg-surface-2 px-[14px] py-[10px] text-[14px] text-text outline-none" placeholder="Tìm thành phố..." />
        </div>
        <div className="mb-3 rounded-[16px] border border-gold/15 bg-tuvi-bg px-4 py-3 text-[13px] text-text-2">Kinh độ dùng cho lá số: <span className="font-semibold text-gold">{longitude.toFixed(2)}°Đ</span></div>
        <div>
          {filteredCities.map((c) => (
            <button key={c.name} type="button" onClick={() => { setCity(c.name); setLongitude(c.longitude); setPickerStep('closed'); }} className={`flex w-full items-center justify-between border-b border-border-2 px-5 py-3 text-left ${city === c.name ? 'bg-tuvi-bg text-gold font-semibold' : 'text-text hover:bg-surface-2'}`}>
              <span>
                <span className="block text-[15px]">{c.name}</span>
                <span className="mt-1 block text-[12px] text-text-2">{c.longitude.toFixed(2)}°Đ</span>
              </span>
              <span>{city === c.name ? '✓' : ''}</span>
            </button>
          ))}
        </div>
      </BottomSheet>
    </main>
  );
}
