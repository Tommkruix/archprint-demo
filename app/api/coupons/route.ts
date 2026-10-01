import { NextResponse } from 'next/server';
import { listCoupons } from '@/lib/services/coupons';

export async function GET() {
  return NextResponse.json(await listCoupons());
}
