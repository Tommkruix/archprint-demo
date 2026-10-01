import { NextResponse } from 'next/server';
import { listAuditLogs } from '@/lib/services/audit-logs';

export async function GET() {
  return NextResponse.json(await listAuditLogs());
}
