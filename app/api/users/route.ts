import { NextResponse } from 'next/server';
import { listUsers } from '@/lib/services/users';

export async function GET() {
  return NextResponse.json(await listUsers());
}
