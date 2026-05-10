import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/app/logo";

export function Footer() {
  return (
    <footer className="bg-primary py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:gap-6 sm:flex-row sm:justify-between">
          {/* Logo + tagline */}
          <div className="text-center sm:text-left">
            <Logo size="lg" />
            <p className="mt-1 text-xs sm:text-sm text-primary-foreground/50">
              Spaces That Inspire Living
            </p>
          </div>
        </div>

        <Separator className="my-6 sm:my-8 bg-white/10" />

        <div className="flex flex-col items-center gap-1.5 sm:gap-2 text-center text-[11px] sm:text-xs text-primary-foreground/40 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} DesignNest Studio. All rights reserved.</p>
          <p>
            Powered by{" "}
            <span className="font-medium text-primary-foreground/60">Darsh Gupta</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
