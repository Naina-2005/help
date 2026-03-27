import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const fullPrompt = `
      You are a travel planning assistant. Based on this request: "${prompt}"
      Generate a detailed trip plan in JSON format with this exact structure:
      {
        "destination": "city, country",
        "duration": "X days",
        "budget": "estimated budget in USD",
        "bestTimeToVisit": "months",
        "itinerary": [
          {
            "day": 1,
            "title": "Day title",
            "activities": ["activity 1", "activity 2"],
            "meals": { "breakfast": "place", "lunch": "place", "dinner": "place" },
            "hotel": "recommended hotel name"
          }
        ],
        "packingList": ["item1", "item2"],
        "tips": ["tip1", "tip2"]
      }
      Return ONLY the JSON, no extra text.
    `;

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, "").trim();
    const tripData = JSON.parse(clean);

    const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!dbUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const trip = await prisma.trip.create({
      data: {
        userId: dbUser.id,
        prompt,
        destination: tripData.destination,
        tripData,
      },
    });

    return NextResponse.json({ tripId: trip.id, tripData });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate trip" }, { status: 500 });
  }
}