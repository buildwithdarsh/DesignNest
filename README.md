> This project is made with the help of Claude (1M context).

# DesignNest

Interior design marketplace connecting verified designers with customers across India.

## Overview

DesignNest helps homeowners discover and book interior designers through a personalized matching flow. Users take a style quiz, browse 2,000+ designers, view portfolios and 3D visualizations, and book consultations — simplifying the entire interior design discovery and booking experience.

## Features

- **Style quiz** — Personalized designer matching based on taste profile
- **Designer marketplace** — Browse by specialty, budget, location
- **Portfolio gallery** — Completed projects with before/after visuals
- **Package tiers** — Transparent pricing across designer levels
- **Consultation booking** — Schedule meetings with matched designers
- **Customer reviews** — Verified testimonials and ratings
- **User dashboard** — Track active projects and saved designers

## Tech Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4 + Base UI + shadcn
- **Animation:** tw-animate-css
- **Variants:** class-variance-authority
- **Icons:** Lucide React

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Project Structure

```
src/
├── app/              # Next.js App Router routes
├── components/       # Reusable UI (Base UI + shadcn)
└── lib/mock-data/    # Designer, project, and testimonial fixtures
```
