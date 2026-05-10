import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Inspiration Gallery — Before & After Transformations",
  description:
    "Explore stunning before and after interior design transformations from verified designers across India. Filter by room type for targeted inspiration.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Design Inspiration Gallery — Before & After Transformations",
    description:
      "Explore stunning before and after interior design transformations from verified designers across India.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
