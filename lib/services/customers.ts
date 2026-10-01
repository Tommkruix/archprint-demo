import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { customers } from '@/lib/schema';

export function listCustomers() {
  return db.select().from(customers);
}

export async function getCustomer(id: string) {
  const [row] = await db.select().from(customers).where(eq(customers.id, id));
  return row ?? null;
}
