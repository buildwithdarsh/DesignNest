"use client";

import Link from "next/link";
import Image from "next/image";
import { AppNavbar } from "@/components/app/navbar";
import { AppFooter } from "@/components/app/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import {
  designers,
  featuredProjects,
  packageDeals,
  homepageStats,
  testimonials,
  formatINRRange,
} from "@/lib/mock-data";

// ---------------------------------------------------------------------------
// Data slices
// ---------------------------------------------------------------------------
const featuredDesigners = designers.slice(0, 6);
const featuredProjectsSlice = featuredProjects.slice(0, 6);
const topPackages = packageDeals.slice(0, 4);
const topTestimonials = testimonials.slice(0, 3);

const howItWorksSteps = [
  {
    number: "01",
    title: "Take Style Quiz",
    description:
      "Answer a quick visual quiz so we understand your aesthetic, budget, and timeline.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Match with Designers",
    description:
      "Get paired with verified designers who match your style, city, and budget range.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Visualize in 3D",
    description:
      "See photorealistic 3D renders of your rooms before any work begins.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Execute & Move In",
    description:
      "Track milestones, approve payments, and move into your dream space on schedule.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// Section: Hero
// ---------------------------------------------------------------------------
function HeroSection() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop"
        alt="Beautiful modern interior living room"
        fill
        priority
        className="object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight opacity-0 animate-fade-in-up">
          Find Your Dream Interior Designer
        </h1>
        <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/80 opacity-0 animate-fade-in-up animate-delay-200">
          India&apos;s largest marketplace connecting homeowners with verified interior
          designers. From style quiz to move-in day, we handle everything.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animate-delay-400">
          <Button
            size="lg"
            className="h-12 min-w-[180px] rounded-full bg-amber-500 px-8 text-base font-semibold text-black hover:bg-amber-400 active:bg-amber-600"
            render={<Link href="/quiz" />}
          >
            Take Style Quiz
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 min-w-[180px] rounded-full border-white/40 bg-white/10 px-8 text-base font-semibold text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
            render={<Link href="/designers" />}
          >
            Browse Designers
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Stats Bar
// ---------------------------------------------------------------------------
function StatsBar() {
  return (
    <section className="bg-amber-50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {homepageStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-700">
                {stat.value}
                {stat.suffix && (
                  <span className="text-amber-500">{stat.suffix}</span>
                )}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-amber-900/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: How It Works
// ---------------------------------------------------------------------------
function HowItWorksSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            From first quiz to final walkthrough, your dream home is four simple
            steps away.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {howItWorksSteps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center"
            >
              {/* Number badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-5">
                {step.icon}
              </div>
              <span className="absolute -top-1 -right-1 sm:static sm:mb-2 text-xs font-bold text-amber-400">
                {step.number}
              </span>
              <h3 className="text-base sm:text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Featured Designers
// ---------------------------------------------------------------------------
function FeaturedDesignersSection() {
  const { data, isLoading } = useSimulatedLoading(featuredDesigners, 600, 1000);

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Featured Designers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Top-rated professionals handpicked for quality and client
              satisfaction.
            </p>
          </div>
          <Link
            href="/designers"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 min-h-[44px]"
          >
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Horizontal scroll row */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 snap-x snap-mandatory">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  className="py-0 gap-0 min-w-[280px] max-w-[300px] flex-shrink-0 snap-start animate-pulse"
                >
                  <div className="h-48 bg-muted rounded-t-xl" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))
            : data?.map((designer) => (
                <Card
                  key={designer.id}
                  className="py-0 gap-0 min-w-[280px] max-w-[300px] flex-shrink-0 snap-start hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <Image
                      src={designer.photo}
                      alt={designer.name}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    {designer.verified && (
                      <Badge className="absolute top-3 left-3 bg-emerald-500 text-white border-0 text-[10px]">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm">{designer.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {designer.location}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-xs font-medium">
                        {designer.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({designer.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Styles */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {designer.styles.slice(0, 2).map((style) => (
                        <Badge
                          key={style}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>

                    {/* Price */}
                    <p className="text-xs text-muted-foreground mt-3">
                      {formatINRRange(
                        designer.priceRange.min,
                        designer.priceRange.max,
                        designer.priceRange.unit
                      )}
                    </p>

                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-4 w-full min-h-[44px] rounded-lg text-xs font-medium"
                      render={<Link href={`/designers/${designer.id}`} />}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/designers"
            className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 min-h-[44px]"
          >
            View All Designers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Inspiration Gallery
// ---------------------------------------------------------------------------
function InspirationGallerySection() {
  const { data, isLoading } = useSimulatedLoading(
    featuredProjectsSlice,
    800,
    1200
  );

  return (
    <section className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Inspiration Gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Explore stunning projects brought to life by our designers.
            </p>
          </div>
          <Link
            href="/gallery"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 min-h-[44px]"
          >
            See All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {isLoading ? (
          <div className="masonry-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-muted"
                style={{ height: i % 2 === 0 ? 280 : 220 }}
              />
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {data?.map((project, i) => (
              <Link
                key={project.id}
                href="/gallery"
                className="group relative block overflow-hidden rounded-xl"
              >
                <div
                  className="relative"
                  style={{ height: i % 2 === 0 ? 280 : 220 }}
                >
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge className="bg-amber-500 text-black border-0 text-[10px] mb-2">
                      {project.style}
                    </Badge>
                    <h3 className="text-white font-semibold text-sm sm:text-base leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-xs mt-1">
                      {project.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 min-h-[44px]"
          >
            See All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Package Deals
// ---------------------------------------------------------------------------
function PackageDealsSection() {
  const { data, isLoading } = useSimulatedLoading(topPackages, 700, 1100);

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Package Deals
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            All-inclusive packages with transparent pricing. No hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="py-0 gap-0 animate-pulse">
                  <CardContent className="p-5 space-y-4">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : data?.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`py-0 gap-0 relative hover:shadow-md transition-shadow overflow-visible ${
                    pkg.popular ? "ring-2 ring-amber-400" : ""
                  }`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-4 z-10 bg-amber-500 text-black border-0 text-[10px] px-3 py-1 shadow-sm">
                      Popular
                    </Badge>
                  )}
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-base">{pkg.name}</h3>
                    <p className="text-amber-600 font-bold text-sm mt-2">
                      {formatINRRange(pkg.priceRange.min, pkg.priceRange.max)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pkg.duration}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {pkg.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
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
                            className="text-emerald-500 shrink-0 mt-0.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-5 w-full min-h-[44px] rounded-lg text-xs font-medium"
                      render={<Link href="/packages" />}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: Testimonials
// ---------------------------------------------------------------------------
function TestimonialsSection() {
  const { data, isLoading } = useSimulatedLoading(
    topTestimonials,
    900,
    1300
  );

  return (
    <section className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            What Our Clients Say
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Real stories from homeowners who transformed their spaces with
            DesignNest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="py-0 gap-0 animate-pulse">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-2/3" />
                        <div className="h-3 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : data?.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="py-0 gap-0 hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5 sm:p-6">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <svg
                            key={i}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-amber-500"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        )
                      )}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-sm text-foreground/80 leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3 mt-5">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.clientName}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {testimonial.clientName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.projectType} &middot;{" "}
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Section: CTA Banner
// ---------------------------------------------------------------------------
function CTABanner() {
  return (
    <section className="bg-amber-500">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight">
          Ready to Transform Your Space?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-black/70 max-w-lg mx-auto">
          Join thousands of homeowners who found their perfect designer through
          DesignNest. It takes less than 2 minutes.
        </p>
        <Button
          size="lg"
          className="mt-8 h-12 min-w-[200px] rounded-full bg-black px-8 text-base font-semibold text-white hover:bg-black/80 active:bg-black/90"
          render={<Link href="/quiz" />}
        >
          Get Started Free
        </Button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <>
      <AppNavbar darkHero />
      <main>
        <HeroSection />
        <StatsBar />
        <HowItWorksSection />
        <FeaturedDesignersSection />
        <InspirationGallerySection />
        <PackageDealsSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <AppFooter />
    </>
  );
}
