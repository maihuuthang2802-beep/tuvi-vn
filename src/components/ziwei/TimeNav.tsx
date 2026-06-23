'use client';

import { useEffect, useState } from 'react';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { PALACE_VI } from '@/lib/ziwei/vietnamese';

export type TimeView = 'mingpan' | 'daxian' | 'liunian';

function yearBranch(year: number) {
  return ((year - 4) % 12 + 12) % 12;
}

export default function TimeNav({
  chart,
  view,
  onViewChange,
  onHighlightBranchChange,
  onLiunianYearChange,
}: {
  chart: ZiweiChart;
  view: TimeView;
  onViewChange: (view: TimeView) => void;
  onHighlightBranchChange?: (branch: number | null) => void;
  onLiunianYearChange?: (year: number | null) => void;
}) {
  const current = chart.daXians[chart.currentDaXianIndex];
  const minAge = current?.startAge ?? 1;
  const maxAge = current?.endAge ?? chart.currentAge + 10;
  const [liunianAge, setLiunianAge] = useState(chart.currentAge);

  useEffect(() => {
    if (view === 'mingpan') {
      onHighlightBranchChange?.(null);
      onLiunianYearChange?.(null);
    } else if (view === 'daxian') {
      onHighlightBranchChange?.(current ? current.palaceBranch : null);
      onLiunianYearChange?.(null);
    } else {
      const year = chart.birthInfo.year + liunianAge - 1;
      onHighlightBranchChange?.(yearBranch(year));
      onLiunianYearChange?.(year);
    }
  }, [view, liunianAge, current, chart.birthInfo.year, onHighlightBranchChange, onLiunianYearChange]);

  const liunianYear = chart.birthInfo.year + liunianAge - 1;

  return (
    <div className="rounded-[20px] border border-border bg-surface p-4">
      <div className="flex flex-wrap gap-2">
        {([
          { key: 'mingpan', label: 'Bản mệnh' },
          { key: 'daxian', label: 'Đại hạn hiện tại' },
          { key: 'liunian', label: 'Lưu niên' },
        ] as const).map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onViewChange(item.key)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold ${view === item.key ? 'bg-tuvi-bg text-gold border border-gold/40' : 'border border-border text-text-2'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {view === 'liunian' ? (
        <div className="mt-3 flex items-center gap-3">
          <button type="button" onClick={() => setLiunianAge((age) => Math.max(1, age - 1))} className="rounded-full border border-border px-3 py-1 text-[13px] text-text-2">−</button>
          <span className="text-[13px] font-semibold text-text">Tuổi {liunianAge} · năm {liunianYear}</span>
          <button type="button" onClick={() => setLiunianAge((age) => age + 1)} className="rounded-full border border-border px-3 py-1 text-[13px] text-text-2">+</button>
        </div>
      ) : null}
      <p className="mt-3 text-[13px] text-text-3">
        {view === 'mingpan'
          ? 'Đang xem bố cục bản mệnh gốc của lá số.'
          : view === 'daxian'
            ? current ? `Đang nhấn mạnh đại hạn ${current.startAge}-${current.endAge} tại cung ${PALACE_VI[current.palaceName] || current.palaceName}.` : 'Chưa xác định đại hạn hiện tại.'
            : `Đang nhấn mạnh lưu niên năm ${liunianYear} (tuổi ${liunianAge}); kéo ± để xem năm khác trong đại hạn ${minAge}-${maxAge}.`}
      </p>
    </div>
  );
}
