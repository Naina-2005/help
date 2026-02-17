"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SyncUser() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const email = user.emailAddresses?.[0]?.emailAddress ?? null;
    const name = user.fullName ?? null;

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    }).catch((err) => {
      console.error("Failed to sync user:", err);
    });
  }, [isLoaded, isSignedIn, user]);

  return null;
}
