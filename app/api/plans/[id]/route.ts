import { NextResponse } from 'next/server';
import { getPlan } from '@/lib/services/plans';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getPlan(id);
  return row ? NextResponse.json(row) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
