"use client";

import { useState } from "react";
import Image from "next/image";
import { type Designer, formatINRRange } from "@/lib/mock-data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// -----------------------------------------------------------------------------
// Mock reviews
// -----------------------------------------------------------------------------

interface Review {
  id: string;
  clientName: string;
  projectType: string;
  rating: number;
  text: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "r1",
    clientName: "Rohit Sharma",
    projectType: "3 BHK Apartment",
    rating: 5,
    text: "Absolutely exceeded our expectations. The attention to detail in material selection and the way natural light was incorporated into every room made our apartment feel twice its size. Would recommend without hesitation.",
    date: "2025-11-14",
  },
  {
    id: "r2",
    clientName: "Ananya Patel",
    projectType: "Villa Renovation",
    rating: 5,
    text: "Working with this designer was a dream. They understood our family's lifestyle perfectly and delivered a home that balances aesthetics with practicality. The kids' play area is genius.",
    date: "2025-09-22",
  },
  {
    id: "r3",
    clientName: "Vikram Mehta",
    projectType: "Penthouse Interior",
    rating: 4,
    text: "Great design vision and professional execution. There were minor delays in the final phase but the end result was well worth the wait. The living room is now our favourite space to entertain guests.",
    date: "2025-07-08",
  },
  {
    id: "r4",
    clientName: "Sunita Reddy",
    projectType: "Home Office Setup",
    rating: 5,
    text: "Transformed a cramped spare bedroom into a stunning, ergonomic home office. The custom shelving and cable management solutions were incredibly thoughtful. My productivity has genuinely improved.",
    date: "2025-05-30",
  },
  {
    id: "r5",
    clientName: "Arjun Bhatia",
    projectType: "Kitchen Remodel",
    rating: 4,
    text: "The modular kitchen design is both beautiful and functional. Storage is maximized in ways I did not think possible. Communication could have been slightly better during the sourcing phase but overall very satisfied.",
    date: "2025-03-15",
  },
];

const ratingBreakdown = [
  { label: "Design Quality", score: 4.9 },
  { label: "Communication", score: 4.7 },
  { label: "Budget Adherence", score: 4.5 },
  { label: "Timeline", score: 4.3 },
  { label: "Workmanship", score: 4.8 },
];

// -----------------------------------------------------------------------------
// Star rating
// -----------------------------------------------------------------------------

