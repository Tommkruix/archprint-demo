import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { comments } from '@/lib/schema';

export function listComments() {
  return db.select().from(comments);
}

export async function getComment(id: string) {
  const [row] = await db.select().from(comments).where(eq(comments.id, id));
  return row ?? null;
}
