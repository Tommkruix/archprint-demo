import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { tags } from '@/lib/schema';

export function listTags() {
  return db.select().from(tags);
}

export async function getTag(id: string) {
  const [row] = await db.select().from(tags).where(eq(tags.id, id));
  return row ?? null;
}
