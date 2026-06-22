import Link from 'next/link';

const modules = [
  { key: 'tuvi', label: 'TỬ VI', name: 'Tử Vi', desc: 'Lá số & đại hạn', href: '/tu-vi', symbol: '◉', color: 'var(--color-tuvi)', bg: 'var(--color-tuvi-bg)', shadow: '0 0 24px rgba(201,169,110,0.25)' },
  { key: 'kinh', label: 'KINH DỊCH', name: 'Kinh Dịch', desc: 'Gieo quẻ Lục Hào', href: '/kinh-dich', symbol: '☰', color: 'var(--color-kinh)', bg: 'var(--color-kinh-bg)', shadow: '0 0 24px rgba(74,155,111,0.25)' },
  { key: 'xam', label: 'XIN XĂM', name: 'Xin Xăm', desc: 'Thánh Mẫu cầu may', href: '/xin-xam', symbol: '❀', color: 'var(--color-xam)', bg: 'var(--color-xam-bg)', shadow: '0 0 24px rgba(194,59,59,0.25)' },
  { key: 'tarot', label: 'TAROT', name: 'Tarot', desc: '78 lá Rider-Waite', href: '/tarot', symbol: '✦', color: 'var(--color-tarot)', bg: 'var(--color-tarot-bg)', shadow: '0 0 24px rgba(123,95,221,0.25)' },
];

export default function ModuleCards() {
  return (
    <div className="mx-5 mt-6 grid grid-cols-2 gap-[14px] md:mx-auto md:max-w-[1100px] md:grid-cols-4">
      {modules.map((module) => (
        <Link key={module.key} href={module.href} className="group relative min-h-[160px] overflow-hidden rounded-[20px] border border-border bg-surface transition duration-300 hover:-translate-y-0.5" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)' }}>
          <span className="absolute bottom-0 right-3 text-[120px] leading-none opacity-[0.07]" style={{ color: module.color }}>{module.symbol}</span>
          <div className="px-[14px] pt-[14px] text-[10px] font-bold uppercase tracking-[2px]" style={{ color: module.color }}>{module.label}</div>
          <div className="mx-[14px] mt-[10px] flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: module.bg, color: module.color }}>{module.symbol}</div>
          <div className="px-[14px] pb-[14px] pt-8">
            <div className="font-[var(--font-display)] text-[20px] font-semibold text-text">{module.name}</div>
            <div className="mt-1 text-[12px] text-text-2">{module.desc}</div>
            <div className="mt-3 text-right text-text-3">›</div>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ boxShadow: module.shadow, border: `1px solid ${module.color}66`, borderRadius: 20 }} />
        </Link>
      ))}
    </div>
  );
}