import ModuleHero from '@/components/shared/ModuleHero';
import BasicResultClient from '@/components/result/BasicResultClient';
import HopMenhResultClient from '@/components/result/HopMenhResultClient';
import TuViResultClient from '@/components/result/TuViResultClient';
import { createReading, drawTarotCards } from '@/lib/readings';
import { analyzeCompatibility } from '@/lib/ziwei/compatibility';
import { castIChing } from '@/lib/iching/engine';
import { PROVINCES } from '@/lib/ziwei/cities';
import { generateChart } from '@/lib/ziwei/algorithm';
import { resolveBirthHour } from '@/lib/ziwei/true-solar';
import { saveHistoryEntry } from '@/lib/history';
import { Lunar } from 'lunar-javascript';

const HOURS = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

function toSolarDate(dateStr: string, calendar: string | undefined): string {
  if (calendar !== 'Âm lịch' || !dateStr) return dateStr;
  const d = new Date(dateStr + 'T00:00:00');
  const lunar = Lunar.fromYmd(d.getFullYear(), d.getMonth() + 1, d.getDate());
  const solar = lunar.getSolar();
  return `${solar.getYear()}-${String(solar.getMonth()).padStart(2, '0')}-${String(solar.getDay()).padStart(2, '0')}`;
}

function buildPlanHref(service: string, params: Record<string, string | undefined>, plan: 'starter' | 'pro' = 'starter') {
  const query = new URLSearchParams({ service, plan, returnTo: `/ket-qua/${service}` });
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return `/goi-dich-vu?${query.toString()}`;
}

function getServiceMeta(service: string) {
  if (service === 'tu-vi') return { icon: '☯', title: 'Kết Quả Lá Số Tử Vi', subtitle: 'Lá số thật · Tóm lược · AI mở rộng', accent: 'var(--color-tuvi)', aiText: 'Mở AI luận giải lá số' };
  if (service === 'hop-menh') return { icon: '◎', title: 'Kết Quả Hợp Mệnh', subtitle: 'Đối chiếu hai lá số · Điểm hợp · Gợi ý hành động', accent: 'var(--color-tuvi)', aiText: 'Mở AI luận giải hợp mệnh' };
  if (service === 'kinh-dich') return { icon: '☰', title: 'Kết Quả Kinh Dịch', subtitle: 'Quẻ chủ · Hào động · AI giải quẻ', accent: 'var(--color-kinh)', aiText: 'Mở AI giải quẻ' };
  if (service === 'xin-xam') return { icon: '❀', title: 'Kết Quả Xin Xăm', subtitle: 'Xăm quẻ · Dịch nghĩa · AI mở rộng', accent: 'var(--color-xam)', aiText: 'Mở AI giải xăm' };
  return { icon: '✦', title: 'Kết Quả Tarot', subtitle: 'Trải bài · Tóm lược · AI luận giải', accent: 'var(--color-tarot)', aiText: 'Mở AI luận giải Tarot' };
}

function getLocation(provinceName: string | undefined, cityName: string | undefined, longitudeValue: string | undefined) {
  const province = PROVINCES.find((item) => item.name === provinceName) || PROVINCES[0];
  const city = province.cities.find((item) => item.name === cityName) || province.cities[0];
  const longitude = Number(longitudeValue);
  return { province: province.name, city: city.name, longitude: Number.isFinite(longitude) ? longitude : city.longitude };
}

async function renderTuVi(params: Record<string, string | undefined>) {
  const location = getLocation(params.province, params.city, params.longitude);
  const paywallHref = buildPlanHref('tu-vi', params);
  const unlocked = params.upgraded === '1';
  const { hourIndex, dateStr } = resolveBirthHour({
    branch: params.birthHour,
    branchList: HOURS,
    clockTime: params.birthClockTime,
    longitude: location.longitude,
    dateStr: toSolarDate(params.birthDate || '1995-01-01', params.calendar),
  });
  const result = createReading({
    service: 'tu-vi',
    name: params.name,
    birthDate: dateStr,
    birthTime: `${String(hourIndex * 2).padStart(2, '0')}:00`,
    gender: params.gender === 'Nữ' ? 'female' : 'male',
    province: location.province,
    city: location.city,
    longitude: location.longitude,
  });
  const date = new Date(dateStr);
  const chart = generateChart({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: hourIndex,
    gender: params.gender === 'Nữ' ? 'female' : 'male',
    name: params.name,
    province: location.province,
    city: location.city,
    longitude: location.longitude,
  });

  await saveHistoryEntry('tu-vi', result.title, result.summary, { branch: hourIndex, dateStr });

  return <TuViResultClient result={result} chart={chart} params={params} unlocked={unlocked} paywallHref={paywallHref} />;
}

