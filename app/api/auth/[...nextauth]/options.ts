// lib/authOptions.ts
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import {User} from '@/models/User';
import {dbConnect} from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';

export const authOptions: AuthOptions = {
  providers: [
    // Email & Password Login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        try {
            if (!credentials?.email || !credentials?.password) {
                throw new Error('Both email and password are required');
            }
            const user = await User.findOne({ 
               email: credentials.email
             });
             if (!user) {
                throw new Error('no user found with this email in auth')
             }
             if(!user.isVerified){
                throw new Error('plz verify your acct before login')
             }

            const isPasswordCorrect =  await bcrypt.compare(credentials.password, user.password)
            if(isPasswordCorrect) {
                return user
            } else {
                throw new Error('Incorrect password')
            }
        } catch (error: any) {
            throw new error
            
        }   
    }    
    }),

    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Apple Login (optional for web, useful for iOS mobile app)
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
      //  token.isVerified = user.isVerified
        token.email = user.email;
      }
      return token;  // always return token in jwt
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
       // session.user.isVerified = token.isVerified;
      }
      return session;  // always return session in session
    },
  },

  pages: {
    signIn: '/sign-in', // optional: customize login route
  },

  secret: process.env.NEXTAUTH_SECRET,
};
