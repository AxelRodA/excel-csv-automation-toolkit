type DataTableProps = {
  title: string;
  rows: Record<string, string | number | null>[];
  emptyMessage: string;
  previewLabel: string;
};

export function DataTable({ title, rows, emptyMessage, previewLabel }: DataTableProps) {
  const columns = rows[0] ? Object.keys(rows[0]) : [];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-lg">
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
          {title}
        </h2>
        <span className="rounded-full bg-slate-800/80 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-slate-400">
          {previewLabel}
        </span>
      </div>
      {rows.length === 0 ? (
        <div className="px-5 pb-5 text-sm text-slate-400">{emptyMessage}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left font-mono text-[0.72rem]">
            <thead className="bg-slate-800/70 uppercase tracking-[0.12em] text-slate-300">
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col" className="whitespace-nowrap px-5 py-3 font-semibold">
                    {column.replaceAll("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="transition duration-200 hover:bg-white/[0.04]">
                  {columns.map((column) => (
                    <td key={column} className="max-w-[220px] truncate px-5 py-3 text-slate-300">
                      {row[column] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
