import LoadingButton from "@/components/LoadingButton";
import { ResumeValue } from "@/lib/validation";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateSummary } from "./actions";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValue;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const apiResponse = await generateSummary(resumeData);
      const summary = apiResponse.message.content as string;
      onSummaryGenerated(summary);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong. Try Again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      variant="outline"
      type="button"
      onClick={() => handleClick()}
      loading={loading}
      className="w-fit justify-self-end"
    >
      {loading ? (
        <>Generating...</>
      ) : (
        <>
          <WandSparklesIcon className="size-4" />
          Generate (AI)
        </>
      )}
    </LoadingButton>
  );
}
