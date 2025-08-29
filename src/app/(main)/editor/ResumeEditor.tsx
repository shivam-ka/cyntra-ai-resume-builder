import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PersonalInfoForm from "./forms/PerfonalInfoForm";
import GeneralInfoForm from "./forms/GeneralInfoForm";

export default function ResumeEditor() {
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
              {/* <GeneralInfoForm /> */}
              <PersonalInfoForm />
            </ScrollArea>
          </div>

          {/* Divider */}
          <div className="hidden border-l border-gray-200 md:block" />

          {/* Right Panel */}
          <div className="hidden w-1/2 p-4 sm:p-6 md:block">
            <ScrollArea className="h-full pl-4"></ScrollArea>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 px-4 py-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex w-full justify-between gap-2 sm:w-fit">
            <Button variant="secondary" className="min-w-24">
              Previous Step
            </Button>
            <Button className="min-w-24">Next Step</Button>
          </div>

          <div className="flex w-full items-center justify-end gap-4 sm:w-fit">
            <p className="flex items-center gap-1 text-sm">
              <Loader className="size-3.5 animate-spin" /> Saving...
            </p>
            <Button variant="secondary" className="min-w-20">
              Close
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
