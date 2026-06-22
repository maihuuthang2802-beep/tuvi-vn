import { generatePDFStream, PDFOptions } from '@/lib/pdf/generator';

export async function POST(req: Request) {
  try {
    const body = await req.json() as PDFOptions;
    const { service, reading, question, metadata } = body;

    if (!service || !reading) {
      return new Response('Missing service or reading', { status: 400 });
    }

    const pdfBuffer = await generatePDFStream({ service, reading, question, metadata });

    const filename = `${service}-${Date.now()}.pdf`;
    return new Response(pdfBuffer as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[PDF Error]', msg);
    return new Response(`PDF generation failed: ${msg}`, { status: 500 });
  }
}
