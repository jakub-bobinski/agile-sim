import type { Task } from "./types";

type TaskCardProps = {
  task: Task;
};

// Lookup table: one place that maps a priority to its badge colours.
// `Record<Task["priority"], string>` forces an entry for every priority,
// so adding a new one to the union will fail typecheck until it's styled here.
const priorityStyles: Record<Task["priority"], string> = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article
      aria-label={task.title}
      className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <header className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
        <span
          className={`shrink-0 rounded px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </header>
      <p className="mt-1 text-xs text-slate-600">{task.description}</p>
    </article>
  );
}
