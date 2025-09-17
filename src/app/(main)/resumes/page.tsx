import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare, FileText, ChevronRight, Sparkles } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import ResumeItem from "./ResumeItem";

export const metadata: Metadata = {
  title: "Your Resumes",
};

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}

        {totalCount === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-8 py-12 text-center shadow-sm">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
              <FileText className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="mb-3 text-2xl font-semibold">No resumes yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Create your first resume to get started. We&#39;ll help you build
              a professional resume that stands out.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/editor">
                <PlusSquare className="h-5 w-5" /> Create Your First Resume
              </Link>
            </Button>
            <div className="text-muted-foreground mt-8 flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>It only takes a few minutes</span>
            </div>
          </div>
        ) : (
          // Resumes Grid
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Your All Resumes ( {totalCount} )
              </h2>
              
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
              {/* New Resume Card */}
              <div className="group">
                <Link
                  href="/editor"
                  className="group-hover:border-accent-foreground/50 bg-accent flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all hover:shadow-sm"
                >
                   <PlusSquare className="h-8 w-8" />
                  <h3 className="font-medium">Create New Resume</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Start from scratch or use a template
                  </p>
                </Link>
              </div>

              {/* Existing Resumes */}
              {resumes.map((resume) => (
                <ResumeItem key={resume.id} resume={resume} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
