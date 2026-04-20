import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Download,
  Rows3,
  ShieldCheck,
  Sparkles,
  Table2,
  Wand2,
  Zap
} from "lucide-react";
import { DataTable } from "./components/DataTable";
import { FileUploader } from "./components/FileUploader";
import { MetricCard } from "./components/MetricCard";
import { StatusPanel } from "./components/StatusPanel";
import { copy, languages, type Language } from "./i18n";
import { exportUrl, processFile } from "./lib/api";
import type { AmbiguousRow, ProcessingResult, UploadState } from "./types";

const demoOriginalRows = [
  {
    "Company Name": " Acme Corp ",
    "Contact Email": "john@acme.example",
    "Annual Spend": " 12000 "
  },
  {
    "Company Name": "GLOBEX LLC",
    "Contact Email": "h.scorpio@globex.example",
    "Annual Spend": "$ 45000"
  },
  {
    "Company Name": "ini tech",
    "Contact Email": "sales@initech.example",
    "Annual Spend": "unknown"
  },
  {
    "Company Name": "Soylent Co",
    "Contact Email": "green@soylent.example",
    "Annual Spend": "800.00"
  }
];

const demoCleanRows = [
  {
    company_name: "Acme Corporation",
    contact_email: "john@acme.example",
    annual_spend: "12000"
  },
  {
    company_name: "Globex",
    contact_email: "h.scorpio@globex.example",
    annual_spend: "45000"
  },
  {
    company_name: "Initech",
    contact_email: "sales@initech.example",
    annual_spend: ""
  },
  {
    company_name: "Soylent Industries",
    contact_email: "green@soylent.example",
    annual_spend: "800.00"
  }
];

