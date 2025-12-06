import { GoogleGenAI } from "@google/genai";
import type { TranscriptItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseYouTubeUrl = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return null;
  }
};

export const generateVideoInsights = async (videoId: string): Promise<{ title: string; insights: string[]; transcript: TranscriptItem[] }> => {
  const prompt = `Analyze the YouTube video with ID: ${videoId}. URL: https://www.youtube.com/watch?v=${videoId}.
  
  Perform a Google Search to find the video title, a summary of its content, and a transcript or key dialogue segments.
  
  Return a JSON object (and ONLY a JSON object) with this specific structure:
  {
    "title": "The exact title of the video",
    "insights": ["Key insight 1", "Key insight 2", "Key insight 3", "Key insight 4", "Key insight 5"],
    "transcript": [
      { "timestamp": "MM:SS", "text": "spoken text..." }
    ]
  }

  Ensure the transcript has at least 5-10 entries. If an exact transcript is not available, generate a detailed summary in transcript format with estimated timestamps based on the video length and content found.
  Do not include markdown formatting (like \`\`\`json).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType: 'application/json' is not supported with googleSearch
      }
    });

    const text = response.text || "{}";
    // Clean up potential markdown code blocks
    const cleanText = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    const data = JSON.parse(cleanText);

    return {
      title: data.title || "Unknown Title",
      insights: data.insights || [],
      transcript: data.transcript || []
    };
  } catch (error) {
    console.error("Error generating insights:", error);
    throw new Error("Failed to generate insights. Please try again.");
  }
};