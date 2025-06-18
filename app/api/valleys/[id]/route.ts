// app/api/valleys/[id]/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Valley from '@/models/Valley';
import Place from '@/models/Place';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const valley = await Valley.findById(params.id).lean();
    if (!valley) return NextResponse.json({ error: 'Valley not found' }, { status: 404 });

    const places = await Place.find({ valley: params.id });
    return NextResponse.json({ ...valley, places });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch valley details' }, { status: 500 });
  }
}