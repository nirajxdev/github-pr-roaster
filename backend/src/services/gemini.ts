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

function shouldUseMock(apiKey?: string | null) {
  const mode = process.env.ROAST_MODE?.toLowerCase();
  if (mode === "mock") {
    return true;
  }
  if (!apiKey || apiKey.includes("your_") || apiKey.includes("replace") || apiKey.includes("example")) {
    return mode === "mock";
  }
  return false;
}

export async function roastCode(input: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (shouldUseMock(apiKey)) {
    return MOCK_ROAST;
  }

  if (!apiKey || apiKey.includes("your_") || apiKey.includes("replace") || apiKey.includes("example")) {
    throw new Error("GEMINI_API_KEY is not configured. The roasting engine is offline.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const prompt = `Analyze and roast the following code/PR. Be brutal but constructive:

${input}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (process.env.ROAST_MODE?.toLowerCase() === "fallback") {
      return MOCK_ROAST;
    }

    const message = error instanceof Error ? error.message : String(error);
    if (/(api key|permission|quota|unauth|forbidden|401|403)/i.test(message)) {
      throw new Error("Gemini API request failed. Check GEMINI_API_KEY, billing, and model access.");
    }

    throw new Error("The AI roaster had a meltdown. Try again in a moment.");
  }
}
