import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ITrip extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  startDate: Date;
  endDate: Date;
  valleys: mongoose.Types.ObjectId[];
  checklist?: {
    clothing: string[];
    health: string[];
    documents?: string[];
  };
  notes?: string;
  trackingIntervalMinutes?: number;
  trackDuring?: 'travel-only' | 'always';
  createdAt: Date;
}

const TripSchema: Schema = new Schema<ITrip>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  valleys: [{ type: Schema.Types.ObjectId, ref: 'Valley', required: true }],
  checklist: {
    clothing: [{ type: String }],
    health: [{ type: String }],
    documents: [{ type: String }],
  },
  notes: { type: String },
  trackingIntervalMinutes: { type: Number, default: 60 },
  trackDuring: { type: String, enum: ['travel-only', 'always'], default: 'travel-only' },
  createdAt: { type: Date, default: Date.now },
});

export const Trip = models.Trip || model<ITrip>('Trip', TripSchema);
