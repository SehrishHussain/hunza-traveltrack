// app/api/trips/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {dbConnect} from '@/lib/dbConnect';
import { Trip } from '@/models/Trip';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {User} from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, startDate, endDate, valleys } = body;

  try {
    const user = await User.findOne({ email: session.user.email });

    const trip = await Trip.create({
      user: user._id,
      title,
      startDate,
      endDate,
      valleys, // array of valley IDs in route order
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Trip creation failed', details: err }, { status: 500 });
  }
}

// LIST all trips for user (GET /api/trips)
export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });

  const trips = await Trip.find({ user: user._id }).populate('valleys');

  return NextResponse.json(trips);
}
