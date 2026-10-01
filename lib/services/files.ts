import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { files } from '@/lib/schema';

export function listFiles() {
  return db.select().from(files);
}

export async function getFile(id: string) {
  const [row] = await db.select().from(files).where(eq(files.id, id));
  return row ?? null;
}
