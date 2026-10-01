import { NextResponse } from 'next/server';
import { listApiKeys } from '@/lib/services/api-keys';

export async function GET() {
  return NextResponse.json(await listApiKeys());
}
