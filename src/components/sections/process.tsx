"use client";

import { processSteps } from "@/lib/data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

const iconMap: Record<string, React.ReactNode> = {
  phone: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  palette: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  cube: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  hammer: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.12 7.88c1.58-1.45 3.77-1.96 5.7-.88l-7.73 7.73c-1.08-1.93-.57-4.12.88-5.7z" />
      <path d="M13.01 9.99 4.42 18.58a2.1 2.1 0 0 0-.03 2.97 2.1 2.1 0 0 0 2.97-.03l8.59-8.59" />
    </svg>
  ),
  key: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
};

export function Process() {
  const { data, isLoading } = useSimulatedLoading(processSteps, 800, 1100);

  return (
    <section id="process" className="bg-primary py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          {isLoading ? (
            <>
              <div className="mx-auto h-3 w-24 rounded bg-white/10 animate-pulse mb-3" />
              <div className="mx-auto h-8 sm:h-10 w-[60%] rounded bg-white/10 animate-pulse mb-4" />
              <div className="mx-auto h-4 w-[50%] rounded bg-white/5 animate-pulse" />
            </>
          ) : (
            <>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-amber-300/80">
                How It Works
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary-foreground">
                Our Design Process
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/60">
                A proven five-step workflow that keeps every project on time, on
                budget, and exactly as you envisioned.
              </p>
            </>
          )}
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          {!isLoading && (
            <div className="absolute top-10 sm:top-12 left-0 right-0 hidden lg:block">
              <div className="mx-auto h-[2px] w-[80%] bg-white/10" />
            </div>
          )}

          {/* Mobile: vertical timeline. Desktop: horizontal grid */}
          <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-5">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full bg-white/5 animate-pulse" />
                    <div className="flex-1 sm:flex sm:flex-col sm:items-center">
                      <div className="h-4 w-24 rounded bg-white/10 animate-pulse mb-2" />
                      <div className="h-3 w-full sm:w-32 rounded bg-white/5 animate-pulse" />
                    </div>
                  </div>
                ))
              : data?.map((step, i) => (
                  <div
                    key={step.step}
                    className={`relative flex items-start gap-4 sm:flex-col sm:items-center sm:text-center animate-fade-in-up animate-delay-${(i + 1) * 100}`}
                  >
                    {/* Circle */}
                    <div className="relative z-10 flex h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 shrink-0 flex-col items-center justify-center rounded-full bg-white/10 text-primary-foreground backdrop-blur-sm border border-white/10 sm:mb-5">
                      <div className="text-amber-300">{iconMap[step.icon]}</div>
                    </div>
                    <div className="flex-1 pt-1 sm:pt-0">
                      {/* Step number */}
                      <span className="mb-1.5 sm:mb-2 inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-amber-500/20 text-[10px] sm:text-xs font-bold text-amber-300">
                        {step.step}
                      </span>
                      <h3 className="mb-1 sm:mb-2 text-base sm:text-lg font-semibold text-primary-foreground">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-primary-foreground/50 sm:max-w-[220px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
