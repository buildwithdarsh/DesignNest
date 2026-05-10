"use client";

import Link from "next/link";
import { AppNavbar } from "@/components/app/navbar";
import { AppFooter } from "@/components/app/footer";
import { packageDeals, formatINRRange } from "@/lib/mock-data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// ---------------------------------------------------------------------------
// Pricing FAQs
// ---------------------------------------------------------------------------
const PRICING_FAQS = [
  {
    question: "What's included in the price?",
    answer:
      "Every package includes design consultation, 3D renders, material sourcing, project management, and execution. The price covers labour, materials listed in the BOQ, and one round of revisions. Any additional changes are quoted separately before proceeding.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No. We believe in transparent pricing. Your quote includes all costs upfront — civil work, electrical, plumbing, painting, and modular installations. Only changes you request after sign-off incur extra charges, and those are always communicated in advance.",
  },
  {
    question: "Can I customize a package?",
    answer:
      "Absolutely. Every package serves as a starting point. You can mix and match rooms, upgrade materials, or scale down scope. Our designers will work with you to create a tailored proposal that fits your budget and vision.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We offer flexible payment plans: typically 10% booking advance, 40% at material procurement, 30% at mid-project milestone, and 20% on completion. EMI options are available through our banking partners for projects above INR 3 Lakhs.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "You may cancel within 7 days of booking for a full refund (minus design consultation fees if a session has occurred). After design approval, cancellation charges apply based on work completed — typically 15-30% of the project value. Full details are in our service agreement.",
  },
];

// Popular package IDs
const POPULAR_IDS = new Set(["full-home-2bhk", "kitchen-only"]);

// ---------------------------------------------------------------------------
// Skeleton Card
// ---------------------------------------------------------------------------
function PackageSkeleton() {
  return (
    <Card className="py-0 gap-0">
      <CardHeader className="pt-5 pb-3">
        <div className="h-5 w-2/3 rounded bg-muted animate-pulse" />
        <div className="h-6 w-1/2 rounded bg-muted animate-pulse mt-2" />
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        <div className="h-3 w-full rounded bg-muted animate-pulse" />
        <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
        <div className="space-y-1.5 pt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 w-5/6 rounded bg-muted animate-pulse" />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-8 w-full rounded-lg bg-muted animate-pulse" />
      </CardFooter>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Packages Page
// ---------------------------------------------------------------------------
const PACKAGES_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function PackagesPage() {
  const { data, isLoading } = useSimulatedLoading(packageDeals, 1000, 1500);

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen pt-20 sm:pt-24 pb-14 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* ---------------------------------------------------------------- */}
          {/* Header */}
          {/* ---------------------------------------------------------------- */}
          <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12">
            {isLoading ? (
              <>
                <div className="mx-auto h-3 w-24 rounded bg-muted animate-pulse mb-3" />
                <div className="mx-auto h-8 sm:h-10 w-[60%] rounded bg-muted animate-pulse mb-4" />
                <div className="mx-auto h-4 w-[50%] rounded bg-muted animate-pulse" />
              </>
            ) : (
              <>
                <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                  Transparent Pricing
                </p>
                <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Packages &amp; Pricing
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Straightforward packages with no hidden costs. Pick a starting
                  point, then customise to your heart&apos;s content.
                </p>
              </>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Package Grid */}
          {/* ---------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <PackageSkeleton key={i} />
                ))
              : data?.map((pkg) => {
                  const isPopular = POPULAR_IDS.has(pkg.id);
                  return (
                    <Card
                      key={pkg.id}
                      className={`py-0 gap-0 relative flex flex-col overflow-visible ${
                        isPopular
                          ? "ring-2 ring-amber-500/60"
                          : ""
                      }`}
                    >
                      {isPopular && (
                        <Badge className="absolute -top-3 right-4 z-10 bg-amber-500 text-black text-[10px] sm:text-xs px-3 py-1 shadow-sm">
                          Popular
                        </Badge>
                      )}
                      <CardHeader className="pt-5 pb-2">
                        <CardTitle className="text-base sm:text-lg">
                          {pkg.name}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {pkg.scope}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-3 pb-0">
                        <div>
                          <p className="text-lg sm:text-xl font-bold tracking-tight">
                            {formatINRRange(
                              pkg.priceRange.min,
                              pkg.priceRange.max,
                              pkg.priceUnit !== "fixed"
                                ? pkg.priceUnit
                                : undefined
                            )}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                            {pkg.duration}
                          </p>
                        </div>
                        <ul className="space-y-1.5">
                          {pkg.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                            >
                              <svg
                                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="mt-4">
                        <Button
                          className="w-full rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 active:bg-amber-600"
                          render={<Link href="/quiz" />}
                        >
                          Get Started
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* FAQ Section */}
          {/* ---------------------------------------------------------------- */}
          <div className="mx-auto max-w-3xl mb-16 sm:mb-24">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-center mb-6 sm:mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion>
              {PRICING_FAQS.map((faq, i) => (
                <AccordionItem key={i} value={String(i)}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* CTA Section */}
          {/* ---------------------------------------------------------------- */}
          <div className="mx-auto max-w-2xl text-center rounded-2xl bg-secondary/50 px-6 py-10 sm:px-12 sm:py-14">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 sm:mb-3">
              Need a custom quote?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Every space is unique. Tell us about your project and
              we&apos;ll connect you with the perfect designer.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-amber-500 px-8 text-sm sm:text-base font-semibold text-black hover:bg-amber-400 active:bg-amber-600"
              render={<Link href="/designers" />}
            >
              Find a Designer
            </Button>
          </div>
        </div>
      </main>
      <AppFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PACKAGES_FAQ_JSONLD),
        }}
      />
    </>
  );
}
