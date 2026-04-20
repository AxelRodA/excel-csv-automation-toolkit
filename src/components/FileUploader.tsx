import { Download, Play, UploadCloud } from "lucide-react";
import type { UploadState } from "../types";

type UploadCopy = {
  title: string;
  choose: string;
  formats: string;
  run: string;
  processing: string;
  sampleTitle: string;
  sampleCsv: string;
  sampleXlsx: string;
};

type FileUploaderProps = {
  file: File | null;
  state: UploadState;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
  text: UploadCopy;
};

export function FileUploader({ file, state, onFileChange, onSubmit, text }: FileUploaderProps) {
  const isUploading = state === "uploading";

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-lg lg:p-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
          {text.title}
        </h2>

        <label className="mt-6 flex min-h-44 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#0c1324]/70 px-6 py-8 transition duration-200 ease-out hover:border-emerald-300/40 hover:bg-emerald-300/[0.03]">
          <UploadCloud className="h-8 w-8 text-slate-300" aria-hidden="true" />
          <span className="mt-4 font-mono text-sm text-slate-100">
            {file ? file.name : text.choose}
          </span>
          <span className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-slate-500">
            {text.formats}
          </span>
          <input
            type="file"
            className="sr-only"
            accept=".csv,.xlsx,.xls"
            onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
          />
        </label>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!file || isUploading}
          className="mt-6 inline-flex w-full max-w-xl items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-[#4edea3] to-[#10b981] px-6 py-4 text-sm font-bold text-emerald-950 transition duration-200 ease-out hover:brightness-110 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 sm:w-2/3"
        >
          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
          {isUploading ? text.processing : text.run}
        </button>

        <div className="mt-5 flex flex-col items-center gap-3 text-sm sm:flex-row">
          <span className="text-slate-400">{text.sampleTitle}</span>
          <div className="flex flex-wrap justify-center gap-2">
            <SampleDownloadLink href="/sample-data/company_leads_dirty.csv" label={text.sampleCsv} />
            <SampleDownloadLink href="/sample-data/company_leads_dirty.xlsx" label={text.sampleXlsx} />
          </div>
        </div>
      </div>
    </section>
  );
}

type SampleDownloadLinkProps = {
  href: string;
  label: string;
};

function SampleDownloadLink({ href, label }: SampleDownloadLinkProps) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-emerald-200 transition hover:border-emerald-300/30 hover:bg-emerald-300/10"
    >
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </a>
  );
}
