'use client';

import type { ZiweiChart, Palace } from '@/lib/ziwei/types';
import { BRANCH_VI, viPalace, viStars } from '@/lib/ziwei/vietnamese';

const PALACE_GRID = [
  { index: 0, branch: 5 }, { index: 1, branch: 6 }, { index: 2, branch: 7 }, { index: 3, branch: 8 },
  { index: 4, branch: 4 }, { index: 5, center: true }, { index: 6, center: true }, { index: 7, branch: 9 },
  { index: 8, branch: 3 }, { index: 9, center: true }, { index: 10, center: true }, { index: 11, branch: 10 },
  { index: 12, branch: 2 }, { index: 13, branch: 1 }, { index: 14, branch: 0 }, { index: 15, branch: 11 },
] as const;

const BRANCH_CENTER: Record<number, { x: number; y: number }> = {
  5: { x: 12.5, y: 12.5 }, 6: { x: 37.5, y: 12.5 }, 7: { x: 62.5, y: 12.5 }, 8: { x: 87.5, y: 12.5 },
  4: { x: 12.5, y: 37.5 }, 9: { x: 87.5, y: 37.5 },
  3: { x: 12.5, y: 62.5 }, 10: { x: 87.5, y: 62.5 },
  2: { x: 12.5, y: 87.5 }, 1: { x: 37.5, y: 87.5 }, 0: { x: 62.5, y: 87.5 }, 11: { x: 87.5, y: 87.5 },
};

const BRIGHTNESS_BADGE: Record<string, string> = { bright: '◆', normal: '·', dim: '◇' };

function tamPhuongTuChinh(branch: number) {
  return [branch, (branch + 6) % 12, (branch + 4) % 12, (branch + 8) % 12];
}

function PalaceCard({ palace, active, highlighted, onClick }: { palace: Palace; active: boolean; highlighted: boolean; onClick: () => void }) {
  const mainStars = palace.stars.filter((star) => star.type === 'major');
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[126px] rounded-[16px] border p-3 text-left transition ${active ? 'border-gold/60 bg-tuvi-bg' : highlighted ? 'border-ai/60 bg-ai-bg' : 'border-border bg-surface hover:border-gold/30'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[13px] font-semibold text-text">{viPalace(palace.name)}</p>
          <p className="text-[11px] text-text-3">{BRANCH_VI[palace.branch]}</p>
        </div>
        {palace.isMingGong ? <span className="text-[10px] text-gold">Mệnh</span> : null}
      </div>
      <p className="mt-3 text-[12px] text-text-2">
        {mainStars.length
          ? mainStars.map((star) => (
              <span key={star.name} className="mr-1">
                {viStars([star.name])}
                {star.brightness ? <span className="text-gold/70">{BRIGHTNESS_BADGE[star.brightness]}</span> : null}
              </span>
            ))
          : 'Vô chính diệu'}
      </p>
      {palace.borrowedStars?.length ? <p className="mt-2 text-[11px] text-gold">Mượn: {viStars(palace.borrowedStars)}</p> : null}
    </button>
  );
}

export default function ChartBoard({
  chart,
  selectedPalace,
  onPalaceSelect,
  highlightBranch,
}: {
  chart: ZiweiChart;
  selectedPalace: Palace | null;
  onPalaceSelect: (palace: Palace) => void;
  highlightBranch?: number | null;
}) {
  const axisBranches = selectedPalace ? tamPhuongTuChinh(selectedPalace.branch) : [];

  return (
    <div className="relative grid grid-cols-4 gap-2">
      {selectedPalace ? (
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {axisBranches.slice(1).map((branch) => {
            const from = BRANCH_CENTER[selectedPalace.branch];
            const to = BRANCH_CENTER[branch];
            if (!from || !to) return null;
            return <line key={branch} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="var(--color-gold)" strokeOpacity={0.45} strokeWidth={0.6} strokeDasharray="2 2" />;
          })}
        </svg>
      ) : null}
      {PALACE_GRID.map((cell) => {
        if ('center' in cell) {
          return (
            <div key={cell.index} className="rounded-[16px] border border-border bg-surface-2 p-3">
              <div className="flex h-full min-h-[126px] items-center justify-center text-center text-[12px] text-text-3">
                Lá số Tử Vi
              </div>
            </div>
          );
        }

        const palace = chart.palaces.find((item) => item.branch === cell.branch);
        if (!palace) return <div key={cell.index} className="min-h-[126px] rounded-[16px] border border-border bg-surface" />;

        return (
          <PalaceCard
            key={cell.index}
            palace={palace}
            active={selectedPalace?.branch === palace.branch}
            highlighted={highlightBranch != null && highlightBranch === palace.branch}
            onClick={() => onPalaceSelect(palace)}
          />
        );
      })}
    </div>
  );
}
