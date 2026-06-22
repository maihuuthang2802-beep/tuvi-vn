'use client';

import { useMemo, useState } from 'react';
import BottomSheet from '@/components/layout/BottomSheet';
import ModuleHero from '@/components/shared/ModuleHero';
import { PROVINCES } from '@/lib/ziwei/cities';

const HOURS = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

export default function TuViPage() {
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [calendar, setCalendar] = useState<'Dương lịch' | 'Âm lịch'>('Dương lịch');
  const [hour, setHour] = useState('Tý');
  const [province, setProvince] = useState('Hà Nội');
  const [openProvince, setOpenProvince] = useState(false);
  const [query, setQuery] = useState('');
  const provinces = useMemo(() => PROVINCES.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="☯" title="Lập Lá Số Tử Vi" subtitle="Engine chuẩn · Dữ liệu 63 tỉnh thành VN" accent="var(--color-tuvi)" />
      <section className="mx-5 mt-5 rounded-[20px] border border-border bg-surface p-5 md:mx-auto md:grid md:max-w-[1100px] md:grid-cols-[420px_1fr] md:gap-6">
        <form className="space-y-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">HỌ TÊN</label>
            <input className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none focus:border-tuvi focus:ring-3 focus:ring-tuvi-bg" placeholder="Nhập họ tên" />
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">NGÀY SINH</label>
            <input className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none focus:border-tuvi focus:ring-3 focus:ring-tuvi-bg" placeholder="dd/mm/yyyy" />
            <div className="mt-3 flex gap-2">
              {(['Dương lịch', 'Âm lịch'] as const).map((item) => (
                <button key={item} type="button" onClick={() => setCalendar(item)} className={`rounded-full px-4 py-2 text-[13px] font-semibold ${calendar === item ? 'bg-tuvi-bg text-gold border border-gold/40' : 'border border-border text-text-2'}`}>{item}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">GIỜ SINH</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {HOURS.map((item) => (
                <button key={item} type="button" onClick={() => setHour(item)} className={`rounded-[12px] border px-3 py-3 text-[14px] ${hour === item ? 'border-tuvi bg-tuvi-bg text-gold' : 'border-border-2 bg-surface-2 text-text-2'}`}>{item}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">GIỚI TÍNH</label>
            <div className="mt-2 flex gap-2">
              {(['Nam', 'Nữ'] as const).map((item) => (
                <button key={item} type="button" onClick={() => setGender(item)} className={`flex-1 rounded-[12px] border px-4 py-3 text-[15px] font-semibold ${gender === item ? 'border-tuvi bg-tuvi-bg text-gold' : 'border-border-2 bg-surface-2 text-text-2'}`}>{item}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">TỈNH/THÀNH</label>
            <button type="button" onClick={() => setOpenProvince(true)} className="mt-2 flex w-full items-center justify-between rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-left text-[15px] text-text">
              <span>{province}</span><span className="text-text-2">⌄</span>
            </button>
          </div>
          <div className="space-y-2 text-[13px] text-text-2">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-[var(--color-tuvi)]" /> Chân thái dương giờ</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-[var(--color-tuvi)]" /> Dùng ngày âm lịch</label>
          </div>
          <button className="mt-2 w-full rounded-[14px] bg-gradient-to-br from-tuvi to-[#E8C87A] px-4 py-[14px] text-[15px] font-bold text-bg">Lập Lá Số →</button>
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
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="sticky top-0 mb-3 w-full rounded-[12px] border border-border bg-surface-2 px-[14px] py-[10px] text-[14px] text-text outline-none" placeholder="Tìm tỉnh thành..." />
        <div>
          {provinces.map((item) => {
            const active = province === item.name;
            return (
              <button key={item.name} onClick={() => { setProvince(item.name); setOpenProvince(false); }} className={`flex w-full items-center justify-between border-b border-border-2 px-5 py-3 text-left text-[15px] ${active ? 'bg-tuvi-bg text-gold font-semibold' : 'text-text'}`}>
                <span>{item.name}</span>
                <span>{active ? '✓' : ''}</span>
              </button>
            );
          })}
          {!provinces.length && <div className="px-5 py-4 text-[14px] text-text-2">Không tìm thấy “{query}”</div>}
        </div>
      </BottomSheet>
    </main>
  );
}