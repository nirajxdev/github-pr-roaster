"use server";

import { roastCode } from "@/lib/gemini";
import { fetchPRContent, isValidPRUrl } from "@/lib/github";

export interface RoastResult {
  success: boolean;
  roast?: string;
  error?: string;
}

function isGitHubUrl(input: string): boolean {
  return (
    input.includes("github.com") ||
    input.includes("raw.githubusercontent.com") ||
    input.includes("gist.github.com")
  );
}

export async function roastPR(input: string): Promise<RoastResult> {
  try {
    if (!input.trim()) {
      return { success: false, error: "Please provide a GitHub URL or paste some code." };
    }

    let codeToRoast: string;
    const trimmedInput = input.trim();

    // Check if input is a GitHub PR URL (use Octokit)
    if (isValidPRUrl(trimmedInput)) {
      const prResult = await fetchPRContent(trimmedInput);
      
      if (!prResult.success || !prResult.content) {
        return {
          success: false,
          error: prResult.error || "Failed to fetch PR content",
        };
      }
      
      codeToRoast = prResult.content;
    }
    // Check if input is another GitHub URL (files, gists, etc.)
    else if (isGitHubUrl(trimmedInput)) {
      // For non-PR GitHub URLs, fetch raw content
      try {
        const response = await fetch(convertToRawUrl(trimmedInput));
        if (!response.ok) {
          return {
            success: false,
            error: "I can't roast what I can't see, genius. Check that URL actually works.",
          };
        }
        codeToRoast = await response.text();
      } catch {
        return {
          success: false,
          error: "Failed to fetch from GitHub. Maybe try a PR URL instead?",
        };
      }
    } else {
      // Treat as raw code
      codeToRoast = trimmedInput;
    }

    // Get the roast from Gemini
    const roast = await roastCode(codeToRoast);

    return { success: true, roast };
  } catch (error) {
    console.error("Roast error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred while roasting.",
    };
  }
}

/**
 * Converts GitHub blob URLs to raw URLs
 */
function convertToRawUrl(url: string): string {
  // Already a raw URL
  if (url.includes("raw.githubusercontent.com")) {
    return url;
  }
  
  // Convert blob URL to raw
  // https://github.com/owner/repo/blob/branch/path -> https://raw.githubusercontent.com/owner/repo/branch/path
  const blobPattern = /github\.com\/([^\/]+)\/([^\/]+)\/blob\/(.+)/;
  const match = url.match(blobPattern);
  
  if (match) {
    const [, owner, repo, rest] = match;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${rest}`;
  }
  
  return url;
}
