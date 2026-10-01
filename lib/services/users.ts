import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';

export function listUsers() {
  return db.select().from(users);
}

export async function getUser(id: string) {
  const [row] = await db.select().from(users).where(eq(users.id, id));
  return row ?? null;
}
