'use client';

import { ReadingResult } from '@/lib/readings';

export async function downloadPDF(service: string, reading: ReadingResult, question?: string, metadata?: Record<string, string>) {
  try {
    const response = await fetch('/api/pdf/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service, reading, question, metadata }),
    });

    if (!response.ok) {
      throw new Error('PDF generation failed');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${service}-${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF download error:', error);
    alert('Không thể tạo PDF. Thử lại.');
  }
}
