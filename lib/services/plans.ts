import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { plans } from '@/lib/schema';

export function listPlans() {
  return db.select().from(plans);
}

export async function getPlan(id: string) {
  const [row] = await db.select().from(plans).where(eq(plans.id, id));
  return row ?? null;
}
