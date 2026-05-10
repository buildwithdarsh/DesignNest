import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Team } from "@/components/sections/team";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { faqItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "DesignNest Studio — Professional Interior Design Services",
  description:
    "Professional interior design studio crafting homes, offices, and commercial spaces across India for over 15 years. Book a free consultation today.",
  alternates: { canonical: "/static" },
  openGraph: {
    title: "DesignNest Studio — Professional Interior Design Services",
    description:
      "Professional interior design studio crafting homes, offices, and commercial spaces across India for over 15 years.",
  },
};

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "InteriorDesignBusiness",
    name: "DesignNest Studio",
    url: "https://designnest.in",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=630&fit=crop",
    telephone: "+91-80-4567-8900",
    email: "hello@designnest.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "42, 3rd Floor, Brigade Road, Koramangala",
      addressLocality: "Bangalore",
      postalCode: "560034",
      addressRegion: "KA",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9300,
      longitude: 77.6000,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "INR 1.5L–50L+",
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, localBusinessJsonLd]),
        }}
      />
    </>
  );
}
