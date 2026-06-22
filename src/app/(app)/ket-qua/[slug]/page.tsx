import ModuleHero from '@/components/shared/ModuleHero';
import BasicResultClient from '@/components/result/BasicResultClient';
import TuViResultClient from '@/components/result/TuViResultClient';
import { createReading, drawTarotCards } from '@/lib/readings';
import { castIChing } from '@/lib/iching/engine';
import { PROVINCES } from '@/lib/ziwei/cities';
import { generateChart } from '@/lib/ziwei/algorithm';

const HOURS = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

function buildPlanHref(service: string, params: Record<string, string | undefined>, plan: 'starter' | 'pro' = 'starter') {
  const query = new URLSearchParams({ service, plan, returnTo: `/ket-qua/${service}` });
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return `/goi-dich-vu?${query.toString()}`;
}

function getServiceMeta(service: string) {
  if (service === 'tu-vi') return { icon: '☯', title: 'Kết Quả Lá Số Tử Vi', subtitle: 'Lá số thật · Tóm lược · AI mở rộng', accent: 'var(--color-tuvi)', aiText: 'Mở AI luận giải lá số' };
  if (service === 'kinh-dich') return { icon: '☰', title: 'Kết Quả Kinh Dịch', subtitle: 'Quẻ chủ · Hào động · AI giải quẻ', accent: 'var(--color-kinh)', aiText: 'Mở AI giải quẻ' };
  if (service === 'xin-xam') return { icon: '❀', title: 'Kết Quả Xin Xăm', subtitle: 'Xăm quẻ · Dịch nghĩa · AI mở rộng', accent: 'var(--color-xam)', aiText: 'Mở AI giải xăm' };
  return { icon: '✦', title: 'Kết Quả Tarot', subtitle: 'Trải bài · Tóm lược · AI luận giải', accent: 'var(--color-tarot)', aiText: 'Mở AI luận giải Tarot' };
}

function getHourIndex(hour: string | undefined) {
  const idx = HOURS.indexOf(hour || 'Tý');
  return idx >= 0 ? idx : 0;
}

function getLocation(provinceName: string | undefined, cityName: string | undefined, longitudeValue: string | undefined) {
  const province = PROVINCES.find((item) => item.name === provinceName) || PROVINCES[0];
  const city = province.cities.find((item) => item.name === cityName) || province.cities[0];
  const longitude = Number(longitudeValue);
  return { province: province.name, city: city.name, longitude: Number.isFinite(longitude) ? longitude : city.longitude };
}

function renderTuVi(params: Record<string, string | undefined>) {
  const location = getLocation(params.province, params.city, params.longitude);
  const paywallHref = buildPlanHref('tu-vi', params);
  const unlocked = params.upgraded === '1';
  const birthDate = params.birthDate || '1995-01-01';
  const result = createReading({
    service: 'tu-vi',
    name: params.name,
    birthDate,
    birthTime: `${String(getHourIndex(params.birthHour) * 2).padStart(2, '0')}:00`,
    gender: params.gender === 'Nữ' ? 'female' : 'male',
    province: location.province,
    city: location.city,
    longitude: location.longitude,
  });
  const date = new Date(birthDate);
  const chart = generateChart({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: getHourIndex(params.birthHour),
    gender: params.gender === 'Nữ' ? 'female' : 'male',
    name: params.name,
    province: location.province,
    city: location.city,
    longitude: location.longitude,
  });

  return <TuViResultClient result={result} chart={chart} params={params} unlocked={unlocked} paywallHref={paywallHref} />;
}

function renderBasicResult(service: 'kinh-dich' | 'xin-xam' | 'tarot', params: Record<string, string | undefined>) {
  const result = createReading({ service, question: params.question, spread: params.spread as '1' | '3' | undefined, method: params.method as 'luchao' | 'thieny' | 'maihoa' | undefined, objectName: params.objectName, datetime: params.datetime });
  const reading = service === 'kinh-dich' ? castIChing({ method: params.method as 'luchao' | 'thieny' | 'maihoa' | undefined, question: params.question, objectName: params.objectName, datetime: params.datetime }) : null;
  const tarotDraws = service === 'tarot' ? drawTarotCards(params.question?.trim() || 'Trải bài tổng quan hiện tại', params.spread === '1' ? '1' : '3') : null;
  const methodLabel = params.method === 'thieny' ? 'Thiên Ý' : params.method === 'maihoa' ? 'Mai Hoa' : 'Lục Hào';
  const paywallHref = buildPlanHref(service, params);
  const unlocked = params.upgraded === '1';
  return (
    <BasicResultClient service={service} result={result} reading={reading} tarotDraws={tarotDraws} methodLabel={methodLabel} params={params} unlocked={unlocked} paywallHref={paywallHref} />
  );
}

export default async function ResultPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const service = slug as 'tu-vi' | 'kinh-dich' | 'xin-xam' | 'tarot';
  const meta = getServiceMeta(service);
  const flatParams = Object.fromEntries(Object.entries(query).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]));

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon={meta.icon} title={meta.title} subtitle={meta.subtitle} accent={meta.accent} />
      {service === 'tu-vi' ? renderTuVi(flatParams) : renderBasicResult(service === 'kinh-dich' ? 'kinh-dich' : service === 'xin-xam' ? 'xin-xam' : 'tarot', flatParams)}
    </main>
  );
}
