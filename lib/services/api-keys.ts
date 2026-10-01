import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { apiKeys } from '@/lib/schema';

export function listApiKeys() {
  return db.select().from(apiKeys);
}

export async function getApiKey(id: string) {
  const [row] = await db.select().from(apiKeys).where(eq(apiKeys.id, id));
  return row ?? null;
}
