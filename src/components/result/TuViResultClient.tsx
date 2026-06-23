'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ZiweiChart } from '@/lib/ziwei/types';
import type { ReadingResult } from '@/lib/readings';
import { BRANCH_VI, PALACE_VI, SIHUA_VI, viPalace, viStars, viWuxingJu } from '@/lib/ziwei/vietnamese';
import { getStarSlugByName } from '@/lib/ziwei/knowledge';
import { detectCachCuc, getStarDeepMeaning, analyzeCurrentDaXian } from '@/lib/ziwei/patterns';
import { downloadPDF } from '@/lib/pdf';
import ShareCardButton from '@/components/share/ShareCardButton';

interface TuViResultClientProps {
  result: ReadingResult;
  chart: ZiweiChart;
  params: Record<string, string | undefined>;
  unlocked: boolean;
  paywallHref: string;
}

type TabType = 'overview' | 'ming' | 'daxian' | 'sihua' | 'palaces';

const TABS: { id: TabType; label: string; icon: string }[] = [
  { id: 'overview', label: 'Tổng quan', icon: '◎' },
  { id: 'ming', label: 'Cung Mệnh', icon: '☆' },
  { id: 'daxian', label: 'Đại Hạn', icon: '◇' },
  { id: 'sihua', label: 'Tứ Hóa', icon: '◈' },
  { id: 'palaces', label: 'Các Cung', icon: '◉' },
];

