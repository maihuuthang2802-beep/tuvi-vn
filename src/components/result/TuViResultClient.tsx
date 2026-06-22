'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ZiweiChart } from '@/lib/ziwei/types';
import type { ReadingResult } from '@/lib/readings';
import { BRANCH_VI, PALACE_VI, SIHUA_VI, viPalace, viStars, viWuxingJu } from '@/lib/ziwei/vietnamese';
import { detectCachCuc, getStarDeepMeaning, analyzeCurrentDaXian } from '@/lib/ziwei/patterns';
import { downloadPDF } from '@/lib/pdf';

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
                                <p className="text-[13px] font-semibold text-gold">{viStars([star.name])}</p>
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
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
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
