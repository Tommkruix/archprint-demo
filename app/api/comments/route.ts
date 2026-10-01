import { NextResponse } from 'next/server';
import { listComments } from '@/lib/services/comments';

export async function GET() {
  return NextResponse.json(await listComments());
}
