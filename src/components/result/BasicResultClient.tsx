'use client';

import Link from 'next/link';
import { ReadingResult, TarotCardDraw } from '@/lib/readings';
import { IChingReading } from '@/lib/iching/engine';
import { useAIInterpretation } from '@/hooks/useAIInterpretation';
import { downloadPDF } from '@/lib/pdf';
import { useState } from 'react';

interface BasicResultProps {
  service: 'kinh-dich' | 'xin-xam' | 'tarot';
  result: ReadingResult;
  reading?: IChingReading | null;
  tarotDraws?: TarotCardDraw[] | null;
  methodLabel?: string;
  params: Record<string, string | undefined>;
  unlocked: boolean;
  paywallHref: string;
}

export default function BasicResultClient({ service, result, reading, tarotDraws, methodLabel, params, unlocked, paywallHref }: BasicResultProps) {
  const [tabOpen, setTabOpen] = useState<'details' | 'ai'>('details');
  const [downloading, setDownloading] = useState(false);
  const { text: aiText, loading: aiLoading } = useAIInterpretation(service, result, params.question);

  return (
    <section className="mx-5 mt-5 grid gap-4 md:mx-auto md:max-w-[1100px] md:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <div className="rounded-[24px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Kết quả</div>
          <h2 className="mt-2 font-[var(--font-display)] text-[28px] font-bold text-text">{result.title}</h2>
          <p className="mt-2 text-[14px] text-text-2">{result.summary}</p>
          {service === 'kinh-dich' ? <div className="mt-3 inline-flex rounded-full border border-kinh/30 bg-kinh-bg px-3 py-1 text-[12px] font-semibold text-kinh">Phương pháp: {methodLabel}</div> : null}
          {service === 'tarot' ? <div className="mt-3 inline-flex rounded-full border border-tarot/30 bg-[rgba(123,95,221,0.12)] px-3 py-1 text-[12px] font-semibold text-tarot">Trải bài: {params.spread === '1' ? '1 lá' : '3 lá'}</div> : null}
          {reading ? <p className="mt-3 text-[13px] text-text-3">{reading.methodDetail}</p> : null}

          <div className="mt-5 flex gap-2 border-b border-border/50">
            <button
              onClick={() => setTabOpen('details')}
              className={`px-3 py-2 text-[13px] font-semibold transition-colors ${tabOpen === 'details' ? 'border-b-2 border-gold text-gold' : 'text-text-3 hover:text-text-2'}`}
            >
              Chi tiết
            </button>
            <button
              onClick={() => setTabOpen('ai')}
              className={`px-3 py-2 text-[13px] font-semibold transition-colors ${tabOpen === 'ai' ? 'border-b-2 border-ai text-ai' : 'text-text-3 hover:text-text-2'}`}
            >
              AI Luận Giải
            </button>
          </div>

          {tabOpen === 'details' ? (
            <div className="mt-5 space-y-3 text-[14px] text-text-2">
              {result.details.map((detail) => <p key={detail}>{detail}</p>)}
            </div>
          ) : (
            <div className="mt-5">
              {aiLoading ? <p className="text-[14px] text-text-3">Đang tạo luận giải...</p> : aiText.startsWith('[Mock AI]') ? <p className="text-[13px] text-text-3">{aiText}</p> : <p className="text-[14px] text-text-2 whitespace-pre-wrap">{aiText}</p>}
            </div>
          )}
        </div>

        {reading ? (
          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-[24px] border border-kinh/25 bg-kinh-bg p-5">
              <div className="text-[11px] uppercase tracking-[2px] text-kinh">Quẻ chủ</div>
              <div className="mt-2 font-[var(--font-display)] text-[26px] font-bold text-text">{reading.hexagram.name}</div>
              <div className="text-[13px] text-text-2">{reading.hexagram.han} · {reading.hexagram.upper} / {reading.hexagram.lower}</div>
              <p className="mt-3 text-[14px] text-text-2">{reading.hexagram.judgment}</p>
            </section>
            <section className="rounded-[24px] border border-border bg-surface p-5">
              <div className="text-[11px] uppercase tracking-[2px] text-gold">Quẻ biến</div>
              <div className="mt-2 font-[var(--font-display)] text-[26px] font-bold text-text">{reading.changedHexagram?.name || 'Quẻ tĩnh'}</div>
              <div className="text-[13px] text-text-2">{reading.changedHexagram ? `${reading.changedHexagram.han} · ${reading.changedHexagram.upper} / ${reading.changedHexagram.lower}` : 'Không có hào động'}</div>
              <p className="mt-3 text-[14px] text-text-2">{reading.changedHexagram?.judgment || 'Giữ quẻ chủ làm trọng tâm, chưa cần đổi hướng lớn.'}</p>
            </section>
            <section className="rounded-[24px] border border-border bg-surface p-5">
              <div className="text-[11px] uppercase tracking-[2px] text-gold">Hào động</div>
              <p className="mt-2 text-[14px] text-text-2">{reading.movingLines.length ? reading.movingLines.map((line) => `Hào ${line.position}`).join(' · ') : 'Quẻ tĩnh, chưa có hào động.'}</p>
              <p className="mt-3 text-[13px] text-text-3">{reading.advice}</p>
            </section>
            <section className="rounded-[24px] border border-border bg-surface p-5">
              <div className="text-[11px] uppercase tracking-[2px] text-gold">Sáu hào</div>
              <div className="mt-3 space-y-2 text-[13px] text-text-2">
                {reading.lines.slice().reverse().map((line) => <p key={line.position}>Hào {line.position}: {line.yinYang}{line.moving ? ' động' : ' tĩnh'}</p>)}
              </div>
            </section>
          </div>
        ) : null}

        {tarotDraws ? (
          <div className={`grid gap-4 ${tarotDraws.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-3'}`}>
            {tarotDraws.map((card, index) => (
              <section key={`${card.name}-${index}`} className="rounded-[24px] border border-tarot/25 bg-[rgba(123,95,221,0.10)] p-5">
                <div className="text-[11px] uppercase tracking-[2px] text-tarot">{params.spread === '1' ? 'Thông điệp chính' : index === 0 ? 'Quá khứ' : index === 1 ? 'Hiện tại' : 'Hướng đi'}</div>
                <div className="mt-2 font-[var(--font-display)] text-[26px] font-bold text-text">{card.name}</div>
                <div className="text-[13px] text-text-2">{card.arcana === 'major' ? 'Major Arcana' : `${card.rank} · ${card.suit}`} · {card.reversed ? 'Ngược' : 'Xuôi'}</div>
                <p className="mt-3 text-[14px] text-text-2">{card.reversed ? card.reversedMeaning : card.uprightMeaning}</p>
              </section>
            ))}
          </div>
        ) : null}
      </div>

      <aside className="space-y-4">
        <section className="rounded-[24px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Gợi ý</div>
          <p className="mt-3 text-[14px] text-text-2">{result.advice}</p>
        </section>
        <section className="rounded-[24px] border border-border bg-surface p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-gold">Tải về</div>
          <button
            onClick={() => {
              setDownloading(true);
              downloadPDF(service, result, params.question).finally(() => setDownloading(false));
            }}
            disabled={downloading}
            className="mt-3 w-full rounded-[12px] bg-gold px-4 py-3 text-[13px] font-bold text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {downloading ? 'Tạo PDF...' : 'PDF Report 📄'}
          </button>
        </section>
        <section className="rounded-[24px] border border-[rgba(44,195,184,0.3)] bg-ai-bg p-5">
          <div className="text-[11px] uppercase tracking-[2px] text-ai">AI premium</div>
          <p className="mt-2 text-[14px] text-text">{unlocked ? 'Checkout mock đã mở khóa. Bước kế tiếp: nối auth/payment thật.' : 'Mở rộng luận giải, đào sâu ý nghĩa, nhận gợi ý hành động kế tiếp.'}</p>
          <Link href={paywallHref} className="mt-4 block rounded-[14px] bg-gradient-to-br from-ai to-[#6BE0D7] px-4 py-3 text-center text-[14px] font-bold text-bg">{unlocked ? 'Đã mở khóa gói mock' : 'Mở AI chuyên sâu'}</Link>
        </section>
      </aside>
    </section>
  );
}
