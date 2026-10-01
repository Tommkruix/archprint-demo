import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { subscriptions } from '@/lib/schema';

export function listSubscriptions() {
  return db.select().from(subscriptions);
}

export async function getSubscription(id: string) {
  const [row] = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
  return row ?? null;
}
