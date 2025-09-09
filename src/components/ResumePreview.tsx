import useDimension from "@/hooks/userDimension";
import { cn } from "@/lib/utils";
import { ResumeValue } from "@/lib/validation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Divider from "./Divider";
import { formatDate } from "date-fns";
import { Badge } from "./ui/badge";

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
        <WorkExperienceSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
      </div>
    </div>
  );
}

export interface ResumeSectionProps {
  resumeData: ResumeValue;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    phone,
    firstName,
    lastName,
    jobTitle,
    city,
    country,
    email,
    colorHex,
    borderRadius,
  } = resumeData;

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
          style={{
            borderRadius: borderRadius,
          }}
        />
      )}

      <div className="space-y-2.5">
        <div className="space-y-1">
          <p
            className="text-3xl font-bold"
            style={{
              color: colorHex,
            }}
          >
            {firstName} {lastName}
          </p>
          <p
            className="font-medium"
            style={{
              color: colorHex,
            }}
          >
            {jobTitle}
          </p>
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
        </p>
      </div>
    </div>
  );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <>
      <Divider colorHex={colorHex} />
      <div className="break-inside-avoid space-y-1">
        <p
          className="text-lg font-semibold"
          style={{
            color: colorHex,
          }}
        >
          Professional profile
        </p>
        <div className="text-sm whitespace-pre-line">{summary}</div>
      </div>
    </>
  );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperience, colorHex } = resumeData;

  const workExperienceNotEmpy = workExperience?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  );

  if (!workExperience?.length) return null;

  return (
    <>
      <Divider colorHex={resumeData.colorHex} />
      <div className="space-y-3">
        <p
          style={{
            color: colorHex,
          }}
        >
          Work Experience
        </p>
        {workExperienceNotEmpy?.map((exp, index) => (
          <div key={index} className="break-inside-avoid">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span
                style={{
                  color: colorHex,
                }}
              >
                {exp.position}
              </span>
              {exp.startDate && (
                <span>
                  {formatDate(exp.startDate, "MM/yyyy")}{" "}
                  {exp.endDate ? formatDate(exp.endDate, "MM/yyyy") : "Present"}
                </span>
              )}
            </div>

            <p className="text-xs font-semibold">{exp.company}</p>
            <div className="text-xs whitespace-pre-line">{exp.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
  const { education, colorHex } = resumeData;

  const educationsNotEmpty = education?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  );

  if (!educationsNotEmpty?.length) return null;

  return (
    <>
      <Divider colorHex={resumeData.colorHex} />
      <div className="space-y-3">
        <p
          style={{
            color: colorHex,
          }}
        >
          {" "}
          Education
        </p>
        {educationsNotEmpty.map((edu, index) => (
          <div key={index} className="break-inside-avoid space-y-1">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span
                style={{
                  color: colorHex,
                }}
              >
                {edu.degree}
              </span>
              {edu.startDate && (
                <span>
                  {edu.startDate &&
                    `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? `- ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold">{edu.school}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
  const { skills, colorHex, borderRadius } = resumeData;

  if (!skills?.length) return null;

  return (
    <>
      <Divider colorHex={resumeData.colorHex} />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold">Skills</p>
        <div className="flex break-inside-avoid flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              className="rounded-sm bg-black text-white hover:bg-black"
              style={{
                background: colorHex,
                borderRadius,
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
