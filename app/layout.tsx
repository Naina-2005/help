import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./_components/provider";
import ClerkProviderWrapper from "../components/ClerkProvider";
import SyncUser from "@/components/SyncUser";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "TripSphere",
  description: "AI Trip Planner",
};

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <ClerkProviderWrapper>
          <Provider>
            <SyncUser />
            <Header />
            {children}
          </Provider>
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}