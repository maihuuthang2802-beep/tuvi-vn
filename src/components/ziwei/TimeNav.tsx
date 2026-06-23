'use client';

import type { ZiweiChart } from '@/lib/ziwei/types';
import { PALACE_VI } from '@/lib/ziwei/vietnamese';

export type TimeView = 'mingpan' | 'daxian';

export default function TimeNav({ chart, view, onViewChange }: { chart: ZiweiChart; view: TimeView; onViewChange: (view: TimeView) => void }) {
  const current = chart.daXians[chart.currentDaXianIndex];
  return (
    <div className="rounded-[20px] border border-border bg-surface p-4">
      <div className="flex flex-wrap gap-2">
        {([
          { key: 'mingpan', label: 'Bản mệnh' },
          { key: 'daxian', label: 'Đại hạn hiện tại' },
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
      <p className="mt-3 text-[13px] text-text-3">
        {view === 'mingpan' ? 'Đang xem bố cục bản mệnh gốc của lá số.' : current ? `Đang nhấn mạnh đại hạn ${current.startAge}-${current.endAge} tại cung ${PALACE_VI[current.palaceName] || current.palaceName}.` : 'Chưa xác định đại hạn hiện tại.'}
      </p>
    </div>
  );
}
