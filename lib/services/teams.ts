import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { teams } from '@/lib/schema';

export function listTeams() {
  return db.select().from(teams);
}

export async function getTeam(id: string) {
  const [row] = await db.select().from(teams).where(eq(teams.id, id));
  return row ?? null;
}
