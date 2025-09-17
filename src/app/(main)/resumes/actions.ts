"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteResume(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // First, verify the resume exists and belongs to the user
  const resume = await prisma.resume.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }

  // Use a transaction to ensure all deletions succeed or fail together
  await prisma.$transaction(async (tx) => {
    // Delete all related work experiences
    await tx.workExperience.deleteMany({
      where: { resumeId: id },
    });

    // Delete all related education records
    await tx.education.deleteMany({
      where: { resumeId: id },
    });

    // Finally delete the resume
    await tx.resume.delete({
      where: { id },
    });
  });

  revalidatePath("/resumes");
}
