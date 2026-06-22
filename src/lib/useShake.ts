'use client';

import { useEffect, useRef } from 'react';

export function useShake(onShake: () => void, threshold = 18, cooldown = 2000) {
  const lastShake = useRef(0);

  useEffect(() => {
    let prev = { x: 0, y: 0, z: 0 };

    function handle(event: DeviceMotionEvent) {
      const { x, y, z } = event.accelerationIncludingGravity ?? { x: 0, y: 0, z: 0 };
      if (x == null || y == null || z == null) return;
      const dx = Math.abs(x - prev.x);
      const dy = Math.abs(y - prev.y);
      const dz = Math.abs(z - prev.z);
      prev = { x, y, z };
      const total = dx + dy + dz;
      if (total < threshold) return;
      const now = Date.now();
      if (now - lastShake.current < cooldown) return;
      lastShake.current = now;
      onShake();
    }

    if (typeof window !== 'undefined' && 'ondevicemotion' in window) {
      window.addEventListener('devicemotion', handle);
      return () => window.removeEventListener('devicemotion', handle);
    }
  }, [threshold, cooldown, onShake]);
}