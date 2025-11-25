import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

// Initialize Gemini Client
// IMPORTANT: Expects process.env.API_KEY to be set in the build environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipe = async (ingredients: string, dietary: string): Promise<Recipe | null> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `Create a healthy, organic, "Life Alive" cafe style bowl or dish using these ingredients: ${ingredients}. Dietary preferences: ${dietary}. Make it vibrant and nourishing.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            ingredients: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            instructions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            benefits: { type: Type.STRING },
            prepTime: { type: Type.STRING },
            calories: { type: Type.NUMBER }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Recipe;
    }
    return null;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
};

export const getWellnessAdvice = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are a warm, empathetic, and holistic wellness coach for the 'Life Alive' app. Focus on organic nutrition, mindfulness, and gentle lifestyle changes. Be concise but encouraging.",
      },
      history: history
    });

    const result = await chat.sendMessage({ message: message });
    return result.text;
  } catch (error) {
    console.error("Error getting wellness advice:", error);
    throw error;
  }
};

export const analyzeMood = async (note: string): Promise<{sentiment: string, suggestions: string[]}> => {
  try {
     const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this journal entry and provide a brief sentiment summary (1 sentence) and 3 quick holistic wellness suggestions (e.g. herbal tea, a stretch, a breathing exercise). Entry: "${note}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    if (response.text) {
      return JSON.parse(response.text);
    }
    return { sentiment: "Unable to analyze", suggestions: [] };
  } catch (error) {
    console.error("Error analyzing mood:", error);
    return { sentiment: "Error analyzing", suggestions: [] };
  }
}