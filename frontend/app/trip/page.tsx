"use client";

import { useEffect, useState } from "react";

export default function TripTestPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/trips")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched trips:", data);
        setTrips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trips:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-8">Loading trips...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trips (test page)</h1>
      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <ul className="space-y-3">
          {trips.map((trip) => (
            <li key={trip._id} className="border rounded p-3">
              <h2 className="font-semibold">{trip.title}</h2>
              <p>
                {new Date(trip.startDate).toLocaleDateString()} -{" "}
                {new Date(trip.endDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">{trip.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
