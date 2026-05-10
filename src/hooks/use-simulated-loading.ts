"use client";

import { useState, useEffect } from "react";

/**
 * Simulates realistic async data fetching with configurable delay ranges.
 * Returns { data, isLoading } to drive skeleton/content transitions.
 */
export function useSimulatedLoading<T>(
  data: T,
  minDelay: number = 800,
  maxDelay: number = 1200
): { data: T | null; isLoading: boolean } {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    const timer = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [minDelay, maxDelay]);

  return { data: loaded ? data : null, isLoading: !loaded };
}
