import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Design Packages & Transparent Pricing",
  description:
    "All-inclusive interior design packages with no hidden costs. From single room makeovers to full home transformations, starting at INR 1.5 Lakhs.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Interior Design Packages & Transparent Pricing",
    description:
      "All-inclusive interior design packages with no hidden costs. From single room makeovers to full home transformations.",
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
