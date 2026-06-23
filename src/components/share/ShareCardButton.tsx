'use client';

import { useState } from 'react';
import type { ZiweiChart } from '@/lib/ziwei/types';
import { viPalace, viStars } from '@/lib/ziwei/vietnamese';

interface ShareCardButtonProps {
  title: string;
  subtitle: string;
  lines: string[];
  chart?: ZiweiChart;
  filename: string;
  className?: string;
}

const BRANCH_POS: Record<number, { row: number; col: number }> = {
  5: { row: 0, col: 0 }, 6: { row: 0, col: 1 }, 7: { row: 0, col: 2 }, 8: { row: 0, col: 3 },
  4: { row: 1, col: 0 }, 9: { row: 1, col: 3 },
  3: { row: 2, col: 0 }, 10: { row: 2, col: 3 },
  2: { row: 3, col: 0 }, 1: { row: 3, col: 1 }, 0: { row: 3, col: 2 }, 11: { row: 3, col: 3 },
};

function drawMiniChart(ctx: CanvasRenderingContext2D, chart: ZiweiChart, x: number, y: number, size: number) {
  const cell = size / 4;
  ctx.strokeStyle = 'rgba(201,169,110,0.35)';
  ctx.lineWidth = 1;
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      const cx = x + c * cell;
      const cy = y + r * cell;
      const isCenter = r >= 1 && r <= 2 && c >= 1 && c <= 2;
      ctx.fillStyle = isCenter ? 'rgba(34,30,62,0.6)' : 'rgba(24,21,48,0.85)';
      ctx.fillRect(cx, cy, cell, cell);
      ctx.strokeRect(cx, cy, cell, cell);
    }
  }
  Object.entries(BRANCH_POS).forEach(([branchStr, pos]) => {
    const branch = Number(branchStr);
    const palace = chart.palaces.find((p) => p.branch === branch);
    if (!palace) return;
    const cx = x + pos.col * cell;
    const cy = y + pos.row * cell;
    const mainStars = palace.stars.filter((s) => s.type === 'major').map((s) => s.name);
    ctx.fillStyle = palace.isMingGong ? '#C9A96E' : 'rgba(237,231,211,0.85)';
    ctx.font = '600 9px "Be Vietnam Pro", sans-serif';
    ctx.fillText(viPalace(palace.name), cx + 5, cy + 13);
    ctx.fillStyle = 'rgba(237,231,211,0.7)';
    ctx.font = '8px "Be Vietnam Pro", sans-serif';
    const label = mainStars.length ? viStars(mainStars).slice(0, 10) : '';
    ctx.fillText(label, cx + 5, cy + cell - 6);
  });
}

async function buildShareCardDataUrl({ title, subtitle, lines, chart }: Omit<ShareCardButtonProps, 'filename' | 'className'>) {
  const width = chart ? 760 : 680;
  const height = 420;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const bgGradient = ctx.createLinearGradient(0, 0, width, height);
  bgGradient.addColorStop(0, '#0D0B19');
  bgGradient.addColorStop(1, '#181530');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(201,169,110,0.08)';
  ctx.beginPath();
  ctx.arc(width - 60, 40, 140, 0, Math.PI * 2);
  ctx.fill();

  if (chart) {
    drawMiniChart(ctx, chart, 32, 80, 340);
  }

  const infoX = chart ? 400 : 36;

  ctx.fillStyle = '#C9A96E';
  ctx.font = '700 13px "Be Vietnam Pro", sans-serif';
  ctx.fillText('✦ TUVI.VN', infoX, 38);

  ctx.fillStyle = '#EDE7D3';
  ctx.font = '700 26px "Cormorant Garamond", serif';
  wrapText(ctx, title, infoX, 78, width - infoX - 36, 30);

  ctx.fillStyle = 'rgba(237,231,211,0.6)';
  ctx.font = '13px "Be Vietnam Pro", sans-serif';
  ctx.fillText(subtitle, infoX, 108);

  ctx.strokeStyle = 'rgba(201,169,110,0.25)';
  ctx.beginPath();
  ctx.moveTo(infoX, 122);
  ctx.lineTo(width - 36, 122);
  ctx.stroke();

  let lineY = 150;
  ctx.font = '13px "Be Vietnam Pro", sans-serif';
  lines.slice(0, 6).forEach((line) => {
    ctx.fillStyle = '#C9A96E';
    ctx.fillText('•', infoX, lineY);
    ctx.fillStyle = 'rgba(237,231,211,0.85)';
    lineY = wrapText(ctx, line, infoX + 14, lineY, width - infoX - 50, 18) + 10;
  });

  ctx.fillStyle = 'rgba(237,231,211,0.4)';
  ctx.font = '11px "Be Vietnam Pro", sans-serif';
  ctx.fillText('Tham khảo văn hóa dân gian · tuvi.vn', infoX, height - 24);

  return canvas.toDataURL('image/png');
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let cursorY = y;
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  });
  if (line) {
    ctx.fillText(line, x, cursorY);
    cursorY += lineHeight;
  }
  return cursorY;
}

export default function ShareCardButton({ title, subtitle, lines, chart, filename, className }: ShareCardButtonProps) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    try {
      const dataUrl = await buildShareCardDataUrl({ title, subtitle, lines, chart });
      if (!dataUrl) return;
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${filename}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={busy} className={className}>
      {busy ? 'Đang tạo ảnh...' : 'Chia sẻ ảnh'}
    </button>
  );
}
