'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import BottomSheet from '@/components/layout/BottomSheet';
import ModuleHero from '@/components/shared/ModuleHero';
import { PROVINCES } from '@/lib/ziwei/cities';

const DEFAULT_PROVINCE = PROVINCES.find((item) => item.name === 'Hà Nội') || PROVINCES[0];
const DEFAULT_CITY = DEFAULT_PROVINCE.cities[0];
const HOURS = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

type PersonKey = 'a' | 'b';
type PickerState = { person: PersonKey; step: 'closed' | 'province' | 'city' };

function PersonForm({
  prefix,
  title,
  accent,
  gender,
  setGender,
  hour,
  setHour,
  province,
  city,
  longitude,
  openPicker,
}: {
  prefix: PersonKey;
  title: string;
  accent: string;
  gender: 'Nam' | 'Nữ';
  setGender: (value: 'Nam' | 'Nữ') => void;
  hour: string;
  setHour: (value: string) => void;
  province: string;
  city: string;
  longitude: number;
  openPicker: () => void;
}) {
  return (
    <div className="rounded-[20px] border border-border bg-surface p-5">
      <div className="text-[11px] uppercase tracking-[2px]" style={{ color: accent }}>{title}</div>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">HỌ TÊN</label>
          <input name={`${prefix}Name`} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="Nhập họ tên" />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">NGÀY SINH</label>
          <input name={`${prefix}BirthDate`} type="date" className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">GIỜ SINH</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {HOURS.map((item) => (
              <button key={`${prefix}-${item}`} type="button" onClick={() => setHour(item)} className={`rounded-[12px] border px-3 py-3 text-[14px] ${hour === item ? 'border-tuvi bg-tuvi-bg text-gold' : 'border-border-2 bg-surface-2 text-text-2'}`}>{item}</button>
            ))}
          </div>
          <input type="hidden" name={`${prefix}BirthHour`} value={hour} />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">GIỚI TÍNH</label>
          <div className="mt-2 flex gap-2">
            {(['Nam', 'Nữ'] as const).map((item) => (
              <button key={`${prefix}-${item}`} type="button" onClick={() => setGender(item)} className={`flex-1 rounded-[12px] border px-4 py-3 text-[15px] font-semibold ${gender === item ? 'border-tuvi bg-tuvi-bg text-gold' : 'border-border-2 bg-surface-2 text-text-2'}`}>{item}</button>
            ))}
          </div>
          <input type="hidden" name={`${prefix}Gender`} value={gender} />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">TỈNH/THÀNH</label>
          <button type="button" onClick={openPicker} className="mt-2 flex w-full items-center justify-between rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-left text-[15px] text-text">
            <span>
              <span className="block">{province}</span>
              <span className="mt-1 block text-[12px] text-text-2">{city} · {longitude.toFixed(2)}°Đ</span>
            </span>
            <span className="text-text-2">⌄</span>
          </button>
          <input type="hidden" name={`${prefix}Province`} value={province} />
          <input type="hidden" name={`${prefix}City`} value={city} />
          <input type="hidden" name={`${prefix}Longitude`} value={longitude} />
        </div>
      </div>
    </div>
  );
}

