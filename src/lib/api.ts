import type { ProcessingResult } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

export async function processFile(file: File): Promise<ProcessingResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/process`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(payload?.detail ?? "The file could not be processed.");
  }

  return response.json() as Promise<ProcessingResult>;
}

export function exportUrl(path: string): string {
  return `${API_BASE}${path}`;
}
