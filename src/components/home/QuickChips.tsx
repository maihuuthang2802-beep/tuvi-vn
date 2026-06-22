const chips = ['☯ Xem đại hạn', '☰ Gieo quẻ ngay', '✦ Tarot 1 lá', '❀ Xin xăm', '✦ Luận AI'];

export default function QuickChips() {
  return (
    <div className="scrollbar-none mt-5 flex gap-[10px] overflow-x-auto px-5 md:mx-auto md:max-w-[1100px] md:px-0">
      {chips.map((chip) => (
        <button key={chip} className="shrink-0 rounded-[20px] border border-border bg-surface px-4 py-2 text-[13px] font-medium text-text-2">{chip}</button>
      ))}
    </div>
  );
}