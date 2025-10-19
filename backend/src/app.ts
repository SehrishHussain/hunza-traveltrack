import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import tripRoutes from "./routes/tripRoutes";
import weatherRoutes from "./routes/weatherRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

app.use("/api/trips", tripRoutes);
app.use("/api/weather", weatherRoutes);

export default app;
