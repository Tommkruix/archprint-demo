import { NextResponse } from 'next/server';
import { listInvoices } from '@/lib/services/invoices';

export async function GET() {
  return NextResponse.json(await listInvoices());
}
