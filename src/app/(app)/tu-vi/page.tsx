'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import BottomSheet from '@/components/layout/BottomSheet';
import ModuleHero from '@/components/shared/ModuleHero';
import { PROVINCES } from '@/lib/ziwei/cities';

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
  
  const filteredProvinces = useMemo(() => PROVINCES.filter((p) => p.name.toLowerCase().includes(provinceQuery.toLowerCase())), [provinceQuery]);
  const currentProvince = PROVINCES.find((p) => p.name === province);
  const filteredCities = useMemo(() => currentProvince?.cities.filter((c) => c.name.toLowerCase().includes(cityQuery.toLowerCase())) ?? [], [currentProvince, cityQuery]);

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☯" title="Lập Lá Số Tử Vi" subtitle="Engine chuẩn · Dữ liệu 63 tỉnh thành VN" accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 md:mx-auto md:grid md:max-w-[1100px] md:grid-cols-[420px_1fr] md:gap-6">
        <form action="/ket-qua/tu-vi" className="space-y-4">
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
          <div className="space-y-2 text-[13px] text-text-2">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-[var(--color-tuvi)]" /> Chân thái dương giờ</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-[var(--color-tuvi)]" /> Dùng ngày âm lịch</label>
          </div>
          <button className="mt-2 w-full rounded-[14px] bg-gradient-to-br from-tuvi to-[#E8C87A] px-4 py-[14px] text-[15px] font-bold text-bg">Lập Lá Số →</button>
          <Link href="/goi-dich-vu" className="block rounded-[14px] border border-[rgba(44,195,184,0.3)] bg-ai-bg px-4 py-3 text-center text-[14px] font-semibold text-ai">Mở AI luận giải chuyên sâu</Link>
        </form>

        <div className="mt-6 md:mt-0">
          <div className="rounded-[20px] border border-border bg-surface-2 p-5">
            <div className="text-[10px] uppercase tracking-[2px] text-gold">XEM TRƯỚC</div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, i) => <div key={i} className="h-20 rounded-[12px] border border-border-2 bg-surface" />)}
              <div className="col-span-2 row-span-2 -mt-[184px] ml-[94px] hidden h-[168px] rounded-[16px] border border-border bg-surface-3 md:block" />
            </div>
            <div className="mt-4 text-center text-[14px] text-text-3">Nhập thông tin để lập lá số</div>
          </div>
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
           {!filteredProvinces.length && <div className="px-5 py-4 text-[14px] text-text-2">Không tìm thấy &quot;{provinceQuery}&quot;</div>}
        </div>
      </BottomSheet>

      <BottomSheet open={pickerStep === 'city'} title={`Chọn Thành Phố • ${province}`} onClose={() => setPickerStep('closed')}>
        <div className="mb-3 flex items-center gap-2">
          <button type="button" onClick={() => setPickerStep('province')} className="rounded-[8px] border border-border bg-surface-2 px-3 py-1 text-[12px] text-text-2 hover:text-text">← Quay lại</button>
          <input value={cityQuery} onChange={(e) => setCityQuery(e.target.value)} className="flex-1 rounded-[12px] border border-border bg-surface-2 px-[14px] py-[10px] text-[14px] text-text outline-none" placeholder="Tìm thành phố..." />
        </div>
        <div className="mb-3 rounded-[16px] border border-gold/15 bg-tuvi-bg px-4 py-3 text-[13px] text-text-2">
          Kinh độ dùng cho lá số: <span className="font-semibold text-gold">{longitude.toFixed(2)}°Đ</span>
        </div>
        <div>
          {filteredCities.map((c) => {
            const active = city === c.name;
            return (
              <button key={c.name} type="button" onClick={() => { setCity(c.name); setLongitude(c.longitude); setPickerStep('closed'); }} className={`flex w-full items-center justify-between border-b border-border-2 px-5 py-3 text-left ${active ? 'bg-tuvi-bg text-gold font-semibold' : 'text-text hover:bg-surface-2'}`}>
                <span>
                  <span className="block text-[15px]">{c.name}</span>
                  <span className="mt-1 block text-[12px] text-text-2">{c.longitude.toFixed(2)}°Đ</span>
                </span>
                <span>{active ? '✓' : ''}</span>
              </button>
            );
          })}
           {!filteredCities.length && <div className="px-5 py-4 text-[14px] text-text-2">Không tìm thấy &quot;{cityQuery}&quot;</div>}
        </div>
      </BottomSheet>
    </main>
  );
}