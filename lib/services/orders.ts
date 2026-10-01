import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { orders } from '@/lib/schema';

export function listOrders() {
  return db.select().from(orders);
}

export async function getOrder(id: string) {
  const [row] = await db.select().from(orders).where(eq(orders.id, id));
  return row ?? null;
}
