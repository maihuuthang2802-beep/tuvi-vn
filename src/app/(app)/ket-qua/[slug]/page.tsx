import Link from 'next/link';
import ModuleHero from '@/components/shared/ModuleHero';
import BasicResultClient from '@/components/result/BasicResultClient';
import { createReading, drawTarotCards } from '@/lib/readings';
import { castIChing } from '@/lib/iching/engine';
import { PROVINCES } from '@/lib/ziwei/cities';
import { BRANCH_VI, PALACE_VI, SIHUA_VI, viPalace, viStars } from '@/lib/ziwei/vietnamese';
import { generateChart } from '@/lib/ziwei/algorithm';

const HOURS = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const TABS = ['Tổng quan', 'Cung Mệnh', 'Đại Hạn', 'Tứ Hóa', 'Các Cung'] as const;

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
  const ming = chart.palaces.find((palace) => palace.isMingGong);
  const currentDaXian = chart.daXians[chart.currentDaXianIndex];
  const sihua = ming?.stars.filter((star) => star.siHua);

  return (
    <>
      <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Lá số thật</div>
          <h2 className="mt-2 font-[var(--font-display)] text-[28px] font-bold text-text">{result.title}</h2>
          <p className="mt-2 text-[14px] text-text-2">{result.summary}</p>
          <div className="mt-4 grid gap-2 md:grid-cols-5">
            {TABS.map((tab) => <div key={tab} className="rounded-full border border-gold/20 bg-tuvi-bg px-4 py-2 text-center text-[13px] font-semibold text-gold">{tab}</div>)}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-[14px] md:grid-cols-4">
            {chart.palaces.map((palace) => (
              <article key={`${palace.branch}-${palace.name}`} className={`rounded-[18px] border p-3 ${palace.isMingGong ? 'border-gold/40 bg-tuvi-bg' : palace.isCurrentDaXian ? 'border-ai/40 bg-ai-bg' : 'border-border bg-surface-2'}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-text">{viPalace(palace.name)}</div>
                  <div className="text-[11px] text-text-3">{BRANCH_VI[palace.branch]}</div>
                </div>
                <div className="mt-2 text-[12px] text-text-2">{palace.stars.filter((star) => star.type === 'major').length ? viStars(palace.stars.filter((star) => star.type === 'major').map((star) => star.name)) : 'Vô chính diệu'}</div>
                {palace.borrowedStars?.length ? <div className="mt-2 text-[11px] text-gold">Mượn: {viStars(palace.borrowedStars)}</div> : null}
              </article>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Tổng quan</div>
            <div className="mt-3 space-y-3 text-[14px] text-text-2">
              {result.details.map((detail) => <p key={detail}>{detail}</p>)}
            </div>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Cung Mệnh</div>
            <p className="mt-3 text-[14px] text-text-2">{ming ? `${viPalace(ming.name)} tại ${BRANCH_VI[ming.branch]}. Chính tinh: ${ming.stars.filter((star) => star.type === 'major').length ? viStars(ming.stars.filter((star) => star.type === 'major').map((star) => star.name)) : 'Vô chính diệu'}.` : 'Chưa xác định cung Mệnh.'}</p>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Đại Hạn</div>
            <p className="mt-3 text-[14px] text-text-2">{currentDaXian ? `${currentDaXian.startAge}-${currentDaXian.endAge} tại cung ${PALACE_VI[currentDaXian.palaceName] || currentDaXian.palaceName}.` : 'Chưa xác định đại hạn hiện tại.'}</p>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Tứ Hóa</div>
            <div className="mt-3 space-y-2 text-[14px] text-text-2">
              {sihua?.length ? sihua.map((star) => <p key={`${star.name}-${star.siHua}`}>{SIHUA_VI[star.siHua || ''] || star.siHua}: {viStars([star.name])}</p>) : <p>Chưa thấy tứ hóa nổi bật ngay tại cung Mệnh trong bản tóm lược này.</p>}
            </div>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Tải về</div>
            <p className="mt-2 text-[13px] text-text-3">Download PDF bao gồm biểu đồ cung Mệnh và toàn bộ giải thích.</p>
            <button disabled className="mt-3 w-full rounded-[12px] bg-gold/50 px-4 py-3 text-[13px] font-bold text-bg/50 cursor-not-allowed">PDF Report (server-side render)</button>
          </section>
          <section className="rounded-[24px] border border-[rgba(44,195,184,0.3)] bg-ai-bg p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-ai">AI premium</div>
            <p className="mt-2 text-[14px] text-text">{unlocked ? 'Checkout mock đã mở khóa. Bước kế tiếp: nối provider AI thật vào luồng luận giải chuyên sâu.' : result.advice}</p>
            <Link href={paywallHref} className="mt-4 block rounded-[14px] bg-gradient-to-br from-ai to-[#6BE0D7] px-4 py-3 text-center text-[14px] font-bold text-bg">{unlocked ? 'Đã mở khóa gói mock' : 'Mở AI luận giải lá số'}</Link>
          </section>
        </div>
      </section>
    </>
  );
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
