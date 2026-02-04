import { Octokit } from "@octokit/rest";

// Sarcastic error messages for various failure scenarios
const SARCASTIC_ERRORS = {
  invalidUrl: "That's not a PR URL, Einstein. Try something that actually looks like github.com/owner/repo/pull/123",
  privateRepo: "I can't roast what I can't see, genius. Either make it public or give me a token with access.",
  notFound: "404: PR not found. Did you just make up that URL? Because it doesn't exist.",
  rateLimited: "GitHub said 'slow down, speed racer.' Too many requests. Maybe add a GITHUB_TOKEN to your .env?",
  noToken: "No GitHub token? Living dangerously, I see. Add GITHUB_TOKEN to your .env for better access.",
  networkError: "The internet broke. Or GitHub is down. Either way, not my fault.",
  emptyPR: "This PR has no file changes. Did someone open a PR just to write a novel in the description?",
  unknown: "Something went catastrophically wrong. Congrats, you broke it in a new and exciting way.",
};

interface PRInfo {
  owner: string;
  repo: string;
  prNumber: number;
}

interface PRFetchResult {
  success: boolean;
  content?: string;
  error?: string;
  metadata?: {
    title: string;
    author: string;
    additions: number;
    deletions: number;
    changedFiles: number;
  };
}

/**
 * Parses a GitHub PR URL and extracts owner, repo, and PR number
 */
export function parsePRUrl(url: string): PRInfo | null {
  const cleanUrl = url.trim();

  const prPattern = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/i;
  const match = cleanUrl.match(prPattern);

  if (!match) {
    return null;
  }

  const [, owner, repo, prNumber] = match;

  return {
    owner,
    repo: repo.replace(/\.git$/, ""),
    prNumber: parseInt(prNumber, 10),
  };
}

/**
 * Creates an Octokit instance with optional authentication
 */
function createOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;

  return new Octokit({
    auth: token || undefined,
  });
}

/**
 * Fetches the content of a Pull Request from GitHub
 */
export async function fetchPRContent(prUrl: string): Promise<PRFetchResult> {
  const prInfo = parsePRUrl(prUrl);

  if (!prInfo) {
    return {
      success: false,
      error: SARCASTIC_ERRORS.invalidUrl,
    };
  }

  const { owner, repo, prNumber } = prInfo;
  const octokit = createOctokit();

  try {
    // Fetch PR metadata
    const { data: pr } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    });

    // Fetch the PR diff/files
    const { data: files } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: prNumber,
      per_page: 100,
    });

    if (files.length === 0) {
      return {
        success: false,
        error: SARCASTIC_ERRORS.emptyPR,
      };
    }

    // Build the content string
    const contentParts: string[] = [
      `# Pull Request: ${pr.title}`,
      `## Author: @${pr.user?.login || "unknown"}`,
      `## Branch: ${pr.head.ref} → ${pr.base.ref}`,
      `## Stats: +${pr.additions} additions, -${pr.deletions} deletions, ${pr.changed_files} files changed`,
      "",
      "---",
      "",
    ];

    // Add PR description if present
    if (pr.body) {
      contentParts.push("## PR Description:");
      contentParts.push(pr.body);
      contentParts.push("");
      contentParts.push("---");
      contentParts.push("");
    }

    // Add each file's changes
    contentParts.push("## Code Changes:");
    contentParts.push("");

    for (const file of files) {
      contentParts.push(`### File: ${file.filename}`);
      contentParts.push(`Status: ${file.status} | +${file.additions} -${file.deletions}`);
      contentParts.push("");

      if (file.patch) {
        contentParts.push("```diff");
        contentParts.push(file.patch);
        contentParts.push("```");
      } else if (file.status === "renamed") {
        contentParts.push(`Renamed from: ${file.previous_filename}`);
      } else if (file.status === "removed") {
        contentParts.push("*File was deleted*");
      } else {
        contentParts.push("*Binary file or content too large to display*");
      }

      contentParts.push("");
    }

    return {
      success: true,
      content: contentParts.join("\n"),
      metadata: {
        title: pr.title,
        author: pr.user?.login || "unknown",
        additions: pr.additions,
        deletions: pr.deletions,
        changedFiles: pr.changed_files,
      },
    };
  } catch (error: any) {
    if (error.status === 404) {
      return {
        success: false,
        error: SARCASTIC_ERRORS.notFound,
      };
    }

    if (error.status === 403) {
      if (error.message?.includes("rate limit")) {
        return {
          success: false,
          error: SARCASTIC_ERRORS.rateLimited,
        };
      }
      return {
        success: false,
        error: SARCASTIC_ERRORS.privateRepo,
      };
    }

    if (error.status === 401) {
      return {
        success: false,
        error: SARCASTIC_ERRORS.privateRepo,
      };
    }

    if (error.code === "ENOTFOUND" || error.code === "ETIMEDOUT") {
      return {
        success: false,
        error: SARCASTIC_ERRORS.networkError,
      };
    }

    console.error("GitHub API Error:", error.message || error);

    return {
      success: false,
      error: `${SARCASTIC_ERRORS.unknown} (${error.message || "Unknown error"})`,
    };
  }
}

/**
 * Validates if a string looks like a GitHub PR URL
 */
export function isValidPRUrl(url: string): boolean {
  return parsePRUrl(url) !== null;
}
