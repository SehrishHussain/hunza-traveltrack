// lib/api.ts
export async function fetchWeather(location: string) {
  const res = await fetch(`http://localhost:5000/api/weather/${location}`);
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
}
