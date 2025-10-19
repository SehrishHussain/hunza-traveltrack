import express from "express";
import { Trip } from "../models/Trip";
const router = express.Router();

// GET /api/trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find().populate("valleys").lean();
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching trips" });
  }
});

export default router;
