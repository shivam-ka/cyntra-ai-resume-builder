import { Prisma } from "@/generated/prisma";
import { ResumeValue } from "./validation";

export interface EditorFormPorps {
  resumeData: ResumeValue;
  setResumeData: (data: ResumeValue) => void;
}

export const resumeDataInclude = {
  workExperience: true,
  education: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;
