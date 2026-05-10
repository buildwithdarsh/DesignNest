import type { Metadata } from "next";
import { designers } from "@/lib/mock-data";
import { AppNavbar } from "@/components/app/navbar";
import { AppFooter } from "@/components/app/footer";
import { DesignerProfileClient } from "./designer-profile-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const designer = designers.find((d) => d.id === id);

  if (!designer) {
    return { title: "Designer Not Found" };
  }

  const description = designer.bio.length > 160
    ? designer.bio.slice(0, 157) + "..."
    : designer.bio;

  return {
    title: `${designer.name} — ${designer.title} at ${designer.firm}`,
    description,
    alternates: { canonical: `/designers/${id}` },
    openGraph: {
      title: `${designer.name} — Interior Designer in ${designer.city}`,
      description,
      images: [{ url: designer.photo, alt: designer.name }],
    },
  };
}

export default async function DesignerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const designer = designers.find((d) => d.id === id);

  if (!designer) {
    return (
      <>
        <AppNavbar />
        <main className="min-h-screen flex flex-col items-center justify-center pt-16 px-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Designer Not Found
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            We could not find a designer with the ID &quot;{id}&quot;.
          </p>
        </main>
        <AppFooter />
      </>
    );
  }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: designer.name,
    jobTitle: designer.title,
    worksFor: { "@type": "Organization", name: designer.firm },
    image: designer.photo,
    address: {
      "@type": "PostalAddress",
      addressLocality: designer.city,
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: designer.rating,
      reviewCount: designer.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <AppNavbar />
      <DesignerProfileClient designer={designer} />
      <AppFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
