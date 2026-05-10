import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-amber-500 px-6 text-sm font-semibold text-black hover:bg-amber-400"
        >
          Go Home
        </Link>
        <Link
          href="/designers"
          className="inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium hover:bg-secondary"
        >
          Browse Designers
        </Link>
      </div>
    </main>
  );
}
