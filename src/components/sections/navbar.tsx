"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/app/logo";

const navLinks = [
  { label: "About", href: "/static#about" },
  { label: "Services", href: "/static#services" },
  { label: "Portfolio", href: "/static#portfolio" },
  { label: "Process", href: "/static#process" },
  { label: "Testimonials", href: "/static#testimonials" },
  { label: "Team", href: "/static#team" },
  { label: "FAQ", href: "/static#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    // If on the static page, scroll to the section
    if (href.startsWith("/static#")) {
      const sectionId = href.replace("/static#", "#");
      const el = document.querySelector(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Otherwise navigate via link
    window.location.href = href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/static"
          className="min-h-[44px] flex items-center"
        >
          <Logo size="default" colorMode={scrolled ? "auto" : "light"} />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                // If already on the page, scroll instead of navigating
                if (link.href.startsWith("/static#")) {
                  const sectionId = link.href.replace("/static", "");
                  const el = document.querySelector(sectionId);
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            size="sm"
            className="ml-3 rounded-full bg-amber-500 px-5 text-sm font-semibold text-black hover:bg-amber-400"
            onClick={() => handleNav("/static#contact")}
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className={`lg:hidden p-3 -mr-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              scrolled ? "text-foreground hover:bg-secondary active:bg-secondary/80" : "text-white hover:bg-white/10 active:bg-white/20"
            }`}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] max-w-xs pt-14">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (link.href.startsWith("/static#")) {
                      const sectionId = link.href.replace("/static", "");
                      const el = document.querySelector(sectionId);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="rounded-lg px-4 py-3.5 text-left text-[15px] font-medium text-foreground hover:bg-secondary active:bg-secondary/80 transition-colors min-h-[48px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                className="mt-6 h-12 rounded-full bg-amber-500 px-5 font-semibold text-black hover:bg-amber-400 active:bg-amber-600"
                onClick={() => handleNav("/static#contact")}
              >
                Contact Us
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
