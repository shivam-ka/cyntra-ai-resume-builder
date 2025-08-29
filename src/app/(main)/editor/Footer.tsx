import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { steps } from "./steps";

interface FooterProps {
  currentStep: string;
  setCurrectStep: (step: string) => void;
}

export default function Footer({ currentStep, setCurrectStep }: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="border-t border-gray-200 px-4 py-4 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex w-full justify-between gap-2 sm:w-fit">
          <Button
            disabled={!previousStep}
            variant="secondary"
            className="min-w-24"
            onClick={
              previousStep ? () => setCurrectStep(previousStep) : undefined
            }
          >
            Previous Step
          </Button>
          <Button
            disabled={!nextStep}
            className="min-w-24"
            onClick={nextStep ? () => setCurrectStep(nextStep) : undefined}
          >
            Next Step
          </Button>
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
  );
}