function StarRating({
  rating,
  size = 14,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating >= i + 0.5;
        const gradientId = `half-${i}-${size}`;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : half ? `url(#${gradientId})` : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-amber-500"
          >
            {half && (
              <defs>
                <linearGradient id={gradientId}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Main client component
// -----------------------------------------------------------------------------

export function DesignerProfileClient({
  designer,
}: {
  designer: Designer;
}) {
  const { isLoading: portfolioLoading } = useSimulatedLoading(
    designer.portfolioImages,
    1200,
    1800
  );
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const availabilityColor =
    designer.availability === "available"
      ? "bg-green-500"
      : designer.availability === "busy"
        ? "bg-amber-500"
        : "bg-red-500";

  const availabilityText =
    designer.availability === "available"
      ? "Available Now"
      : designer.availability === "busy"
        ? "Limited Availability"
        : "Unavailable";

  return (
    <main className="min-h-screen pt-14 sm:pt-16">
      {/* ================================================================= */}
      {/* 1. Hero Banner                                                    */}
      {/* ================================================================= */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10">
            {/* Photo */}
            <div className="relative shrink-0 h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
              <Image
                src={designer.photo}
                alt={designer.name}
                fill
                className="object-cover"
                sizes="176px"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  {designer.name}
                </h1>
                {designer.verified && (
                  <Badge className="bg-green-600 text-white text-[10px] sm:text-xs">
                    Verified
                  </Badge>
                )}
              </div>

              <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                {designer.title} at{" "}
                <span className="font-medium text-foreground">
                  {designer.firm}
                </span>
              </p>

              {/* Rating */}
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                <StarRating rating={designer.rating} size={16} />
                <span className="text-sm font-semibold">{designer.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({designer.reviewCount} reviews)
                </span>
              </div>

              {/* Location & Response time */}
              <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {designer.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Responds {designer.responseTime.toLowerCase()}
                </span>
              </div>

              {/* Specialization tags */}
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                {designer.specializations.map((spec) => (
                  <Badge key={spec} variant="secondary" className="text-xs">
                    {spec}
                  </Badge>
                ))}
                {designer.styles.map((style) => (
                  <Badge key={style} variant="outline" className="text-xs">
                    {style}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Content area: main + sidebar                                      */}
      {/* ================================================================= */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-8 sm:py-12 lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
        {/* LEFT COLUMN */}
        <div className="space-y-10">
          {/* ============================================================= */}
          {/* 2. Quick Stats                                                */}
          {/* ============================================================= */}
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  label: "Projects Completed",
                  value: designer.projectCount.toString(),
                },
                {
                  label: "Years Experience",
                  value: designer.yearsOfExperience.toString(),
                },
                { label: "Avg Rating", value: designer.rating.toFixed(1) },
                { label: "Response Time", value: designer.responseTime },
              ].map((stat) => (
                <Card key={stat.label} className="py-0 gap-0">
                  <CardContent className="py-4 text-center">
                    <p className="text-xl sm:text-2xl font-bold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ============================================================= */}
          {/* 3. Bio Section                                                */}
          {/* ============================================================= */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-3">
              About {designer.name}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {designer.bio}
            </p>
          </section>

          <Separator />

          {/* ============================================================= */}
          {/* 4. Portfolio Gallery                                          */}
          {/* ============================================================= */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-4">
              Portfolio
            </h2>

            {portfolioLoading ? (
              <div className="masonry-grid">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="masonry-grid">
                {designer.portfolioImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="w-full overflow-hidden rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    onClick={() => setLightboxIdx(idx)}
                  >
                    <Image
                      src={img}
                      alt={`${designer.name} portfolio ${idx + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Lightbox Dialog */}
            <Dialog
              open={lightboxIdx !== null}
              onOpenChange={(open) => {
                if (!open) setLightboxIdx(null);
              }}
            >
              <DialogContent className="sm:max-w-3xl p-2 sm:p-3">
                <DialogTitle className="sr-only">
                  Portfolio image {lightboxIdx !== null ? lightboxIdx + 1 : ""}
                </DialogTitle>
                {lightboxIdx !== null && (
                  <div className="relative">
                    <Image
                      src={designer.portfolioImages[lightboxIdx]}
                      alt={`${designer.name} portfolio ${lightboxIdx + 1}`}
                      width={1200}
                      height={900}
                      className="w-full h-auto rounded-lg object-contain max-h-[80vh]"
                      sizes="(max-width: 768px) 95vw, 800px"
                    />

                    {/* Prev / Next arrows */}
                    {designer.portfolioImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          onClick={() =>
                            setLightboxIdx(
                              (lightboxIdx - 1 + designer.portfolioImages.length) %
                                designer.portfolioImages.length
                            )
                          }
                          aria-label="Previous image"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                          onClick={() =>
                            setLightboxIdx(
                              (lightboxIdx + 1) %
                                designer.portfolioImages.length
                            )
                          }
                          aria-label="Next image"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </section>

          <Separator />

          {/* ============================================================= */}
          {/* 5. Services & Pricing                                         */}
          {/* ============================================================= */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-4">
              Services &amp; Pricing
            </h2>
            <Card className="py-0 gap-0">
              <CardContent className="py-5 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Price Range
                  </p>
                  <p className="mt-1 text-lg sm:text-xl font-bold">
                    {formatINRRange(
                      designer.priceRange.min,
                      designer.priceRange.max,
                      designer.priceRange.unit
                    )}
                  </p>
                </div>

                <Separator />

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">
                    Design Styles
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {designer.styles.map((style) => (
                      <Badge key={style} variant="secondary" className="text-xs">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">
                    Specializations
                  </p>
                  <ul className="space-y-1.5">
                    {designer.specializations.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-center gap-2 text-sm"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600 shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* ============================================================= */}
          {/* 6. Reviews Section                                            */}
          {/* ============================================================= */}
          <section>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-4">
              Client Reviews
            </h2>

            {/* Rating breakdown */}
            <Card className="py-0 gap-0 mb-6">
              <CardHeader className="pb-0 pt-4">
                <CardTitle className="text-sm font-semibold">
                  Rating Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="py-4 space-y-3">
                {ratingBreakdown.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xs sm:text-sm text-muted-foreground w-32 shrink-0">
                      {item.label}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-500 transition-all"
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium w-8 text-right">
                      {item.score}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Individual reviews */}
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <Card key={review.id} className="py-0 gap-0">
                  <CardContent className="py-4 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div>
                        <p className="text-sm font-semibold">
                          {review.clientName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {review.projectType}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN — Booking CTA (desktop sidebar) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <Card className="py-0 gap-0">
              <CardContent className="py-5 space-y-4">
                {/* Availability */}
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${availabilityColor}`}
                  />
                  <span className="text-sm font-medium">{availabilityText}</span>
                </div>

                <Separator />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Consultation Fee
                  </p>
                  <p className="text-2xl font-bold mt-0.5">
                    <span className="text-base font-normal text-muted-foreground">
                      INR
                    </span>{" "}
                    1,999
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    60-minute video consultation
                  </p>
                </div>

                <Button className="w-full h-11 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 active:bg-amber-600">
                  Book Consultation
                </Button>

                <p className="text-[11px] text-center text-muted-foreground">
                  Free cancellation up to 24 hours before
                </p>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {/* ================================================================= */}
      {/* 7. Sticky Bottom Bar — mobile only                                */}
      {/* ================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${availabilityColor}`}
              />
              <span className="text-xs font-medium">{availabilityText}</span>
            </div>
            <p className="text-sm font-bold mt-0.5">
              <span className="text-xs font-normal text-muted-foreground">
                INR
              </span>{" "}
              1,999
              <span className="text-xs font-normal text-muted-foreground ml-1">
                consultation
              </span>
            </p>
          </div>
          <Button className="h-10 rounded-full bg-amber-500 px-6 text-sm font-semibold text-black hover:bg-amber-400 active:bg-amber-600">
            Book Consultation
          </Button>
        </div>
      </div>

      {/* Spacer so content isn't hidden behind sticky bar on mobile */}
      <div className="h-20 lg:hidden" />
    </main>
  );
}
