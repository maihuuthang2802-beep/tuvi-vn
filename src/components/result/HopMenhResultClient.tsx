'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ZiweiChart } from '@/lib/ziwei/types';
import type { CompatibilityAnalysis } from '@/lib/ziwei/compatibility';
import type { ReadingResult } from '@/lib/readings';
import { viStars, viWuxingJu } from '@/lib/ziwei/vietnamese';
import { useAIInterpretation } from '@/hooks/useAIInterpretation';
import { downloadPDF } from '@/lib/pdf';
import ShareCardButton from '@/components/share/ShareCardButton';

interface HopMenhResultClientProps {
  result: ReadingResult;
  analysis: CompatibilityAnalysis;
  chartA: ZiweiChart;
  chartB: ZiweiChart;
  params: Record<string, string | undefined>;
  unlocked: boolean;
  paywallHref: string;
}

type TabType = 'overview' | 'axes' | 'people' | 'ai' | 'premium';

const TABS: { id: TabType; label: string; icon: string }[] = [
  { id: 'overview', label: 'Tổng quan', icon: '◎' },
  { id: 'axes', label: '4 trục', icon: '◇' },
  { id: 'people', label: 'Hai lá số', icon: '◉' },
  { id: 'ai', label: 'AI luận giải', icon: '✦' },
  { id: 'premium', label: 'Chuyên sâu', icon: '◈' },
];

function getMajorStars(chart: ZiweiChart, palaceName: string) {
  return chart.palaces.find((palace) => palace.name === palaceName)?.stars.filter((star) => star.type === 'major').map((star) => star.name) || [];
}

function PersonCard({ title, chart }: { title: string; chart: ZiweiChart }) {
  const mingStars = getMajorStars(chart, '命宫');
  const spouseStars = getMajorStars(chart, '夫妻宫');
  const phucStars = chart.palaces.find((palace) => palace.name === '福德宫')?.stars.map((star) => star.name) || [];
  const currentDaXian = chart.daXians[chart.currentDaXianIndex];

  return (
    <div className="rounded-[20px] border border-border bg-surface-2 p-4">
      <div className="text-[11px] uppercase tracking-[2px] text-gold">{title}</div>
      <div className="mt-2 text-[18px] font-semibold text-text">{chart.birthInfo.name || title}</div>
      <div className="mt-1 text-[13px] text-text-3">{viWuxingJu(chart.wuxingJuName)}</div>
      <div className="mt-4 space-y-3 text-[13px] text-text-2">
        <p><span className="text-gold">Mệnh:</span> {mingStars.length ? viStars(mingStars) : 'Vô chính diệu'}</p>
        <p><span className="text-gold">Phu thê:</span> {spouseStars.length ? viStars(spouseStars) : 'Vô chính diệu'}</p>
        <p><span className="text-gold">Phúc đức:</span> {phucStars.length ? viStars(phucStars) : 'Ít sao nổi bật'}</p>
        <p><span className="text-gold">Đại hạn:</span> {currentDaXian ? `${currentDaXian.startAge}-${currentDaXian.endAge}` : 'Chưa xác định'}</p>
      </div>
    </div>
  );
}

