// models/Valley.ts
import mongoose from 'mongoose';

const DangerZoneSchema = new mongoose.Schema({
  description: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

const EmergencyContactSchema = new mongoose.Schema({
  type: String, // e.g. 'Police', 'Hospital'
  name: String,
  phone: String,
});

const ValleySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  center: {
    lat: Number,
    lng: Number,
  },
  emergencyContacts: [EmergencyContactSchema],
  climateInfo: String,
  dangerZones: [DangerZoneSchema],
}, { timestamps: true });

export default mongoose.models.Valley || mongoose.model('Valley', ValleySchema);
