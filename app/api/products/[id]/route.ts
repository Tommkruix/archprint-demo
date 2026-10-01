import { NextResponse } from 'next/server';
import { getProduct } from '@/lib/services/products';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getProduct(id);
  return row ? NextResponse.json(row) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
