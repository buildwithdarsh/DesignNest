"use client";

import Image from "next/image";
import { testimonials } from "@/lib/data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Card, CardContent } from "@/components/ui/card";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={`sm:w-4 sm:h-4 ${i < count ? "text-amber-500" : "text-muted-foreground/30"}`}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { data, isLoading } = useSimulatedLoading(testimonials, 1800, 2500);

  return (
    <section id="testimonials" className="py-14 sm:py-20 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          {isLoading ? (
            <>
              <div className="mx-auto h-3 w-28 rounded bg-muted animate-pulse mb-3" />
              <div className="mx-auto h-8 sm:h-10 w-[60%] rounded bg-muted animate-pulse mb-4" />
              <div className="mx-auto h-4 w-[45%] rounded bg-muted animate-pulse" />
            </>
          ) : (
            <>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Client Stories
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                What Our Clients Say
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Real feedback from real projects — unedited and unfiltered.
              </p>
            </>
          )}
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-sm py-0 gap-0">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-3 items-center mb-4">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-muted animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-28 sm:w-32 rounded bg-muted animate-pulse" />
                        <div className="h-3 w-20 sm:w-24 rounded bg-muted animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded bg-muted animate-pulse" />
                      <div className="h-3 w-full rounded bg-muted animate-pulse" />
                      <div className="h-3 w-[80%] rounded bg-muted animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : data?.map((t, i) => (
                <Card
                  key={t.id}
                  className={`border-0 shadow-sm hover:shadow-md transition-shadow py-0 gap-0 animate-fade-in-up animate-delay-${(i + 1) * 100}`}
                >
                  <CardContent className="p-4 sm:p-6">
                    <Stars count={t.rating} />
                    <blockquote className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="mt-4 sm:mt-6 flex items-center gap-3">
                      <Image
                        src={t.avatar}
                        alt={t.clientName}
                        width={44}
                        height={44}
                        className="rounded-full object-cover h-10 w-10 sm:h-11 sm:w-11"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">{t.clientName}</p>
                        <p className="text-[11px] sm:text-xs text-muted-foreground">
                          {t.projectType} &middot; {t.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Show remaining as smaller cards */}
        {!isLoading && data && data.length > 3 && (
          <div className="mt-4 sm:mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
            {data.slice(3).map((t, i) => (
              <Card
                key={t.id}
                className={`border-0 shadow-sm py-0 gap-0 animate-fade-in-up animate-delay-${(i + 4) * 100}`}
              >
                <CardContent className="p-4 sm:p-6 flex gap-3 sm:gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.clientName}
                    width={44}
                    height={44}
                    className="rounded-full object-cover h-10 w-10 sm:h-11 sm:w-11 shrink-0"
                  />
                  <div>
                    <div className="mb-1.5 sm:mb-2">
                      <p className="text-xs sm:text-sm font-semibold">{t.clientName}</p>
                      <p className="text-[11px] sm:text-xs text-muted-foreground">
                        {t.projectType} &middot; {t.location}
                      </p>
                    </div>
                    <blockquote className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
