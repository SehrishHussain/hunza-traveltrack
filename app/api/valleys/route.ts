// app/api/valleys/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Valley from '@/models/Valley';

export async function GET() {
    
  await dbConnect();


  try {
    const valleys = await Valley.find();
    //return NextResponse.json({ message: 'Hello from valleys' });
    return NextResponse.json(valleys);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch valleys' }, { status: 500 });
  }
}