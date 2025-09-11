import useDebounce from "@/hooks/useDebounce";
import { ResumeValue } from "@/lib/validation";
import { useEffect, useState } from "react";

export default function useAutoSaveResume(resumedata: ResumeValue) {
  const debouncedResumeData = useDebounce(resumedata, 1500);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumedata)
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function save() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSavedData(structuredClone(debouncedResumeData));
      setIsSaving(false);
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving) {
      save();
    }
  }, [debouncedResumeData, lastSavedData, isSaving]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumedata) !== JSON.stringify(lastSavedData),
  };
}
