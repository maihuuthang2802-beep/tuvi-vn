import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function saveHistoryEntry(service: string, title: string, summary: string, payload: unknown) {
  try {
    const session = await auth();
    if (!session?.user) return;
    await prisma.readingHistoryEntry.create({
      data: { userId: session.user.id, service, title, summary, payload: payload as object },
    });
  } catch {
    // DB chưa cấu hình hoặc không truy cập được — lịch sử là best-effort, không chặn trang kết quả.
  }
}
