import { NextResponse } from 'next/server';
import { listWebhooks } from '@/lib/services/webhooks';

export async function GET() {
  return NextResponse.json(await listWebhooks());
}
