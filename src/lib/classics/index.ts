import type { ClassicBook, ClassicSearchHit } from './types';
import { guSuiFu } from './data/cot-tuy-phu';
import { tuViToanThu } from './data/tu-vi-toan-thu';

export const ALL_CLASSIC_BOOKS: ClassicBook[] = [guSuiFu, tuViToanThu];

export const TOTAL_CLASSIC_PARAGRAPHS = ALL_CLASSIC_BOOKS.reduce((sum, book) => sum + book.chapters.reduce((inner, chapter) => inner + chapter.paragraphs.length, 0), 0);

export function getClassicBookBySlug(slug: string) {
  return ALL_CLASSIC_BOOKS.find((book) => book.slug === slug) || null;
}

export function searchClassics(query: string, limit = 20): ClassicSearchHit[] {
  const q = query.trim();
  if (!q) return [];
  const hits: ClassicSearchHit[] = [];

  for (const book of ALL_CLASSIC_BOOKS) {
    for (let chapterIndex = 0; chapterIndex < book.chapters.length; chapterIndex += 1) {
      const chapter = book.chapters[chapterIndex];
      for (const paragraph of chapter.paragraphs) {
        const idx = paragraph.text.indexOf(q);
        if (idx < 0) continue;
        const start = Math.max(0, idx - 30);
        const end = Math.min(paragraph.text.length, idx + q.length + 30);
        const snippet = `${start > 0 ? '…' : ''}${paragraph.text.slice(start, idx)}${paragraph.text.slice(idx, idx + q.length)}${paragraph.text.slice(idx + q.length, end)}${end < paragraph.text.length ? '…' : ''}`;
        hits.push({
          bookSlug: book.slug,
          bookTitle: book.title,
          chapterIndex,
          chapterTitle: chapter.title,
          paragraphId: paragraph.id,
          snippet,
        });
        if (hits.length >= limit) return hits;
      }
    }
  }

  return hits;
}
