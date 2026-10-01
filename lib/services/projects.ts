import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { projects } from '@/lib/schema';

export function listProjects() {
  return db.select().from(projects);
}

export async function getProject(id: string) {
  const [row] = await db.select().from(projects).where(eq(projects.id, id));
  return row ?? null;
}
