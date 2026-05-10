import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/app/logo";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/static#about" },
      { label: "Our Team", href: "/static#team" },
      { label: "Our Work", href: "/static#portfolio" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Residential", href: "/packages" },
      { label: "Commercial", href: "/packages" },
      { label: "Renovation", href: "/packages" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "FAQ", href: "/static#faq" },
      { label: "Style Quiz", href: "/quiz" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/static#contact" },
      { label: "Our Process", href: "/static#process" },
      { label: "Packages", href: "/packages" },
    ],
  },
];

export function AppFooter() {
  return (
    <footer className="bg-primary py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Top: Logo + tagline */}
        <div className="mb-10 sm:mb-12">
          <Link href="/" className="inline-block">
            <Logo size="lg" />
          </Link>
          <p className="mt-1.5 text-sm text-primary-foreground/50 max-w-xs">
            Connecting you with talented interior designers to transform your
            spaces.
          </p>
        </div>

        {/* 4-column link grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-primary-foreground/80 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 sm:my-10 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[11px] sm:text-xs text-primary-foreground/40">
            &copy; {new Date().getFullYear()} DesignNest Studio. All rights
            reserved.
          </p>

          <p className="text-[11px] sm:text-xs text-primary-foreground/40">
            Powered by{" "}
            <span className="font-medium text-primary-foreground/60">
              Darsh Gupta
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
