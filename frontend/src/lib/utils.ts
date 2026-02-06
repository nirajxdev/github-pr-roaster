import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const useRelativeApi = !API_BASE || /localhost:3001|127\.0\.0\.1:3001/i.test(API_BASE);
const API_URL = useRelativeApi
  ? "/api/roast"
  : `${API_BASE.replace(/\/$/, "")}/api/roast`;

export interface RoastResult {
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

export async function roastPR(input: string): Promise<RoastResult> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: "Failed to connect to the roasting server. Is the backend running?",
    };
  }
}