export default function HopMenhPage() {
  const [genderA, setGenderA] = useState<'Nam' | 'Nữ'>('Nam');
  const [genderB, setGenderB] = useState<'Nam' | 'Nữ'>('Nữ');
  const [hourA, setHourA] = useState('Tý');
  const [hourB, setHourB] = useState('Tý');
  const [provinceA, setProvinceA] = useState(DEFAULT_PROVINCE.name);
  const [provinceB, setProvinceB] = useState(DEFAULT_PROVINCE.name);
  const [cityA, setCityA] = useState(DEFAULT_CITY.name);
  const [cityB, setCityB] = useState(DEFAULT_CITY.name);
  const [longitudeA, setLongitudeA] = useState(DEFAULT_CITY.longitude);
  const [longitudeB, setLongitudeB] = useState(DEFAULT_CITY.longitude);
  const [picker, setPicker] = useState<PickerState>({ person: 'a', step: 'closed' });
  const [provinceQuery, setProvinceQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');

  const currentProvinceName = picker.person === 'a' ? provinceA : provinceB;
  const currentProvince = PROVINCES.find((item) => item.name === currentProvinceName) || DEFAULT_PROVINCE;
  const filteredProvinces = useMemo(() => PROVINCES.filter((item) => item.name.toLowerCase().includes(provinceQuery.toLowerCase())), [provinceQuery]);
  const filteredCities = useMemo(() => currentProvince.cities.filter((item) => item.name.toLowerCase().includes(cityQuery.toLowerCase())), [currentProvince, cityQuery]);

  function setLocation(person: PersonKey, province: string, city: string, longitude: number) {
    if (person === 'a') {
      setProvinceA(province);
      setCityA(city);
      setLongitudeA(longitude);
      return;
    }
    setProvinceB(province);
    setCityB(city);
    setLongitudeB(longitude);
  }

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="◎" title="Hợp Mệnh Tử Vi" subtitle="Đối chiếu hai lá số · Mệnh, Phu thê, Phúc đức, Đại hạn" accent="var(--color-tuvi)" />
      <form action="/ket-qua/hop-menh" className="mx-5 mt-5 space-y-5 md:mx-auto md:max-w-[1100px]">
        <div className="grid gap-5 md:grid-cols-2">
          <PersonForm prefix="a" title="Người A" accent="var(--color-tuvi)" gender={genderA} setGender={setGenderA} hour={hourA} setHour={setHourA} province={provinceA} city={cityA} longitude={longitudeA} openPicker={() => { setProvinceQuery(''); setPicker({ person: 'a', step: 'province' }); }} />
          <PersonForm prefix="b" title="Người B" accent="var(--color-ai)" gender={genderB} setGender={setGenderB} hour={hourB} setHour={setHourB} province={provinceB} city={cityB} longitude={longitudeB} openPicker={() => { setProvinceQuery(''); setPicker({ person: 'b', step: 'province' }); }} />
        </div>
        <div className="rounded-[20px] border border-gold/15 bg-tuvi-bg p-5 text-[14px] text-text-2">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Phạm vi đối chiếu</div>
          <div className="mt-3">MVP hiện đối chiếu Mệnh, Phu thê, Phúc đức, tứ hóa nổi bật và đại hạn hiện tại. Kết quả miễn phí cho điểm hợp và 4 trục chính. Gói mở rộng mở thêm breakdown sâu.</div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <button className="rounded-[14px] bg-gradient-to-br from-tuvi to-[#E8C87A] px-4 py-4 text-[15px] font-bold text-bg">Xem hợp mệnh →</button>
          <Link href="/tu-vi/kien-thuc" className="rounded-[14px] border border-gold/20 bg-surface px-4 py-4 text-center text-[15px] font-semibold text-gold">Xem kho kiến thức Tử Vi</Link>
        </div>
      </form>

      <BottomSheet open={picker.step === 'province'} title="Chọn Tỉnh / Thành Phố" onClose={() => setPicker((prev) => ({ ...prev, step: 'closed' }))}>
        <input value={provinceQuery} onChange={(event) => setProvinceQuery(event.target.value)} className="sticky top-0 mb-3 w-full rounded-[12px] border border-border bg-surface-2 px-[14px] py-[10px] text-[14px] text-text outline-none" placeholder="Tìm tỉnh..." />
        <div>
          {filteredProvinces.map((prov) => (
            <button key={prov.name} type="button" onClick={() => { setLocation(picker.person, prov.name, prov.cities[0].name, prov.cities[0].longitude); setCityQuery(''); setPicker((prev) => ({ ...prev, step: 'city' })); }} className={`flex w-full items-center justify-between border-b border-border-2 px-5 py-3 text-left text-[15px] ${currentProvinceName === prov.name ? 'bg-tuvi-bg text-gold font-semibold' : 'text-text hover:bg-surface-2'}`}>
              <span>{prov.name}</span>
              <span className="text-[12px] text-text-2">{prov.cities.length} TP</span>
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={picker.step === 'city'} title={`Chọn Thành Phố • ${currentProvinceName}`} onClose={() => setPicker((prev) => ({ ...prev, step: 'closed' }))}>
        <div className="mb-3 flex items-center gap-2">
          <button type="button" onClick={() => setPicker((prev) => ({ ...prev, step: 'province' }))} className="rounded-[8px] border border-border bg-surface-2 px-3 py-1 text-[12px] text-text-2 hover:text-text">← Quay lại</button>
          <input value={cityQuery} onChange={(event) => setCityQuery(event.target.value)} className="flex-1 rounded-[12px] border border-border bg-surface-2 px-[14px] py-[10px] text-[14px] text-text outline-none" placeholder="Tìm thành phố..." />
        </div>
        <div className="mb-3 rounded-[16px] border border-gold/15 bg-tuvi-bg px-4 py-3 text-[13px] text-text-2">Kinh độ dùng cho lá số: <span className="font-semibold text-gold">{(picker.person === 'a' ? longitudeA : longitudeB).toFixed(2)}°Đ</span></div>
        <div>
          {filteredCities.map((city) => (
            <button key={city.name} type="button" onClick={() => { setLocation(picker.person, currentProvinceName, city.name, city.longitude); setPicker((prev) => ({ ...prev, step: 'closed' })); }} className="flex w-full items-center justify-between border-b border-border-2 px-5 py-3 text-left text-text hover:bg-surface-2">
              <span>
                <span className="block text-[15px]">{city.name}</span>
                <span className="mt-1 block text-[12px] text-text-2">{city.longitude.toFixed(2)}°Đ</span>
              </span>
            </button>
          ))}
        </div>
      </BottomSheet>
    </main>
  );
}
