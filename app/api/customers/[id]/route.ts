import { NextResponse } from 'next/server';
import { getCustomer } from '@/lib/services/customers';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getCustomer(id);
  return row ? NextResponse.json(row) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
