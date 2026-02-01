import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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
• Bullet point 1 - specific flaw with line reference if possible
• Bullet point 2 - another specific flaw
• Continue with 3-7 bullet points covering the worst offenses
(Be specific. Quote the bad code. Mock it appropriately.)

[THE PENANCE]
1. First thing they must fix to begin their redemption
2. Second improvement required
3. Continue with 3-5 actionable fixes
(These should be specific, actionable improvements - not vague advice)

Remember: You're not here to make friends. You're here to make better developers. The roast should sting, but the advice should genuinely help them improve.`;

export async function roastCode(input: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const prompt = `Analyze and roast the following code/PR. Be brutal but constructive:

${input}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function fetchGitHubContent(url: string): Promise<string> {
  // Parse GitHub URL to determine type (PR, file, gist, etc.)
  const githubPatterns = {
    pr: /github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/,
    file: /github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/,
    rawFile: /raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)/,
    gist: /gist\.github\.com\/([^\/]+)\/([a-f0-9]+)/,
  };

  // Check if it's a PR URL
  const prMatch = url.match(githubPatterns.pr);
  if (prMatch) {
    const [, owner, repo, prNumber] = prMatch;
    // Fetch PR diff
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
      {
        headers: {
          Accept: "application/vnd.github.v3.diff",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch PR: ${response.statusText}`);
    }
    
    const diff = await response.text();
    return `GitHub PR #${prNumber} from ${owner}/${repo}:\n\n${diff}`;
  }

  // Check if it's a file URL
  const fileMatch = url.match(githubPatterns.file);
  if (fileMatch) {
    const [, owner, repo, branch, path] = fileMatch;
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
    const response = await fetch(rawUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    
    const content = await response.text();
    return `File: ${path}\n\n${content}`;
  }

  // Check if it's already a raw URL
  const rawMatch = url.match(githubPatterns.rawFile);
  if (rawMatch) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    return await response.text();
  }

  // Check if it's a gist
  const gistMatch = url.match(githubPatterns.gist);
  if (gistMatch) {
    const [, , gistId] = gistMatch;
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch gist: ${response.statusText}`);
    }
    
    const gist = await response.json();
    const files = Object.entries(gist.files)
      .map(([name, file]: [string, any]) => `// ${name}\n${file.content}`)
      .join("\n\n");
    
    return `Gist: ${gist.description || gistId}\n\n${files}`;
  }

  throw new Error("Unrecognized GitHub URL format. Supported: PR URLs, file URLs, raw URLs, and Gists.");
}
