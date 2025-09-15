"use server";

import openai from "@/lib/openai";
import { generateSummaryInput, generateSummarySchema } from "@/lib/validation";

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
