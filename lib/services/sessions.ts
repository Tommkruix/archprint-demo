import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { sessions } from '@/lib/schema';

export function listSessions() {
  return db.select().from(sessions);
}

export async function getSession(id: string) {
  const [row] = await db.select().from(sessions).where(eq(sessions.id, id));
  return row ?? null;
}
