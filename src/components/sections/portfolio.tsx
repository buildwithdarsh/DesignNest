"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { portfolioProjects } from "@/lib/data";
import type { PortfolioProject } from "@/lib/data";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
      className="before-after-slider relative aspect-[16/10] w-full rounded-lg overflow-hidden select-none touch-none"
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
        sizes="(max-width: 768px) 100vw, 800px"
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
          sizes="(max-width: 768px) 100vw, 800px"
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
            <path d="M5 3L2 8L5 13" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L14 8L11 13" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  open,
  onClose,
}: {
  project: PortfolioProject | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto p-0 w-[calc(100%-1rem)] sm:w-full rounded-xl">
        {/* Hero image — shorter on mobile */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-t-xl">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 95vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <Badge variant="secondary" className="mb-1.5 sm:mb-2 bg-white/90 text-foreground text-[10px] sm:text-xs">
              {project.type}
            </Badge>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-white/80">
                {project.location}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-8">
          {/* Meta — stacked on mobile, row on tablet+ */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 rounded-lg bg-secondary/50 p-3 sm:p-4">
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Area</p>
              <p className="text-xs sm:text-base font-semibold">{project.area}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Duration</p>
              <p className="text-xs sm:text-base font-semibold">{project.duration}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">Investment</p>
              <p className="text-xs sm:text-base font-semibold">{project.budget}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{project.description}</p>

          {/* Before/After */}
          {project.beforeImage && project.afterImage && (
            <div>
              <h4 className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Before & After
              </h4>
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
              />
            </div>
          )}

          {/* Gallery — single col on mobile */}
          <div>
            <h4 className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Gallery
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative overflow-hidden rounded-lg aspect-[4/3]">
                  <Image
                    src={img}
                    alt={`${project.title} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Portfolio() {
  const { data, isLoading } = useSimulatedLoading(portfolioProjects, 1200, 1800);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  return (
    <section id="portfolio" className="py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          {isLoading ? (
            <>
              <div className="mx-auto h-3 w-24 rounded bg-muted animate-pulse mb-3" />
              <div className="mx-auto h-8 sm:h-10 w-[60%] rounded bg-muted animate-pulse mb-4" />
              <div className="mx-auto h-4 w-[50%] rounded bg-muted animate-pulse" />
            </>
          ) : (
            <>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Our Work
              </p>
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                A curated selection from our 200+ completed residential and commercial projects.
              </p>
            </>
          )}
        </div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse" style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }} />
              ))
            : data?.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative w-full overflow-hidden rounded-xl text-left animate-fade-in-up animate-delay-${Math.min((i + 1) * 100, 600)}`}
                >
                  <div className="relative" style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}>
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <Badge variant="secondary" className="mb-1.5 sm:mb-2 bg-white/20 text-white border-white/20 text-[10px] sm:text-xs backdrop-blur-sm">
                      {project.type}
                    </Badge>
                    <h3 className="text-base sm:text-lg font-semibold text-white">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-white/70">{project.location}</p>
                  </div>
                </button>
              ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
