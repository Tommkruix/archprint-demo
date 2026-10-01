import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { products } from '@/lib/schema';

export function listProducts() {
  return db.select().from(products);
}

export async function getProduct(id: string) {
  const [row] = await db.select().from(products).where(eq(products.id, id));
  return row ?? null;
}
