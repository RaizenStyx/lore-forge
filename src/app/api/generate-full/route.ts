// app/api/generate-starter/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt, type, genre } = await request.json();

    const newPrompt = `
       You are a master loremaster and storyteller. Your task is to craft a comprehensive, detailed, and multi-section lore entry for a fictional world.

      Based on the following request, generate a complete lore entry:
      - Type: ${type}
      - Genre: ${genre}
      - Prompt: "${prompt}"

      The response should be a rich, well-organized document formatted entirely with HTML tags. Follow this structure:

      1.  **A Compelling Title:** Provide a unique title in an <h2> tag at the top.
      2.  **Introduction/Summary:** A brief but captivating opening paragraph in a <p> tag.
      3.  **Detailed Sub-sections:** Create at least three distinct sub-sections with their own headers in <h3> tags.
          - For **Character** lore, include sections like 'Appearance & Traits', 'Background & History', and 'Abilities & Skills'.
          - For **Faction** lore, include sections like 'Purpose & Goals', 'Structure & Hierarchy', and 'Notable Members'.
          - For **World** lore, include sections like 'Geography & Environment', 'Key Locations', and 'Societies & Cultures'.
          - For **Quest** lore, include sections like 'The Objective', 'Key Characters', and 'Rewards & Consequences'.
      4.  **Content Details:** Fill each section with rich, creative details, using bullet points (<ul>) where appropriate. The overall response should be significantly longer and more detailed than a simple paragraph. The entire response must be a single HTML string.
    `;

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: newPrompt,
      max_tokens: 1000,
      temperature: 0.8,
    });

    const lore = completion.choices[0].text;

    return NextResponse.json({ success: true, lore });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate lore.' });
  }
}