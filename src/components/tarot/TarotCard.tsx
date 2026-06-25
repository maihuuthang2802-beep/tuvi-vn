'use client';

import { useMemo, useState } from 'react';
import { generateTarotSvg } from '@/lib/tarot/svg-generator';

interface TarotCardProps {
  name: string;
  reversed: boolean;
  suit?: string;
  rank?: string;
  arcana?: string;
  uprightMeaning: string;
  reversedMeaning: string;
  position?: string;
  index?: number;
}

export default function TarotCard({
  name,
  reversed,
  arcana,
  suit,
  rank,
  uprightMeaning,
  reversedMeaning,
  position,
  index = 0,
}: TarotCardProps) {
  const [showImage, setShowImage] = useState(true);
  const cardSvg = useMemo(
    () => generateTarotSvg({ name, arcana: arcana === 'minor' ? 'minor' : 'major', suit, reversed: false }),
    [name, arcana, suit]
  );

  return (
    <div className="flex flex-col gap-3">
      <section
        className={`group relative rounded-[18px] border border-tarot/25 bg-gradient-to-br from-tarot/20 to-[rgba(123,95,221,0.10)] p-4 overflow-hidden
          ${index === 0 ? 'md:col-span-3 md:max-w-md md:mx-auto' : ''}`}
      >
        {/* Card art */}
        {showImage && (
          <div className="relative w-full aspect-[3/4] mb-3 rounded-lg overflow-hidden border border-tarot/30 bg-surface">
            <div
              className={`h-full w-full transition-transform duration-200 ease-out ${reversed ? 'rotate-180' : ''}`}
              style={{
                transformOrigin: 'center center',
                willChange: 'transform',
              }}
              dangerouslySetInnerHTML={{ __html: cardSvg }}
            />
            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] text-tarot">
              {reversed ? 'Ngược' : 'Xuôi'}
            </div>
            </div>
        )}

        {/* Card Info */}
        <div className="text-[11px] uppercase tracking-[2px] text-tarot">
          {position || (index === 0 ? 'Thông điệp chính' : index === 1 ? 'Quá khứ' : index === 2 ? 'Hiện tại' : 'Hướng đi')}
        </div>
        <h3 className="mt-2 font-[var(--font-display)] text-[22px] font-bold text-text">{name}</h3>
        <p className="text-[12px] text-text-3 mt-1">
          {arcana === 'major' ? 'Major Arcana' : `${rank} · ${suit}`}
        </p>

        {/* Meaning */}
        <p className="mt-3 text-[13px] text-text-2 leading-relaxed">
          {reversed ? reversedMeaning : uprightMeaning}
        </p>

        {/* Toggle button */}
        <button
          onClick={() => setShowImage(!showImage)}
          className="mt-3 w-full px-3 py-2 rounded-lg text-[11px] font-semibold bg-tarot/10 border border-tarot/30 text-tarot hover:bg-tarot/20 transition"
        >
          {showImage ? '📖 Chi tiết' : '🖼 Hình ảnh'}
        </button>
      </section>
    </div>
  );
}