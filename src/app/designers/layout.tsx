import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Interior Designers in India — 2,000+ Verified Professionals",
  description:
    "Browse 2,000+ verified interior designers across 10 cities. Filter by style, budget, city, and rating to find your perfect match on DesignNest.",
  alternates: { canonical: "/designers" },
  openGraph: {
    title: "Find Interior Designers in India — 2,000+ Verified Professionals",
    description:
      "Browse 2,000+ verified interior designers across 10 cities. Filter by style, budget, city, and rating to find your perfect match.",
  },
};

export default function DesignersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
