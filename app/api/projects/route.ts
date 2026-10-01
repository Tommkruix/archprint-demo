import { NextResponse } from 'next/server';
import { listProjects } from '@/lib/services/projects';

export async function GET() {
  return NextResponse.json(await listProjects());
}
