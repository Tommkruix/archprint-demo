import { NextResponse } from 'next/server';
import { listSessions } from '@/lib/services/sessions';

export async function GET() {
  return NextResponse.json(await listSessions());
}