const demoAmbiguousRows: AmbiguousRow[] = [
  {
    row_number: 11,
    original_company: "Umbra Health",
    suggested_company: "Umbrella Health",
    confidence: 0.89,
    reason: "Conflict found with similar CRM record."
  },
  {
    row_number: 14,
    original_company: "W Enterprises",
    suggested_company: "Wayne Enterprises",
    confidence: 0.87,
    reason: "Auto-fix suggested but left for review."
  }
];

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<UploadState>("idle");
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = copy[language];

  const columnChanges = useMemo(() => {
    if (result) {
      return result.columns_before.map((before, index) => ({
        before,
        after: result.columns_after[index] ?? "removed"
      }));
    }

    return [
      { before: "Co Name", after: "company_name" },
      { before: "Contact / E-mail", after: "contact_email" },
      { before: "Region / State", after: "region" }
    ];
  }, [result]);

  const originalRows = result?.original_preview ?? demoOriginalRows;
  const cleanRows = result?.cleaned_preview ?? demoCleanRows;
  const ambiguousRows = result?.ambiguous_rows ?? demoAmbiguousRows;
  const summary = result?.summary;

  async function handleSubmit() {
    if (!file) return;
    setState("uploading");
    setError(null);

    try {
      const payload = await processFile(file);
      setResult(payload);
      setState("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t.status.error);
      setState("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#0c1324] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(78,222,163,0.11),transparent_34%),linear-gradient(145deg,rgba(15,23,42,0.45),rgba(12,19,36,1)_48%)]" />

      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0a1020]/80 backdrop-blur-xl lg:flex lg:flex-col">
          <div className="flex h-16 items-center px-5">
            <span className="text-sm font-black uppercase tracking-tight text-emerald-300">
              {t.brand}
            </span>
          </div>

          <div className="px-5 py-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300">
                <Zap className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">{t.sidebar.lab}</p>
                <p className="text-xs text-slate-400">{t.sidebar.stack}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto px-5 py-6 text-xs leading-5 text-slate-500">
            {t.sidebar.note}
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#0c1324]/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center gap-6">
              <span className="text-sm font-black uppercase tracking-tight text-emerald-300 lg:hidden">
                {t.brand}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor="language-select">
                Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
                className="rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-emerald-200 outline-none transition hover:bg-slate-900 focus:border-emerald-300/50"
              >
                {(Object.keys(languages) as Language[]).map((option) => (
                  <option key={option} value={option}>
                    {option.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </header>

          <div id="dashboard" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
            <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-1.5 font-mono text-[0.64rem] font-bold uppercase tracking-[0.22em] text-emerald-300">
                  {t.badge}
                </span>
                <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-50 sm:text-5xl">
                  {t.title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  {t.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap justify-start gap-2 lg:justify-end">
                {t.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-lg border border-white/10 bg-slate-800/80 px-3 py-1.5 font-mono text-[0.68rem] text-cyan-200"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-3">
              <ImpactCard
                icon={AlertTriangle}
                tone="rose"
                title={t.impact.problemTitle}
                copy={t.impact.problemCopy}
              />
              <ImpactCard
                icon={Zap}
                tone="emerald"
                title={t.impact.solutionTitle}
                copy={t.impact.solutionCopy}
              />
              <ImpactCard
                icon={CheckCircle2}
                tone="cyan"
                title={t.impact.resultTitle}
                copy={t.impact.resultCopy}
              />
            </section>

            <FileUploader file={file} state={state} onFileChange={setFile} onSubmit={handleSubmit} text={t.upload} />
            <StatusPanel state={state} error={error} text={t.status} />

            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label={t.metrics.processedRows}
                value={summary?.rows_processed ?? "1,342"}
                detail={summary ? `${summary.columns_processed} ${t.metrics.cleanedColumns}` : t.metrics.demoWorkload}
                icon={Rows3}
                tone="sky"
              />
              <MetricCard
                label={t.metrics.duplicatesRemoved}
                value={summary?.duplicates_removed ?? 42}
                detail={t.metrics.duplicateDetail}
                icon={Sparkles}
                tone="rose"
              />
              <MetricCard
                label={t.metrics.namesFormatted}
                value={summary?.names_standardized ?? "1,028"}
                detail={t.metrics.namesDetail}
                icon={Building2}
                tone="teal"
              />
              <MetricCard
                label={t.metrics.manualReview}
                value={summary?.ambiguous_rows_found ?? 2}
                detail={t.metrics.manualDetail}
                icon={AlertTriangle}
                tone="amber"
              />
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
              <DataTable
                title={t.tables.before}
                rows={originalRows}
                emptyMessage={t.tables.beforeEmpty}
                previewLabel={t.tables.preview}
              />
              <DataTable
                title={t.tables.after}
                rows={cleanRows}
                emptyMessage={t.tables.afterEmpty}
                previewLabel={t.tables.preview}
              />
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-lg">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Table2 className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                    <h2 className="text-lg font-bold tracking-tight text-white">{t.mapping.title}</h2>
                  </div>
                  <span className="rounded-full bg-slate-800/80 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate-300">
                    {t.mapping.schema}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {columnChanges.map((change) => (
                    <div
                      key={`${change.before}-${change.after}`}
                      className="grid gap-3 rounded-xl bg-[#0c1324]/80 px-4 py-4 font-mono text-xs sm:grid-cols-[1fr_auto_1fr] sm:items-center"
                    >
                      <span className="truncate text-slate-400">{t.mapping.raw}: {change.before}</span>
                      <Wand2 className="hidden h-4 w-4 text-slate-300 sm:block" aria-hidden="true" />
                      <span className="truncate font-bold text-emerald-300">{t.mapping.target}: {change.after}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-lg">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-rose-200" aria-hidden="true" />
                  <h2 className="text-lg font-bold tracking-tight text-white">{t.review.title}</h2>
                </div>

                <div className="mt-6 space-y-4">
                  {ambiguousRows.length === 0 ? (
                    <p className="rounded-xl bg-[#0c1324]/80 p-4 text-sm text-slate-400">
                      {t.review.empty}
                    </p>
                  ) : (
                    ambiguousRows.map((row) => (
                      <article key={`${row.row_number}-${row.original_company}`} className="rounded-xl bg-[#0c1324]/80 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-100">{row.original_company}</h3>
                            <p className="mt-2 text-xs leading-5 text-slate-400">
                              {row.reason} {t.review.suggested}:{" "}
                              <span className="text-slate-200">{row.suggested_company}</span>.
                            </p>
                          </div>
                          <span className="rounded-full bg-rose-300/10 px-2 py-1 font-mono text-[0.6rem] text-rose-100">
                            {Math.round(row.confidence * 100)}% {t.review.match}
                          </span>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </section>

            <section className="grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">{t.export.title}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                  {t.export.subtitle}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {summary ? (
                  <>
                    <ExportButton
                      label={t.export.csv}
                      format="CSV"
                      href={exportUrl(summary.exported_csv)}
                      downloadLabel={t.export.download}
                    />
                    <ExportButton
                      label={t.export.xlsx}
                      format="XLSX"
                      href={exportUrl(summary.exported_xlsx)}
                      downloadLabel={t.export.download}
                    />
                  </>
                ) : (
                  <p className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm text-slate-400 sm:col-span-2">
                    {t.export.pending}
                  </p>
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

type ImpactCardProps = {
  icon: typeof AlertTriangle;
  tone: "rose" | "emerald" | "cyan";
  title: string;
  copy: string;
};

function ImpactCard({ icon: Icon, tone, title, copy }: ImpactCardProps) {
  const toneClass = {
    rose: "text-rose-200 bg-rose-300/10",
    emerald: "text-emerald-300 bg-emerald-300/10",
    cyan: "text-cyan-200 bg-cyan-300/10"
  }[tone];

  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-lg transition duration-200 hover:bg-slate-900/80">
      <span className={`inline-flex rounded-xl p-2.5 ${toneClass}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="mt-6 text-lg font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
    </article>
  );
}

type ExportButtonProps = {
  label: string;
  format: string;
  href: string;
  downloadLabel: string;
};

function ExportButton({ label, format, href, downloadLabel }: ExportButtonProps) {
  const content = (
    <>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-300/10 font-mono text-xs font-black text-emerald-300">
        {format}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-slate-400">
          {downloadLabel}
        </span>
        <span className="mt-1 block truncate text-sm font-semibold text-slate-100">{label}</span>
      </span>
      <Download className="h-4 w-4 text-slate-300" aria-hidden="true" />
    </>
  );

  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-lg transition duration-200 hover:bg-slate-900/90"
    >
      {content}
    </a>
  );
}

export default App;
