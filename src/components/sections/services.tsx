"use client";

import Image from "next/image";
import { services } from "@/lib/data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Card, CardContent } from "@/components/ui/card";

export function Services() {
  const { data, isLoading } = useSimulatedLoading(services, 1000, 1400);

  return (
    <section id="services" className="bg-secondary/50 py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {isLoading ? (
            <>
              <div className="mx-auto h-3 w-20 rounded bg-muted animate-pulse mb-3" />
              <div className="mx-auto h-8 sm:h-10 w-[70%] rounded bg-muted animate-pulse mb-4" />
              <div className="mx-auto h-4 w-[60%] rounded bg-muted animate-pulse" />
            </>
          ) : (
            <>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                What We Do
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Design Services
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                End-to-end interior solutions — from a single room refresh to
                complete commercial build-outs.
              </p>
            </>
          )}
        </div>

        {/* Mobile: horizontal scroll cards. Tablet+: grid */}
        <div className="mt-10 sm:mt-16">
          {/* Mobile horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-5 px-5 sm:hidden no-scrollbar">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden border-0 shadow-none shrink-0 w-[72vw] snap-start py-0 gap-0">
                    <div className="aspect-[4/3] bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 w-[70%] rounded bg-muted animate-pulse mb-2" />
                      <div className="h-3 w-full rounded bg-muted animate-pulse" />
                    </CardContent>
                  </Card>
                ))
              : data?.map((service) => (
                  <Card
                    key={service.id}
                    className="overflow-hidden border-0 shadow-sm shrink-0 w-[72vw] snap-start py-0 gap-0"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="72vw"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="mb-1.5 font-semibold text-sm">{service.name}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
          </div>

          {/* Tablet+ grid */}
          <div className="hidden sm:grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden border-0 shadow-none py-0 gap-0">
                    <div className="aspect-[4/3] bg-muted animate-pulse" />
                    <CardContent className="p-5">
                      <div className="h-5 w-[70%] rounded bg-muted animate-pulse mb-3" />
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-muted animate-pulse" />
                        <div className="h-3 w-[85%] rounded bg-muted animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              : data?.map((service, i) => (
                  <Card
                    key={service.id}
                    className={`group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 py-0 gap-0 animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 700)}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="mb-2 font-semibold text-base">{service.name}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
