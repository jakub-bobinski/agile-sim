export type UserPanelProps = {
  clickPower: number;
  points: number;
};

export function UserPanel({ clickPower, points }: UserPanelProps) {
  return (
    <aside
      aria-labelledby="user-panel-heading"
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h2
        id="user-panel-heading"
        className="mb-3 text-sm font-semibold tracking-wide text-slate-700 uppercase"
      >
        Stats
      </h2>
      <dl className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between rounded-lg bg-slate-50 px-3 py-2">
          <dt className="text-sm text-slate-600">Power</dt>
          <dd className="text-lg font-semibold text-slate-900 tabular-nums">
            {clickPower}
          </dd>
        </div>
        <div className="flex items-baseline justify-between rounded-lg bg-slate-50 px-3 py-2">
          <dt className="text-sm text-slate-600">Points</dt>
          <dd className="text-lg font-semibold text-slate-900 tabular-nums">
            {points}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
