import { NextResponse } from 'next/server';
import { listSubscriptions } from '@/lib/services/subscriptions';

export async function GET() {
  return NextResponse.json(await listSubscriptions());
}
