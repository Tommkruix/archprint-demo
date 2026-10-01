import { NextResponse } from 'next/server';
import { listTasks } from '@/lib/services/tasks';

export async function GET() {
  return NextResponse.json(await listTasks());
}
