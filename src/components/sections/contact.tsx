"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";

export function Contact() {
  const { isLoading } = useSimulatedLoading(true, 500, 800);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          {isLoading ? (
            <>
              <div className="mx-auto h-3 w-24 rounded bg-muted animate-pulse mb-3" />
              <div className="mx-auto h-8 sm:h-10 w-[70%] sm:w-[60%] rounded bg-muted animate-pulse mb-4" />
              <div className="mx-auto h-4 w-[50%] rounded bg-muted animate-pulse" />
            </>
          ) : (
            <>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Get In Touch
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Book a Free Consultation
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Tell us about your project and we&apos;ll get back to you within 24
                hours with a tailored proposal.
              </p>
            </>
          )}
        </div>

        <div className="grid gap-10 sm:gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="space-y-5 sm:space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-3 w-16 rounded bg-muted animate-pulse mb-2" />
                    <div className="h-11 w-full rounded-md bg-muted animate-pulse" />
                  </div>
                ))}
                <div className="h-12 w-full sm:w-48 rounded-full bg-muted animate-pulse" />
              </div>
            ) : submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border bg-card p-8 sm:p-12 text-center animate-fade-in-up">
                <div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                  We&apos;ve received your consultation request. A member of our
                  team will reach out within 24 hours to schedule your
                  discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 animate-fade-in-up">
                <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs sm:text-sm">Full Name *</Label>
                    <Input id="name" placeholder="Priya Mehta" required className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm">Email *</Label>
                    <Input id="email" type="email" placeholder="priya@example.com" required className="h-11" />
                  </div>
                </div>

                <div className="grid gap-5 sm:gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm">Phone *</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-type" className="text-xs sm:text-sm">Project Type *</Label>
                    <Select required>
                      <SelectTrigger id="project-type" className="h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-xs sm:text-sm">Approximate Budget (optional)</Label>
                  <Select>
                    <SelectTrigger id="budget" className="h-11">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-2l">Under INR 2 Lakhs</SelectItem>
                      <SelectItem value="2l-5l">INR 2 - 5 Lakhs</SelectItem>
                      <SelectItem value="5l-10l">INR 5 - 10 Lakhs</SelectItem>
                      <SelectItem value="10l-25l">INR 10 - 25 Lakhs</SelectItem>
                      <SelectItem value="25l-50l">INR 25 - 50 Lakhs</SelectItem>
                      <SelectItem value="50l-plus">INR 50 Lakhs+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs sm:text-sm">Tell Us About Your Project *</Label>
                  <Textarea
                    id="message"
                    placeholder="I recently purchased a 3BHK in Powai and want modern, functional interiors with a focus on smart storage..."
                    rows={4}
                    required
                    className="min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="h-12 rounded-full bg-amber-500 px-6 sm:px-8 text-sm sm:text-base font-semibold text-black hover:bg-amber-400 active:bg-amber-600 transition-colors disabled:opacity-60 w-full sm:w-auto"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Request Free Consultation"
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact info + Map */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="space-y-5 sm:space-y-6">
                <div className="aspect-video sm:h-64 rounded-xl bg-muted animate-pulse" />
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-11 w-11 rounded-lg bg-muted animate-pulse shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                        <div className="h-3 w-full rounded bg-muted animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-fade-in-up animate-delay-200 space-y-6 sm:space-y-8">
                {/* Map */}
                <div className="overflow-hidden rounded-xl border">
                  <div className="aspect-video sm:aspect-auto sm:h-64">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.6!3d12.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU1JzQ4LjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "200px" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="DesignNest Studio Location"
                      className="grayscale h-full w-full"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-xs sm:text-sm">Studio Address</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        42, 3rd Floor, Brigade Road<br />
                        Koramangala, Bangalore 560034
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-xs sm:text-sm">Phone</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">+91 80 4567 8900</p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-xs sm:text-sm">Email</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">hello@designnest.in</p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-xs sm:text-sm">Working Hours</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Mon – Sat: 10:00 AM – 7:00 PM<br />
                        Sunday: By appointment only
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
