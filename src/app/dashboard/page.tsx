"use client";

import Link from "next/link";
import Image from "next/image";
import { AppNavbar } from "@/components/app/navbar";
import { AppFooter } from "@/components/app/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { clientDashboardProject, formatINR } from "@/lib/mock-data";

// -----------------------------------------------------------------------------
// Skeleton helpers
// -----------------------------------------------------------------------------

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
    />
  );
}

function CardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <Card className="py-0 gap-0">
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-48 mt-1" />
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}

// -----------------------------------------------------------------------------
// Status badge helper
// -----------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    "in-progress": {
      label: "In Progress",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    "on-hold": {
      label: "On Hold",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  };
  const s = map[status] ?? { label: status, className: "" };
  return (
    <Badge variant="outline" className={s.className}>
      {s.label}
    </Badge>
  );
}

// -----------------------------------------------------------------------------
// Dashboard Page
// -----------------------------------------------------------------------------

export default function DashboardPage() {
  const project = clientDashboardProject;

  const { data: projectData, isLoading: projectLoading } =
    useSimulatedLoading(project, 600, 1000);
  const { data: actionsData, isLoading: actionsLoading } =
    useSimulatedLoading(project, 400, 800);
  const { data: activityData, isLoading: activityLoading } =
    useSimulatedLoading(project.messages, 900, 1400);

  // Derived data
  const unreadCount = project.messages.length;
  const nextPayment = project.payments.find((p) => p.status === "due");
  const nextMilestone = project.milestones.find(
    (m) => m.status === "in-progress" || m.status === "upcoming"
  );
  const docCount = project.progressPhotos.length;

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen bg-muted/30 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ---------------------------------------------------------------- */}
          {/* Welcome Header                                                   */}
          {/* ---------------------------------------------------------------- */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, Priya
            </h1>
            <p className="mt-1 text-muted-foreground text-sm sm:text-base">
              Here&apos;s your project overview
            </p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Active Project Card                                              */}
          {/* ---------------------------------------------------------------- */}
          {projectLoading ? (
            <CardSkeleton rows={5} />
          ) : projectData ? (
            <Card className="py-0 gap-0 mb-8">
              <CardHeader className="pb-4 pt-5 sm:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg sm:text-xl font-semibold">
                      {projectData.title}
                    </CardTitle>
                    <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5">
                        <Image
                          src={projectData.designer.photo}
                          alt={projectData.designer.name}
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                        {projectData.designer.name}
                      </span>
                      <span className="text-muted-foreground/40">|</span>
                      <span>{projectData.address}</span>
                    </CardDescription>
                  </div>
                  <StatusBadge status={projectData.status} />
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="py-4 sm:py-5 space-y-5">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="font-semibold text-amber-600">
                      {projectData.completionPercentage}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-500 transition-all duration-700"
                      style={{
                        width: `${projectData.completionPercentage}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Current Phase: {projectData.currentPhase}
                  </p>
                </div>

                {/* Next milestone */}
                {nextMilestone && (
                  <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
                    <p className="text-xs font-medium text-amber-800 uppercase tracking-wider mb-0.5">
                      Next Milestone
                    </p>
                    <p className="text-sm font-semibold text-amber-900">
                      {nextMilestone.title}
                    </p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      {nextMilestone.description}
                    </p>
                  </div>
                )}

                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Total Budget
                    </p>
                    <p className="text-sm font-semibold">
                      {formatINR(projectData.totalBudget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Timeline
                    </p>
                    <p className="text-sm font-semibold">
                      {new Date(projectData.startDate).toLocaleDateString(
                        "en-IN",
                        { month: "short", year: "numeric" }
                      )}{" "}
                      &mdash;{" "}
                      {new Date(
                        projectData.expectedCompletion
                      ).toLocaleDateString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Payments Made
                    </p>
                    <p className="text-sm font-semibold">
                      {formatINR(projectData.amountPaid)}{" "}
                      <span className="text-muted-foreground font-normal">
                        of {formatINR(projectData.totalBudget)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  className="rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400"
                  render={
                    <Link
                      href={`/dashboard/project/${projectData.id}`}
                    />
                  }
                >
                  View Project Details
                </Button>
              </CardContent>
            </Card>
          ) : null}

          {/* ---------------------------------------------------------------- */}
          {/* Quick Actions                                                    */}
          {/* ---------------------------------------------------------------- */}
          {actionsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={i} rows={2} />
              ))}
            </div>
          ) : actionsData ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Messages */}
              <Card className="py-0 gap-0 hover:ring-amber-300 transition-all cursor-pointer">
                <Link href={`/dashboard/project/${project.id}`}>
                  <CardContent className="py-4 sm:py-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                          />
                        </svg>
                      </div>
                      <Badge className="bg-blue-500 text-white">
                        {unreadCount}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold">Messages</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {unreadCount} conversations
                    </p>
                  </CardContent>
                </Link>
              </Card>

              {/* Payments */}
              <Card className="py-0 gap-0 hover:ring-amber-300 transition-all cursor-pointer">
                <Link href={`/dashboard/project/${project.id}`}>
                  <CardContent className="py-4 sm:py-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                        <svg
                          className="h-5 w-5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">Payments</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {nextPayment
                        ? `${formatINR(nextPayment.amount)} due`
                        : "All clear"}
                    </p>
                  </CardContent>
                </Link>
              </Card>

              {/* Timeline */}
              <Card className="py-0 gap-0 hover:ring-amber-300 transition-all cursor-pointer">
                <Link href={`/dashboard/project/${project.id}`}>
                  <CardContent className="py-4 sm:py-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                        <svg
                          className="h-5 w-5 text-amber-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">Timeline</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {nextMilestone
                        ? nextMilestone.title
                        : "No upcoming milestones"}
                    </p>
                  </CardContent>
                </Link>
              </Card>

              {/* Documents */}
              <Card className="py-0 gap-0 hover:ring-amber-300 transition-all cursor-pointer">
                <Link href={`/dashboard/project/${project.id}`}>
                  <CardContent className="py-4 sm:py-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                        <svg
                          className="h-5 w-5 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <Badge variant="secondary">{docCount}</Badge>
                    </div>
                    <p className="text-sm font-semibold">Documents</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {docCount} photos &amp; files
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          ) : null}

          {/* ---------------------------------------------------------------- */}
          {/* Recent Activity                                                  */}
          {/* ---------------------------------------------------------------- */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            {activityLoading ? (
              <Card className="py-0 gap-0">
                <CardContent className="py-5 space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : activityData ? (
              <Card className="py-0 gap-0">
                <CardContent className="py-5">
                  <div className="space-y-0">
                    {activityData
                      .slice()
                      .reverse()
                      .slice(0, 4)
                      .map((msg, idx) => (
                        <div key={msg.id}>
                          <div className="flex gap-3 py-3">
                            {/* Timeline dot */}
                            <div className="flex flex-col items-center">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                  msg.senderRole === "client"
                                    ? "bg-amber-100 text-amber-700"
                                    : msg.senderRole === "designer"
                                      ? "bg-blue-100 text-blue-700"
                                      : msg.senderRole === "contractor"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                {msg.senderRole === "system"
                                  ? "SYS"
                                  : msg.sender
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .slice(0, 2)}
                              </div>
                            </div>
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                <span className="text-sm font-semibold">
                                  {msg.sender}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-1.5 h-4"
                                >
                                  {msg.senderRole}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {new Date(
                                    msg.timestamp
                                  ).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {msg.message}
                              </p>
                            </div>
                          </div>
                          {idx < 3 && <Separator />}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </main>
      <AppFooter />
    </>
  );
}
