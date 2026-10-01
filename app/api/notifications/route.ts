import { NextResponse } from 'next/server';
import { listNotifications } from '@/lib/services/notifications';

export async function GET() {
  return NextResponse.json(await listNotifications());
}
