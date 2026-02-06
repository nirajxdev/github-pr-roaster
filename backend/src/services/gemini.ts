import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are a Senior Software Architect who is exhausted by junior-level mistakes. You are brutally honest, cynical, and use dark humor. You've seen it all - the spaghetti code, the "temporary" fixes that became permanent, the copy-pasted Stack Overflow answers.

When analyzing code, you must evaluate:
1. **Complexity Hell** - Unnecessary nesting, convoluted logic, functions that do 47 things
2. **Terrible Naming** - Variables like 'x', 'data', 'temp', 'stuff', or misleading names
3. **Lack of Error Handling** - Try-catch? Never heard of her. Null checks? Optional.
4. **Redundant Logic** - Copy-paste programming, reinventing the wheel, doing things the hard way

You MUST format your response in EXACTLY these three sections:

[THE VERDICT]
A single devastating one-sentence summary that captures the essence of their crimes against clean code. Make it memorable, quotable, and slightly painful.

[THE GRILLING]
- Bullet point 1 - specific flaw with line reference if possible
- Bullet point 2 - another specific flaw
- Continue with 3-7 bullet points covering the worst offenses
(Be specific. Quote the bad code. Mock it appropriately.)

[THE PENANCE]
1. First thing they must fix to begin their redemption
2. Second improvement required
3. Continue with 3-5 actionable fixes
(These should be specific, actionable improvements - not vague advice)

Remember: You're not here to make friends. You're here to make better developers. The roast should sting, but the advice should genuinely help them improve.`;

const MOCK_ROAST = `[THE VERDICT]
This PR reads like a speedrun of bad decisions.

[THE GRILLING]
- Naming is vague enough to double as a mystery novel
- The logic sprawls across too many responsibilities
- Error handling looks optional, not intentional

[THE PENANCE]
1. Split the biggest functions into focused units
2. Rename variables to match intent, not convenience
3. Add explicit error handling and actionable messages`;

function hasUsableKey(apiKey?: string | null) {
  if (!apiKey) {
    return false;
  }
  const lowered = apiKey.toLowerCase();
  return !(lowered.includes("your_") || lowered.includes("replace") || lowered.includes("example"));
}

type RoastMode = "mock" | "fallback" | "live";

function resolveMode(usableKey: boolean): RoastMode {
  const mode = process.env.ROAST_MODE?.toLowerCase();
  if (mode === "mock" || mode === "fallback" || mode === "live") {
    return mode;
  }
  return usableKey ? "live" : "fallback";
}

const DEFAULT_MODELS = [
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
  "gemini-1.5-pro-latest",
  "gemini-1.5-pro",
  "gemini-1.0-pro-latest",
  "gemini-1.0-pro",
  "gemini-pro",
];

function getModelCandidates() {
  const envModel = process.env.GEMINI_MODEL?.trim();
  const candidates = envModel ? [envModel, ...DEFAULT_MODELS] : DEFAULT_MODELS;
  return Array.from(new Set(candidates.filter(Boolean)));
}

function isModelNotFound(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /not found|model.*not.*supported|models\/.+ not found/i.test(message);
}

type ModelListResponse = {
  models?: Array<{
    name?: string;
    supportedGenerationMethods?: string[];
  }>;
};

let cachedModels: { models: string[]; fetchedAt: number } | null = null;
const MODEL_CACHE_TTL_MS = 15 * 60 * 1000;

async function fetchAvailableModels(apiKey: string): Promise<string[]> {
  const now = Date.now();
  if (cachedModels && now - cachedModels.fetchedAt < MODEL_CACHE_TTL_MS) {
    return cachedModels.models;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Model list request failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as ModelListResponse;
  const models = (data.models || [])
    .filter((model) => model.supportedGenerationMethods?.includes("generateContent"))
    .map((model) => model.name || "")
    .filter(Boolean)
    .map((name) => name.replace(/^models\//, ""));

  cachedModels = { models, fetchedAt: now };
  return models;
}

function rankModels(models: string[]) {
  const score = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("flash")) {
      return 0;
    }
    if (lower.includes("pro")) {
      return 1;
    }
    return 2;
  };
  return [...models].sort((a, b) => score(a) - score(b));
}

export async function listAvailableModels(): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const usableKey = hasUsableKey(apiKey);

  if (!usableKey || !apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  return fetchAvailableModels(apiKey);
}

export async function roastCode(input: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const usableKey = hasUsableKey(apiKey);
  const mode = resolveMode(usableKey);

  if (mode === "mock" || (!usableKey && mode !== "live")) {
    return MOCK_ROAST;
  }

  if (!usableKey || !apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. The roasting engine is offline.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = `Analyze and roast the following code/PR. Be brutal but constructive:\n\n${input}`;
  const modelsToTry = getModelCandidates();

  const tryModel = async (modelName: string) => {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: SYSTEM_INSTRUCTION,
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };

  let lastError: unknown;

  for (const modelName of modelsToTry) {
    try {
      return await tryModel(modelName);
    } catch (error) {
      lastError = error;
      if (!isModelNotFound(error)) {
        break;
      }
    }
  }

  if (isModelNotFound(lastError)) {
    try {
      const available = await fetchAvailableModels(apiKey);
      const ranked = rankModels(available);
      for (const modelName of ranked) {
        try {
          return await tryModel(modelName);
        } catch (error) {
          lastError = error;
          if (!isModelNotFound(error)) {
            break;
          }
        }
      }
      if (available.length === 0) {
        throw new Error("No models with generateContent are available for this API key.");
      }
      throw new Error(`No available Gemini model found. Tried: ${ranked.join(", ")}`);
    } catch (error) {
      lastError = error;
    }
  }

  console.error("Gemini API Error:", lastError);

  if (mode === "fallback") {
    return MOCK_ROAST;
  }

  const message = lastError instanceof Error ? lastError.message : String(lastError);
  if (/(api key|permission|quota|unauth|forbidden|401|403)/i.test(message)) {
    throw new Error("Gemini API request failed. Check GEMINI_API_KEY, billing, and model access.");
  }

  throw new Error(`Gemini API error: ${message}`);
}
