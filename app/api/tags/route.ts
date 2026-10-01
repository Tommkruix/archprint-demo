import { NextResponse } from 'next/server';
import { listTags } from '@/lib/services/tags';

export async function GET() {
  return NextResponse.json(await listTags());
}
