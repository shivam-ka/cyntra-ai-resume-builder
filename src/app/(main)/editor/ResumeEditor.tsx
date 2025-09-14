"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValue } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import ColorPicker from "./ColorPicker";
import BorderStyle from "./BorderStyle";
import { cn, mapToResumeValues } from "@/lib/utils";
import useAutoSaveResume from "./useAutoSaveResume";
import useUnLoadWarning from "@/hooks/useUnLoadWarning";
import { ResumeServerData } from "@/lib/types";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValue>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {}
  );
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnLoadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setSteps(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.components;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b px-4 py-4 sm:px-6">
        <h1 className="text-2xl font-bold">
          Build & Design Your Professional Resume with{" "}
          <span className="text-amber-500 dark:text-amber-400">AI Power</span>
        </h1>
        <p className="mt-1 w-full text-sm md:w-1/2">
          Design a professional, job-ready resume effortlessly with the help of
          AI. Follow simple steps, customize your details, and let AI optimize
          your resume to stand out in today&#39;s competitive job market.
        </p>
      </header>

      <main className="relative min-h-[65vh] sm:flex-grow">
        <div className="absolute inset-0 flex border-t border-gray-200">
          {/* Left Panel */}
          <div
            className={cn(
              "w-full p-4 sm:p-6 md:block md:w-1/2",
              showSmResumePreview && "hidden"
            )}
          >
            <ScrollArea className="h-full pr-4">
              <Breadcrumbs
                currentStep={currentStep}
                setCurrectStep={setSteps}
              />
              {FormComponent && (
                <FormComponent
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                />
              )}
            </ScrollArea>
          </div>

          {/* Divider */}
          <div className="hidden border-l border-gray-200 md:block" />

          {/* Right Panel */}
          <div
            className={cn(
              "relative hidden w-1/2 p-4 sm:p-6 md:block",
              showSmResumePreview && "block w-full"
            )}
          >
            <div className="absolute top-1 right-2 z-50 flex flex-none flex-col gap-3 md:left-1 lg:top-3 lg:left-3">
              <ColorPicker
                color={resumeData.colorHex}
                onChange={(color) =>
                  setResumeData({ ...resumeData, colorHex: color.hex })
                }
              />
              <BorderStyle
                onChange={(Radious) => {
                  setResumeData({ ...resumeData, borderRadius: Radious });
                }}
              />
            </div>
            <ScrollArea className="h-full md:pl-4">
              <ResumePreviewSection
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            </ScrollArea>
          </div>
        </div>
      </main>

      <Footer
        currentStep={currentStep}
        setCurrectStep={setSteps}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}
