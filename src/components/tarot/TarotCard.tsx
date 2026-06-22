'use client';

import { useState } from 'react';
import { getCardImagePath } from '@/lib/tarot/constants';

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
  const [imageError, setImageError] = useState(false);
  const imagePath = getCardImagePath(name);

  return (
    <div className="flex flex-col gap-3">
      <section
        className={`group relative rounded-[18px] border border-tarot/25 bg-gradient-to-br from-tarot/20 to-[rgba(123,95,221,0.10)] p-4 overflow-hidden
          ${index === 0 ? 'md:col-span-3 md:max-w-md md:mx-auto' : ''}`}
      >
        {/* Image Container */}
        {showImage && !imageError && (
          <div className="relative w-full aspect-[3/4] mb-3 rounded-lg overflow-hidden border border-tarot/30 bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePath}
              alt={name}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${reversed ? 'rotate-180' : ''}`}
            />
            <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-[10px] text-tarot">
              {reversed ? 'Ngược' : 'Xuôi'}
            </div>
          </div>
        )}

        {/* Fallback visual (no image) */}
        {showImage && imageError && (
          <div className={`w-full aspect-[3/4] mb-3 rounded-lg overflow-hidden border border-tarot/30 bg-gradient-to-br from-tarot/30 to-tarot/10 flex items-center justify-center ${reversed ? 'rotate-180' : ''}`}>
            <div className="text-center">
              <p className="text-[28px]">✦</p>
              <p className="text-[11px] text-tarot mt-1">Tarot</p>
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