async function renderHopMenh(params: Record<string, string | undefined>) {
  const locationA = getLocation(params.aProvince, params.aCity, params.aLongitude);
  const locationB = getLocation(params.bProvince, params.bCity, params.bLongitude);
  const paywallHref = buildPlanHref('hop-menh', params);
  const unlocked = params.upgraded === '1';
  const resolvedA = resolveBirthHour({
    branch: params.aBirthHour,
    branchList: HOURS,
    clockTime: params.aBirthClockTime,
    longitude: locationA.longitude,
    dateStr: toSolarDate(params.aBirthDate || '1995-01-01', params.aCalendar),
  });
  const resolvedB = resolveBirthHour({
    branch: params.bBirthHour,
    branchList: HOURS,
    clockTime: params.bBirthClockTime,
    longitude: locationB.longitude,
    dateStr: toSolarDate(params.bBirthDate || '1996-01-01', params.bCalendar),
  });
  const dateA = new Date(resolvedA.dateStr);
  const dateB = new Date(resolvedB.dateStr);
  const chartA = generateChart({
    year: dateA.getFullYear(),
    month: dateA.getMonth() + 1,
    day: dateA.getDate(),
    hour: resolvedA.hourIndex,
    gender: params.aGender === 'Nữ' ? 'female' : 'male',
    name: params.aName,
    province: locationA.province,
    city: locationA.city,
    longitude: locationA.longitude,
  });
  const chartB = generateChart({
    year: dateB.getFullYear(),
    month: dateB.getMonth() + 1,
    day: dateB.getDate(),
    hour: resolvedB.hourIndex,
    gender: params.bGender === 'Nữ' ? 'female' : 'male',
    name: params.bName,
    province: locationB.province,
    city: locationB.city,
    longitude: locationB.longitude,
  });
  const analysis = analyzeCompatibility(chartA, chartB);
  const result = {
    title: `Hợp mệnh: ${params.aName || 'Người A'} & ${params.bName || 'Người B'}`,
    summary: `${analysis.level} · ${analysis.score}/100. ${analysis.summary}`,
    details: unlocked
      ? analysis.details.concat(analysis.axes.map((axis) => `${axis.label}: ${axis.score}/100 — ${axis.summary}`)).concat(analysis.premiumSections.flatMap((section) => [`${section.title}${section.score ? `: ${section.score}/100` : ''} — ${section.summary}`, ...section.highlights]))
      : analysis.details.concat(analysis.axes.map((axis) => `${axis.label}: ${axis.score}/100 — ${axis.summary}`)),
    advice: analysis.advice.join(' '),
  };
  await saveHistoryEntry('hop-menh', result.title, result.summary, { score: analysis.score, level: analysis.level });

  return <HopMenhResultClient result={result} analysis={analysis} chartA={chartA} chartB={chartB} params={params} unlocked={unlocked} paywallHref={paywallHref} />;
}

async function renderBasicResult(service: 'kinh-dich' | 'xin-xam' | 'tarot', params: Record<string, string | undefined>) {
  const result = createReading({ service, question: params.question, spread: params.spread as '1' | '3' | undefined, method: params.method as 'luchao' | 'thieny' | 'maihoa' | undefined, objectName: params.objectName, datetime: params.datetime });
  const reading = service === 'kinh-dich' ? castIChing({ method: params.method as 'luchao' | 'thieny' | 'maihoa' | undefined, question: params.question, objectName: params.objectName, datetime: params.datetime }) : null;
  const tarotDraws = service === 'tarot' ? drawTarotCards(params.question?.trim() || 'Trải bài tổng quan hiện tại', params.spread === '1' ? '1' : '3') : null;
  const methodLabel = params.method === 'thieny' ? 'Thiên Ý' : params.method === 'maihoa' ? 'Mai Hoa' : 'Lục Hào';
  const paywallHref = buildPlanHref(service, params);
  const unlocked = params.upgraded === '1';

  await saveHistoryEntry(service, result.title, result.summary, { methodLabel });

  return (
    <BasicResultClient service={service} result={result} reading={reading} tarotDraws={tarotDraws} methodLabel={methodLabel} params={params} unlocked={unlocked} paywallHref={paywallHref} />
  );
}

export default async function ResultPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params;
  const query = await searchParams;
  const service = slug as 'tu-vi' | 'hop-menh' | 'kinh-dich' | 'xin-xam' | 'tarot';
  const meta = getServiceMeta(service);
  const flatParams = Object.fromEntries(Object.entries(query).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]));

  return (
    <main className="page-enter pb-10">
      <ModuleHero icon={meta.icon} title={meta.title} subtitle={meta.subtitle} accent={meta.accent} />
      {service === 'tu-vi' ? await renderTuVi(flatParams) : service === 'hop-menh' ? await renderHopMenh(flatParams) : await renderBasicResult(service === 'kinh-dich' ? 'kinh-dich' : service === 'xin-xam' ? 'xin-xam' : 'tarot', flatParams)}
    </main>
  );
}
