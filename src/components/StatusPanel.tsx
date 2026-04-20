import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import type { UploadState } from "../types";

type StatusCopy = {
  loading: string;
  error: string;
  success: string;
  log: string;
};

type StatusPanelProps = {
  state: UploadState;
  error: string | null;
  text: StatusCopy;
};

export function StatusPanel({ state, error, text }: StatusPanelProps) {
  if (state === "uploading") {
    return (
      <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/10 px-5 py-4 text-cyan-100 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          <p className="font-mono text-xs font-medium">{text.loading}</p>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-2xl border border-rose-300/10 bg-rose-300/10 px-5 py-4 text-rose-100 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          <p className="font-mono text-xs font-medium">{error ?? text.error}</p>
        </div>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="rounded-2xl border border-emerald-300/10 bg-emerald-300/10 px-5 py-4 text-emerald-100 backdrop-blur-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            <p className="font-mono text-xs font-medium">{text.success}</p>
          </div>
          <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] text-emerald-200/60 sm:inline">
            {text.log}
          </span>
        </div>
      </div>
    );
  }

  return null;
}
