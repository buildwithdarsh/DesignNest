"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppNavbar } from "@/components/app/navbar";
import { AppFooter } from "@/components/app/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  styleQuizQuestions,
  styleProfiles,
  designers,
} from "@/lib/mock-data";

type QuizPhase = "intro" | "quiz" | "analyzing" | "result";

export default function QuizPage() {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<("A" | "B")[]>([]);
  const [animating, setAnimating] = useState(false);
  const [resultProfile, setResultProfile] = useState(styleProfiles[0]);
  const totalQuestions = styleQuizQuestions.length;

  const startQuiz = () => {
    setPhase("quiz");
    setCurrentStep(0);
    setAnswers([]);
  };

  const computeResult = useCallback(
    (finalAnswers: ("A" | "B")[]) => {
      // Count A vs B answers to determine style profile
      const aCount = finalAnswers.filter((a) => a === "A").length;
      // Map the ratio to a profile index
      // More A = more minimal/modern, more B = more eclectic/warm
      let profileIndex: number;
      if (aCount >= 7) profileIndex = 0; // Modern Minimalist
      else if (aCount >= 5) profileIndex = 4; // Industrial Modern
      else if (aCount >= 4) profileIndex = 1; // Warm Contemporary
      else if (aCount >= 2) profileIndex = 3; // Contemporary Indian
      else profileIndex = 2; // Bold Eclectic

      setResultProfile(
        styleProfiles[profileIndex] ?? styleProfiles[0]
      );
    },
    []
  );

  const selectAnswer = (choice: "A" | "B") => {
    if (animating) return;

    const newAnswers = [...answers];
    newAnswers[currentStep] = choice;
    setAnswers(newAnswers);

    setAnimating(true);
    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep((prev) => prev + 1);
        // Wait one frame so the browser paints new content at opacity-0 before fading in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimating(false);
          });
        });
      } else {
        // Last question answered — go to analyzing
        computeResult(newAnswers);
        setPhase("analyzing");
        setAnimating(false);
      }
    }, 400);
  };

  const goBack = () => {
    if (currentStep > 0 && !animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimating(false);
          });
        });
      }, 200);
    }
  };

  // Analyzing phase timer
  useEffect(() => {
    if (phase === "analyzing") {
      const timer = setTimeout(() => setPhase("result"), 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const retakeQuiz = () => {
    setPhase("intro");
    setCurrentStep(0);
    setAnswers([]);
  };

  // Get 3 recommended designers based on profile styles
  const recommendedDesigners = designers
    .filter((d) =>
      d.styles.some((s) =>
        resultProfile.recommendedStyles.some(
          (rs) => s.toLowerCase().includes(rs.toLowerCase()) || rs.toLowerCase().includes(s.toLowerCase())
        )
      )
    )
    .slice(0, 3);

  // Fallback if no match
  const displayDesigners =
    recommendedDesigners.length >= 3
      ? recommendedDesigners
      : designers.slice(0, 3);

  return (
    <>
      <AppNavbar darkHero={phase === "intro"} />
      <main className="min-h-screen">
        {/* ─── Intro Screen ─── */}
        {phase === "intro" && (
          <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=900&fit=crop"
                alt="Beautiful interior design"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </div>

            <div className="relative z-10 mx-auto max-w-2xl px-5 text-center">
              <Badge
                variant="secondary"
                className="mb-6 bg-amber-500/20 text-amber-200 border-amber-500/30 px-4 py-1.5 text-sm"
              >
                8 Quick Questions
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Discover Your
                <br />
                <span className="text-amber-400">Design Style</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-white/70 max-w-lg mx-auto leading-relaxed">
                Answer 8 quick questions and we&apos;ll match you with your
                perfect interior style + recommended designers.
              </p>
              <Button
                className="mt-8 h-12 sm:h-14 rounded-full bg-amber-500 px-8 sm:px-10 text-base sm:text-lg font-semibold text-black hover:bg-amber-400 active:bg-amber-600 transition-all"
                onClick={startQuiz}
              >
                Start Quiz
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
              <p className="mt-4 text-sm text-white/40">
                Takes less than 2 minutes
              </p>
            </div>
          </section>
        )}

        {/* ─── Quiz Steps ─── */}
        {phase === "quiz" && (
          <section className="flex min-h-screen flex-col pt-16 sm:pt-20">
            {/* Progress bar */}
            <div className="sticky top-14 sm:top-16 z-40 bg-white/90 backdrop-blur-md border-b px-5 py-3">
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={goBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors min-h-[44px] px-2"
                    aria-label="Go back"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back
                  </button>
                  <span className="text-sm font-medium text-muted-foreground">
                    {currentStep + 1} of {totalQuestions}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-500 ease-out"
                    style={{
                      width: `${((currentStep + 1) / totalQuestions) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Question area */}
            <div className="flex flex-1 items-center justify-center px-5 py-8 sm:py-12">
              <div
                className={`mx-auto w-full max-w-4xl transition-all duration-300 ${
                  animating
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                <h2 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-8 sm:mb-10">
                  {styleQuizQuestions[currentStep].question}
                </h2>

                {/* Option cards — stack on xs, side by side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {(["A", "B"] as const).map((choice) => {
                    const option =
                      choice === "A"
                        ? styleQuizQuestions[currentStep].optionA
                        : styleQuizQuestions[currentStep].optionB;
                    const isSelected = answers[currentStep] === choice;

                    return (
                      <button
                        key={choice}
                        onClick={() => selectAnswer(choice)}
                        className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 ${
                          isSelected
                            ? "border-amber-500 ring-2 ring-amber-500/30 scale-[0.98]"
                            : "border-transparent hover:border-amber-300 hover:shadow-lg active:scale-[0.98]"
                        }`}
                      >
                        {/* Image */}
                        <div className="relative aspect-[3/2] w-full overflow-hidden bg-secondary">
                          <Image
                            src={option.image}
                            alt={option.label}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                          {/* Selected overlay */}
                          {isSelected && (
                            <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                              <div className="rounded-full bg-amber-500 p-2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Label */}
                        <div className="bg-white px-4 py-3 sm:py-4">
                          <p className="text-sm sm:text-base font-medium text-foreground text-left leading-snug">
                            {option.label}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── Analyzing Screen ─── */}
        {phase === "analyzing" && (
          <section className="flex min-h-screen items-center justify-center">
            <div className="text-center px-5">
              {/* Animated spinner */}
              <div className="mx-auto mb-8 flex items-center justify-center">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-4 border-secondary" />
                  <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Analyzing your style preferences
                <span className="inline-flex w-8 justify-start">
                  <span className="animate-pulse">...</span>
                </span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Matching you with the perfect design profile
              </p>
            </div>
          </section>
        )}

        {/* ─── Results Screen ─── */}
        {phase === "result" && (
          <section className="pt-20 sm:pt-24 pb-16 sm:pb-20">
            <div className="mx-auto max-w-4xl px-5">
              {/* Result header */}
              <div className="text-center mb-10 sm:mb-14">
                <Badge
                  variant="secondary"
                  className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20 px-4 py-1.5 text-sm"
                >
                  Your Style Profile
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                  {resultProfile.name}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {resultProfile.description}
                </p>
              </div>

              {/* Hero image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl mb-10 sm:mb-14">
                <Image
                  src={resultProfile.heroImage}
                  alt={resultProfile.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>

              {/* Color Palette */}
              <div className="mb-10 sm:mb-14">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Your Color Palette
                </h3>
                <div className="flex gap-3 sm:gap-4 flex-wrap">
                  {resultProfile.colorPalette.map((hex) => (
                    <div key={hex} className="flex flex-col items-center gap-2">
                      <div
                        className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl ring-1 ring-foreground/10 shadow-sm"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-xs text-muted-foreground font-mono">
                        {hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Styles */}
              <div className="mb-10 sm:mb-14">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Styles You&apos;ll Love
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {resultProfile.recommendedStyles.map((style) => (
                    <Badge
                      key={style}
                      variant="outline"
                      className="px-3 py-1.5 text-sm"
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recommended Designers */}
              <div className="mb-10 sm:mb-14">
                <h3 className="text-lg sm:text-xl font-semibold mb-6">
                  Your Top Recommended Designers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                  {displayDesigners.map((designer) => (
                    <Card key={designer.id} className="overflow-hidden pt-0">
                      {/* Portfolio preview */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={designer.portfolioImages[0]}
                          alt={`${designer.name} portfolio`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                      <CardHeader className="pb-0">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={designer.photo}
                              alt={designer.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-sm">
                              {designer.name}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {designer.firm}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-amber-500"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            {designer.rating}
                          </span>
                          <span>{designer.location}</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {designer.styles.slice(0, 2).map((s) => (
                            <Badge
                              key={s}
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0.5"
                            >
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  className="h-12 rounded-full bg-amber-500 px-8 text-base font-semibold text-black hover:bg-amber-400 active:bg-amber-600 w-full sm:w-auto"
                  render={<Link href="/designers" />}
                >
                  Browse All Designers
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-full px-8 text-base font-medium w-full sm:w-auto"
                  onClick={retakeQuiz}
                >
                  Retake Quiz
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      {(phase === "intro" || phase === "result") && <AppFooter />}
    </>
  );
}
