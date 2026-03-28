import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Chat from "@/components/Chat";

export default async function TripPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;
  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip) return notFound();

  const data = trip.tripData as any;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Trip Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">{data.destination}</h1>
        <p className="text-muted-foreground">{data.duration} · {data.budget}</p>
        <p className="text-sm">Best time to visit: {data.bestTimeToVisit}</p>
      </div>

      {/* Itinerary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Your Itinerary</h2>
        {data.itinerary?.map((day: any) => (
          <div key={day.day} className="border rounded-2xl p-6 space-y-3">
            <h3 className="text-xl font-bold">Day {day.day} — {day.title}</h3>
            <ul className="list-disc list-inside space-y-1">
              {day.activities.map((a: string, i: number) => <li key={i}>{a}</li>)}
            </ul>
            <p className="text-sm text-muted-foreground">
              🍳 {day.meals.breakfast} · 🥗 {day.meals.lunch} · 🍽️ {day.meals.dinner}
            </p>
            <p className="text-sm">🏨 {day.hotel}</p>
          </div>
        ))}
      </div>

      {/* Packing & Tips */}
      <div className="grid grid-cols-2 gap-6">
        <div className="border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Packing List</h2>
          <ul className="list-disc list-inside space-y-1">
            {data.packingList?.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        <div className="border rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Travel Tips</h2>
          <ul className="list-disc list-inside space-y-1">
            {data.tips?.map((tip: string, i: number) => <li key={i}>{tip}</li>)}
          </ul>
        </div>
      </div>

      {/* Community Chat */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Travel Community</h2>
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Live</span>
        </div>
        <p className="text-muted-foreground text-sm">
          Connect with other travellers heading to {data.destination}. Share tips, ask questions, make friends!
        </p>
        <Chat destination={data.destination} />
      </div>
    </div>
  );
}