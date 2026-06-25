import PDFDocument from 'pdfkit';
import { ReadingResult } from '@/lib/readings';
import fs from 'fs';
import path from 'path';

export interface PDFOptions {
  service: 'tu-vi' | 'kinh-dich' | 'xin-xam' | 'tarot';
  reading: ReadingResult;
  question?: string;
  metadata?: Record<string, string>;
}

const FONT_DIR = path.join(process.cwd(), 'src', 'fonts');
const FONT_REGULAR = path.join(FONT_DIR, 'DejaVuSans.ttf');
const FONT_BOLD = path.join(FONT_DIR, 'DejaVuSans-Bold.ttf');
const FONT_ITALIC = path.join(FONT_DIR, 'DejaVuSans-Oblique.ttf');
const FONT_BOLD_ITALIC = path.join(FONT_DIR, 'DejaVuSans-BoldOblique.ttf');

let fontRegistered = false;

function registerVietnameseFont(doc: PDFKit.PDFDocument) {
  if (fontRegistered) return;
  try {
    if (fs.existsSync(FONT_REGULAR)) {
      doc.registerFont('DejaVu', FONT_REGULAR);
      if (fs.existsSync(FONT_BOLD)) doc.registerFont('DejaVu-Bold', FONT_BOLD);
      if (fs.existsSync(FONT_ITALIC)) doc.registerFont('DejaVu-Italic', FONT_ITALIC);
      if (fs.existsSync(FONT_BOLD_ITALIC)) doc.registerFont('DejaVu-BoldItalic', FONT_BOLD_ITALIC);
      fontRegistered = true;
    }
  } catch {
    // Font not available, will fall back to Helvetica
  }
}

function getFontName(base: string, bold = false, italic = false) {
  if (fontRegistered) {
    if (bold && italic) return 'DejaVu-BoldItalic';
    if (bold) return 'DejaVu-Bold';
    if (italic) return 'DejaVu-Italic';
    return 'DejaVu';
  }
  if (bold && italic) return 'Helvetica-BoldOblique';
  if (bold) return 'Helvetica-Bold';
  if (italic) return 'Helvetica-Oblique';
  return 'Helvetica';
}

function addHeader(doc: PDFKit.PDFDocument, service: string, title: string) {
  const fontBold = getFontName('DejaVu', true);
  const fontRegular = getFontName('DejaVu');
  doc.fontSize(24).font(fontBold).fillColor('#C9A96E').text(title, { align: 'center' });
  doc.fontSize(10).font(fontRegular).fillColor('#999').text(`Ngày tạo: ${new Date().toLocaleDateString('vi-VN')}`, { align: 'center' });
  doc.moveDown();
}

function addSection(doc: PDFKit.PDFDocument, label: string, content: string, fontSize = 11) {
  const fontBold = getFontName('DejaVu', true);
  const fontRegular = getFontName('DejaVu');
  doc.fontSize(12).font(fontBold).fillColor('#333').text(label);
  doc.fontSize(fontSize).font(fontRegular).fillColor('#666').text(content, { align: 'left' });
  doc.moveDown(0.3);
}

export async function generatePDFStream(options: PDFOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
    });

    registerVietnameseFont(doc);

    const { service, reading, question, metadata } = options;
    const chunks: Uint8Array[] = [];

    doc.on('data', (chunk) => {
      chunks.push(chunk as Uint8Array);
    });

    doc.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on('error', (err) => {
      reject(err);
    });

    addHeader(doc, service, reading.title);
    doc.fontSize(11).font(getFontName('DejaVu')).fillColor('#333').text(reading.summary);
    doc.moveDown();

    if (question) {
      addSection(doc, 'Câu hỏi:', question);
    }

    addSection(doc, 'Chi tiết:', reading.details.join('\n\n'));
    addSection(doc, 'Gợi ý:', reading.advice);

    if (metadata && Object.keys(metadata).length > 0) {
      doc.moveDown(0.5);
      doc.fontSize(10).font(getFontName('DejaVu')).fillColor('#999').text('---');
      doc.moveDown(0.3);
      doc.fontSize(9).font(getFontName('DejaVu')).text('Thông tin bổ sung:');
      Object.entries(metadata).forEach(([key, value]) => {
        doc.fontSize(8).font(getFontName('DejaVu')).text(`${key}: ${value}`);
      });
    }

    doc.end();
  });
}