import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for casual travellers",
    features: [
      "3 AI trip plans per month",
      "Basic itinerary generation",
      "Access to travel community chat",
      "Packing list & travel tips",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For frequent travellers",
    features: [
      "Unlimited AI trip plans",
      "Detailed day-by-day itinerary",
      "Priority AI generation",
      "Access to travel community chat",
      "Packing list & travel tips",
      "Export trips as PDF",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$19",
    period: "/month",
    description: "Plan trips with your group",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Collaborative trip planning",
      "Shared trip dashboard",
      "Priority support",
    ],
    cta: "Get Team",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground text-lg">
          Choose the plan that works best for your travel needs
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-6 space-y-6 border ${
              plan.highlighted
                ? "border-primary bg-primary text-white shadow-xl scale-105"
                : "border-border"
            }`}
          >
            <div className="space-y-2">
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className={`text-sm ${plan.highlighted ? "opacity-80" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className={`text-sm mb-1 ${plan.highlighted ? "opacity-80" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                )}
              </div>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className={`h-4 w-4 flex-shrink-0 ${plan.highlighted ? "text-white" : "text-primary"}`} />
                  {feature}
                </li>
              ))}
            </ul>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "secondary" : "default"}
                >
                  {plan.cta}
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes! You can cancel your subscription at any time with no questions asked.",
            },
            {
              q: "What AI model powers TripSphere?",
              a: "TripSphere uses Google's Gemini AI to generate detailed, personalised trip plans.",
            },
            {
              q: "Is the community chat free?",
              a: "Yes! The travel community chat is available on all plans including the free tier.",
            },
            {
              q: "How accurate are the trip plans?",
              a: "Our AI generates realistic itineraries based on your prompt. We recommend verifying hotel and restaurant availability before booking.",
            },
          ].map((faq) => (
            <div key={faq.q} className="border rounded-2xl p-5 space-y-2">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}