// models/Place.ts
import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: {
    lat: Number,
    lng: Number,
  },
  imageUrl: String, // optional if you want images
  valley: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Valley',
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Place || mongoose.model('Place', PlaceSchema);
