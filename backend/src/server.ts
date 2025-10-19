import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/trips", tripRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
