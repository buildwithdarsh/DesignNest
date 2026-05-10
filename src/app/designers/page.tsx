"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppNavbar } from "@/components/app/navbar";
import { AppFooter } from "@/components/app/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { designers, formatINRRange } from "@/lib/mock-data";

// -----------------------------------------------------------------------------
// Filter options
// -----------------------------------------------------------------------------

const STYLE_OPTIONS = [
  "Modern",
  "Minimalist",
  "Traditional",
  "Industrial",
  "Scandinavian",
  "Bohemian",
  "Contemporary",
];

const BUDGET_OPTIONS: { label: string; min?: number; max?: number }[] = [
  { label: "Under \u20B9500/sqft", max: 500 },
  { label: "\u20B9500 - \u20B91,000", min: 500, max: 1000 },
  { label: "\u20B91,000 - \u20B92,000", min: 1000, max: 2000 },
  { label: "\u20B92,000+", min: 2000 },
];

const CITY_OPTIONS = [
  "Mumbai",
  "Bangalore",
  "Delhi NCR",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const RATING_OPTIONS = [
  { label: "4+ Stars", value: 4 },
  { label: "4.5+ Stars", value: 4.5 },
];

// -----------------------------------------------------------------------------
// Star rating component
// -----------------------------------------------------------------------------

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating >= i + 0.5;
        return (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={filled ? "currentColor" : half ? "url(#half)" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-amber-500"
          >
            {half && (
              <defs>
                <linearGradient id="half">
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
// Skeleton card
// -----------------------------------------------------------------------------

function SkeletonCard() {
  return (
    <Card className="py-0 gap-0 animate-pulse">
      <div className="aspect-square bg-muted" />
      <CardContent className="space-y-3 py-4">
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-3 w-3/4 rounded bg-muted" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-16 rounded-full bg-muted" />
        </div>
        <div className="h-8 w-full rounded-lg bg-muted" />
      </CardContent>
    </Card>
  );
}

// -----------------------------------------------------------------------------
// Style match score color
// -----------------------------------------------------------------------------

function scoreColor(score: number): string {
  if (score >= 85) return "text-green-600 bg-green-50";
  if (score >= 70) return "text-amber-600 bg-amber-50";
  return "text-red-600 bg-red-50";
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function DesignersPage() {
  const { isLoading } = useSimulatedLoading(designers, 1000, 1500);

  // Filter state
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState<string | null>(null);
  const [budgetIdx, setBudgetIdx] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<string | null>(null);

  const hasFilters = !!(search || style || budgetIdx || city || minRating);

  function clearFilters() {
    setSearch("");
    setStyle(null);
    setBudgetIdx(null);
    setCity(null);
    setMinRating(null);
  }

  const filtered = useMemo(() => {
    let result = [...designers];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.firm.toLowerCase().includes(q) ||
          d.specializations.some((s) => s.toLowerCase().includes(q)) ||
          d.city.toLowerCase().includes(q)
      );
    }

    if (style) {
      result = result.filter(
        (d) =>
          d.styles.some((s) => s.toLowerCase().includes(style.toLowerCase())) ||
          d.specializations.some((s) =>
            s.toLowerCase().includes(style.toLowerCase())
          )
      );
    }

    if (budgetIdx !== null) {
      const budget = BUDGET_OPTIONS[Number(budgetIdx)] as {
        label: string;
        min?: number;
        max?: number;
      };
      result = result.filter((d) => {
        if (budget.min !== undefined && d.priceRange.max < budget.min)
          return false;
        if (budget.max !== undefined && d.priceRange.min > budget.max)
          return false;
        return true;
      });
    }

    if (city) {
      result = result.filter((d) => d.city === city);
    }

    if (minRating) {
      const min = Number(minRating);
      result = result.filter((d) => d.rating >= min);
    }

    return result;
  }, [search, style, budgetIdx, city, minRating]);

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20">
        {/* --------------------------------------------------------------- */}
        {/* Page Header                                                     */}
        {/* --------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Find Your Interior Designer
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-lg">
            Browse 2,000+ verified designers across 10 cities
          </p>

          {/* Search + Desktop filters — single row */}
          <div className="mt-5 hidden sm:flex flex-wrap items-center gap-3">
            <Input
              type="search"
              placeholder="Search by name, firm, city, or specialization..."
              className="h-10 w-full max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={style ?? ""} onValueChange={(v) => setStyle(v || null)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                {STYLE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={budgetIdx ?? ""}
              onValueChange={(v) => setBudgetIdx(v || null)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((b, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={city ?? ""} onValueChange={(v) => setCity(v || null)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {CITY_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={minRating ?? ""}
              onValueChange={(v) => setMinRating(v || null)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                {RATING_OPTIONS.map((r) => (
                  <SelectItem key={r.value} value={String(r.value)}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            )}
          </div>

          {/* Mobile: search + filters stacked */}
          <div className="mt-5 sm:hidden">
            <Input
              type="search"
              placeholder="Search by name, firm, city, or specialization..."
              className="h-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Filter Bar (mobile only)                                        */}
        {/* --------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mt-4 sm:hidden">

          {/* Mobile filters — horizontal scroll pill buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
            {/* Style */}
            <Select value={style ?? ""} onValueChange={(v) => setStyle(v || null)}>
              <SelectTrigger className="shrink-0 rounded-full h-8 text-xs">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                {STYLE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Budget */}
            <Select
              value={budgetIdx ?? ""}
              onValueChange={(v) => setBudgetIdx(v || null)}
            >
              <SelectTrigger className="shrink-0 rounded-full h-8 text-xs">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((b, i) => (
                  <SelectItem key={i} value={String(i)}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* City */}
            <Select value={city ?? ""} onValueChange={(v) => setCity(v || null)}>
              <SelectTrigger className="shrink-0 rounded-full h-8 text-xs">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {CITY_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rating */}
            <Select
              value={minRating ?? ""}
              onValueChange={(v) => setMinRating(v || null)}
            >
              <SelectTrigger className="shrink-0 rounded-full h-8 text-xs">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                {RATING_OPTIONS.map((r) => (
                  <SelectItem key={r.value} value={String(r.value)}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="shrink-0 rounded-full h-8 px-3 text-xs font-medium text-muted-foreground border border-border hover:bg-muted transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* Results Grid                                                    */}
        {/* --------------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mt-8">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium">No designers found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters or search query.
              </p>
              {hasFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                {filtered.length} designer{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((designer) => (
                  <Card
                    key={designer.id}
                    className="py-0 gap-0 transition-shadow hover:shadow-lg"
                  >
                    {/* Designer photo */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={designer.photo}
                        alt={designer.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      {designer.verified && (
                        <Badge className="absolute top-2 right-2 bg-green-600 text-white text-[10px]">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <CardContent className="space-y-2 py-3 sm:py-4">
                      {/* Name & firm */}
                      <div>
                        <p className="font-semibold text-sm sm:text-base leading-tight truncate">
                          {designer.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {designer.firm}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <StarRating rating={designer.rating} />
                        <span className="text-xs font-medium">
                          {designer.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({designer.reviewCount})
                        </span>
                      </div>

                      {/* Location */}
                      <p className="text-xs text-muted-foreground truncate">
                        {designer.location}
                      </p>

                      {/* Specialization tags */}
                      <div className="flex flex-wrap gap-1">
                        {designer.specializations.slice(0, 2).map((spec) => (
                          <Badge
                            key={spec}
                            variant="secondary"
                            className="text-[10px] sm:text-xs"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      {/* Style match score */}
                      {designer.styleMatchScore > 0 && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold ${scoreColor(designer.styleMatchScore)}`}
                          >
                            {designer.styleMatchScore}% match
                          </span>
                        </div>
                      )}

                      {/* Price range */}
                      <p className="text-xs sm:text-sm font-medium">
                        {formatINRRange(
                          designer.priceRange.min,
                          designer.priceRange.max,
                          designer.priceRange.unit
                        )}
                      </p>

                      {/* CTA */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-1"
                        render={
                          <Link href={`/designers/${designer.id}`} />
                        }
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
      <AppFooter />
    </>
  );
}
