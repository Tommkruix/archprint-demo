import { NextResponse } from 'next/server';
import { listCustomers } from '@/lib/services/customers';

export async function GET() {
  return NextResponse.json(await listCustomers());
}
