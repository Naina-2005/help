import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });

    const body = await req.json();
    const { email, name } = body;

    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: { email, name },
      create: { clerkId: userId, email, name },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}