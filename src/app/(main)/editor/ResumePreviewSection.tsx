import ResumePreview from "@/components/ResumePreview";
import { ResumeValue } from "@/lib/validation";

interface ResumePreviewProps {
  resumeData: ResumeValue;
  setResumeData: (data: ResumeValue) => void;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewProps) {
  return (
    <div>
      <ResumePreview resumeData={resumeData} className="max-w-2xl" />
    </div>
  );
}
