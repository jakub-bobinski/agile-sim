export type SprintBarProps = {
  sprintNumber: number;
  progress: number;
};

export function SprintBar({ sprintNumber, progress }: SprintBarProps) {
  const displayedProgress = Math.floor(progress);

  return (
    <section
      aria-label="Sprint progress"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Sprint {sprintNumber}
        </h2>
        <span className="text-sm font-medium text-slate-600 tabular-nums">
          {displayedProgress}%
        </span>
      </div>
      <div
        aria-hidden="true"
        className="h-3 overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className="h-full rounded-full bg-emerald-500 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
