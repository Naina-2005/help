import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get("destination");

    if (!destination)
      return NextResponse.json({ error: "Destination required" }, { status: 400 });

    const messages = await prisma.message.findMany({
      where: { destination },
      orderBy: { createdAt: "asc" },
      take: 50,
    });

    return NextResponse.json(messages);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const { content, destination, userName } = await req.json();

    if (!content || !destination || !userName) {
      return NextResponse.json(
        { error: "content, destination and userName are all required" },
        { status: 400 }
      );
    }

    const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!dbUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const message = await prisma.message.create({
      data: {
        content,
        destination,
        userName,
        userId: dbUser.id,
      },
    });

    return NextResponse.json(message);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}