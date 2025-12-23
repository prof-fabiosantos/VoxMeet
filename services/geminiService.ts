import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MeetingResult } from '../types';
import { MOCK_RESULT } from '../utils/mockData';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      // Extract only the base64 content
      const base64Content = base64Data.split(',')[1];
      resolve({
        inlineData: {
          data: base64Content,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeAudio = async (file: File): Promise<MeetingResult> => {
  const ai = getClient();
  
  if (!ai) {
    console.warn("No API Key found. Using mock data.");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return MOCK_RESULT;
  }

  try {
    const audioPart = await fileToGenerativePart(file);

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING, description: "Executive summary of the meeting in Portuguese" },
        tasks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING, description: "Task description in Portuguese" },
              assigneeName: { type: Type.STRING, description: "Full name of assignee (inferred)" },
              assigneeInitials: { type: Type.STRING, description: "Initials (e.g., AS)" },
              assigneeColor: { type: Type.STRING, description: "A valid tailwind color class string like 'bg-purple-100 text-purple-700'" },
              deadline: { type: Type.STRING, description: "Deadline or timing info in Portuguese" }
            }
          }
        },
        decisions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING, description: "Short title of decision in Portuguese" },
              description: { type: Type.STRING, description: "Full decision detail in Portuguese" }
            }
          }
        }
      }
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: {
        parts: [
          audioPart,
          { text: "Você é um assistente de IA especialista em gerenciamento de projetos. Analise este áudio de reunião. Gere um resumo executivo, liste as tarefas com responsáveis (infira nomes plausíveis se não explícito) e prazos, e liste as decisões chave. A saída DEVE ser estritamente em JSON seguindo o schema." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (response.text) {
        let jsonText = response.text;
        // Clean up markdown code blocks if present
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/^```json/, '').replace(/```$/, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```/, '').replace(/```$/, '');
        }
        
        try {
            const parsed = JSON.parse(jsonText);
            
            // Validate and sanitize the output to ensure arrays exist
            return {
                summary: parsed.summary || "Resumo não disponível.",
                tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
                decisions: Array.isArray(parsed.decisions) ? parsed.decisions : []
            } as MeetingResult;
            
        } catch (e) {
            console.error("Failed to parse JSON response", e);
            throw new Error("Invalid JSON response from model");
        }
    }
    throw new Error("No response text");

  } catch (error) {
    console.error("Gemini API Error, falling back to mock:", error);
    // In production, you might want to show an error to the user
    // For this demo, we fallback so the UI shows something useful
    return MOCK_RESULT;
  }
};