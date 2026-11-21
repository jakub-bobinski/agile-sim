export type SprintBarProps = {
  sprintNumber: number;
  progress: number;
  reward: number;
};

export function SprintBar({ sprintNumber, progress, reward }: SprintBarProps) {
  const displayedProgress = Math.floor(progress);
  const rewardText = reward > 0 ? `+${reward}` : `${reward}`;
  const rewardStyles =
    reward > 0
      ? "bg-emerald-100 text-emerald-800"
      : reward < 0
        ? "bg-rose-100 text-rose-800"
        : "bg-slate-100 text-slate-700";

  return (
    <section
      aria-label="Sprint progress"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">
          Sprint {sprintNumber}
        </h2>
        <div className="flex items-baseline gap-3">
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium tabular-nums ${rewardStyles}`}
          >
            Reward: {rewardText}
          </span>
          <span className="text-sm font-medium text-slate-600 tabular-nums">
            {displayedProgress}%
          </span>
        </div>
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
