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
      You are a lore-generating AI for a fantasy world. Based on the following request, create a short, simple, and compelling lore entry.

      Request:
      - Type: ${type}
      - Genre: ${genre}
      - Prompt: "${prompt}"

      The response should be a concise paragraph (less than 100 words) that provides a glimpse into the lore, formatted as a single <p> tag. It should include a title in an <h2> tag at the top. This is a free sample, so it should be interesting but brief. Do not include any details beyond the initial premise.
    `;

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: newPrompt,
      max_tokens: 200,
      temperature: 0.7,
    });

    const lore = completion.choices[0].text;

    return NextResponse.json({ success: true, lore });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate lore.' });
  }
}