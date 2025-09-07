import useDimension from "@/hooks/userDimension";
import { cn } from "@/lib/utils";
import { ResumeValue } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ResumeProps {
  resumeData: ResumeValue;
  className?: string;
}

export default function ResumePreview({ resumeData, className }: ResumeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimension(containerRef);

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full border bg-white text-black dark:bg-gray-200",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-3 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
      </div>
    </div>
  );
}

interface ResumeSectionProps {
  resumeData: ResumeValue;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const { photo, phone, firstName, lastName, jobTitle, city, country, email } =
    resumeData;

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author Photo"
          className="aspect-square object-cover"
        />
      )}

      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
          <p className="font-medium">{jobTitle}</p>
        </div>
        <p className="text-sm text-gray-700">
          {city}
          {city && country ? ", " : ""}
          {country}
          {(city || country) && (phone || email) ? " • " : ""}
          {phone && phone}
          {phone && email && " • "}
          {email && (
            <a
              className="text-blue-700"
              target="_blank"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          )}
          {/* {[phone, email].filter(Boolean).join(" • ")} */}
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData;
  if (!summary) return null;

  return (
    <>
      <hr className="border border-neutral-800" />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Professional profile</p>
        <div className="text-sm whitespace-pre-line">{summary}</div>
      </div>
    </>
  );
}
