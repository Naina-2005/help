"use client";

import { createTrip } from "@/app/actions/trip";

export default function CreateTripForm() {
  async function handleCreate() {
    await createTrip({
      destination: "Paris",
      startDate: new Date(),
      endDate: new Date(),
      budget: "Medium",
      itinerary: {}
    });

    alert("Trip created!");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2></h2>

      <button
        onClick={handleCreate}
        style={{
          padding: "10px 20px",
          background: "orange",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Generate Trip
      </button>
    </div>
  );
}
