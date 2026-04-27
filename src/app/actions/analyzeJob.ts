"use server";

import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function analyzeJob(jobBrief: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert tech recruiter and job analyst. Analyze the following job description. 
Return ONLY a valid JSON object with exactly these fields (no markdown, no backticks):
{
  "match": number (0-100, representing general feasibility for a standard web developer),
  "missing": string[] (array of 1-3 highly specific or rare skills mentioned, or empty array if none),
  "redFlags": string[] (array of 1-3 potential red flags like "unclear budget", "urgent deadline", etc, or empty array if none)
}`
        },
        {
          role: "user",
          content: jobBrief
        }
      ]
    });

    let rawContent = completion.choices[0].message.content || "{}";
    rawContent = rawContent.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    const result = JSON.parse(rawContent);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to analyze job:", error);
    return { success: false, error: (error as Error).message || "Failed to analyze job." };
  }
}
