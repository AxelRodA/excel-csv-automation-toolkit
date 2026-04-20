import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string | number;
  detail?: string;
  icon: LucideIcon;
  tone: "teal" | "amber" | "rose" | "sky";
};

const tones = {
  teal: "text-emerald-300 bg-emerald-300/10",
  amber: "text-amber-200 bg-amber-300/10",
  rose: "text-rose-200 bg-rose-300/10",
  sky: "text-cyan-200 bg-cyan-300/10"
};

export function MetricCard({ label, value, detail, icon: Icon, tone }: MetricCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-lg transition duration-200 ease-out hover:bg-slate-900/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
            {label}
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tracking-tight text-slate-50">
            {value}
          </p>
          {detail ? <p className="mt-1 text-xs text-slate-500">{detail}</p> : null}
        </div>
        <span className={`rounded-xl p-2.5 ${tones[tone]}`}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
