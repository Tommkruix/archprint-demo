import { NextResponse } from 'next/server';
import { listProducts } from '@/lib/services/products';

export async function GET() {
  return NextResponse.json(await listProducts());
}
