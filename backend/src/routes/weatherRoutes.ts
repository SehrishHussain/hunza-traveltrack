import express from "express";
import { getWeather } from "../services/weatherService";

const router = express.Router();
router.get("/:location", getWeather);

export default router;
