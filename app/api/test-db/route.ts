import { dbConnect } from '@/lib/dbConnect';
//import { dbConnect } from "../../lib/dbConnect";
import { NextResponse } from 'next/server';
import { User } from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    const user = await User.create({
      name: 'Test User',
      email: 'testuser@gmail.com',
      password: 'hashed123' // You’ll hash in real use
    })
    return NextResponse.json({ message: 'User created!', user  });
  
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ success: false, error: 'Connection failed' }, { status: 500 });
  }
}
