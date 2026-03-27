import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      trips: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  const trips = dbUser?.trips ?? [];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <Link href="/">
          <button className="bg-primary text-white px-4 py-2 rounded-lg">
            + New Trip
          </button>
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl">No trips yet!</p>
          <p>Go back home and plan your first trip.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => {
            const data = trip.tripData as any
            return (
              <Link key={trip.id} href={`/trip/${trip.id}`}>
                <div className="border rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer space-y-2">
                  <h2 className="text-xl font-semibold">{trip.destination}</h2>
                  <p className="text-sm text-muted-foreground">{data?.duration}</p>
                  <p className="text-sm text-muted-foreground">Budget: {data?.budget}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
}