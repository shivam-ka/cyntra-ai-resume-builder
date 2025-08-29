"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { ResumeValue } from "@/lib/validation";

export default function ResumeEditor() {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValue>({});

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
          <div className="w-full p-4 sm:p-6 md:w-1/2">
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
          <div className="hidden w-1/2 p-4 sm:p-6 md:block">
            <ScrollArea className="h-full pl-4">
              <pre>{JSON.stringify(resumeData, null, 2)}</pre>
            </ScrollArea>
          </div>
        </div>
      </main>

      <Footer currentStep={currentStep} setCurrectStep={setSteps} />
    </div>
  );
}
