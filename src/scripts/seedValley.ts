// scripts/seedValleys.ts
const mongoose = require('mongoose');
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import Valley from '@/backend/src/models/Valley';
import Place from '@/backend/src/models/Place';

dotenv.config({ path: '.env.local' });

const filePath = path.join(__dirname, '../valleys_with_places_updated.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    await Valley.deleteMany({});
    await Place.deleteMany({});
    console.log('🗑️ Cleared existing Valleys and Places');

    for (const valley of data) {
      const { places, ...valleyInfo } = valley;
      const createdValley = await Valley.create(valleyInfo);

      if (places && Array.isArray(places)) {
        for (const place of places) {
          await Place.create({
            ...place,
            valley: createdValley._id,
            location: place.coordinates,
          });
        }
      }
    }

    console.log('🌄 Seeded valleys and places successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
