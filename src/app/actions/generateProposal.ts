"use server";

import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function generateProposal(jobBrief: string, profileSkills: string, profileExperience: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert freelance proposal writer. Write a winning, concise, and professional proposal for the provided job.
Incorporate the freelancer's skills and experience naturally. Focus on how their background solves the client's problem. Do not use placeholders like [Insert Name], instead end it with "Best regards,". Keep it under 200 words.`
        },
        {
          role: "user",
          content: `Freelancer Skills: ${profileSkills || 'Web Development'}\nFreelancer Experience: ${profileExperience || 'Experienced developer'}\n\nJob Brief: ${jobBrief}`
        }
      ]
    });

    return { success: true, proposal: completion.choices[0].message.content };
  } catch (error) {
    console.error("Failed to generate proposal:", error);
    return { success: false, error: (error as Error).message || "Failed to generate proposal." };
  }
}
