export type ProcessingSummary = {
  rows_processed: number;
  columns_processed: number;
  duplicates_removed: number;
  names_standardized: number;
  ambiguous_rows_found: number;
  exported_csv: string;
  exported_xlsx: string;
};

export type AmbiguousRow = {
  row_number: number;
  original_company: string;
  suggested_company: string | null;
  confidence: number;
  reason: string;
};

export type ProcessingResult = {
  job_id: string;
  filename: string;
  summary: ProcessingSummary;
  original_preview: Record<string, string | number | null>[];
  cleaned_preview: Record<string, string | number | null>[];
  ambiguous_rows: AmbiguousRow[];
  columns_before: string[];
  columns_after: string[];
};

export type UploadState = "idle" | "uploading" | "success" | "error";
