import axios from "axios";
import { Request, Response } from "express";

export const getWeather = async (req: Request, res: Response) => {
  const { location } = req.params;
  const apiKey = process.env.OPENWEATHER_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const { data } = await axios.get(url);
    res.json({
      location: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};
