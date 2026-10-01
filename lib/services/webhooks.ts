import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { webhooks } from '@/lib/schema';

export function listWebhooks() {
  return db.select().from(webhooks);
}

export async function getWebhook(id: string) {
  const [row] = await db.select().from(webhooks).where(eq(webhooks.id, id));
  return row ?? null;
}
