import { NextResponse } from 'next/server';
import { listFiles } from '@/lib/services/files';

export async function GET() {
  return NextResponse.json(await listFiles());
}
