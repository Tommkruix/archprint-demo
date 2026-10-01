import { NextResponse } from 'next/server';
import { listOrders } from '@/lib/services/orders';

export async function GET() {
  return NextResponse.json(await listOrders());
}