export default function TuViResultClient({
  result,
  chart,
  params,
  unlocked,
  paywallHref,
}: TuViResultClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [downloading, setDownloading] = useState(false);

  const ming = chart.palaces.find(p => p.isMingGong);
  const currentDaXian = chart.daXians[chart.currentDaXianIndex];
  const sihua = ming?.stars.filter(s => s.siHua) || [];
  const patterns = detectCachCuc(chart);
  const knowledgeStars = Array.from(new Set(chart.palaces.flatMap(p => p.stars.filter(s => s.type === 'major').map(s => s.name)))).map((name) => ({ name, slug: getStarSlugByName(viStars([name])) })).filter((item): item is { name: string; slug: string } => Boolean(item.slug)).slice(0, 6);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      await downloadPDF('tu-vi', result, params.question || '', {
        name: params.name || '',
        birthDate: params.birthDate || '',
        wuxingJu: chart.wuxingJuName,
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Lá số thật</div>
          <h2 className="mt-2 font-[var(--font-display)] text-[28px] font-bold text-text">{result.title}</h2>
          <p className="mt-2 text-[14px] text-text-2">{result.summary}</p>

          <div className="mt-5 flex gap-2 overflow-x-auto border-b border-border/50 pb-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-4 py-3 text-[13px] font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-gold text-gold'
                    : 'text-text-3 hover:text-text-2'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-5">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-[12px] uppercase tracking-[1px] text-gold/70 mb-2">Mệnh số</h3>
                  <p className="text-[14px] text-text">{viWuxingJu(chart.wuxingJuName)}</p>
                </div>
                <div>
                  <h3 className="text-[12px] uppercase tracking-[1px] text-gold/70 mb-2">Cách cục</h3>
                  {patterns.length > 0 ? (
                    <div className="space-y-3">
                      {patterns.map(pattern => (
                        <div key={pattern.name} className="rounded-lg border border-gold/20 bg-tuvi-bg/50 p-3">
                          <p className="text-[13px] font-semibold text-gold">{pattern.name}</p>
                          <p className="mt-1 text-[13px] text-text-2">{pattern.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-text-3">Chưa phát hiện cách cục nổi bật.</p>
                  )}
                </div>
                <div>
                  <h3 className="text-[12px] uppercase tracking-[1px] text-gold/70 mb-2">Tóm lược</h3>
                  <div className="space-y-2 text-[14px] text-text-2">
                    {result.details.map(detail => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                </div>
                {knowledgeStars.length ? (
                  <div>
                    <h3 className="text-[12px] uppercase tracking-[1px] text-gold/70 mb-2">Đọc sâu theo sao đang hiện</h3>
                    <div className="flex flex-wrap gap-2">
                      {knowledgeStars.map((star) => (
                        <Link key={star.name} href={`/tu-vi/kien-thuc/${star.slug}/overview`} className="rounded-full border border-gold/20 bg-tuvi-bg px-3 py-2 text-[12px] text-gold hover:opacity-90">
                          {viStars([star.name])}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {activeTab === 'ming' && (
              <div className="space-y-4">
                {ming ? (
                  <>
                    <div>
                      <h3 className="text-[12px] uppercase tracking-[1px] text-gold/70 mb-2">Vị trí</h3>
                      <p className="text-[14px] text-text">
                        {viPalace(ming.name)} tại {BRANCH_VI[ming.branch]}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[12px] uppercase tracking-[1px] text-gold/70 mb-2">Chính tinh</h3>
                      {ming.stars.filter(s => s.type === 'major').length ? (
                        <div className="space-y-2">
                          {ming.stars
                            .filter(s => s.type === 'major')
                            .map(star => (
                               <div key={star.name} className="rounded-lg border border-gold/20 bg-tuvi-bg/50 p-3">
                                 <div className="flex items-start justify-between gap-3">
                                   <p className="text-[13px] font-semibold text-gold">{viStars([star.name])}</p>
                                   {getStarSlugByName(viStars([star.name])) ? (
                                     <Link href={`/tu-vi/kien-thuc/${getStarSlugByName(viStars([star.name]))}/overview`} className="text-[11px] text-ai hover:underline">
                                       Đọc sao
                                     </Link>
                                   ) : null}
                                 </div>
                                 <p className="mt-1 text-[12px] text-text-2">
                                   {getStarDeepMeaning(star.name, ming.name)}
                                 </p>
                               </div>

                            ))}
                        </div>
                      ) : (
                        <p className="text-[13px] text-text-3">Vô chính diệu - Mệnh cung không có chính tinh.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-[13px] text-text-3">Chưa xác định cung Mệnh.</p>
                )}
              </div>
            )}

            {activeTab === 'daxian' && (
              <div className="space-y-4">
                {currentDaXian ? (
                  <>
                    <div>
                      <h3 className="text-[12px] uppercase tracking-[1px] text-gold/70 mb-2">Giai đoạn hiện tại</h3>
                      <p className="text-[14px] text-text">
                        Tuổi {currentDaXian.startAge}-{currentDaXian.endAge}
                      </p>
                      <p className="mt-2 text-[13px] text-text-2">{analyzeCurrentDaXian(chart)}</p>
                    </div>
                    <div>
                      <h3 className="text-[12px] uppercase tracking-[1px] text-gold/70 mb-2">Toàn bộ các giai đoạn</h3>
                      <div className="space-y-2">
                        {chart.daXians.map((dx, idx) => (
                          <div
                            key={`${dx.palaceName}-${idx}`}
                            className={`rounded-lg border p-3 transition ${
                              idx === chart.currentDaXianIndex
                                ? 'border-gold/50 bg-tuvi-bg'
                                : 'border-border/50 bg-surface-2'
                            }`}
                          >
                            <p className="text-[13px] font-semibold text-text">
                              Tuổi {dx.startAge}-{dx.endAge}: {PALACE_VI[dx.palaceName] || dx.palaceName}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-[13px] text-text-3">Chưa xác định đại hạn hiện tại.</p>
                )}
              </div>
            )}

            {activeTab === 'sihua' && (
              <div className="space-y-4">
                {sihua.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-[13px] text-text-3">Tứ hóa tại cung Mệnh:</p>
                    {sihua.map(star => (
                      <div key={`${star.name}-${star.siHua}`} className="rounded-lg border border-gold/20 bg-tuvi-bg/50 p-3">
                        <p className="text-[13px] font-semibold text-gold">
                          {SIHUA_VI[star.siHua || ''] || star.siHua}: {viStars([star.name])}
                        </p>
                        <p className="mt-1 text-[12px] text-text-2">
                          Ảnh hưởng đến tính cách và vận mệnh trực tiếp.
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-text-3">
                    Chưa thấy tứ hóa nổi bật ngay tại cung Mệnh. Có thể tứ hóa hóa giải hoặc ở cung khác.
                  </p>
                )}
              </div>
            )}

             {activeTab === 'palaces' && (
               <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                 {chart.palaces.map(palace => {
                   const mainStars = palace.stars.filter(s => s.type === 'major');
                   const palaceKnowledgeLinks = mainStars.map((star) => ({ name: star.name, slug: getStarSlugByName(viStars([star.name])) })).filter((item): item is { name: string; slug: string } => Boolean(item.slug));
                   return (
                     <div

                      key={`${palace.branch}-${palace.name}`}
                      className={`rounded-[18px] border p-3 transition ${
                        palace.isMingGong
                          ? 'border-gold/40 bg-tuvi-bg'
                          : palace.isCurrentDaXian
                            ? 'border-ai/40 bg-ai-bg'
                            : 'border-border bg-surface-2'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-text">{viPalace(palace.name)}</p>
                          <p className="text-[11px] text-text-3">{BRANCH_VI[palace.branch]}</p>
                        </div>
                        {palace.isMingGong && <span className="text-[11px] text-gold">★ Mệnh</span>}
                      </div>
                      <p className="mt-2 text-[12px] text-text-2">
                        {mainStars.length ? viStars(mainStars.map(s => s.name)) : 'Vô chính diệu'}
                      </p>
                      {palace.borrowedStars?.length ? (
                        <p className="mt-1 text-[11px] text-gold">Mượn: {viStars(palace.borrowedStars)}</p>
                      ) : null}
                      {palaceKnowledgeLinks.length ? (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {palaceKnowledgeLinks.map((item) => (
                            <Link key={`${palace.name}-${item.name}`} href={`/tu-vi/kien-thuc/${item.slug}/overview`} className="rounded-full border border-gold/20 bg-surface px-2 py-1 text-[10px] text-gold hover:opacity-90">
                              Đọc {viStars([item.name])}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Kiến thức liên quan</div>
            <div className="mt-3 space-y-2">
              <Link href="/tu-vi/kien-thuc" className="block rounded-[12px] border border-gold/20 bg-tuvi-bg px-4 py-3 text-center text-[13px] font-semibold text-gold">Mở kho kiến thức Tử Vi</Link>
              <Link href="/tu-vi/hop-menh" className="block rounded-[12px] border border-[rgba(44,195,184,0.3)] bg-ai-bg px-4 py-3 text-center text-[13px] font-semibold text-ai">Xem hợp mệnh với lá số này</Link>
            </div>
          </section>
          <section className="rounded-[24px] border border-border bg-surface p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-gold">Tải về</div>
            <p className="mt-2 text-[13px] text-text-3">
              Download PDF bao gồm lá số đầy đủ, cách cục, và toàn bộ giải thích.
            </p>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="mt-3 w-full rounded-[12px] bg-gold px-4 py-3 text-[13px] font-bold text-bg transition disabled:opacity-50"
            >
              {downloading ? 'Đang tạo...' : 'PDF Report'}
            </button>
            <ShareCardButton
              title={`Lá số ${params.name || 'Tử Vi'}`}
              subtitle={`${viWuxingJu(chart.wuxingJuName)} · ${BRANCH_VI[ming?.branch ?? 0]}`}
              lines={[
                `Mệnh: ${ming?.stars.filter((s) => s.type === 'major').length ? viStars(ming.stars.filter((s) => s.type === 'major').map((s) => s.name)) : 'Vô chính diệu'}`,
                currentDaXian ? `Đại hạn: ${currentDaXian.startAge}-${currentDaXian.endAge} tại cung ${PALACE_VI[currentDaXian.palaceName] || currentDaXian.palaceName}` : 'Chưa xác định đại hạn',
                ...(patterns.slice(0, 2).map((p) => `Cách cục: ${p.name}`)),
              ]}
              chart={chart}
              filename="tu-vi"
              className="mt-2 w-full rounded-[12px] border border-gold/30 px-4 py-3 text-[13px] font-bold text-gold transition disabled:opacity-50"
            />
          </section>

          <section className="rounded-[24px] border border-[rgba(44,195,184,0.3)] bg-ai-bg p-5">
            <div className="text-[11px] uppercase tracking-[2px] text-ai">AI premium</div>
            <p className="mt-2 text-[14px] text-text">{unlocked ? 'Checkout mock đã mở khóa.' : result.advice}</p>
            <Link
              href={paywallHref}
              className="mt-4 block rounded-[14px] bg-gradient-to-br from-ai to-[#6BE0D7] px-4 py-3 text-center text-[14px] font-bold text-bg transition hover:shadow-lg"
            >
              {unlocked ? 'Đã mở khóa gói mock' : 'Mở AI luận giải lá số'}
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}
