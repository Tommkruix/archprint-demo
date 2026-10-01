import { NextResponse } from 'next/server';
import { getAuditLog } from '@/lib/services/audit-logs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getAuditLog(id);
  return row ? NextResponse.json(row) : NextResponse.json({ error: 'Not found' }, { status: 404 });
}
