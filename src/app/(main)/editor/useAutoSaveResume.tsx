import useDebounce from "@/hooks/useDebounce";
import { ResumeValue } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import saveResumes from "./actions";
import { toast } from "sonner";

export default function useAutoSaveResume(resumedata: ResumeValue) {
  const searchParams = useSearchParams();

  const debouncedResumeData = useDebounce(resumedata, 1500);

  const [resumeId, setResumeId] = useState(resumedata.id);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumedata)
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);

        const updatedResume = await saveResumes({
          ...newData,
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);

          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        toast.dismiss("error saving data");
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    lastSavedData,
    isSaving,
    isError,
    resumeId,
    searchParams,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumedata) !== JSON.stringify(lastSavedData),
  };
}
