"use server";

import openai from "@/lib/openai";
import {
  generateSummaryInput,
  generateSummarySchema,
  generateWorkExperienceSchema,
  generateWorkExperienceValue,
  workExperience,
} from "@/lib/validation";

export async function generateSummary(input: generateSummaryInput) {
  const { jobTitle, education, workExperience, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise, short and professional.
    `;

  const userMessage = `
      Please generate a professional resume summary from this data:
      
      job Title: ${jobTitle || "N/A"}

      Work experience:
    ${workExperience
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `
      )
      .join("\n\n")}

      Education:
    ${education
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `
      )
      .join("\n\n")}

       Skills:
      ${skills}

      `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0];

  if (!aiResponse) {
    throw new Error("faild to generate ai summary");
  }

  return aiResponse;
}

export async function generateWorkExperience(
  input: generateWorkExperienceValue
) {
  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be inferred from the job title>
  `;

  const userMessage = `
  Please provide a work experience entry from this description:
  ${description}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0]?.message?.content ?? "";

  if (!aiResponse) {
    throw new Error("Failed to generate AI Work Experience");
  }

  return {
    position: aiResponse.match(/Job title:\s*(.*)/)?.[1] || "",
    company: aiResponse.match(/Company:\s*(.*)/)?.[1] || "",
    description: (
      aiResponse.match(/Description:\s*([\s\S]*)/)?.[1] || ""
    ).trim(),
    startDate: aiResponse.match(/Start date:\s*(\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date:\s*(\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies workExperience;
}
