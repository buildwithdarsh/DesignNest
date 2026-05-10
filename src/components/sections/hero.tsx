"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

export function Hero() {
  const { isLoading } = useSimulatedLoading(true, 600, 900);

  return (
    <section id="hero" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      {/* Background image */}
      {isLoading ? (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      ) : (
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop&q=80"
            alt="Luxurious modern living room with warm tones"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-black/80 via-black/50 to-black/20 sm:to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-24 sm:items-center sm:pb-0">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {isLoading ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="h-3 w-28 rounded bg-white/20 animate-pulse" />
                <div className="h-10 sm:h-14 w-[80%] rounded bg-white/20 animate-pulse" />
                <div className="h-10 sm:h-14 w-[60%] rounded bg-white/20 animate-pulse" />
                <div className="h-4 w-[70%] rounded bg-white/10 animate-pulse" />
                <div className="h-12 w-full sm:w-56 rounded bg-white/20 animate-pulse" />
              </div>
            ) : (
              <>
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/70 animate-fade-in-up">
                  DesignNest Studio
                </p>
                <h1 className="mb-4 sm:mb-6 text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white animate-fade-in-up animate-delay-100">
                  Spaces That
                  <br />
                  <span className="text-amber-300">Inspire Living</span>
                </h1>
                <p className="mb-8 sm:mb-10 max-w-lg text-base sm:text-lg leading-relaxed text-white/80 animate-fade-in-up animate-delay-200">
                  Professional interior design studio crafting homes, offices,
                  and commercial spaces across India for over 15 years.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animate-delay-300">
                  <Button
                    size="lg"
                    className="h-12 sm:h-13 rounded-full bg-amber-500 px-6 sm:px-8 text-sm sm:text-base font-semibold text-black hover:bg-amber-400 active:bg-amber-600 transition-colors w-full sm:w-auto"
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Book a Free Consultation
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 sm:h-13 rounded-full border-white/40 bg-white/10 backdrop-blur-sm px-6 sm:px-8 text-sm sm:text-base font-semibold text-white hover:bg-white/20 active:bg-white/30 transition-colors w-full sm:w-auto"
                    onClick={() =>
                      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View Our Work
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      {!isLoading && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-white/50">
              <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="2" />
              <circle cx="10" cy="10" r="2" fill="currentColor" className="animate-bounce" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
