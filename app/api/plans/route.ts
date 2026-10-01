import { NextResponse } from 'next/server';
import { listPlans } from '@/lib/services/plans';

export async function GET() {
  return NextResponse.json(await listPlans());
}
