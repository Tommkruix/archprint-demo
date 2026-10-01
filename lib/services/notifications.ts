import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { notifications } from '@/lib/schema';

export function listNotifications() {
  return db.select().from(notifications);
}

export async function getNotification(id: string) {
  const [row] = await db.select().from(notifications).where(eq(notifications.id, id));
  return row ?? null;
}
