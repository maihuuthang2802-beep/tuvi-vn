export default function ModuleHero({ icon, title, subtitle, accent = 'var(--color-gold)' }: { icon: string; title: string; subtitle: string; accent?: string; }) {
  return (
    <section className="page-enter px-5 pt-7">
      <div className="mx-auto max-w-[1100px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ background: `${accent}1a`, borderColor: `${accent}30`, color: accent }}>{icon}</div>
        <h1 className="mt-4 font-[var(--font-display)] text-[28px] font-bold text-text">{title}</h1>
        <p className="mt-2 text-[13px] text-text-2">{subtitle}</p>
      </div>
    </section>
  );
}