export default function HopMenhResultClient({ result, analysis, chartA, chartB, params, unlocked, paywallHref }: HopMenhResultClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [downloading, setDownloading] = useState(false);
  const { text: aiText, loading: aiLoading, error: aiError } = useAIInterpretation('hop-menh', result, `${params.aName || 'Người A'} & ${params.bName || 'Người B'}`);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      await downloadPDF('hop-menh', result, `${params.aName || 'Người A'} & ${params.bName || 'Người B'}`, {
        personA: params.aName || 'Người A',
        personB: params.bName || 'Người B',
        score: String(analysis.score),
        level: analysis.level,
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[24px] border border-border bg-surface p-5">
        <div className="text-[11px] uppercase tracking-[2px] text-gold">Đối chiếu hai lá số</div>
        <h2 className="mt-2 font-[var(--font-display)] text-[28px] font-bold text-text">{result.title}</h2>
        <p className="mt-2 text-[14px] text-text-2">{result.summary}</p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-[18px] border border-gold/20 bg-tuvi-bg p-4">
            <div className="text-[11px] uppercase tracking-[2px] text-gold/80">Điểm hợp</div>
            <div className="mt-2 font-[var(--font-display)] text-[34px] font-bold text-gold">{analysis.score}/100</div>
            <p className="mt-1 text-[13px] text-text-2">{analysis.level}</p>
          </div>
          {analysis.axes.slice(0, 2).map((axis) => (
            <div key={axis.key} className="rounded-[18px] border border-border bg-surface-2 p-4">
              <div className="text-[11px] uppercase tracking-[2px] text-gold/80">{axis.label}</div>
              <div className="mt-2 text-[26px] font-bold text-text">{axis.score}</div>
              <p className="mt-1 text-[12px] text-text-3">{axis.summary}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto border-b border-border/50 pb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 px-4 py-3 text-[13px] font-semibold whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-b-2 border-gold text-gold' : 'text-text-3 hover:text-text-2'}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-5">
          {activeTab === 'overview' ? (
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-[12px] uppercase tracking-[1px] text-gold/70">Kết luận nhanh</h3>
                <p className="text-[14px] text-text-2">{analysis.summary}</p>
              </div>
              <div>
                <h3 className="mb-2 text-[12px] uppercase tracking-[1px] text-gold/70">Điểm nổi bật</h3>
                <div className="space-y-2 text-[14px] text-text-2">
                  {analysis.details.map((detail) => <p key={detail}>{detail}</p>)}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-[12px] uppercase tracking-[1px] text-gold/70">Gợi ý hành động</h3>
                <div className="space-y-2">
                  {analysis.advice.map((item) => (
                    <div key={item} className="rounded-lg border border-gold/20 bg-tuvi-bg/50 p-3 text-[13px] text-text-2">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'axes' ? (
            <div className="grid gap-3 md:grid-cols-2">
              {analysis.axes.map((axis) => (
                <div key={axis.key} className="rounded-[18px] border border-border bg-surface-2 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-semibold text-text">{axis.label}</p>
                      <p className="mt-1 text-[12px] text-text-3">{axis.summary}</p>
                    </div>
                    <div className="text-[28px] font-bold text-gold">{axis.score}</div>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-surface overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-tuvi to-[#E8C87A]" style={{ width: `${axis.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === 'people' ? (
            <div className="grid gap-3 md:grid-cols-2">
              <PersonCard title="Người A" chart={chartA} />
              <PersonCard title="Người B" chart={chartB} />
            </div>
          ) : null}

          {activeTab === 'ai' ? (
            <div className="rounded-[18px] border border-[rgba(44,195,184,0.3)] bg-ai-bg p-5">
              {aiLoading ? <p className="text-[14px] text-text-3">Đang tạo luận giải hợp mệnh...</p> : aiError ? <p className="text-[14px] text-text-3">{aiError}</p> : <p className="text-[14px] whitespace-pre-wrap text-text-2">{aiText}</p>}
            </div>
          ) : null}

          {activeTab === 'premium' ? (
            unlocked ? (
              <div className="space-y-3">
                {analysis.premiumSections.map((section) => (
                  <div key={section.title} className="rounded-[18px] border border-gold/20 bg-tuvi-bg/50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[14px] font-semibold text-gold">{section.title}</p>
                        <p className="mt-1 text-[13px] text-text-2">{section.summary}</p>
                      </div>
                      {section.score ? <span className="text-[13px] font-bold text-gold">{section.score}/100</span> : null}
                    </div>
                    <div className="mt-3 space-y-2 text-[13px] text-text-2">
                      {section.highlights.map((item) => <p key={item}>{item}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[18px] border border-[rgba(44,195,184,0.3)] bg-ai-bg p-5 text-[14px] text-text">
                Mở khóa để xem breakdown từng lớp: Mệnh ↔ Phu thê, Phúc đức đường dài, tứ hóa kéo - đẩy, và nhịp đại hạn hiện tại.
              </div>
            )
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        <section className="rounded-[24px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Tải về</div>
          <p className="mt-2 text-[13px] text-text-3">PDF gồm điểm hợp, 4 trục, tóm lược và phần chuyên sâu nếu đã mở khóa.</p>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="mt-3 w-full rounded-[12px] bg-gold px-4 py-3 text-[13px] font-bold text-bg transition disabled:opacity-50"
          >
            {downloading ? 'Đang tạo...' : 'PDF Report'}
          </button>
          <ShareCardButton
            title={`Hợp mệnh ${params.aName || 'A'} & ${params.bName || 'B'}`}
            subtitle={`Điểm hợp ${analysis.score}/100 · ${analysis.level}`}
            lines={[analysis.summary, ...analysis.advice.slice(0, 2)]}
            filename="hop-menh"
            className="mt-2 w-full rounded-[12px] border border-gold/30 px-4 py-3 text-[13px] font-bold text-gold transition disabled:opacity-50"
          />
        </section>

        <section className="rounded-[24px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Kết nối tiếp</div>
          <div className="mt-3 space-y-2">
            <Link href="/tu-vi/hop-menh" className="block rounded-[12px] border border-border bg-surface-2 px-4 py-3 text-center text-[13px] font-semibold text-text">Xem cặp khác</Link>
            <Link href="/tu-vi/kien-thuc" className="block rounded-[12px] border border-gold/20 bg-tuvi-bg px-4 py-3 text-center text-[13px] font-semibold text-gold">Đọc kiến thức Tử Vi</Link>
          </div>
        </section>

        <section className="rounded-[24px] border border-[rgba(44,195,184,0.3)] bg-ai-bg p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-ai">AI premium</div>
          <p className="mt-2 text-[14px] text-text">{unlocked ? 'Đã mở khóa breakdown chuyên sâu cho cặp này.' : 'Mở thêm các lớp phân tích chuyên sâu để xem điểm kéo - đẩy và nhịp đường dài.'}</p>
          <Link href={paywallHref} className="mt-4 block rounded-[14px] bg-gradient-to-br from-ai to-[#6BE0D7] px-4 py-3 text-center text-[14px] font-bold text-bg">
            {unlocked ? 'Đã mở khóa gói mock' : 'Mở AI hợp mệnh chuyên sâu'}
          </Link>
        </section>
      </div>
    </section>
  );
}
