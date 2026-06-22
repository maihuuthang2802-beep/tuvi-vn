'use client';

import type { ReactNode } from 'react';

export default function BottomSheet({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-black/50" onClick={onClose}>
      <div className="absolute bottom-0 left-0 right-0 max-h-[75vh] overflow-y-auto rounded-t-[20px] border-t border-border bg-surface px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-3" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-border" />
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[15px] font-semibold text-text">{title}</div>
          <button onClick={onClose} className="text-text-2">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}