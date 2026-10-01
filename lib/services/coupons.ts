import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { coupons } from '@/lib/schema';

export function listCoupons() {
  return db.select().from(coupons);
}

export async function getCoupon(id: string) {
  const [row] = await db.select().from(coupons).where(eq(coupons.id, id));
  return row ?? null;
}
