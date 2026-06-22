'use client';

import { useShake } from '@/lib/useShake';
import { useCallback, useState } from 'react';

export default function GieoQuePage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Lắc điện thoại để gieo quẻ nhanh...');

  const handleShake = useCallback(() => {
    setCount(c => c + 1);
    setMessage(`Đã lắc ${count + 1} lần — đang gieo quẻ...`);
  }, [count]);

  useShake(handleShake);

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center gap-4 p-6">
      <div className="text-6xl animate-bounce">☯</div>
      <p className="text-muted text-sm text-center">{message}</p>
      <p className="text-xs text-muted/60">Tính năng đang phát triển — lắc để thử cảm biến</p>
    </div>
  );
}