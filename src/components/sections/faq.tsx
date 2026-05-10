"use client";

import { faqItems } from "@/lib/data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const { data, isLoading } = useSimulatedLoading(faqItems, 400, 700);

  return (
    <section id="faq" className="py-14 sm:py-20 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          {isLoading ? (
            <>
              <div className="mx-auto h-3 w-28 rounded bg-muted animate-pulse mb-3" />
              <div className="mx-auto h-8 sm:h-10 w-[60%] sm:w-[50%] rounded bg-muted animate-pulse mb-4" />
            </>
          ) : (
            <>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Common Questions
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
            </>
          )}
        </div>

        {/* Accordion */}
        {isLoading ? (
          <div className="space-y-2.5 sm:space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-card p-4 sm:p-5">
                <div className="h-4 sm:h-5 w-[75%] rounded bg-muted animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <Accordion className="space-y-2.5 sm:space-y-3">
            {data?.map((item, i) => (
              <AccordionItem
                key={i}
                className="rounded-lg border bg-card px-4 sm:px-5 data-open:shadow-sm transition-shadow"
              >
                <AccordionTrigger className="text-left text-sm sm:text-[15px] font-medium hover:no-underline py-4 sm:py-5 min-h-[48px]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm leading-relaxed text-muted-foreground pb-4 sm:pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
