'use client';

import { useCallback, useEffect, useRef } from 'react';

type WheelOption = { value: string; label: string };

interface WheelPickerProps {
  options: WheelOption[];
  value: string;
  onChange: (val: string) => void;
  visible?: boolean;
}

export default function WheelPicker({ options, value, onChange, visible = true }: WheelPickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const itemH = 44;
  const idx = options.findIndex(o => o.value === value);
  const clamped = idx < 0 ? 0 : idx;

  useEffect(() => {
    if (ref.current && visible) {
      ref.current.scrollTo({ top: clamped * itemH, behavior: 'smooth' });
    }
  }, [clamped, visible]);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const top = ref.current.scrollTop;
    const center = Math.round(top / itemH);
    const option = options[center];
    if (option && option.value !== value) onChange(option.value);
  }, [options, value, onChange]);

  return (
    <div className="relative h-[132px] w-20 overflow-hidden select-none" style={visible ? {} : { opacity: 0, pointerEvents: 'none' }}>
      <div className="pointer-events-none absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, var(--color-bg), transparent 30%, transparent 70%, var(--color-bg))' }} />
      <div ref={ref} onScroll={handleScroll} className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-none py-[44px]">
        {options.map(o => (
          <div key={o.value} className="h-[44px] flex items-center justify-center text-sm snap-center" style={{ color: o.value === value ? 'var(--color-gold)' : 'var(--color-muted)', fontFamily: 'var(--font-heading)' }}>
            {o.label}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute top-[44px] left-1 right-1 h-[44px] border-t border-b border-gold/30 z-5" />
    </div>
  );
}