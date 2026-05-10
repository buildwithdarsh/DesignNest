"use client";

import Image from "next/image";
import { aboutStats } from "@/lib/data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Separator } from "@/components/ui/separator";

export function About() {
  const { isLoading } = useSimulatedLoading(true, 900, 1200);

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative">
            {isLoading ? (
              <div className="aspect-[4/5] w-full rounded-2xl bg-muted animate-pulse" />
            ) : (
              <div className="animate-fade-in-up">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop&q=80"
                    alt="Elegantly designed living space by DesignNest"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-4 right-4 sm:-bottom-6 sm:-right-6 lg:-right-12 rounded-xl bg-white p-4 sm:p-6 shadow-xl">
                  <p className="text-2xl sm:text-3xl font-bold text-primary">15+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Years Crafting<br />Beautiful Spaces</p>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                <div className="h-8 sm:h-10 w-[80%] rounded bg-muted animate-pulse" />
                <div className="h-4 w-full rounded bg-muted animate-pulse" />
                <div className="h-4 w-[90%] rounded bg-muted animate-pulse" />
                <div className="h-4 w-[70%] rounded bg-muted animate-pulse" />
                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 sm:h-20 rounded-lg bg-muted animate-pulse" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-fade-in-up">
                <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                  About DesignNest
                </p>
                <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Where Vision Meets Craftsmanship
                </h2>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2011, DesignNest began as a two-person studio in
                    Bangalore with a simple conviction: great design should be
                    accessible, transparent, and deeply personal. Every space we
                    create starts with listening — understanding how you live,
                    work, and dream — before we sketch a single line.
                  </p>
                  <p>
                    Today, our 40-member team spans architects, interior
                    designers, 3D visualization artists, and project managers
                    across 10 Indian cities. We&apos;ve delivered over 200 projects —
                    from cozy studio apartments to 12,000 sq ft corporate
                    headquarters — earning a 98% client satisfaction rate and
                    multiple industry awards along the way.
                  </p>
                  <p>
                    Our approach blends contemporary aesthetics with timeless
                    functionality. We champion sustainable materials,
                    locally-sourced craftsmanship, and smart-home integration —
                    because beautiful spaces should also be responsible ones.
                  </p>
                </div>

                <Separator className="my-8 sm:my-10" />

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
                  {aboutStats.map((stat, i) => (
                    <div key={stat.label} className={`animate-fade-in-up animate-delay-${(i + 1) * 100}`}>
                      <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
