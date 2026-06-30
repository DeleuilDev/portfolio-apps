import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const entry = await db.dataStore.findUnique({ where: { key } });
  if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(JSON.parse(entry.data));
}
