import type { ReactNode } from 'react';

export default function GlowCard({ children, className = '', glow = '0 0 24px rgba(201,169,110,0.25)' }: { children: ReactNode; className?: string; glow?: string; }) {
  return (
    <div className={`card-mystic ${className}`} style={{ borderColor: 'var(--color-border)', boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03), ${glow}` }}>
      {children}
    </div>
  );
}