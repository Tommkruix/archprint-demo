import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { tasks } from '@/lib/schema';

export function listTasks() {
  return db.select().from(tasks);
}

export async function getTask(id: string) {
  const [row] = await db.select().from(tasks).where(eq(tasks.id, id));
  return row ?? null;
}
