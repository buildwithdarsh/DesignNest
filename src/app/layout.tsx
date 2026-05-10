import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://designnest.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "DesignNest — Interior Design Marketplace | Find Your Dream Designer",
    template: "%s | DesignNest",
  },
  description:
    "India's trusted interior design marketplace. Connect with 2,000+ verified designers. From style quiz to 3D visualization to flawless execution.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "DesignNest",
    title:
      "DesignNest — Interior Design Marketplace | Find Your Dream Designer",
    description:
      "India's trusted interior design marketplace. Connect with 2,000+ verified designers. From style quiz to 3D visualization to flawless execution.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "DesignNest — Interior Design Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "DesignNest — Interior Design Marketplace | Find Your Dream Designer",
    description:
      "India's trusted interior design marketplace. Connect with 2,000+ verified designers. From style quiz to 3D visualization to flawless execution.",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=630&fit=crop",
    ],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DesignNest Studio",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description:
    "India's trusted interior design marketplace connecting homeowners with verified interior designers.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-80-4567-8900",
    contactType: "customer service",
    email: "hello@designnest.in",
    areaServed: "IN",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "42, 3rd Floor, Brigade Road, Koramangala",
    addressLocality: "Bangalore",
    postalCode: "560034",
    addressCountry: "IN",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DesignNest",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/designers?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
      </body>
    </html>
  );
}
