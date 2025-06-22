// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {dbConnect} from '@/lib/dbConnect';
import {User} from '@/models/User';


export async function POST(request: NextRequest) {
    
  await dbConnect();
  
    try {
        const { name, email, password } = await request.json();
        if (!email || !password || !name) {
            console.log(await request.text());
             return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

        // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return NextResponse.json({ error: 'User already exists' }, { status: 409 });
            }
              // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("password hashed")

                // Create user
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                provider: 'credentials',
            });

            return NextResponse.json({ message: 'User registered successfully', userId: newUser._id }, { status: 201 });

        
    } catch (error) {
        console.log("Error registering user", error)
        return NextResponse.json({
            success: false,
            message: "error registering user"
        },
    {
        status: 500
    })
        
    }
  

  

  




}
