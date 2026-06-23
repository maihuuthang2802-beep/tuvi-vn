export interface ClassicParagraph {
  id: string;
  idx: number;
  text: string;
  translation?: string;
  note?: string;
}

export interface ClassicChapter {
  title: string;
  subtitle?: string;
  paragraphs: ClassicParagraph[];
}

export interface ClassicBook {
  title: string;
  slug: string;
  dynasty: string;
  author: string;
  intro: string;
  wordCount: number;
  chapters: ClassicChapter[];
}

export interface ClassicSearchHit {
  bookSlug: string;
  bookTitle: string;
  chapterIndex: number;
  chapterTitle: string;
  paragraphId: string;
  snippet: string;
}
