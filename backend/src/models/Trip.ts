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
    others?: string[];
  };
  notes?: string;
  trackingIntervalMinutes?: number;
  trackDuring?: 'travel-only' | 'always';
  createdAt: Date;

  // 🌦️ Weather + Alerts
  weatherSummary?: string;
  floodRiskLevel?: 'low' | 'moderate' | 'high';
  alerts?: {
    type: 'flood' | 'landslide' | 'road-block' | 'weather';
    description: string;
    issuedAt: Date;
  }[];

  // 🧠 AI-generated itinerary
  aiGenerated?: boolean;
  itinerary?: {
    day: number;
    places: {
      name: string;
      description?: string;
      lat?: number;
      lng?: number;
      recommendedTime?: string;
    }[];
    summary?: string;
  }[];

  // 🎉 Festivals
  nearbyFestivals?: {
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    description?: string;
  }[];
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
    others: [{ type: String }],
  },

  notes: { type: String },
  trackingIntervalMinutes: { type: Number, default: 60 },
  trackDuring: { type: String, enum: ['travel-only', 'always'], default: 'travel-only' },
  createdAt: { type: Date, default: Date.now },

  // 🌦️ Weather + Alerts
  weatherSummary: { type: String },
  floodRiskLevel: { type: String, enum: ['low', 'moderate', 'high'], default: 'low' },
  alerts: [
    {
      type: { type: String, enum: ['flood', 'landslide', 'road-block', 'weather'] },
      description: String,
      issuedAt: Date,
    },
  ],

  // 🧠 AI Itinerary
  aiGenerated: { type: Boolean, default: false },
  itinerary: [
    {
      day: Number,
      places: [
        {
          name: String,
          description: String,
          lat: Number,
          lng: Number,
          recommendedTime: String,
        },
      ],
      summary: String,
    },
  ],

  // 🎉 Festivals
  nearbyFestivals: [
    {
      name: String,
      location: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
});

export const Trip = models.Trip || model<ITrip>('Trip', TripSchema);
