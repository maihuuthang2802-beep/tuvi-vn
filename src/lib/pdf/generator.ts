import PDFDocument from 'pdfkit';
import { ReadingResult } from '@/lib/readings';

export interface PDFOptions {
  service: 'tu-vi' | 'kinh-dich' | 'xin-xam' | 'tarot';
  reading: ReadingResult;
  question?: string;
  metadata?: Record<string, string>;
}

function addHeader(doc: PDFKit.PDFDocument, service: string, title: string) {
  doc.fontSize(24).font('Helvetica-Bold').fillColor('#C9A96E').text(title, { align: 'center' });
  doc.fontSize(10).fillColor('#999').text(`Ngày tạo: ${new Date().toLocaleDateString('vi-VN')}`, { align: 'center' });
  doc.moveDown();
}

function addSection(doc: PDFKit.PDFDocument, label: string, content: string, fontSize = 11) {
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#333').text(label);
  doc.fontSize(fontSize).font('Helvetica').fillColor('#666').text(content, { align: 'left' });
  doc.moveDown(0.3);
}

export async function generatePDFStream(options: PDFOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
    });

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
    doc.fontSize(11).fillColor('#333').text(reading.summary);
    doc.moveDown();

    if (question) {
      addSection(doc, 'Câu hỏi:', question);
    }

    addSection(doc, 'Chi tiết:', reading.details.join('\n\n'));
    addSection(doc, 'Gợi ý:', reading.advice);

    if (metadata && Object.keys(metadata).length > 0) {
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('#999').text('---');
      doc.moveDown(0.3);
      doc.fontSize(9).text('Thông tin bổ sung:');
      Object.entries(metadata).forEach(([key, value]) => {
        doc.fontSize(8).text(`${key}: ${value}`);
      });
    }

    doc.end();
  });
}
