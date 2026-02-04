import { Router, Request, Response } from "express";
import { roastCode } from "../services/gemini.js";
import { fetchPRContent, isValidPRUrl } from "../services/github.js";

const router = Router();

interface RoastRequest {
  input: string;
}

interface RoastResponse {
  success: boolean;
  roast?: string;
  error?: string;
  metadata?: {
    title: string;
    author: string;
    additions: number;
    deletions: number;
    changedFiles: number;
  };
}

function isGitHubUrl(input: string): boolean {
  return (
    input.includes("github.com") ||
    input.includes("raw.githubusercontent.com") ||
    input.includes("gist.github.com")
  );
}

function convertToRawUrl(url: string): string {
  // Already a raw URL
  if (url.includes("raw.githubusercontent.com")) {
    return url;
  }

  // Convert blob URL to raw
  const blobPattern = /github\.com\/([^\/]+)\/([^\/]+)\/blob\/(.+)/;
  const match = url.match(blobPattern);

  if (match) {
    const [, owner, repo, rest] = match;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${rest}`;
  }

  return url;
}

router.post("/roast", async (req: Request, res: Response) => {
  try {
    const { input } = req.body as RoastRequest;

    if (!input?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Please provide a GitHub URL or paste some code.",
      } as RoastResponse);
    }

    let codeToRoast: string;
    let metadata;
    const trimmedInput = input.trim();

    // Check if input is a GitHub PR URL (use Octokit)
    if (isValidPRUrl(trimmedInput)) {
      const prResult = await fetchPRContent(trimmedInput);

      if (!prResult.success || !prResult.content) {
        return res.status(400).json({
          success: false,
          error: prResult.error || "Failed to fetch PR content",
        } as RoastResponse);
      }

      codeToRoast = prResult.content;
      metadata = prResult.metadata;
    }
    // Check if input is another GitHub URL (files, gists, etc.)
    else if (isGitHubUrl(trimmedInput)) {
      try {
        const response = await fetch(convertToRawUrl(trimmedInput));
        if (!response.ok) {
          return res.status(400).json({
            success: false,
            error: "I can't roast what I can't see, genius. Check that URL actually works.",
          } as RoastResponse);
        }
        codeToRoast = await response.text();
      } catch {
        return res.status(400).json({
          success: false,
          error: "Failed to fetch from GitHub. Maybe try a PR URL instead?",
        } as RoastResponse);
      }
    } else {
      // Treat as raw code
      codeToRoast = trimmedInput;
    }

    // Get the roast from Gemini
    const roast = await roastCode(codeToRoast);

    return res.json({
      success: true,
      roast,
      metadata,
    } as RoastResponse);
  } catch (error) {
    console.error("Roast error:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred while roasting.",
    } as RoastResponse);
  }
});

export { router as roastRouter };
