"use client";

import Image from "next/image";
import { teamMembers } from "@/lib/data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Card, CardContent } from "@/components/ui/card";

export function Team() {
  const { data, isLoading } = useSimulatedLoading(teamMembers, 1000, 1500);

  return (
    <section id="team" className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          {isLoading ? (
            <>
              <div className="mx-auto h-3 w-20 rounded bg-muted animate-pulse mb-3" />
              <div className="mx-auto h-8 sm:h-10 w-[50%] rounded bg-muted animate-pulse mb-4" />
              <div className="mx-auto h-4 w-[60%] rounded bg-muted animate-pulse" />
            </>
          ) : (
            <>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                The People
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Our Team
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Award-winning designers, architects, and project managers united
                by a passion for transforming spaces.
              </p>
            </>
          )}
        </div>

        {/* Team grid — 2 cols on mobile for compact cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-sm overflow-hidden py-0 gap-0">
                  <div className="aspect-[1/1] bg-muted animate-pulse" />
                  <CardContent className="p-3 sm:p-5">
                    <div className="h-4 sm:h-5 w-24 sm:w-32 rounded bg-muted animate-pulse mb-2" />
                    <div className="h-3 w-28 sm:w-40 rounded bg-muted animate-pulse" />
                  </CardContent>
                </Card>
              ))
            : data?.map((member, i) => (
                <Card
                  key={member.id}
                  className={`group border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden py-0 gap-0 animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 600)}`}
                >
                  <div className="relative aspect-[1/1] overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-5">
                    <h3 className="text-sm sm:text-base font-semibold">{member.name}</h3>
                    <p className="text-xs sm:text-sm text-accent">{member.title}</p>
                    <p className="mt-1 sm:mt-2 text-[11px] sm:text-xs text-muted-foreground">
                      {member.specialization} &middot; {member.yearsOfExperience} yrs
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}
