import type { ClassicBook, ClassicSearchHit } from './types';
import { guSuiFu } from './data/cot-tuy-phu';
import { tuViToanThu } from './data/tu-vi-toan-thu';
import { dauSoToanTap } from './data/dau-so-toan-tap';
import { dauSoToanThu } from './data/dau-so-toan-thu';
import { STAR_PROFILES } from '../ziwei/knowledge';

export const ALL_CLASSIC_BOOKS: ClassicBook[] = [guSuiFu, tuViToanThu, dauSoToanTap, dauSoToanThu];

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

export interface StarClassicMention {
  bookSlug: string;
  bookTitle: string;
  chapterTitle: string;
  paragraphId: string;
  text: string;
}

export function getClassicMentionsForStar(starName: string, limit = 6): StarClassicMention[] {
  const hits: StarClassicMention[] = [];
  for (const book of ALL_CLASSIC_BOOKS) {
    for (const chapter of book.chapters) {
      for (const paragraph of chapter.paragraphs) {
        if (!paragraph.text.includes(starName)) continue;
        hits.push({
          bookSlug: book.slug,
          bookTitle: book.title,
          chapterTitle: chapter.title,
          paragraphId: paragraph.id,
          text: paragraph.text,
        });
        if (hits.length >= limit) return hits;
      }
    }
  }
  return hits;
}

export function getStarsMentionedInBook(bookSlug: string): string[] {
  const book = getClassicBookBySlug(bookSlug);
  if (!book) return [];
  const names = new Set<string>();
  for (const profile of STAR_PROFILES) {
    const found = book.chapters.some((chapter) => chapter.paragraphs.some((p) => p.text.includes(profile.name)));
    if (found) names.add(profile.name);
  }
  return Array.from(names);
}
