import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // optional if social login
  provider?: 'google' | 'credentials';
  image?: string;
  locationTrackingPreference?: {
    intervalMinutes: number;
    mode: 'travel-only' | 'always';
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  provider: { type: String, enum: ['google', 'credentials'], default: 'credentials' },
  image: { type: String },
  locationTrackingPreference: {
    intervalMinutes: { type: Number, default: 60 },
    mode: { type: String, enum: ['travel-only', 'always'], default: 'travel-only' }
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model<IUser>('User', UserSchema);
