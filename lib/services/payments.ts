import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { payments } from '@/lib/schema';

export function listPayments() {
  return db.select().from(payments);
}

export async function getPayment(id: string) {
  const [row] = await db.select().from(payments).where(eq(payments.id, id));
  return row ?? null;
}
