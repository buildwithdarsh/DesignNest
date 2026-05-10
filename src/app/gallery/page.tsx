"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AppNavbar } from "@/components/app/navbar";
import { AppFooter } from "@/components/app/footer";
import { galleryProjects } from "@/lib/mock-data";
import type { GalleryProject } from "@/lib/mock-data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// ---------------------------------------------------------------------------
// Filter categories
// ---------------------------------------------------------------------------
const ROOM_FILTERS = [
  "All",
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
  "Office",
] as const;

type RoomFilter = (typeof ROOM_FILTERS)[number];

// ---------------------------------------------------------------------------
// Before / After Slider (inline — mirrors portfolio.tsx pattern)
// ---------------------------------------------------------------------------
function BeforeAfterSlider({
  beforeImage,
  afterImage,
}: {
  beforeImage: string;
  afterImage: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const handleTouchStart = () => {
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="before-after-slider relative aspect-[16/10] w-full overflow-hidden select-none touch-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After (full background) */}
      <Image
        src={afterImage}
        alt="After renovation"
        fill
        className="object-cover"
        draggable={false}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Before (clipped) */}
      <div
        className="before-image absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before renovation"
          fill
          className="object-cover"
          draggable={false}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {/* Labels */}
      <span className="absolute left-2 sm:left-3 top-2 sm:top-3 rounded-full bg-black/60 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-white">
        Before
      </span>
      <span className="absolute right-2 sm:right-3 top-2 sm:top-3 rounded-full bg-black/60 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-white">
        After
      </span>
      {/* Handle */}
      <div
        className="slider-handle absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute inset-y-0 w-[3px] bg-white shadow-lg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M5 3L2 8L5 13"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 3L14 8L11 13"
              stroke="#333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Project Card
// ---------------------------------------------------------------------------
function ProjectCard({ project }: { project: GalleryProject }) {
  return (
    <Card className="py-0 gap-0 overflow-hidden">
      <BeforeAfterSlider
        beforeImage={project.beforeImage}
        afterImage={project.afterImage}
      />
      <CardContent className="space-y-1.5 pt-3 pb-4">
        <h3 className="text-sm sm:text-base font-semibold leading-snug">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          by {project.designer}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <Badge variant="secondary" className="text-[10px] sm:text-xs">
            {project.style}
          </Badge>
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            {project.city}
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            &middot;
          </span>
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            {project.budget}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Skeleton Card
// ---------------------------------------------------------------------------
function SkeletonCard() {
  return (
    <Card className="py-0 gap-0 overflow-hidden">
      <div className="aspect-[16/10] w-full animate-pulse bg-muted" />
      <CardContent className="space-y-2 pt-3 pb-4">
        <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
          <div className="h-3 w-12 rounded bg-muted animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Gallery Page
// ---------------------------------------------------------------------------
export default function GalleryPage() {
  const { data, isLoading } = useSimulatedLoading(galleryProjects, 1200, 1800);
  const [activeFilter, setActiveFilter] = useState<RoomFilter>("All");

  const filteredProjects =
    data?.filter((p) => {
      if (activeFilter === "All") return true;
      // Match room type — allow partial matches (e.g. "Office" matches "Home Office")
      return p.room.toLowerCase().includes(activeFilter.toLowerCase());
    }) ?? [];

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen pt-20 sm:pt-24 pb-14 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12">
            {isLoading ? (
              <>
                <div className="mx-auto h-3 w-24 rounded bg-muted animate-pulse mb-3" />
                <div className="mx-auto h-8 sm:h-10 w-[70%] rounded bg-muted animate-pulse mb-4" />
                <div className="mx-auto h-4 w-[55%] rounded bg-muted animate-pulse" />
              </>
            ) : (
              <>
                <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                  Inspiration
                </p>
                <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Design Inspiration Gallery
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Explore stunning before &amp; after transformations from top
                  designers across India.
                </p>
              </>
            )}
          </div>

          {/* Filter Pills */}
          {!isLoading && (
            <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
              {ROOM_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors min-h-[36px] ${
                    activeFilter === filter
                      ? "bg-amber-500 text-black"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
          </div>

          {/* Empty state */}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No projects found for &ldquo;{activeFilter}&rdquo;. Try another
                filter.
              </p>
            </div>
          )}
        </div>
      </main>
      <AppFooter />
    </>
  );
}
