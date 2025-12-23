
import { GoogleGenAI, Type } from "@google/genai";
import { Notice } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function summarizeNotice(content: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following academic notice in one short, impactful sentence for a notification: "${content}"`,
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini summary error:", error);
    return content.slice(0, 100) + "...";
  }
}

export async function rankNotice(notice: Partial<Notice>): Promise<number> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze urgency (1-100):
        Title: ${notice.title}
        Priority: ${notice.priority}
        Target: ${notice.targetAudience}
        Deadline: ${notice.deadline || 'None'}
        Return ONLY the integer.
      `,
    });
    const score = parseInt(response.text?.trim() || "50");
    return isNaN(score) ? 50 : Math.min(100, Math.max(1, score));
  } catch (error) {
    return 50;
  }
}

export async function getDailyInsight(role: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `AI Advisor: Brief motivational insight for role: ${role}. Max 15 words. Emoji included.`,
    });
    return response.text || "Focus on your goals! 🚀";
  } catch (error) {
    return "Make today productive! 📚";
  }
}

export async function searchNotices(query: string, notices: Notice[]): Promise<string[]> {
  try {
    const noticeContext = notices.map(n => `ID: ${n.id} | Title: ${n.title}`).join('\n');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User Query: "${query}". Return matching IDs from this list as JSON array: \n${noticeContext}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [];
  }
}
