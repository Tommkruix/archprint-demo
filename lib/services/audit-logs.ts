import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { auditLogs } from '@/lib/schema';

export function listAuditLogs() {
  return db.select().from(auditLogs);
}

export async function getAuditLog(id: string) {
  const [row] = await db.select().from(auditLogs).where(eq(auditLogs.id, id));
  return row ?? null;
}
