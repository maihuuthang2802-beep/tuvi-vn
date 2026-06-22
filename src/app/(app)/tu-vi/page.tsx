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
  const [openProvince, setOpenProvince] = useState(false);
  const [query, setQuery] = useState('');
  const locationOptions = useMemo(() => PROVINCES.flatMap((item) => item.cities.map((cityItem) => ({ province: item.name, city: cityItem.name, longitude: cityItem.longitude, label: `${item.name} • ${cityItem.name}` }))).filter((item) => item.label.toLowerCase().includes(query.toLowerCase())), [query]);

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
            <button type="button" onClick={() => setOpenProvince(true)} className="mt-2 flex w-full items-center justify-between rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-left text-[15px] text-text">
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

      <BottomSheet open={openProvince} title="Chọn Tỉnh / Thành" onClose={() => setOpenProvince(false)}>
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="sticky top-0 mb-3 w-full rounded-[12px] border border-border bg-surface-2 px-[14px] py-[10px] text-[14px] text-text outline-none" placeholder="Tìm tỉnh hoặc thành phố..." />
        <div className="mb-3 rounded-[16px] border border-gold/15 bg-tuvi-bg px-4 py-3 text-[13px] text-text-2">
          Dùng điểm sinh cấp thành phố để hiệu chỉnh giờ mặt trời thật. Kinh độ hiện dùng cho lá số: <span className="font-semibold text-gold">{longitude.toFixed(2)}°Đ</span>
        </div>
        <div>
          {locationOptions.map((item) => {
            const active = province === item.province && city === item.city;
            return (
              <button key={item.label} onClick={() => { setProvince(item.province); setCity(item.city); setLongitude(item.longitude); setOpenProvince(false); }} className={`flex w-full items-center justify-between border-b border-border-2 px-5 py-3 text-left ${active ? 'bg-tuvi-bg text-gold font-semibold' : 'text-text'}`}>
                <span>
                  <span className="block text-[15px]">{item.city}</span>
                  <span className="mt-1 block text-[12px] text-text-2">{item.province} · {item.longitude.toFixed(2)}°Đ</span>
                </span>
                <span>{active ? '✓' : ''}</span>
              </button>
            );
          })}
          {!locationOptions.length && <div className="px-5 py-4 text-[14px] text-text-2">Không tìm thấy “{query}”</div>}
        </div>
      </BottomSheet>
    </main>
  );
}