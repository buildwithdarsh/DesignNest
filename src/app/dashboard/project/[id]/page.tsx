import type { Metadata } from "next";
import { AppNavbar } from "@/components/app/navbar";
import { AppFooter } from "@/components/app/footer";
import { ProjectDetailClient } from "./project-detail-client";

export const metadata: Metadata = {
  title: "Project Details",
  robots: { index: false, follow: false },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <AppNavbar />
      <main className="min-h-screen bg-muted/30 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <ProjectDetailClient id={id} />
      </main>
      <AppFooter />
    </>
  );
}
