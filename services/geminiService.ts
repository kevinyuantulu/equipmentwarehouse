import { GoogleGenAI } from "@google/genai";
import { Equipment } from "../types";

// Initialize Gemini Client
// Note: process.env.API_KEY is guaranteed to be available by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEquipmentInsight = async (equipment: Equipment, query: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      You are an expert fencing armorer and historian.
      The user is asking about: ${equipment.name} (${equipment.type}).
      
      Technical Specs:
      - Weight: ${equipment.baseStats.weight}
      - Flexibility: ${equipment.baseStats.flexibility}
      - Target Area: ${equipment.baseStats.targetArea}

      User Query: "${query}"

      Provide a concise, professional, and engaging response suitable for a high-tech equipment showcase website. 
      Keep it under 100 words unless asked for more detail. Focus on the mechanical and strategic advantages.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Transmission interrupted. Data unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to establish link with the Armory AI database.";
  }
};
