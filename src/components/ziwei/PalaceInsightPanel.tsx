'use client';

import Link from 'next/link';
import type { Palace, ZiweiChart } from '@/lib/ziwei/types';
import { BRANCH_VI, SIHUA_VI, viPalace, viStars, viWuxingJu } from '@/lib/ziwei/vietnamese';
import { getStarSlugByName } from '@/lib/ziwei/knowledge';
import { getStarDeepMeaning } from '@/lib/ziwei/patterns';

export default function PalaceInsightPanel({ chart, palace }: { chart: ZiweiChart; palace: Palace | null }) {
  const target = palace || chart.palaces.find((item) => item.isMingGong) || chart.palaces[0];
  const mainStars = target.stars.filter((star) => star.type === 'major');
  const allSihua = target.stars.filter((star) => star.siHua);

  return (
    <div className="space-y-4">
      <section className="rounded-[20px] border border-border bg-surface p-5">
        <div className="text-[11px] uppercase tracking-[2px] text-gold">Chi tiết cung</div>
        <h3 className="mt-2 text-[22px] font-semibold text-text">{viPalace(target.name)}</h3>
        <p className="mt-1 text-[13px] text-text-3">{BRANCH_VI[target.branch]} · {viWuxingJu(chart.wuxingJuName)}</p>
        <div className="mt-4 space-y-3 text-[13px] text-text-2">
          <p>Chính tinh: {mainStars.length ? viStars(mainStars.map((star) => star.name)) : 'Vô chính diệu'}</p>
          {target.borrowedStars?.length ? <p>Mượn đối cung: {viStars(target.borrowedStars)}</p> : null}
          {target.daXianAge ? <p>Đại hạn: {target.daXianAge[0]}-{target.daXianAge[1]}</p> : null}
        </div>
      </section>

      <section className="rounded-[20px] border border-border bg-surface p-5">
        <div className="text-[11px] uppercase tracking-[2px] text-gold">Giải nghĩa sao</div>
        <div className="mt-3 space-y-3">
          {mainStars.length ? mainStars.map((star) => {
            const slug = getStarSlugByName(viStars([star.name]));
            return (
              <div key={star.name} className="rounded-[16px] border border-border bg-surface-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-semibold text-gold">{viStars([star.name])}</p>
                  {slug ? <Link href={`/tu-vi/kien-thuc/${slug}/overview`} className="text-[11px] text-ai hover:underline">Đọc sao</Link> : null}
                </div>
                <p className="mt-2 text-[12px] text-text-2">{getStarDeepMeaning(star.name, target.name)}</p>
              </div>
            );
          }) : <p className="text-[13px] text-text-3">Cung này hiện vô chính diệu.</p>}
        </div>
      </section>

      <section className="rounded-[20px] border border-border bg-surface p-5">
        <div className="text-[11px] uppercase tracking-[2px] text-gold">Tứ hóa tại cung</div>
        <div className="mt-3 space-y-2 text-[13px] text-text-2">
          {allSihua.length ? allSihua.map((star) => <p key={`${star.name}-${star.siHua}`}>{SIHUA_VI[star.siHua || ''] || star.siHua}: {viStars([star.name])}</p>) : <p>Chưa thấy tứ hóa nổi bật tại cung này.</p>}
        </div>
      </section>
    </div>
  );
}
