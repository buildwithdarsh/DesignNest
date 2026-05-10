"use client";

import Image from "next/image";
import Link from "next/link";
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
import type {
  TimelineMilestone,
  ProjectMessage,
} from "@/lib/mock-data";

// -----------------------------------------------------------------------------
// Skeleton
// -----------------------------------------------------------------------------

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-muted ${className}`} />
  );
}

// -----------------------------------------------------------------------------
// Status helpers
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
    upcoming: {
      label: "Upcoming",
      className: "bg-gray-100 text-gray-600 border-gray-200",
    },
  };
  const s = map[status] ?? { label: status, className: "" };
  return (
    <Badge variant="outline" className={s.className}>
      {s.label}
    </Badge>
  );
}

function PaymentStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    paid: {
      label: "Paid",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    due: {
      label: "Due",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    upcoming: {
      label: "Upcoming",
      className: "bg-gray-100 text-gray-600 border-gray-200",
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
// Milestone color
// -----------------------------------------------------------------------------

function milestoneColor(status: TimelineMilestone["status"]) {
  switch (status) {
    case "completed":
      return {
        bar: "bg-green-500",
        dot: "bg-green-500 ring-green-200",
        text: "text-green-700",
        bg: "bg-green-50",
      };
    case "in-progress":
      return {
        bar: "bg-amber-500",
        dot: "bg-amber-500 ring-amber-200",
        text: "text-amber-700",
        bg: "bg-amber-50",
      };
    default:
      return {
        bar: "bg-gray-200",
        dot: "bg-gray-300 ring-gray-100",
        text: "text-gray-500",
        bg: "bg-gray-50",
      };
  }
}

// -----------------------------------------------------------------------------
// Message avatar color
// -----------------------------------------------------------------------------

function roleColor(role: ProjectMessage["senderRole"]) {
  switch (role) {
    case "client":
      return "bg-amber-100 text-amber-700";
    case "designer":
      return "bg-blue-100 text-blue-700";
    case "contractor":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-500";
  }
}

// -----------------------------------------------------------------------------
// Main Client Component
// -----------------------------------------------------------------------------

export function ProjectDetailClient({ id }: { id: string }) {
  const project = clientDashboardProject;

  // Varied loading delays per section
  const { data: headerData, isLoading: headerLoading } = useSimulatedLoading(
    project,
    300,
    600
  );
  const { data: timelineData, isLoading: timelineLoading } =
    useSimulatedLoading(project.milestones, 500, 900);
  const { data: budgetData, isLoading: budgetLoading } = useSimulatedLoading(
    project,
    700,
    1100
  );
  const { data: photosData, isLoading: photosLoading } = useSimulatedLoading(
    project.progressPhotos,
    800,
    1200
  );
  const { data: messagesData, isLoading: messagesLoading } =
    useSimulatedLoading(project.messages, 1000, 1400);

  // Suppress unused var lint — id is accepted as prop for future API use
  void id;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back link */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-2 -ml-2"
        render={<Link href="/dashboard" />}
      >
        <svg
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </Button>

      {/* ================================================================== */}
      {/* 1. PROJECT HEADER                                                  */}
      {/* ================================================================== */}
      {headerLoading ? (
        <Card className="py-0 gap-0">
          <CardContent className="py-5 space-y-3">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-3 mt-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-28" />
            </div>
          </CardContent>
        </Card>
      ) : headerData ? (
        <Card className="py-0 gap-0">
          <CardContent className="py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {headerData.title}
                  </h1>
                  <StatusBadge status={headerData.status} />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Image
                    src={headerData.designer.photo}
                    alt={headerData.designer.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">
                    {headerData.designer.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Designer
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
                      />
                    </svg>
                    3BHK, 1,450 sqft
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Powai, Mumbai
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="h-3.5 w-3.5"
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
                    {new Date(headerData.startDate).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "short", year: "numeric" }
                    )}{" "}
                    &mdash;{" "}
                    {new Date(
                      headerData.expectedCompletion
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* ================================================================== */}
      {/* 2. TIMELINE SECTION                                                */}
      {/* ================================================================== */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Project Timeline</h2>
        {timelineLoading ? (
          <Card className="py-0 gap-0">
            <CardContent className="py-5 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-4 w-4 rounded-full shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : timelineData ? (
          <Card className="py-0 gap-0">
            <CardContent className="py-5 sm:py-6">
              {/* Desktop: Gantt-like horizontal bars */}
              <div className="hidden lg:block">
                <div className="space-y-1">
                  {/* Header row */}
                  <div className="grid grid-cols-[200px_1fr_100px] gap-3 text-xs font-medium text-muted-foreground pb-2 border-b mb-3">
                    <span>Milestone</span>
                    <span>Progress</span>
                    <span className="text-right">Status</span>
                  </div>
                  {timelineData.map((milestone) => {
                    const colors = milestoneColor(milestone.status);
                    const pct =
                      milestone.status === "completed"
                        ? 100
                        : milestone.status === "in-progress"
                          ? 60
                          : 0;
                    return (
                      <div
                        key={milestone.id}
                        className={`grid grid-cols-[200px_1fr_100px] gap-3 items-center py-2.5 px-2 rounded-lg ${colors.bg}`}
                      >
                        <div>
                          <p className="text-sm font-medium truncate">
                            {milestone.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(milestone.date).toLocaleDateString(
                              "en-IN",
                              { day: "numeric", month: "short" }
                            )}
                            {milestone.completedDate &&
                              ` - ${new Date(
                                milestone.completedDate
                              ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })}`}
                          </p>
                        </div>
                        <div className="h-3 rounded-full bg-muted/60 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-right">
                          <StatusBadge status={milestone.status} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: Vertical timeline */}
              <div className="lg:hidden space-y-0">
                {timelineData.map((milestone, idx) => {
                  const colors = milestoneColor(milestone.status);
                  const isLast = idx === timelineData.length - 1;
                  return (
                    <div key={milestone.id} className="flex gap-3">
                      {/* Vertical line + dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-3.5 w-3.5 rounded-full ring-4 shrink-0 mt-1 ${colors.dot}`}
                        />
                        {!isLast && (
                          <div className="w-px flex-1 bg-border min-h-[40px]" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-6 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold">
                            {milestone.title}
                          </p>
                          <StatusBadge status={milestone.status} />
                        </div>
                        <p className="text-xs text-muted-foreground mb-1.5">
                          {milestone.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(milestone.date).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                          {milestone.completedDate &&
                            ` - ${new Date(
                              milestone.completedDate
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </section>

      {/* ================================================================== */}
      {/* 3. BUDGET SECTION                                                  */}
      {/* ================================================================== */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Budget & Payments</h2>
        {budgetLoading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="py-0 gap-0">
                  <CardContent className="py-4 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-28" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="py-0 gap-0">
              <CardContent className="py-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        ) : budgetData ? (
          <div className="space-y-4">
            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="py-0 gap-0">
                <CardContent className="py-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Budget
                  </p>
                  <p className="text-lg font-bold">
                    {formatINR(budgetData.totalBudget)}
                  </p>
                </CardContent>
              </Card>
              <Card className="py-0 gap-0">
                <CardContent className="py-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Amount Paid
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {formatINR(budgetData.amountPaid)}
                  </p>
                  <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-500 transition-all duration-700"
                      style={{
                        width: `${Math.round(
                          (budgetData.amountPaid / budgetData.totalBudget) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(
                      (budgetData.amountPaid / budgetData.totalBudget) * 100
                    )}
                    % of total
                  </p>
                </CardContent>
              </Card>
              <Card className="py-0 gap-0">
                <CardContent className="py-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    Remaining
                  </p>
                  <p className="text-lg font-bold text-amber-600">
                    {formatINR(budgetData.totalBudget - budgetData.amountPaid)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Payment breakdown table */}
            <Card className="py-0 gap-0">
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-base">Payment Breakdown</CardTitle>
                <CardDescription>
                  Milestone-wise payment schedule
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="overflow-x-auto -mx-4 px-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left font-medium py-2 pr-4">
                          Milestone
                        </th>
                        <th className="text-right font-medium py-2 px-4">
                          Amount
                        </th>
                        <th className="text-center font-medium py-2 px-4">
                          Status
                        </th>
                        <th className="text-right font-medium py-2 pl-4">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {budgetData.payments.map((payment) => (
                        <tr key={payment.id} className="border-b last:border-0">
                          <td className="py-2.5 pr-4 font-medium">
                            {payment.milestone}
                          </td>
                          <td className="py-2.5 px-4 text-right">
                            {formatINR(payment.amount)}
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <PaymentStatusBadge status={payment.status} />
                          </td>
                          <td className="py-2.5 pl-4 text-right text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </section>

      {/* ================================================================== */}
      {/* 4. PROGRESS PHOTOS                                                 */}
      {/* ================================================================== */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Progress Photos</h2>
        {photosLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="py-0 gap-0">
                <Skeleton className="h-48 w-full rounded-b-none" />
                <CardContent className="py-3 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : photosData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photosData.map((photo) => (
              <Card key={photo.id} className="py-0 gap-0 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={photo.url}
                    alt={photo.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardContent className="py-3">
                  <p className="text-sm font-medium line-clamp-1">
                    {photo.caption}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px] h-4">
                      {photo.room}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(photo.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </section>

      {/* ================================================================== */}
      {/* 5. MESSAGES SECTION                                                */}
      {/* ================================================================== */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Messages</h2>
        {messagesLoading ? (
          <Card className="py-0 gap-0">
            <CardContent className="py-5 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}
                >
                  <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1 max-w-[80%]">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-16 w-full rounded-xl" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : messagesData ? (
          <Card className="py-0 gap-0">
            <CardContent className="py-5 sm:py-6 space-y-4">
              {messagesData.map((msg) => {
                const isClient = msg.senderRole === "client";
                const isSystem = msg.senderRole === "system";

                if (isSystem) {
                  return (
                    <div
                      key={msg.id}
                      className="flex justify-center"
                    >
                      <div className="rounded-full bg-gray-100 px-4 py-1.5 text-xs text-gray-500 text-center max-w-md">
                        {msg.message}
                        <span className="block text-[10px] text-gray-400 mt-0.5">
                          {new Date(msg.timestamp).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${isClient ? "flex-row-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${roleColor(msg.senderRole)}`}
                    >
                      {msg.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    {/* Bubble */}
                    <div
                      className={`max-w-[80%] sm:max-w-[70%] ${isClient ? "items-end" : "items-start"}`}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`text-xs font-semibold ${isClient ? "ml-auto" : ""}`}
                        >
                          {msg.sender}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 h-4"
                        >
                          {msg.senderRole}
                        </Badge>
                      </div>
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-sm ${
                          isClient
                            ? "bg-amber-500 text-black rounded-br-md"
                            : "bg-muted rounded-bl-md"
                        }`}
                      >
                        {msg.message}
                      </div>
                      <p
                        className={`text-[10px] text-muted-foreground mt-1 ${isClient ? "text-right" : ""}`}
                      >
                        {new Date(msg.timestamp).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {/* Attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {msg.attachments.map((url, i) => (
                            <div
                              key={i}
                              className="relative h-20 w-20 rounded-lg overflow-hidden"
                            >
                              <Image
                                src={url}
                                alt="Attachment"
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ) : null}
      </section>
    </div>
  );
}
