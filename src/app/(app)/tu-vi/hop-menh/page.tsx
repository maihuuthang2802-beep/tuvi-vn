'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BottomSheet from '@/components/layout/BottomSheet';
import ModuleHero from '@/components/shared/ModuleHero';
import { PROVINCES } from '@/lib/ziwei/cities';
import { calcTrueSolarBranch } from '@/lib/ziwei/true-solar';

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
  timeMode,
  setTimeMode,
  clockTime,
  setClockTime,
  province,
  city,
  longitude,
  openPicker,
  birthDate,
  setBirthDate,
  birthDateError,
  setBirthDateError,
  calendar,
  setCalendar,
  maxDate,
  minDate,
}: {
  prefix: PersonKey;
  title: string;
  accent: string;
  gender: 'Nam' | 'Nữ';
  setGender: (value: 'Nam' | 'Nữ') => void;
  hour: string;
  setHour: (value: string) => void;
  timeMode: 'branch' | 'exact';
  setTimeMode: (value: 'branch' | 'exact') => void;
  clockTime: string;
  setClockTime: (value: string) => void;
  province: string;
  city: string;
  longitude: number;
  openPicker: () => void;
  birthDate: string;
  setBirthDate: (value: string) => void;
  birthDateError: string;
  setBirthDateError: (value: string) => void;
  calendar: 'Dương lịch' | 'Âm lịch';
  setCalendar: (value: 'Dương lịch' | 'Âm lịch') => void;
  maxDate: string;
  minDate: string;
}) {
  const [clockHourText, clockMinuteText] = clockTime.split(':');
  const trueSolarHourPreview = calcTrueSolarBranch(Number(clockHourText) || 0, Number(clockMinuteText) || 0, longitude);
  return (
    <div className="rounded-[20px] border border-border bg-surface p-5">
      <div className="text-[11px] uppercase tracking-[2px]" style={{ color: accent }}>{title}</div>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">HỌ TÊN</label>
          <input id={`${prefix}Name`} className="mt-2 w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" placeholder="Nhập họ tên" />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">NGÀY SINH</label>
          <input
            id={`${prefix}BirthDate`}
            type="date"
            value={birthDate}
            onChange={(e) => {
              const val = e.target.value;
              setBirthDate(val);
              if (val) {
                if (val > maxDate) {
                  setBirthDateError('Ngày sinh không được ở tương lai');
                } else if (val < minDate) {
                  setBirthDateError('Ngày sinh phải từ năm 1900 trở đi');
                } else {
                  setBirthDateError('');
                }
              }
            }}
            max={maxDate}
            min={minDate}
            className={`mt-2 w-full rounded-[12px] border bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none ${birthDateError ? 'border-red-400' : 'border-border-2'}`}
          />
          {birthDateError && <p className="mt-1 text-[12px] text-red-400">{birthDateError}</p>}
          <div className="mt-3 flex gap-2">
            {(['Dương lịch', 'Âm lịch'] as const).map((item) => (
              <button key={item} type="button" onClick={() => setCalendar(item)} className={`rounded-full px-4 py-2 text-[13px] font-semibold ${calendar === item ? 'bg-tuvi-bg text-gold border border-gold/40' : 'border border-border text-text-2'}`}>{item}</button>
            ))}
          </div>
          <input type="hidden" name={`${prefix}Calendar`} value={calendar} />
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">GIỜ SINH</label>
          <div className="mt-2 flex gap-2">
            {([['branch', 'Canh giờ'], ['exact', 'Giờ chính xác']] as const).map(([key, label]) => (
              <button key={key} type="button" onClick={() => setTimeMode(key)} className={`flex-1 rounded-full px-3 py-2 text-[12px] font-semibold ${timeMode === key ? 'bg-tuvi-bg text-gold border border-gold/40' : 'border border-border text-text-2'}`}>{label}</button>
            ))}
          </div>
          {timeMode === 'branch' ? (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {HOURS.map((item) => (
                <button key={`${prefix}-${item}`} type="button" onClick={() => setHour(item)} className={`rounded-[12px] border px-3 py-3 text-[14px] ${hour === item ? 'border-tuvi bg-tuvi-bg text-gold' : 'border-border-2 bg-surface-2 text-text-2'}`}>{item}</button>
              ))}
            </div>
          ) : (
            <div className="mt-3">
              <input type="time" value={clockTime} onChange={(e) => setClockTime(e.target.value)} className="w-full rounded-[12px] border border-border-2 bg-surface-2 px-[14px] py-3 text-[15px] text-text outline-none" />
              <p className="mt-2 text-[12px] text-text-3">Giờ mặt trời thật tại {city}: canh <span className="font-semibold text-gold">{HOURS[trueSolarHourPreview]}</span>.</p>
            </div>
          )}
        </div>
        <div>
          <label className="text-[11px] font-bold uppercase tracking-[1px] text-gold">GIỚI TÍNH</label>
          <div className="mt-2 flex gap-2">
            {(['Nam', 'Nữ'] as const).map((item) => (
              <button key={`${prefix}-${item}`} type="button" onClick={() => setGender(item)} className={`flex-1 rounded-[12px] border px-4 py-3 text-[15px] font-semibold ${gender === item ? 'border-tuvi bg-tuvi-bg text-gold' : 'border-border-2 bg-surface-2 text-text-2'}`}>{item}</button>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default function HopMenhPage() {
  const router = useRouter();
  const [genderA, setGenderA] = useState<'Nam' | 'Nữ'>('Nam');
  const [genderB, setGenderB] = useState<'Nam' | 'Nữ'>('Nữ');
  const [hourA, setHourA] = useState('Tý');
  const [hourB, setHourB] = useState('Tý');
  const [timeModeA, setTimeModeA] = useState<'branch' | 'exact'>('branch');
  const [timeModeB, setTimeModeB] = useState<'branch' | 'exact'>('branch');
  const [clockTimeA, setClockTimeA] = useState('12:00');
  const [clockTimeB, setClockTimeB] = useState('12:00');
  const [provinceA, setProvinceA] = useState(DEFAULT_PROVINCE.name);
  const [provinceB, setProvinceB] = useState(DEFAULT_PROVINCE.name);
  const [cityA, setCityA] = useState(DEFAULT_CITY.name);
  const [cityB, setCityB] = useState(DEFAULT_CITY.name);
  const [longitudeA, setLongitudeA] = useState(DEFAULT_CITY.longitude);
  const [longitudeB, setLongitudeB] = useState(DEFAULT_CITY.longitude);
  const [picker, setPicker] = useState<PickerState>({ person: 'a', step: 'closed' });
  const [provinceQuery, setProvinceQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [birthDateA, setBirthDateA] = useState('');
  const [birthDateB, setBirthDateB] = useState('');
  const [birthDateErrorA, setBirthDateErrorA] = useState('');
  const [birthDateErrorB, setBirthDateErrorB] = useState('');
  const [calendarA, setCalendarA] = useState<'Dương lịch' | 'Âm lịch'>('Dương lịch');
  const [calendarB, setCalendarB] = useState<'Dương lịch' | 'Âm lịch'>('Dương lịch');
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const minDate = '1900-01-01';

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthDateA || !birthDateB || birthDateErrorA || birthDateErrorB) return;
    setLoading(true);
    const aName = (document.getElementById('aName') as HTMLInputElement)?.value || '';
    const bName = (document.getElementById('bName') as HTMLInputElement)?.value || '';
    const params = new URLSearchParams();
    params.set('aName', aName);
    params.set('bName', bName);
    params.set('aBirthDate', birthDateA);
    params.set('bBirthDate', birthDateB);
    params.set('aBirthHour', hourA);
    params.set('bBirthHour', hourB);
    params.set('aBirthClockTime', timeModeA === 'exact' ? clockTimeA : '');
    params.set('bBirthClockTime', timeModeB === 'exact' ? clockTimeB : '');
    params.set('aGender', genderA);
    params.set('bGender', genderB);
    params.set('aProvince', provinceA);
    params.set('bProvince', provinceB);
    params.set('aCity', cityA);
    params.set('bCity', cityB);
    params.set('aLongitude', String(longitudeA));
    params.set('bLongitude', String(longitudeB));
    router.push(`/ket-qua/hop-menh?${params.toString()}`);
  }

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon="◎" title="Hợp Mệnh Tử Vi" subtitle="Đối chiếu hai lá số · Mệnh, Phu thê, Phúc đức, Đại hạn" accent="var(--color-tuvi)" />
      <form onSubmit={handleSubmit} className="mx-5 mt-5 space-y-5 md:mx-auto md:max-w-[1100px]">
        <div className="grid gap-5 md:grid-cols-2">
          <PersonForm prefix="a" title="Người A" accent="var(--color-tuvi)" gender={genderA} setGender={setGenderA} hour={hourA} setHour={setHourA} timeMode={timeModeA} setTimeMode={setTimeModeA} clockTime={clockTimeA} setClockTime={setClockTimeA} province={provinceA} city={cityA} longitude={longitudeA} openPicker={() => { setProvinceQuery(''); setPicker({ person: 'a', step: 'province' }); }} birthDate={birthDateA} setBirthDate={setBirthDateA} birthDateError={birthDateErrorA} setBirthDateError={setBirthDateErrorA} calendar={calendarA} setCalendar={setCalendarA} maxDate={today} minDate={minDate} />
          <PersonForm prefix="b" title="Người B" accent="var(--color-ai)" gender={genderB} setGender={setGenderB} hour={hourB} setHour={setHourB} timeMode={timeModeB} setTimeMode={setTimeModeB} clockTime={clockTimeB} setClockTime={setClockTimeB} province={provinceB} city={cityB} longitude={longitudeB} openPicker={() => { setProvinceQuery(''); setPicker({ person: 'b', step: 'province' }); }} birthDate={birthDateB} setBirthDate={setBirthDateB} birthDateError={birthDateErrorB} setBirthDateError={setBirthDateErrorB} calendar={calendarB} setCalendar={setCalendarB} maxDate={today} minDate={minDate} />
        </div>
        <div className="rounded-[20px] border border-gold/15 bg-tuvi-bg p-5 text-[14px] text-text-2">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Phạm vi đối chiếu</div>
          <div className="mt-3">MVP hiện đối chiếu Mệnh, Phu thê, Phúc đức, tứ hóa nổi bật và đại hạn hiện tại. Kết quả miễn phí cho điểm hợp và 4 trục chính. Gói mở rộng mở thêm breakdown sâu.</div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <button type="submit" disabled={!birthDateA || !birthDateB || !!birthDateErrorA || !!birthDateErrorB || loading} className="rounded-[14px] bg-gradient-to-br from-tuvi to-[#E8C87A] px-4 py-4 text-[15px] font-bold text-bg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Đang đối chiếu...' : 'Xem hợp mệnh →'}
          </button>
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
