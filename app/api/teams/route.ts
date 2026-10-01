import { NextResponse } from 'next/server';
import { listTeams } from '@/lib/services/teams';

export async function GET() {
  return NextResponse.json(await listTeams());
}
