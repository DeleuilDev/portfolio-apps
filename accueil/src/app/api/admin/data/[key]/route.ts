import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth';
import { NextResponse } from 'next/server';

async function checkAuth() {
  const ok = await verifySession();
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const authErr = await checkAuth();
  if (authErr) return authErr;

  const { key } = await params;
  const entry = await db.dataStore.findUnique({ where: { key } });
  if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(JSON.parse(entry.data));
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const authErr = await checkAuth();
  if (authErr) return authErr;

  const { key } = await params;
  const data = await req.json();

  const entry = await db.dataStore.upsert({
    where: { key },
    update: { data: JSON.stringify(data) },
    create: { key, data: JSON.stringify(data) },
  });

  return NextResponse.json(JSON.parse(entry.data));
}
