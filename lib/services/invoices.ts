import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { invoices } from '@/lib/schema';

export function listInvoices() {
  return db.select().from(invoices);
}

export async function getInvoice(id: string) {
  const [row] = await db.select().from(invoices).where(eq(invoices.id, id));
  return row ?? null;
}
