import { NextResponse } from 'next/server';
import { getPayment } from '@/lib/services/payments';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getPayment(id);
  return row ? NextResponse.json(row) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
