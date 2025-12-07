import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateStrategyCode = async (description: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a quantitative finance expert. Write a Python script using the 'backtrader' library for the following trading strategy: "${description}". 
      Return ONLY the Python code. Do not include markdown formatting (like \`\`\`python), just the raw code.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate strategy.");
  }
};

export const analyzeBacktestResults = async (metrics: string, strategyCode: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Analyze the following backtest metrics and strategy code for a quantitative trading strategy.
        Provide a concise risk assessment (max 100 words) and one suggestion for improvement.
        
        Metrics: ${metrics}
        
        Strategy Code Snippet:
        ${strategyCode.substring(0, 500)}...
      `,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not perform AI analysis at this time.";
  }
};