import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Your Interior Design Style — Free 2-Minute Quiz",
  description:
    "Take our quick visual style quiz and get matched with interior designers who fit your aesthetic, budget, and city. Results in under 2 minutes.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "Discover Your Interior Design Style — Free 2-Minute Quiz",
    description:
      "Take our quick visual style quiz and get matched with interior designers who fit your aesthetic, budget, and city.",
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
