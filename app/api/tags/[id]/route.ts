import { NextResponse } from 'next/server';
import { getTag } from '@/lib/services/tags';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getTag(id);
  return row ? NextResponse.json(row) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
