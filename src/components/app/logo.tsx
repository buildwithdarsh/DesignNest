/**
 * DesignNest Logo
 * A geometric nest/home icon formed by overlapping golden-ratio arcs,
 * paired with the wordmark in Geist Sans.
 */

export function Logo({
  variant = "full",
  className = "",
  size = "default",
  colorMode = "auto",
}: {
  variant?: "full" | "icon" | "wordmark";
  className?: string;
  size?: "sm" | "default" | "lg" | "xl";
  /** "auto" uses text-foreground (dark on light bg), "light" forces white text for dark backgrounds */
  colorMode?: "auto" | "light";
}) {
  const dimensions = {
    sm: { icon: 24, text: "text-base" },
    default: { icon: 28, text: "text-lg" },
    lg: { icon: 36, text: "text-xl" },
    xl: { icon: 48, text: "text-2xl" },
  }[size];

  const icon = (
    <svg
      width={dimensions.icon}
      height={dimensions.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer house shape */}
      <path
        d="M24 4L4 20V42C4 43.1 4.9 44 6 44H18V32C18 28.69 20.69 26 24 26C27.31 26 30 28.69 30 32V44H42C43.1 44 44 43.1 44 42V20L24 4Z"
        fill="url(#nest-gradient)"
        fillOpacity="0.12"
        stroke="url(#nest-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner nest arcs — three curved lines suggesting a cozy nest */}
      <path
        d="M16 34C16 29.58 19.58 26 24 26C28.42 26 32 29.58 32 34"
        stroke="url(#nest-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 37C19 34.24 21.24 32 24 32C26.76 32 29 34.24 29 37"
        stroke="url(#nest-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Chimney accent */}
      <rect
        x="34"
        y="10"
        width="4"
        height="10"
        rx="1.5"
        fill="url(#nest-gradient)"
        fillOpacity="0.5"
      />
      {/* Warm glow dot at center */}
      <circle cx="24" cy="38" r="2" fill="url(#nest-gradient)" />
      <defs>
        <linearGradient
          id="nest-gradient"
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D97706" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );

  const designColor = colorMode === "light" ? "text-white" : "text-foreground";

  const wordmark = (
    <span className={`font-bold tracking-tight ${dimensions.text}`}>
      <span className={designColor}>Design</span>
      <span className="text-amber-500">Nest</span>
    </span>
  );

  if (variant === "icon") return <span className={className}>{icon}</span>;
  if (variant === "wordmark") return <span className={className}>{wordmark}</span>;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {icon}
      {wordmark}
    </span>
  );
}
